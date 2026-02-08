import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  getServicePageContent,
  getAllServicePageSlugs,
} from "@/lib/get-content";
import {
  generateDetailedServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { BUSINESS } from "@/lib/constants";
import { getCityBySlug } from "@/lib/cities";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServicePageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getServicePageContent(slug);

  if (!content) {
    return { title: "Page Not Found" };
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://mobile-notary-management.com/services/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://mobile-notary-management.com/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = getServicePageContent(slug);

  if (!content) {
    notFound();
  }

  const serviceSchema = generateDetailedServiceSchema({
    name: content.name,
    description: content.overview[0],
    slug: content.slug,
    pricing: content.pricing,
    faqs: content.faqs,
  });
  const faqSchema = generateFAQSchema(content.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://mobile-notary-management.com" },
    { name: "Services", url: "https://mobile-notary-management.com/services" },
    {
      name: content.name,
      url: `https://mobile-notary-management.com/services/${slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-navy transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href="/services"
              className="hover:text-navy transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">{content.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-gold/10 text-navy border-gold/20"
            >
              {content.name}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {content.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {content.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                asChild
                className="bg-navy hover:bg-navy-light gap-2 h-14 px-8"
              >
                <a href={BUSINESS.phoneLink}>
                  <Phone className="h-5 w-5" />
                  Call {BUSINESS.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8">
                <a href="/booking">Book Appointment</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Overview</h2>
          <div className="space-y-4">
            {content.overview.map((paragraph, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Checklist */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-gold" />
            <h2 className="text-3xl font-bold tracking-tight">
              What to Bring
            </h2>
          </div>
          <Card className="border-gold/20">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {content.documentsToBring.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            How It Works
          </h2>
          <div className="space-y-8">
            {content.process.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold font-bold">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timing & Pricing */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-5 w-5 text-gold" />
                  <h3 className="text-xl font-semibold">Timing</h3>
                </div>
                <p className="text-2xl font-bold text-navy mb-2">
                  {content.timing.typical}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.timing.details}
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-5 w-5 text-gold" />
                  <h3 className="text-xl font-semibold">Pricing</h3>
                </div>
                <p className="text-2xl font-bold text-navy mb-2">
                  {content.pricing.base}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.pricing.details}
                </p>
                {content.pricing.note && (
                  <p className="mt-3 text-xs text-muted-foreground italic">
                    {content.pricing.note}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Common questions about {content.name.toLowerCase()} services.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {content.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium hover:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related Cities */}
      {content.relatedCitySlugs.length > 0 && (
        <section className="py-16 md:py-20 bg-cream">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              {content.name} Available In
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {content.relatedCitySlugs.map((citySlug) => {
                const city = getCityBySlug(citySlug);
                if (!city) return null;
                return (
                  <Link
                    key={citySlug}
                    href={`/mobile-notary-${citySlug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 font-medium text-secondary-foreground transition-colors hover:bg-gold/20 hover:text-navy"
                  >
                    {city.name}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
