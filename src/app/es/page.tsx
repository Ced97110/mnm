import { Metadata } from "next";
import {
  Hero,
  Services,
  HowItWorks,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
} from "@/components/sections";
import { generateFAQSchema } from "@/lib/schema";
import { FAQS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Notario Móvil Profesional en el Área de la Bahía | Mobile Notary Management",
  description: "Notario móvil operado por el propietario sirviendo el Área de la Bahía de San Francisco. Voy a usted 7 días a la semana—trabaja directamente conmigo. Citas el mismo día disponibles.",
  alternates: {
    canonical: "https://mobile-notary-management.com/es",
    languages: {
      'en-US': 'https://mobile-notary-management.com',
      'es-ES': 'https://mobile-notary-management.com/es',
    },
  },
};

export default function SpanishHomePage() {
  const faqSchema = generateFAQSchema(FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
