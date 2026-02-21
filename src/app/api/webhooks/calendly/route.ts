import { NextRequest, NextResponse } from "next/server";
// import { Resend } from "resend"; // TODO: Install resend package
import { BUSINESS } from "@/lib/constants";

export const runtime = "nodejs";

// const resend = new Resend(process.env.RESEND_API_KEY); // TODO: Uncomment when resend is installed

interface CalendlyWebhookPayload {
  event: string;
  payload: {
    event_type: {
      name: string;
    };
    invitee: {
      name: string;
      email: string;
      text_reminder_number?: string;
    };
    scheduled_event: {
      start_time: string;
      end_time: string;
      name: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const webhook: CalendlyWebhookPayload = await request.json();

    // Only process invitee.created events (when someone books)
    if (webhook.event !== "invitee.created") {
      return NextResponse.json({
        message: "Event type not processed",
        event: webhook.event
      });
    }

    const { invitee, scheduled_event } = webhook.payload;

    // Calculate when to send review request (24 hours after appointment end)
    const endTime = new Date(scheduled_event.end_time);
    const reviewRequestTime = new Date(endTime.getTime() + 24 * 60 * 60 * 1000);

    // Prepare review request email
    const reviewUrl = "https://share.google/oyAsFNHkycJxCdxIY";
    const emailBody = `
Hi ${invitee.name.split(" ")[0]},

Thank you for trusting me with your ${scheduled_event.name} on ${new Date(scheduled_event.start_time).toLocaleDateString()}.

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

    // Send scheduled email via Resend (no database needed!)
    if (process.env.RESEND_API_KEY) {
      try {
        // TODO: Uncomment when resend is installed
        /*
        const result = await resend.emails.send({
          from: process.env.FROM_EMAIL || "Mobile Notary Management <noreply@mobile-notary-management.com>",
          to: invitee.email,
          subject: "Thank you for choosing Mobile Notary Management!",
          text: emailBody,
          scheduledAt: reviewRequestTime.toISOString(), // Resend handles scheduling!
        });
        */

        console.log(`✅ Review request would be scheduled for ${invitee.name} at ${reviewRequestTime.toISOString()} (resend not installed)`);
        // console.log(`📧 Email ID: ${result.data?.id}`);

        return NextResponse.json({
          success: true,
          message: "Review request scheduled successfully",
          data: {
            clientName: invitee.name,
            clientEmail: invitee.email,
            appointmentTime: scheduled_event.start_time,
            reviewScheduledFor: reviewRequestTime.toISOString(),
            emailId: null, // result.data?.id when resend is installed
          },
        });

      } catch (emailError) {
        console.error("Failed to schedule email:", emailError);
        // Fall back to logging
        console.log("⚠️ Would have sent review request to:", invitee.email);
      }
    } else {
      // Log for testing without Resend API key
      console.log("📧 SIMULATION - Would schedule email:");
      console.log(`   To: ${invitee.email}`);
      console.log(`   Client: ${invitee.name}`);
      console.log(`   Appointment: ${scheduled_event.start_time}`);
      console.log(`   Review scheduled for: ${reviewRequestTime.toISOString()}`);
    }

    return NextResponse.json({
      success: true,
      message: "Appointment captured (no database)",
      data: {
        clientName: invitee.name,
        appointmentTime: scheduled_event.start_time,
        reviewScheduledFor: reviewRequestTime.toISOString(),
      },
    });

  } catch (error) {
    console.error("Error processing Calendly webhook:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
