"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Map, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CityCombobox } from "@/components/map/CityCombobox";
import { FeeEstimateCard } from "@/components/map/FeeEstimateCard";
import { CITIES_BY_REGION, type City } from "@/lib/cities";
import { useStaggerChildren } from "@/lib/animations";

// Lazy load the map component to preserve Core Web Vitals
const ServiceAreaMap = lazy(() =>
  import("@/components/map/ServiceAreaMap").then((mod) => ({
    default: mod.ServiceAreaMap,
  }))
);

export function ServiceAreas() {
  const containerRef = useStaggerChildren(0.05);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <section id="service-areas" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-gold/10 text-navy border-gold/20"
          >
            <MapPin className="mr-1.5 h-3.5 w-3.5" />
            Service Coverage
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            I Serve the Entire Bay Area
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From San Francisco to San Jose, Oakland to Palo Alto—I bring
            professional notary services to your doorstep. Select your city to
            estimate the travel fee.
          </p>
        </div>

        {/* City selector + View toggle */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 w-full sm:max-w-sm">
            <CityCombobox
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Map or List view */}
          <div className="lg:col-span-2">
            {viewMode === "map" ? (
              <Suspense
                fallback={
                  <div className="w-full h-[300px] md:h-[400px] rounded-xl bg-muted animate-pulse flex items-center justify-center">
                    <p className="text-muted-foreground">Loading map...</p>
                  </div>
                }
              >
                <ServiceAreaMap
                  onCitySelect={handleCitySelect}
                  selectedCity={selectedCity}
                />
              </Suspense>
            ) : (
              <div
                ref={containerRef}
                className="h-[300px] md:h-[400px] overflow-auto rounded-xl border border-border p-6 space-y-6"
              >
                {Object.entries(CITIES_BY_REGION).map(([region, cities]) => (
                  <div key={region}>
                    <h3 className="text-lg font-semibold text-navy mb-3">
                      {region}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {cities.map((city) => (
                        <button
                          key={city.slug}
                          onClick={() => handleCitySelect(city)}
                          className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedCity?.slug === city.slug
                              ? "bg-navy text-white"
                              : "bg-muted hover:bg-gold/20"
                          }`}
                        >
                          {city.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fee estimate card */}
          <div className="lg:col-span-1">
            <FeeEstimateCard selectedCity={selectedCity} />
          </div>
        </div>

        {/* Static city links for SEO */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-navy mb-6 text-center">
            Mobile Notary Services by City
          </h3>
          <div className="space-y-6">
            {Object.entries(CITIES_BY_REGION).map(([region, cities]) => (
              <div key={region}>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  {region}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/mobile-notary-${city.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-gold/20 hover:text-navy"
                    >
                      {city.name}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Don&apos;t see your city? I likely cover it too!
            </p>
            <Button variant="outline" asChild>
              <a href="/booking" className="gap-2">
                Contact for Availability
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
