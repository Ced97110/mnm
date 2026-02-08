"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { FAQS as FAQS_ES } from "@/lib/constants-es";
import { useFadeIn } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Import dictionaries directly in client component
const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

interface FAQProps {
  faqs?: typeof FAQS;
  title?: string;
  subtitle?: string;
}

export function FAQ({
  faqs,
  title,
  subtitle,
}: FAQProps) {
  const pathname = usePathname();
  const fadeRef = useFadeIn();
  const [dict, setDict] = useState<Dictionary | null>(null);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  if (!dict) {
    return null; // Loading state
  }

  // Use provided props or fall back to locale-appropriate defaults
  const displayFaqs = faqs || (locale === 'es' ? FAQS_ES : FAQS);
  const displayTitle = title || dict.faq.title;
  const displaySubtitle = subtitle || dict.faq.subtitle;

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-gold/10 text-navy border-gold/20"
          >
            <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {displayTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{displaySubtitle}</p>
        </div>

        {/* Accordion */}
        <div ref={fadeRef}>
          <Accordion type="single" collapsible className="w-full">
            {displayFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium hover:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
