import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Award, Shield, Clock, Heart, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Meet Your Mobile Notary",
  description: `Meet the professional behind ${BUSINESS.name}. ${BUSINESS.yearsInBusiness}+ years of experience, NNA-certified, serving the entire San Francisco Bay Area.`,
  openGraph: {
    title: "About Us | Meet Your Mobile Notary",
    description: `Meet the professional behind ${BUSINESS.name}. Trusted, experienced, and dedicated to your convenience.`,
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/about",
  },
};

const credentials = [
  {
    icon: Award,
    title: "NNA Certified",
    description: "Certified Notary Signing Agent through the National Notary Association",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "California commissioned notary with $100,000 E&O insurance",
  },
  {
    icon: Clock,
    title: `${BUSINESS.yearsInBusiness}+ Years Experience`,
    description: "Thousands of documents notarized across the Bay Area",
  },
  {
    icon: Heart,
    title: "Community Focused",
    description: "Dedicated to serving Bay Area residents with care and professionalism",
  },
];

const milestones = [
  { year: "2012", event: "Became a California Commissioned Notary Public" },
  { year: "2013", event: "Completed NNA Signing Agent Certification" },
  { year: "2015", event: "Expanded service to cover the entire Bay Area" },
  { year: "2018", event: "Reached 5,000+ notarizations milestone" },
  { year: "2020", event: "Added apostille and document authentication services" },
  { year: "2024", event: "Celebrated 15,000+ documents notarized" },
];

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-warm-lg">
                <Image
                  src="/elias.JPG"
                  alt="Elias - Mobile Notary Management"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <Badge
                variant="secondary"
                className="mb-4 bg-gold/10 text-navy border-gold/20"
              >
                Meet Your Notary
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Hi, I&apos;m Elias
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Your trusted mobile notary serving the San Francisco Bay Area
              </p>
              
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  For over {BUSINESS.yearsInBusiness} years, I&apos;ve been helping Bay Area 
                  residents and businesses with their notarization needs. What started as 
                  a way to provide a convenient service has grown into a passion for 
                  helping people navigate important life moments.
                </p>
                <p>
                  Whether you&apos;re closing on your first home, setting up a power of 
                  attorney for an aging parent, or need documents authenticated for 
                  international use, I understand that these moments matter. That&apos;s 
                  why I bring the same level of care and professionalism to every 
                  appointment, whether it&apos;s at a corporate office or a hospital bedside.
                </p>
                <p>
                  I&apos;m proud to be an NNA-certified signing agent with extensive 
                  experience in loan signings, and I&apos;m committed to making the 
                  notarization process as smooth and stress-free as possible.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-navy hover:bg-navy-light gap-2">
                  <a href={BUSINESS.phoneLink}>
                    <Phone className="h-5 w-5" />
                    Call Me Now
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/booking">Book Appointment</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Credentials & Experience
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              When you choose {BUSINESS.name}, you&apos;re choosing a professional 
              with the training, experience, and dedication to handle your important documents.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((credential) => (
              <Card key={credential.title} className="border-border/50 hover:shadow-warm transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <credential.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-navy">{credential.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {credential.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certificates */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <Image
                src="/certificate.png"
                alt="Notary Certificate"
                width={100}
                height={100}
                className="mx-auto"
              />
              <p className="mt-2 text-sm text-muted-foreground">California Commissioned</p>
            </div>
            <a
              href={BUSINESS.social.signingAgent}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group"
            >
              <Image
                src="/certificate1.png"
                alt="Professional Certification - Click to verify"
                width={100}
                height={100}
                className="mx-auto transition-transform group-hover:scale-105"
              />
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-navy transition-colors">
                NNA Member
              </p>
              <p className="text-xs text-gold font-medium">
                Click to verify credentials →
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">My Journey</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Building trust across the Bay Area, one notarization at a time
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold/30 -translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gold border-4 border-cream -translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-sm font-semibold text-gold">{milestone.year}</span>
                    <p className="mt-1 text-muted-foreground">{milestone.event}</p>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              My Commitment to You
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Every appointment, every document, every client matters
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Convenience First",
                description: "I come to you—your home, office, hospital, or anywhere you need. Your time is valuable, and I respect that.",
              },
              {
                title: "Transparency Always",
                description: "No hidden fees, no surprises. I quote everything upfront so you know exactly what to expect before booking.",
              },
              {
                title: "Compassionate Service",
                description: "Whether it's a joyful home closing or a difficult hospital visit, I handle every situation with care and professionalism.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center p-6">
                <CheckCircle className="h-10 w-10 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Work Together?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m here to make your notarization experience as smooth as possible. 
            Give me a call or book an appointment online.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gold hover:bg-gold-light text-navy gap-2">
              <a href={BUSINESS.phoneLink}>
                <Phone className="h-5 w-5" />
                {BUSINESS.phone}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/booking">Book Online</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
