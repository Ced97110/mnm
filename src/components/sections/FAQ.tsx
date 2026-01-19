"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { useFadeIn } from "@/lib/animations";

interface FAQProps {
  faqs?: typeof FAQS;
  title?: string;
  subtitle?: string;
}

export function FAQ({
  faqs = FAQS,
  title = "Frequently Asked Questions",
  subtitle = "Got questions? I've got answers. If you don't see what you're looking for, give me a call.",
}: FAQProps) {
  const fadeRef = useFadeIn();

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
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Accordion */}
        <div ref={fadeRef}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
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
