import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend"; // TODO: Install resend package
import { BUSINESS } from "@/lib/constants";
import twilio from "twilio";
import { verifyAdminSecret } from "@/lib/admin-auth";

export const runtime = "nodejs";

// const resend = new Resend(process.env.RESEND_API_KEY); // TODO: Uncomment when resend is installed

// Initialize Twilio client
// Supports both Account SID (AC...) and API Key (SK...)
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? process.env.TWILIO_ACCOUNT_SID.startsWith('SK')
    ? twilio(
        process.env.TWILIO_ACCOUNT_SID, // API Key SID
        process.env.TWILIO_AUTH_TOKEN,  // API Key Secret
        { accountSid: process.env.TWILIO_MAIN_ACCOUNT_SID } // Actual Account SID
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

/**
 * Format phone number to E.164 format (+1XXXXXXXXXX)
 * Handles: "(510) 555-1234", "510-555-1234", "5105551234", "+15105551234"
 */
function formatPhoneNumber(phoneNumber: string): string {
  // Already formatted
  if (phoneNumber.startsWith('+')) {
    return phoneNumber;
  }

  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Handle country code already present
  if (digitsOnly.startsWith('1') && digitsOnly.length === 11) {
    return `+${digitsOnly}`;
  }

  // Add +1 for US numbers (assume US if no country code)
  return `+1${digitsOnly}`;
}

export async function POST(request: NextRequest) {
  const unauthorized = verifyAdminSecret(request);
  if (unauthorized) return unauthorized;

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

    const reviewUrl = "https://share.google/oyAsFNHkycJxCdxIY";
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

    let emailResult = null;
    let smsResult = null;

    // Send email via Resend with scheduling (NO DATABASE!)
    if (clientEmail && process.env.RESEND_API_KEY) {
      try {
        // TODO: Uncomment when resend is installed
        /*
        const result = await resend.emails.send({
          from: process.env.FROM_EMAIL || "Mobile Notary Management <noreply@mobile-notary-management.com>",
          to: clientEmail,
          subject: emailSubject,
          text: emailBody,
          scheduledAt: scheduledFor.toISOString(), // Resend handles the scheduling!
        });

        emailResult = {
          sent: true,
          emailId: result.data?.id,
          to: clientEmail,
        };

        console.log(`✅ Email scheduled for ${clientEmail} at ${scheduledFor.toISOString()}`);
        */
        emailResult = {
          sent: false,
          message: "Resend package not installed",
        };
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        emailResult = {
          sent: false,
          error: emailError instanceof Error ? emailError.message : "Unknown error",
        };
      }
    }

    // Send SMS via Twilio (optional)
    if (clientPhone && twilioClient && (process.env.TWILIO_MESSAGING_SERVICE_SID || process.env.TWILIO_PHONE_NUMBER)) {
      try {
        // Format phone number to E.164 (+1XXXXXXXXXX)
        const formattedPhone = formatPhoneNumber(clientPhone);

        // Use Messaging Service SID for A2P 10DLC compliance (preferred)
        // Falls back to direct phone number if Messaging Service not configured
        const messageParams: any = {
          body: smsBody,
          to: formattedPhone,
        };

        if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
          messageParams.messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
        } else {
          messageParams.from = process.env.TWILIO_PHONE_NUMBER;
        }

        const message = await twilioClient.messages.create(messageParams);

        smsResult = {
          sent: true,
          messageSid: message.sid,
          to: formattedPhone,
          status: message.status,
        };

        console.log(`✅ SMS sent to ${formattedPhone} - SID: ${message.sid}`);

      } catch (twilioError: any) {
        console.error("Twilio error:", twilioError);
        smsResult = {
          sent: false,
          error: twilioError.message || "Unknown Twilio error",
          details: twilioError.code || null,
        };
      }
    } else if (clientPhone) {
      // Demo mode - Twilio not configured
      const formattedPhone = formatPhoneNumber(clientPhone);
      console.log("📱 DEMO MODE - Would send SMS:");
      console.log(`   To: ${formattedPhone}`);
      console.log(`   Message: ${smsBody}`);
      console.log(`   Note: Configure TWILIO_MESSAGING_SERVICE_SID or TWILIO_PHONE_NUMBER`);

      smsResult = {
        sent: false,
        demo: true,
        message: "Demo mode - Twilio not configured (need TWILIO_MESSAGING_SERVICE_SID or TWILIO_PHONE_NUMBER)",
        to: formattedPhone,
      };
    }

    const response = {
      success: true,
      message: emailResult?.sent ? "Review request scheduled!" : "Review request prepared",
      data: {
        clientName,
        email: clientEmail ? {
          to: clientEmail,
          subject: emailSubject,
          body: emailBody,
          sent: emailResult?.sent || false,
          emailId: (emailResult as any)?.emailId,
        } : null,
        sms: clientPhone ? {
          to: clientPhone,
          body: smsBody,
          sent: smsResult?.sent || false,
        } : null,
        reviewUrl,
        scheduledFor: scheduledFor.toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error sending review request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send review request" },
      { status: 500 }
    );
  }
}
