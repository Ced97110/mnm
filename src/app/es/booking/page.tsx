import type { Metadata } from "next";
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

        {/* Opciones de Contacto */}
        <div className="bg-card rounded-2xl border border-border shadow-warm p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Contáctenos
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            ¿Listo para programar su cita? Contáctenos directamente y encontraremos un horario que funcione para usted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BUSINESS.phoneLink}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-navy text-white font-semibold hover:bg-navy/90 transition-colors"
            >
              Llame al {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.textLink}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-navy text-navy font-semibold hover:bg-navy/5 transition-colors"
            >
              Envíe un Mensaje
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
