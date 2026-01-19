"use client";

import { Check, Info, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFadeIn } from "@/lib/animations";
import { BUSINESS } from "@/lib/constants";

// Standard notary services - California state pricing ($15 per signature)
const standardServices = [
  { name: "Real Estate Documents", price: "$15.00", unit: "per signature" },
  { name: "Wills and Testaments", price: "$15.00", unit: "per signature" },
  { name: "Trust Documents", price: "$15.00", unit: "per signature" },
  { name: "Loan Signings", price: "$15.00", unit: "per signature" },
  { name: "Power of Attorney", price: "$15.00", unit: "per signature" },
  { name: "Affidavits", price: "$15.00", unit: "per signature" },
  { name: "Divorce Documents", price: "$15.00", unit: "per signature" },
  { name: "Acknowledgments", price: "$15.00", unit: "per signature" },
];

// Additional fees that may apply
const additionalFees = [
  { label: "Travel expenses", description: "Based on distance to your location" },
  { label: "After-hours service", description: "Appointments outside regular business hours" },
  { label: "Same-day priority", description: "Expedited scheduling when available" },
  { label: "Exceptional circumstances", description: "Special arrangements as needed" },
];

export function Pricing() {
  const fadeRef = useFadeIn();

  return (
    <section id="pricing" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            My notary services strictly adhere to the pricing guidelines established by the state of California and the National Notary Association.
          </p>
        </div>

        <div ref={fadeRef} className="grid gap-8 lg:grid-cols-2">
          {/* Standard Services Card */}
          <Card className="border-gold ring-2 ring-gold/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Notary Services</CardTitle>
                <Badge className="bg-gold text-navy hover:bg-gold">
                  CA State Pricing
                </Badge>
              </div>
              <CardDescription>
                Standard notarization fees per California guidelines
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
                    <span className="font-medium">Apostille Services</span>
                    <p className="text-sm text-muted-foreground">International document authentication</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="border-navy text-navy hover:bg-navy hover:text-white">
                    <a href={BUSINESS.phoneLink}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Info
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Fees Card */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Additional Charges</CardTitle>
              <CardDescription>
                When applicable, additional fees may include:
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
                  I prioritize transparency and fairness in my pricing, ensuring a smooth and reliable notary experience for every client.
                </p>
              </div>

              {/* CTA */}
              <Button
                asChild
                className="w-full bg-navy hover:bg-navy-light"
              >
                <a href="/booking">Book Your Appointment</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <Info className="inline h-4 w-4 mr-1" />
          All fees are quoted upfront before your appointment. I accept cash, cards, Venmo, Zelle, and PayPal.
        </p>
      </div>
    </section>
  );
}
