"use client";

import Image from "next/image";
import { Phone, Calendar, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSINESS } from "@/lib/constants";
import { useHeroAnimation } from "@/lib/animations";

interface HeroProps {
  cityName?: string;
}

export function Hero({ cityName }: HeroProps) {
  const containerRef = useHeroAnimation();
  const locationText = cityName ? `in ${cityName}` : "in the Bay Area";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#1e3a5f" />
            </pattern>
          </defs>
          <rect fill="url(#hero-pattern)" width="100%" height="100%" />
        </svg>
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 py-12 md:py-16 lg:pt-12 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left side - Content */}
          <div ref={containerRef}>
            {/* Badge */}
            <div data-hero-badge>
              <Badge
                variant="secondary"
                className="mb-6 bg-gold/10 text-navy border-gold/20 px-4 py-1.5"
              >
                <CheckCircle className="mr-1.5 h-3.5 w-3.5 text-gold" />
                Same-Day Appointments Available
              </Badge>
            </div>

            {/* Title */}
            <h1
              data-hero-title
              className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
            >
              Professional Mobile Notary{" "}
              <span className="text-gold">{locationText}</span>
            </h1>

            {/* Subtitle */}
            <p
              data-hero-subtitle
              className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-xl leading-relaxed"
            >
              I&apos;m your mobile notary—fast, reliable, and you&apos;ll work directly with me. Available 7 days a week, early morning to late evening.
            </p>
            <p
              data-hero-transparency
              className="mt-3 text-sm text-gold font-medium"
            >
              Owner-operated (no dispatch). I personally handle every appointment.
            </p>

            {/* CTAs */}
            <div
              data-hero-ctas
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                asChild
                className="bg-navy hover:bg-navy-light text-lg h-14 px-8 gap-2 shadow-warm"
              >
                <a href={BUSINESS.phoneLink}>
                  <Phone className="h-5 w-5" />
                  Call for Same-Day Service
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg h-14 px-8 gap-2 border-2"
              >
                <a href="/booking">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </a>
              </Button>
            </div>

            {/* Trust badges & Credentials */}
            <div
              data-hero-trust
              className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gold" />
                <span>Licensed & Insured</span>
              </div>
              <Image
                src="/certificate.png"
                alt="Notary Certificate"
                width={48}
                height={48}
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <a
                href={BUSINESS.social.signingAgent}
                target="_blank"
                rel="noopener noreferrer"
                title="View Digital Credentials"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/certificate1.png"
                  alt="Professional Certification - Click to verify credentials"
                  width={48}
                  height={48}
                  className="h-10 w-10 md:h-12 md:w-12"
                />
              </a>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:min-h-[500px] xl:min-h-[550px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/elias.svg"
                alt="Professional mobile notary services"
                className="w-full h-full object-contain lg:scale-125"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 33.3C840 37 960 43 1080 45C1200 47 1320 45 1380 44L1440 43V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
