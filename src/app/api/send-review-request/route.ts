import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import twilio from "twilio";
import { BUSINESS } from "@/lib/constants";

export const runtime = "nodejs";

// Initialize Resend client for email
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Initialize Twilio client for SMS
// Supports both Account SID (AC...) and API Key (SK...)
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? process.env.TWILIO_ACCOUNT_SID.startsWith('SK')
    ? twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
        { accountSid: process.env.TWILIO_MAIN_ACCOUNT_SID }
      )
    : twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

interface ReviewRequestBody {
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  appointmentDate: string;
  serviceType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReviewRequestBody = await request.json();

    const { clientName, clientEmail, clientPhone, appointmentDate, serviceType } = body;

    // Validate required fields
    if (!clientName || (!clientEmail && !clientPhone)) {
      return NextResponse.json(
        { success: false, error: "Client name and either email or phone required" },
        { status: 400 }
      );
    }

    const reviewUrl = "https://mobile-notary-management.com/leave-review";
    const scheduledFor = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Prepare email content
    const emailSubject = "Thank you for choosing Mobile Notary Management!";
    const emailBody = `
Hi ${clientName},

Thank you for trusting me with your notarization on ${new Date(appointmentDate).toLocaleDateString()}${serviceType ? ` for your ${serviceType}` : ""}.

I hope everything went smoothly! If you have a moment, I'd be grateful if you could share your experience on Google. Your review helps other Bay Area families find reliable notary services when they need them.

Leave a review here: ${reviewUrl}

It only takes 60 seconds and means the world to me.

Thank you again!

Best regards,
Mobile Notary Management
${BUSINESS.phone}
${BUSINESS.email}

---
Prefer not to receive these emails? Just reply and let me know.
    `.trim();

    // Prepare SMS content (shorter)
    const smsBody = `Hi ${clientName}, thank you for choosing Mobile Notary Management! If you have a moment, I'd love a quick review: ${reviewUrl} - It really helps! Text STOP to opt out.`;

    let emailResult: { sent: boolean; emailId?: string; to?: string; error?: string } | null = null;
    let smsResult: { sent: boolean; messageSid?: string; to?: string; status?: string; error?: string } | null = null;

    // Send email via Resend with scheduling
    if (clientEmail) {
      if (resend) {
        try {
          const result = await resend.emails.send({
            from: process.env.FROM_EMAIL || "Mobile Notary Management <noreply@mobile-notary-management.com>",
            to: clientEmail,
            subject: emailSubject,
            text: emailBody,
            scheduledAt: scheduledFor.toISOString(),
          });

          emailResult = {
            sent: true,
            emailId: result.data?.id,
            to: clientEmail,
          };

          console.log(`✅ Email scheduled for ${clientEmail} at ${scheduledFor.toISOString()}`);
        } catch (emailError) {
          console.error("Failed to send email:", emailError);
          emailResult = {
            sent: false,
            to: clientEmail,
            error: emailError instanceof Error ? emailError.message : "Unknown email error",
          };
        }
      } else {
        console.warn("⚠️ Resend not configured - RESEND_API_KEY environment variable is missing");
        emailResult = {
          sent: false,
          to: clientEmail,
          error: "Email service not configured (missing RESEND_API_KEY)",
        };
      }
    }

    // Send SMS via Twilio
    if (clientPhone) {
      if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
        try {
          // Format phone number (ensure it starts with +1 for US numbers)
          const formattedPhone = clientPhone.startsWith('+')
            ? clientPhone
            : clientPhone.startsWith('1')
            ? `+${clientPhone}`
            : `+1${clientPhone.replace(/\D/g, '')}`;

          const message = await twilioClient.messages.create({
            body: smsBody,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhone,
          });

          smsResult = {
            sent: true,
            messageSid: message.sid,
            to: formattedPhone,
            status: message.status,
          };

          console.log(`✅ SMS sent to ${formattedPhone} - SID: ${message.sid}`);
        } catch (smsError) {
          console.error("Failed to send SMS:", smsError);
          smsResult = {
            sent: false,
            to: clientPhone,
            error: smsError instanceof Error ? smsError.message : "Unknown SMS error",
          };
        }
      } else {
        console.warn("⚠️ Twilio not configured - missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_PHONE_NUMBER");
        smsResult = {
          sent: false,
          to: clientPhone,
          error: "SMS service not configured (missing Twilio credentials)",
        };
      }
    }

    // Determine actual success based on whether messages were sent
    const emailSent = emailResult?.sent ?? false;
    const smsSent = smsResult?.sent ?? false;
    const anySent = emailSent || smsSent;
    const allFailed = (clientEmail && !emailSent) && (clientPhone && !smsSent);

    const response = {
      success: anySent,
      message: anySent
        ? "Review request sent!"
        : allFailed
        ? "Failed to send review request - check service configuration"
        : "No contact method provided",
      data: {
        clientName,
        email: clientEmail ? {
          to: clientEmail,
          subject: emailSubject,
          body: emailBody,
          sent: emailSent,
          emailId: emailResult?.emailId,
          error: emailResult?.error,
        } : null,
        sms: clientPhone ? {
          to: smsResult?.to || clientPhone,
          body: smsBody,
          sent: smsSent,
          messageSid: smsResult?.messageSid,
          error: smsResult?.error,
        } : null,
        reviewUrl,
        scheduledFor: emailSent ? scheduledFor.toISOString() : new Date().toISOString(),
      },
    };

    return NextResponse.json(response, { status: anySent ? 200 : 500 });
  } catch (error) {
    console.error("Error sending review request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send review request" },
      { status: 500 }
    );
  }
}
