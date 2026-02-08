import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend"; // TODO: Install resend package
import { BUSINESS } from "@/lib/constants";

export const runtime = "nodejs";

// const resend = new Resend(process.env.RESEND_API_KEY); // TODO: Uncomment when resend is installed

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
    if (clientPhone && process.env.TWILIO_ACCOUNT_SID) {
      try {
        // TODO: Implement Twilio SMS sending
        // const twilio = require('twilio');
        // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        // await client.messages.create({
        //   body: smsBody,
        //   from: process.env.TWILIO_PHONE_NUMBER,
        //   to: clientPhone,
        //   scheduleType: 'fixed',
        //   sendAt: scheduledFor.toISOString(),
        // });

        smsResult = {
          sent: false,
          message: "Twilio not configured",
        };
      } catch (smsError) {
        console.error("Failed to send SMS:", smsError);
      }
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
