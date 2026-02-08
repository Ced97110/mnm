import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MapPin, Clock, Car, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Hero } from "@/components/sections/Hero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Testimonials } from "@/components/sections/Testimonials";
import {
  getServiceAreaContent,
  getAllServiceAreaSlugs,
} from "@/lib/content/es/service-areas";
import { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/schema";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { CITIES } from "@/lib/cities";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all service areas
export async function generateStaticParams() {
  const slugs = getAllServiceAreaSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each service area page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceAreaContent(slug);

  if (!content) {
    return {
      title: "Página No Encontrada",
    };
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://mobile-notary-management.com/es/mobile-notary-${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://mobile-notary-management.com/es/mobile-notary-${slug}`,
      languages: {
        'en-US': `https://mobile-notary-management.com/mobile-notary-${slug}`,
        'es-ES': `https://mobile-notary-management.com/es/mobile-notary-${slug}`,
      },
    },
  };
}

export default async function SpanishServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const content = getServiceAreaContent(slug);

  if (!content) {
    notFound();
  }

  // Generate structured data
  const localBusinessSchema = generateLocalBusinessSchema(content.name, 'es');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "https://mobile-notary-management.com/es" },
    {
      name: `Notario Móvil ${content.name}`,
      url: `https://mobile-notary-management.com/es/mobile-notary-${slug}`,
    },
  ], 'es');
  const faqSchema = generateFAQSchema(content.localFAQs, 'es');

  // Get nearby cities for internal linking
  const nearbyCities = CITIES.filter(
    (city) => city.region === content.region && city.slug !== slug
  ).slice(0, 6);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/es" className="hover:text-navy transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">
              Notario Móvil {content.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <Hero cityName={content.name} />

      {/* About This Area */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* About content */}
            <div>
              <Badge
                variant="secondary"
                className="mb-4 bg-gold/10 text-navy border-gold/20"
              >
                <MapPin className="mr-1.5 h-3.5 w-3.5" />
                {content.region}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Servicios de Notario en {content.name}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {content.aboutArea}
              </p>

              {/* Travel info */}
              <Card className="mt-6 border-gold/20 bg-gold/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-gold mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Viaje y Programación</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {content.travelInfo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular services */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Servicios Populares en {content.name}
              </h3>
              <ul className="space-y-3">
                {content.popularServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>

              {/* Quick CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-navy hover:bg-navy-light">
                  <a href={BUSINESS.phoneLink}>Llamar para Servicio el Mismo Día</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/es/booking">Reservar Cita</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Preguntas Frecuentes de Notario en {content.name}
            </h2>
            <p className="mt-4 text-muted-foreground">
              Preguntas comunes sobre mis servicios de notario en {content.name}.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {content.localFAQs.map((faq, index) => (
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

      {/* Services Available in City */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Servicios Disponibles en {content.name}
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ofrezco toda la gama de servicios de notario en {content.name}. Toque un
            servicio para obtener más información sobre lo que está incluido.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`/es/services/${service.slug}`}
                className="group rounded-xl border border-border/50 bg-card p-5 transition-all hover:shadow-warm hover:border-gold/30"
              >
                <h3 className="font-semibold text-navy group-hover:text-gold transition-colors">
                  {service.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.shortDesc}
                </p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-gold gap-1">
                  Más información <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              También Sirviendo Ciudades Cercanas de {content.region}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/es/mobile-notary-${city.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 font-medium text-secondary-foreground transition-colors hover:bg-gold/20 hover:text-navy"
                >
                  Notario Móvil {city.name}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}
