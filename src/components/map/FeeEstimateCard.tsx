"use client";

import { useEffect, useState } from "react";
import { Phone, MessageSquare, Calendar, Car, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BUSINESS } from "@/lib/constants";
import { type City } from "@/lib/cities";

interface FeeEstimate {
  city: {
    name: string;
    slug: string;
    region: string;
  };
  distance: {
    miles: number;
    minutes?: number;
    source: "api" | "fallback";
  };
  fee: {
    lowEstimate: number;
    highEstimate: number;
    currency: string;
  };
}

interface FeeEstimateCardProps {
  selectedCity: City | null;
}

export function FeeEstimateCard({ selectedCity }: FeeEstimateCardProps) {
  const [estimate, setEstimate] = useState<FeeEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCity) {
      setEstimate(null);
      return;
    }

    const fetchEstimate = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/travel-fee?slug=${selectedCity.slug}`);
        const data = await response.json();

        if (data.success) {
          setEstimate(data);
        } else {
          setError(data.error || "Failed to get estimate");
        }
      } catch {
        setError("Failed to get estimate. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimate();
  }, [selectedCity]);

  if (!selectedCity) {
    return (
      <Card className="border-dashed border-2 bg-muted/30">
        <CardContent className="py-8 text-center">
          <Car className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">
            Select a city above to see the estimated travel fee
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <p className="text-muted-foreground">Calculating estimate...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="py-6 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive">{error}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Contact us for a custom quote
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!estimate) return null;

  return (
    <Card className="border-gold/30 shadow-warm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Car className="h-5 w-5 text-gold" />
          Travel to {estimate.city.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Distance info */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated distance</span>
          <span className="font-medium">~{estimate.distance.miles} miles</span>
        </div>
        {estimate.distance.minutes && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Drive time
            </span>
            <span className="font-medium">~{estimate.distance.minutes} min</span>
          </div>
        )}

        <Separator />

        {/* Fee estimate */}
        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground mb-1">Estimated Travel Fee</p>
          <p className="text-3xl font-bold text-navy">
            ${estimate.fee.lowEstimate}–${estimate.fee.highEstimate}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            + notary fees (from $25/signature)
          </p>
        </div>

        <Separator />

        {/* CTAs */}
        <div className="space-y-2">
          <Button
            size="lg"
            asChild
            className="w-full bg-navy hover:bg-navy-light gap-2"
          >
            <a href={BUSINESS.phoneLink}>
              <Phone className="h-4 w-4" />
              Call {BUSINESS.phone}
            </a>
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" asChild className="gap-2">
              <a href={BUSINESS.textLink}>
                <MessageSquare className="h-4 w-4" />
                Text Me
              </a>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <a href="/booking">
                <Calendar className="h-4 w-4" />
                Book
              </a>
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed mb-2">
          Travel fee is an estimate. Final fee depends on exact address, time of
          day, and appointment details.
        </p>
        <p className="text-[10px] text-gold text-center font-medium">
          You&apos;ll reach me directly—no dispatch.
        </p>
      </CardContent>
    </Card>
  );
}
