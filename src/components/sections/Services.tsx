"use client";

import Link from "next/link";
import { Car, Home, Globe, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/constants";
import { useStaggerChildren } from "@/lib/animations";

const iconMap = {
  car: Car,
  home: Home,
  globe: Globe,
  heart: Heart,
};

export function Services() {
  const containerRef = useStaggerChildren(0.1);

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Notary Services That Come to You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether it&apos;s a real estate closing, power of attorney, or documents
            for international use—I handle it all personally, by appointment.
          </p>
        </div>

        {/* Services grid */}
        <div ref={containerRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
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
                        <Link href={`/services/${service.slug}`} className="gap-1">
                          Learn More <ArrowRight className="h-3.5 w-3.5" />
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
