import type { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: `Schedule your mobile notary appointment with ${BUSINESS.name}. Easy online booking available 7 days a week.`,
  openGraph: {
    title: `Book Appointment | ${BUSINESS.name}`,
    description: `Schedule your mobile notary appointment with ${BUSINESS.name}. Easy online booking available 7 days a week.`,
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/booking",
  },
};

export default function BookingPage() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule your mobile notary appointment with our professional team today.
            Select a time that works best for you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-card rounded-2xl border border-border shadow-warm p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Ready to schedule your appointment? Contact us directly and we&apos;ll find a time that works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BUSINESS.phoneLink}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-white font-semibold hover:bg-navy/90 transition-colors"
            >
              Call {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.textLink}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-navy text-navy font-semibold hover:bg-navy/5 transition-colors"
            >
              Send a Text
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
