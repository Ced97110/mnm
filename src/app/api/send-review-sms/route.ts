import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { verifyAdminSecret } from "@/lib/admin-auth";

export const runtime = "nodejs";

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

interface SMSRequestBody {
  phoneNumber: string;
  clientName?: string;
}

export async function POST(request: NextRequest) {
  const unauthorized = verifyAdminSecret(request);
  if (unauthorized) return unauthorized;

  try {
    const { phoneNumber, clientName }: SMSRequestBody = await request.json();

    // Validate phone number
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Format phone number (ensure it starts with +1 for US numbers)
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : phoneNumber.startsWith('1')
      ? `+${phoneNumber}`
      : `+1${phoneNumber.replace(/\D/g, '')}`; // Remove non-digits and add +1

    const reviewUrl = "https://g.page/r/CVzknXneT7yeEBM/review";

    // Short, friendly SMS message
    const greeting = clientName ? `Hi ${clientName.split(' ')[0]}!` : "Hi!";
    const smsBody = `${greeting} Thank you for choosing Mobile Notary Management! 🙏

Would you mind leaving a quick review? It helps other families find me:
${reviewUrl}

Takes 60 seconds. Thank you!
- Elias

Reply STOP to opt out.`;

    // Send SMS via Twilio
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const message = await twilioClient.messages.create({
          body: smsBody,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });

        console.log(`✅ SMS sent to ${formattedPhone} - SID: ${message.sid}`);

        return NextResponse.json({
          success: true,
          message: "Review request SMS sent!",
          data: {
            messageSid: message.sid,
            to: formattedPhone,
            status: message.status,
          },
        });

      } catch (twilioError: any) {
        console.error("Twilio error:", twilioError);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to send SMS",
            details: twilioError.message || "Unknown Twilio error",
          },
          { status: 500 }
        );
      }
    } else {
      // Demo mode - no Twilio configured
      console.log("📱 DEMO MODE - Would send SMS:");
      console.log(`   To: ${formattedPhone}`);
      console.log(`   Message: ${smsBody}`);

      return NextResponse.json({
        success: true,
        demo: true,
        message: "Demo mode - SMS not sent (configure Twilio to enable)",
        data: {
          to: formattedPhone,
          message: smsBody,
        },
      });
    }

  } catch (error) {
    console.error("Error sending review SMS:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
