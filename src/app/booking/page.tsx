import type { Metadata } from "next";
import { CalendlyWidget } from "@/components/calendly";
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

        {/* Calendly Widget */}
        <div className="bg-card rounded-2xl border border-border shadow-warm overflow-hidden">
          <CalendlyWidget />
        </div>

        {/* Alternative Contact */}
        <div className="mt-9 text-center">
          <p className="text-muted-foreground">
            Prefer to speak with someone?{" "}
            <a 
              href={BUSINESS.phoneLink} 
              className="text-navy font-medium hover:text-gold transition-colors"
            >
              Call {BUSINESS.phone}
            </a>
            {" "}or{" "}
            <a 
              href={BUSINESS.textLink}
              className="text-navy font-medium hover:text-gold transition-colors"
            >
              send a text
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
