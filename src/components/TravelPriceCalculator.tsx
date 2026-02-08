"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MapPin, DollarSign, Navigation, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAVEL_FEE_CONFIG } from "@/lib/cities";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Import dictionaries directly in client component
const dictionaries = {
  en: () => import("@/lib/i18n/dictionaries/en/common.json").then((m) => m.default),
  es: () => import("@/lib/i18n/dictionaries/es/common.json").then((m) => m.default),
};

interface TravelFeeData {
  success: boolean;
  city?: {
    name: string;
    slug: string;
    region: string;
  };
  distance?: {
    miles: number;
    minutes?: number;
    source: "api" | "fallback";
  };
  fee?: {
    lowEstimate: number;
    highEstimate: number;
    currency: string;
  };
  error?: string;
}

export function TravelPriceCalculator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TravelFeeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dict, setDict] = useState<Dictionary | null>(null);

  // Detect locale from pathname
  const locale = pathname?.startsWith('/es') ? 'es' : 'en';

  useEffect(() => {
    dictionaries[locale]().then(setDict);
  }, [locale]);

  if (!dict) {
    return null; // Loading state
  }

  const getLocationAndCalculate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError(dict.travelCalculator.errors.notSupported);
      setLoading(false);
      return;
    }

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Call the travel fee API
          const response = await fetch(
            `/api/travel-fee?lat=${latitude}&lng=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Failed to calculate travel fee");
          }

          const data: TravelFeeData = await response.json();

          if (data.success) {
            setResult(data);
          } else {
            setError(data.error || dict.travelCalculator.errors.failed);
          }
        } catch (err) {
          setError(dict.travelCalculator.errors.failed);
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(dict.travelCalculator.errors.permissionDenied);
            break;
          case err.POSITION_UNAVAILABLE:
            setError(dict.travelCalculator.errors.unavailable);
            break;
          case err.TIMEOUT:
            setError(dict.travelCalculator.errors.timeout);
            break;
          default:
            setError(dict.travelCalculator.errors.unknown);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gold" />
          {dict.travelCalculator.title}
        </CardTitle>
        <CardDescription>
          {dict.travelCalculator.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calculate Button */}
        {!result && (
          <Button
            onClick={getLocationAndCalculate}
            disabled={loading}
            size="lg"
            className="w-full bg-navy hover:bg-navy-light gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {dict.travelCalculator.buttonLoading}
              </>
            ) : (
              <>
                <Navigation className="h-5 w-5" />
                {dict.travelCalculator.button}
              </>
            )}
          </Button>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
            <Button
              onClick={getLocationAndCalculate}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              {dict.travelCalculator.tryAgain}
            </Button>
          </div>
        )}

        {/* Success State */}
        {result && result.success && (
          <div className="space-y-4">
            {/* Location Info */}
            <div className="p-4 bg-cream rounded-lg border border-gold/20">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-navy">
                    {result.city?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {result.city?.region} • {result.distance?.miles} {dict.travelCalculator.location.milesAway}
                  </p>
                  {result.distance?.minutes && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ~{result.distance.minutes} {dict.travelCalculator.location.minutesDrive}
                    </p>
                  )}
                </div>
                <Badge variant="secondary" className="bg-gold/10 text-navy border-gold/20">
                  <MapPin className="h-3 w-3 mr-1" />
                  {result.distance?.source === "api"
                    ? dict.travelCalculator.location.realTime
                    : dict.travelCalculator.location.estimated}
                </Badge>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-6 bg-gradient-to-br from-navy to-navy-light rounded-lg text-white">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-5 w-5 text-gold" />
                <h3 className="font-semibold">{dict.travelCalculator.feeEstimate}</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  ${result.fee?.lowEstimate}
                </span>
                <span className="text-xl text-cream/70">-</span>
                <span className="text-4xl font-bold">
                  ${result.fee?.highEstimate}
                </span>
              </div>
              <p className="text-sm text-cream/70 mt-2">
                {dict.travelCalculator.perSignature}
              </p>
            </div>

            {/* Fee Breakdown - Transparent Calculation */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-sm text-blue-900">
                  {dict.travelCalculator.breakdown.title}
                </h4>
              </div>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>{dict.travelCalculator.breakdown.baseRate}:</span>
                  <span className="font-medium">${TRAVEL_FEE_CONFIG.perMileRate} {dict.travelCalculator.breakdown.perMile}</span>
                </div>
                <div className="flex justify-between">
                  <span>{dict.travelCalculator.breakdown.calculation}:</span>
                  <span className="font-medium">
                    {result.distance?.miles} {locale === 'es' ? 'millas' : 'miles'} × ${TRAVEL_FEE_CONFIG.perMileRate} = ${Math.round((result.distance?.miles || 0) * TRAVEL_FEE_CONFIG.perMileRate)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-blue-600">
                  <span>{dict.travelCalculator.breakdown.minimum}:</span>
                  <span>${TRAVEL_FEE_CONFIG.minimumTravelFee}</span>
                </div>
                <div className="flex justify-between text-xs text-blue-600">
                  <span>{dict.travelCalculator.breakdown.maximum}:</span>
                  <span>${TRAVEL_FEE_CONFIG.maximumTravelFee}</span>
                </div>
                <div className="pt-2 border-t border-blue-200 flex justify-between font-medium">
                  <span>{dict.travelCalculator.breakdown.range}:</span>
                  <span className="text-blue-900">±15%</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm text-navy mb-2">
                {dict.travelCalculator.included.title}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {dict.travelCalculator.included.comeToYou}</li>
                <li>• {dict.travelCalculator.included.noParking}</li>
                <li>• {dict.travelCalculator.included.sameDay}</li>
                <li>• {dict.travelCalculator.included.evenings}</li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="flex gap-3">
              <Button
                asChild
                className="flex-1 bg-gold hover:bg-gold/90 text-navy"
              >
                <a href="tel:+15103931860">
                  {dict.travelCalculator.callToBook}
                </a>
              </Button>
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                className="flex-1"
              >
                {dict.travelCalculator.calculateAgain}
              </Button>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground text-center">
          {dict.travelCalculator.privacyNote}
        </p>
      </CardContent>
    </Card>
  );
}
