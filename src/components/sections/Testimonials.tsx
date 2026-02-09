"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Star, Quote, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS, BUSINESS } from "@/lib/constants";
import { TESTIMONIALS as TESTIMONIALS_ES } from "@/lib/constants-es";
import { useStaggerChildren } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Import dictionaries directly in client component
const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

export function Testimonials() {
  const pathname = usePathname();
  const containerRef = useStaggerChildren(0.1);
  const [dict, setDict] = useState<Dictionary | null>(null);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';
  const testimonials = locale === 'es' ? TESTIMONIALS_ES : TESTIMONIALS;

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  if (!dict) {
    return null; // Loading state
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-navy text-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-gold/20 text-gold border-gold/30"
          >
            <Star className="mr-1.5 h-3.5 w-3.5 fill-gold" />
            {dict.testimonials.badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            {dict.testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {dict.testimonials.subtitle}
          </p>
          <Button
            variant="outline"
            asChild
            className="mt-6 border-gold/50 text-gold hover:bg-gold/10 hover:text-gold gap-2"
          >
            <a
              href={BUSINESS.social.yelp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.14 11.34l-2.22 1.52c-.22.15-.52.04-.58-.23l-.78-3.3c-.1-.4.28-.76.68-.64l2.35.67c.4.12.64.54.55.98zm-2.11 4.05l2.12-1.65c.21-.16.5-.07.58.18l1.02 3.22c.12.39-.2.78-.58.73l-2.35-.31c-.39-.05-.67-.44-.59-.82l.2-.35zm4.66-2.51l.51 2.45c.08.4-.23.77-.62.73l-2.35-.24c-.4-.04-.69-.43-.62-.82l.37-2.05c.07-.4.45-.66.84-.59l1.87.52zm2.77-3.92l-2.2 1.44c-.22.14-.51.02-.58-.24l-.9-3.26c-.11-.4.26-.77.66-.66l2.39.64c.4.11.66.52.63.92v1.16zm-5.32-4.87L11 7.52c-.19.19-.49.16-.61-.06l-1.54-2.85c-.18-.35.08-.77.47-.77h2.74c.38 0 .66.38.52.74l-.64 1.51z"/>
              </svg>
              {dict.testimonials.viewReviews}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        {/* Testimonials grid */}
        <div ref={containerRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white/5 border-white/10 backdrop-blur"
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-gold/40 mb-4" />
                
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-gold fill-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/90 leading-relaxed mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.location}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gold/20 text-gold border-gold/30 text-xs"
                  >
                    {testimonial.service}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {[
            { value: "5,000+", label: dict.testimonials.stats.documents },
            { value: "6+", label: dict.testimonials.stats.experience },
            { value: "33+", label: dict.testimonials.stats.cities },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-gold">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
