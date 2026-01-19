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
  alternates: {
    canonical: "https://mobile-notary-management.com",
  },
};

export default function HomePage() {
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
