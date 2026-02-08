import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad para ${BUSINESS.name}. Aprenda cómo recopilo, uso y protejo su información personal.`,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/es/privacy",
    languages: {
      'en-US': 'https://mobile-notary-management.com/privacy',
      'es-ES': 'https://mobile-notary-management.com/es/privacy',
    },
  },
};

export default function SpanishPrivacyPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/es" className="hover:text-navy transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">Política de Privacidad</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-navy mb-8">Política de Privacidad</h1>

          <p className="text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            1. Información que Recopilo
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cuando usa mis servicios o me contacta, puedo recopilar la siguiente información:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Nombre e información de contacto (número de teléfono, dirección de correo electrónico)</li>
            <li>Ubicación del servicio y detalles de la cita</li>
            <li>Información necesaria para realizar servicios de notarización</li>
            <li>Información de pago</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            2. Cómo Uso Su Información
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Uso la información que recopilo para:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Programar y realizar servicios de notarización</li>
            <li>Comunicarme con usted sobre citas</li>
            <li>Procesar pagos</li>
            <li>Mantener registros según lo requiere la ley de California</li>
            <li>Mejorar mis servicios</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            3. Compartir Información
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            No vendo ni alquilo su información personal. Puedo compartir información solo según lo
            requiera la ley, para procesar pagos o con su consentimiento explícito.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            4. Seguridad de Datos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Implemento medidas de seguridad apropiadas para proteger su información personal. Sin
            embargo, ningún método de transmisión por Internet es completamente seguro.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            5. Registros del Diario Notarial
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Según lo requiere la ley de California, mantengo un diario de todos los actos notariales.
            Este diario incluye información sobre los documentos notarizados y la identidad de los
            firmantes. Estos registros se mantienen según lo requiere la ley estatal.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            6. Comunicaciones por SMS
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Si consiente recibir mensajes SMS de nosotros:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Su número de teléfono se usa solo para enviar mensajes de solicitud de reseñas</li>
            <li>Enviamos solo un mensaje por cita</li>
            <li>No compartimos su número de teléfono con terceros para marketing</li>
            <li>Puede optar por no participar en cualquier momento respondiendo STOP</li>
            <li>Pueden aplicarse tarifas de mensajes y datos según su operador</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Para los términos y condiciones completos de SMS, consulte nuestra{" "}
            <Link href="/es/sms-terms" className="text-navy hover:text-gold underline">
              página de Términos de SMS
            </Link>.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            7. Contáctenos
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Si tiene preguntas sobre esta política de privacidad, por favor contáctenos:
          </p>
          <ul className="list-none text-muted-foreground space-y-2 mb-6">
            <li>Teléfono: {BUSINESS.phone}</li>
            <li>Correo electrónico: {BUSINESS.email}</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8 mb-4">
            8. Cambios a Esta Política
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Puedo actualizar esta política de privacidad de vez en cuando. Los cambios se publicarán
            en esta página con una fecha de revisión actualizada.
          </p>
        </article>
      </div>
    </div>
  );
}
