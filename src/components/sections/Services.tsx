"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Car, Home, Globe, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";
import { SERVICES as SERVICES_ES } from "@/lib/constants-es";
import { useStaggerChildren } from "@/lib/animations";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Import dictionaries directly in client component
const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

const iconMap = {
  car: Car,
  home: Home,
  globe: Globe,
  heart: Heart,
};

export function Services() {
  const pathname = usePathname();
  const containerRef = useStaggerChildren(0.1);
  const [dict, setDict] = useState<Dictionary | null>(null);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';
  const localePrefix = locale === 'es' ? '/es' : '';
  const services = locale === 'es' ? SERVICES_ES : SERVICES;

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  if (!dict) {
    return null; // Loading state
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.services.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Services grid */}
        <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            return (
              <Card
                key={service.id}
                className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-warm hover:border-gold/30"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.shortDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gold">
                      {service.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-navy hover:text-gold"
                      >
                        <Link href={`${localePrefix}/services/${service.slug}`} className="gap-1">
                          {dict.common.learnMore} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
