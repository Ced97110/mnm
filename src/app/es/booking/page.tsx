import type { Metadata } from "next";
import { CalendlyWidget } from "@/components/calendly";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Reservar Cita",
  description: `Programe su cita de notario móvil con ${BUSINESS.name}. Reserva en línea fácil disponible 7 días a la semana.`,
  openGraph: {
    title: `Reservar Cita | ${BUSINESS.name}`,
    description: `Programe su cita de notario móvil con ${BUSINESS.name}. Reserva en línea fácil disponible 7 días a la semana.`,
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/es/booking",
    languages: {
      'en-US': 'https://mobile-notary-management.com/booking',
      'es-ES': 'https://mobile-notary-management.com/es/booking',
    },
  },
};

export default function SpanishBookingPage() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-navy mb-4">
            Reserve Su Cita
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Programe su cita de notario móvil con nuestro equipo profesional hoy.
            Seleccione un horario que funcione mejor para usted.
          </p>
        </div>

        {/* Calendly Widget */}
        <div className="bg-card rounded-2xl border border-border shadow-warm overflow-hidden">
          <CalendlyWidget />
        </div>

        {/* Alternative Contact */}
        <div className="mt-9 text-center">
          <p className="text-muted-foreground">
            ¿Prefiere hablar con alguien?{" "}
            <a
              href={BUSINESS.phoneLink}
              className="text-navy font-medium hover:text-gold transition-colors"
            >
              Llame al {BUSINESS.phone}
            </a>
            {" "}o{" "}
            <a
              href={BUSINESS.textLink}
              className="text-navy font-medium hover:text-gold transition-colors"
            >
              envíe un mensaje de texto
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
