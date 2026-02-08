"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Check, Info, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TravelPriceCalculator } from "@/components/TravelPriceCalculator";
import { useFadeIn } from "@/lib/animations";
import { BUSINESS } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Import dictionaries directly in client component
const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

export function Pricing() {
  const pathname = usePathname();
  const fadeRef = useFadeIn();
  const [dict, setDict] = useState<Dictionary | null>(null);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';
  const localePrefix = locale === 'es' ? '/es' : '';

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  if (!dict) {
    return null; // Loading state
  }

  // Standard notary services - California state pricing ($15 per signature)
  const standardServices = [
    { name: dict.pricing.fees.realEstate, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.wills, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.trusts, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.loanSignings, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.powerOfAttorney, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.affidavits, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.divorce, price: "$15.00", unit: dict.pricing.fees.perSignature },
    { name: dict.pricing.fees.acknowledgments, price: "$15.00", unit: dict.pricing.fees.perSignature },
  ];

  // Additional fees that may apply
  const additionalFees = [
    { label: dict.pricing.fees.travelLabel, description: dict.pricing.fees.travelDescription },
    { label: dict.pricing.fees.afterHoursLabel, description: dict.pricing.fees.afterHoursDescription },
    { label: dict.pricing.fees.sameDayLabel, description: dict.pricing.fees.sameDayDescription },
    { label: dict.pricing.fees.exceptionalLabel, description: dict.pricing.fees.exceptionalDescription },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.pricing.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict.pricing.subtitle}
          </p>
        </div>

        <div ref={fadeRef} className="grid gap-8 lg:grid-cols-2">
          {/* Standard Services Card */}
          <Card className="border-gold ring-2 ring-gold/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{dict.pricing.notaryServices}</CardTitle>
                <Badge className="bg-gold text-navy hover:bg-gold">
                  {dict.pricing.stateGuidelines}
                </Badge>
              </div>
              <CardDescription>
                {dict.pricing.standardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {standardServices.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm font-medium">{service.name}</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-navy">{service.price}</span>
                      <span className="text-xs text-muted-foreground block">{service.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Apostille - Call for info */}
              <div className="mt-4 p-4 rounded-lg bg-navy/5 border border-navy/10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{dict.pricing.fees.apostille}</span>
                    <p className="text-sm text-muted-foreground">{dict.pricing.fees.apostilleDescription}</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="border-navy text-navy hover:bg-navy hover:text-white">
                    <a href={BUSINESS.phoneLink}>
                      <Phone className="h-4 w-4 mr-2" />
                      {dict.pricing.fees.callForInfo}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Fees Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">{dict.pricing.additionalCharges}</CardTitle>
              <CardDescription>
                {dict.pricing.additionalDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {additionalFees.map((fee) => (
                <div
                  key={fee.label}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">{fee.label}</span>
                    <p className="text-sm text-muted-foreground">{fee.description}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {dict.pricing.transparencyNote}
                </p>
              </div>

              {/* CTA */}
              <Button
                asChild
                className="w-full bg-navy hover:bg-navy-light"
              >
                <a href={`${localePrefix}/booking`}>{dict.pricing.bookAppointment}</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Travel Fee Calculator */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold tracking-tight text-navy mb-2">
              {dict.pricing.calculateTravel}
            </h3>
            <p className="text-muted-foreground">
              {dict.pricing.calculateSubtitle}
            </p>
          </div>
          <TravelPriceCalculator />
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <Info className="inline h-4 w-4 mr-1" />
          {dict.pricing.paymentNote}
        </p>
      </div>
    </section>
  );
}
