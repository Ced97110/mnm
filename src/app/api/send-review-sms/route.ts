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

interface Contact {
  phoneNumber: string;
  clientName?: string;
}

interface SMSRequestBody {
  phoneNumber?: string;
  clientName?: string;
  contacts?: Contact[];
}

function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.startsWith('+')
    ? phoneNumber
    : phoneNumber.startsWith('1')
    ? `+${phoneNumber}`
    : `+1${phoneNumber.replace(/\D/g, '')}`;
}

function buildSmsBody(clientName?: string): string {
  const reviewUrl = "https://g.page/r/CVzknXneT7yeEBM/review";
  const greeting = clientName ? `Hi ${clientName.split(' ')[0]}!` : "Hi!";
  return `${greeting} Thank you for choosing Mobile Notary Management! 🙏

Would you mind leaving a quick review? It helps other families find me:
${reviewUrl}

Takes 60 seconds. Thank you!
- Elias

Reply STOP to opt out.`;
}

async function sendSingleSms(phoneNumber: string, clientName?: string): Promise<{
  to: string;
  success: boolean;
  messageSid?: string;
  status?: string;
  message?: string;
  error?: string;
  demo?: boolean;
}> {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  const smsBody = buildSmsBody(clientName);

  if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const message = await twilioClient.messages.create({
        body: smsBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone,
      });

      console.log(`✅ SMS sent to ${formattedPhone} - SID: ${message.sid}`);

      return {
        to: formattedPhone,
        success: true,
        messageSid: message.sid,
        status: message.status,
      };
    } catch (twilioError: any) {
      console.error(`❌ Twilio error for ${formattedPhone}:`, twilioError);
      return {
        to: formattedPhone,
        success: false,
        error: twilioError.message || "Unknown Twilio error",
      };
    }
  } else {
    console.log(`📱 DEMO MODE - Would send SMS to ${formattedPhone}`);
    return {
      to: formattedPhone,
      success: true,
      demo: true,
      message: smsBody,
    };
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = verifyAdminSecret(request);
  if (unauthorized) return unauthorized;

  try {
    const body: SMSRequestBody = await request.json();

    // Bulk mode: contacts array
    if (body.contacts && Array.isArray(body.contacts)) {
      if (body.contacts.length === 0) {
        return NextResponse.json(
          { success: false, error: "Contacts array is empty" },
          { status: 400 }
        );
      }

      if (body.contacts.length > 50) {
        return NextResponse.json(
          { success: false, error: "Maximum 50 contacts per batch" },
          { status: 400 }
        );
      }

      const results = [];
      for (const contact of body.contacts) {
        if (!contact.phoneNumber) {
          results.push({ to: "", success: false, error: "Missing phone number" });
          continue;
        }
        const result = await sendSingleSms(contact.phoneNumber, contact.clientName);
        results.push(result);
      }

      const sent = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      return NextResponse.json({
        success: failed === 0,
        results,
        summary: { total: results.length, sent, failed },
        demo: !twilioClient || !process.env.TWILIO_PHONE_NUMBER,
      });
    }

    // Single mode (backwards compatible)
    const { phoneNumber, clientName } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    const result = await sendSingleSms(phoneNumber, clientName);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Review request SMS sent!",
        demo: result.demo,
        data: {
          messageSid: result.messageSid,
          to: result.to,
          status: result.status,
          message: result.message,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to send SMS", details: result.error },
        { status: 500 }
      );
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
