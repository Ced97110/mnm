import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions",
  description: "Terms and conditions for SMS review requests from Mobile Notary Management",
};

export default function SMSTermsPage() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-4">
            <MessageSquare className="h-6 w-6 text-gold" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-navy mb-4">
            SMS Terms & Conditions
          </h1>
          <p className="text-muted-foreground">
            Last Updated: February 8, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <h2>SMS Review Request Program</h2>

          <p>
            {BUSINESS.name} ("we," "us," "our") offers an SMS review request program
            to provide convenient communication with our clients regarding their experience
            with our notary services.
          </p>

          <h3>1. Program Description</h3>
          <p>
            By providing your mobile phone number and consenting to receive text messages,
            you agree to receive a single SMS message from {BUSINESS.name} containing:
          </p>
          <ul>
            <li>A thank you message for using our services</li>
            <li>A link to leave a review on Google</li>
            <li>Contact information</li>
          </ul>

          <h3>2. Consent</h3>
          <p>
            <strong>How You Consent:</strong> You provide consent by verbally agreeing when
            asked "Can I text you a review link?" or similar question during or after your
            notary appointment, and by providing your mobile phone number.
          </p>
          <p>
            <strong>What You're Consenting To:</strong> By consenting, you agree to receive
            one (1) text message from {BUSINESS.name} related to your recent notary appointment.
          </p>
          <p>
            <strong>Consent is Not Required:</strong> Consent to receive SMS messages is not
            a condition of purchasing any goods or services from {BUSINESS.name}.
          </p>

          <h3>3. Message Frequency</h3>
          <p>
            <strong>One-Time Message:</strong> You will receive only ONE (1) message per
            appointment. We do not send recurring messages, promotional messages, or marketing
            messages via SMS.
          </p>

          <h3>4. Message & Data Rates</h3>
          <p>
            Message and data rates may apply based on your mobile carrier's plan. You are
            responsible for any charges from your mobile carrier.
          </p>

          <h3>5. Supported Carriers</h3>
          <p>
            This program is available to customers of major U.S. wireless carriers including
            AT&T, Verizon, T-Mobile, Sprint, and others. Service may not be available on all
            carriers.
          </p>

          <h3>6. Opt-Out / STOP</h3>
          <p>
            <strong>How to Opt Out:</strong> You may opt out at any time by replying
            <strong> STOP</strong> to any message from us. After opting out, you will receive
            one final confirmation message, and no further messages will be sent.
          </p>
          <p>
            <strong>Alternative Opt-Out:</strong> You may also opt out by contacting us at:
          </p>
          <ul>
            <li>Phone: {BUSINESS.phone}</li>
            <li>Email: {BUSINESS.email}</li>
          </ul>

          <h3>7. Help / HELP</h3>
          <p>
            For assistance, reply <strong>HELP</strong> to any message, or contact us at:
          </p>
          <ul>
            <li>Phone: {BUSINESS.phone}</li>
            <li>Email: {BUSINESS.email}</li>
          </ul>

          <h3>8. Privacy</h3>
          <p>
            We respect your privacy. Your phone number will be used solely for sending the
            review request message. We do not share, sell, or distribute your phone number
            to third parties for marketing purposes.
          </p>
          <p>
            For more information, see our{" "}
            <a href="/privacy" className="text-navy hover:text-gold">
              Privacy Policy
            </a>
            .
          </p>

          <h3>9. Number Changes</h3>
          <p>
            If you change your mobile number, you must notify us to update our records.
            We are not responsible for messages sent to an old number.
          </p>

          <h3>10. Service Availability</h3>
          <p>
            The SMS program is provided "as is" without warranties. We do not guarantee
            message delivery and are not liable for delayed or undelivered messages due to
            carrier issues, network problems, or other technical difficulties.
          </p>

          <h3>11. Changes to Terms</h3>
          <p>
            We may update these terms at any time. Changes will be effective immediately
            upon posting to this page. Your continued participation in the SMS program
            after changes constitutes acceptance of the updated terms.
          </p>

          <h3>12. Contact Information</h3>
          <p>
            For questions about the SMS program or these terms:
          </p>
          <ul>
            <li>
              <strong>Business Name:</strong> {BUSINESS.name}
            </li>
            <li>
              <strong>Phone:</strong> {BUSINESS.phone}
            </li>
            <li>
              <strong>Email:</strong> {BUSINESS.email}
            </li>
            <li>
              <strong>Service Area:</strong> {BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state}
            </li>
          </ul>

          <h3>13. Prohibited Uses</h3>
          <p>
            You agree not to use the SMS program for any unlawful purpose or in any way
            that could damage, disable, or impair the service.
          </p>

          <h3>14. Limitation of Liability</h3>
          <p>
            {BUSINESS.name} is not liable for any damages arising from your use of or
            inability to use the SMS program, including but not limited to message delivery
            failures, carrier charges, or data usage.
          </p>

          <div className="mt-8 p-6 bg-cream rounded-lg border border-gold/20">
            <h3 className="mt-0">Summary</h3>
            <ul className="mb-0">
              <li>✓ One message per appointment</li>
              <li>✓ Reply STOP to opt out anytime</li>
              <li>✓ Reply HELP for assistance</li>
              <li>✓ Message & data rates may apply</li>
              <li>✓ Consent not required to use our services</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
