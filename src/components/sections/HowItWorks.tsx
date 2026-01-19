"use client";

import { Phone, Calendar, FileCheck } from "lucide-react";
import { useFadeIn } from "@/lib/animations";

const steps = [
  {
    number: "1",
    icon: Phone,
    title: "Call or Book Online",
    description:
      "Contact me by phone, text, or use the online booking form. Tell me what documents you need notarized and your preferred location.",
  },
  {
    number: "2",
    icon: Calendar,
    title: "I Come to You",
    description:
      "I'll confirm my availability and meet you at your chosen location—home, office, hospital, or anywhere in the Bay Area. Same-day service available.",
  },
  {
    number: "3",
    icon: FileCheck,
    title: "Sign & Done",
    description:
      "Present your ID, sign your documents in front of me, and you're finished. I accept cash, cards, Venmo, and Zelle.",
  },
];

export function HowItWorks() {
  const fadeRef = useFadeIn();

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Getting your documents notarized has never been easier. Three simple
            steps to get it done.
          </p>
        </div>

        {/* Steps */}
        <div ref={fadeRef} className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gold/50 to-gold/10" />
              )}
              
              {/* Step content */}
              <div className="relative z-10">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-warm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white">
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy text-sm font-bold">
                  {step.number}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
