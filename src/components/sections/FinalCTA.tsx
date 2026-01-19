"use client";

import { useState } from "react";
import { Phone, MessageSquare, Send, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BUSINESS } from "@/lib/constants";
import { useFadeIn } from "@/lib/animations";

export function FinalCTA() {
  const fadeRef = useFadeIn();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    service: "",
    location: "",
    submitted: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setFormState((prev) => ({ ...prev, submitted: true }));
  };

  return (
    <section id="book" className="py-16 md:py-24 bg-gradient-to-b from-white to-cream">
      <div className="container mx-auto max-w-6xl px-4">
        <div ref={fadeRef} className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left side - CTA text */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Your Documents Notarized?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Skip the hassle of finding a notary office. I&apos;ll come to you—at your
              home, office, or anywhere in the Bay Area. I&apos;ll confirm my availability
              and meet you at your location.
            </p>

            {/* Quick contact options */}
            <div className="mt-8 space-y-4">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-navy hover:bg-navy-light gap-2 h-14 px-8"
              >
                <a href={BUSINESS.phoneLink}>
                  <Phone className="h-5 w-5" />
                  Call {BUSINESS.phone}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto gap-2 h-14 px-8 sm:ml-4"
              >
                <a href={BUSINESS.textLink}>
                  <MessageSquare className="h-5 w-5" />
                  Text Me
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              You&apos;ll reach me directly. Text is usually the fastest way to reach me.
            </p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-gold" />
                <span>No obligation quote</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" />
                <span>Usually respond in 15 min</span>
              </div>
            </div>
          </div>

          {/* Right side - Booking form */}
          <Card className="shadow-warm-lg border-border/50">
            <CardHeader>
              <CardTitle>Request an Appointment</CardTitle>
              <CardDescription>
                Fill out this quick form and I&apos;ll get back to you within 15
                minutes during business hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formState.submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold">Request Received!</h3>
                  <p className="mt-2 text-muted-foreground">
                    I&apos;ll call you back within 15 minutes to confirm your
                    appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(510) 393-1860"
                        required
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Type of Service</Label>
                    <select
                      id="service"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={formState.service}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, service: e.target.value }))
                      }
                    >
                      <option value="">Select a service...</option>
                      <option value="mobile-notary">Mobile Notary</option>
                      <option value="loan-signing">Loan Signing</option>
                      <option value="apostille">Apostille Service</option>
                      <option value="hospital">Hospital/Care Facility</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location (City)</Label>
                    <Input
                      id="location"
                      placeholder="San Francisco"
                      required
                      value={formState.location}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, location: e.target.value }))
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-navy gap-2 h-12"
                  >
                    <Send className="h-4 w-4" />
                    Request Callback
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to receive a call or text at the
                    number provided.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
