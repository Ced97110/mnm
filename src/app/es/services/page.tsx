import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Car, Home, Globe, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SERVICES, BUSINESS } from "@/lib/constants";
import { generateBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Servicios de Notario | ${BUSINESS.name}`,
  description:
    "Notario móvil, agente de firma de préstamos, servicios de apostilla y notarización en hospitales en toda el Área de la Bahía de San Francisco. Citas el mismo día disponibles 7 días a la semana.",
  openGraph: {
    title: `Servicios de Notario | ${BUSINESS.name}`,
    description:
      "Notario móvil, agente de firma de préstamos, servicios de apostilla y notarización en hospitales en toda el Área de la Bahía de San Francisco.",
    url: "https://mobile-notary-management.com/es/services",
    type: "website",
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/es/services",
    languages: {
      'en-US': 'https://mobile-notary-management.com/services',
      'es-ES': 'https://mobile-notary-management.com/es/services',
    },
  },
};

const iconMap = {
  car: Car,
  home: Home,
  globe: Globe,
  heart: Heart,
};

export default function SpanishServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "https://mobile-notary-management.com/es" },
    { name: "Servicios", url: "https://mobile-notary-management.com/es/services" },
  ], 'es');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/es" className="hover:text-navy transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">Servicios</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-gold/10 text-navy border-gold/20"
          >
            Servicios Profesionales de Notario
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Servicios de Notario Que Vienen a Usted
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Desde notarizaciones rutinarias hasta firmas de préstamos complejas y
            autenticación de documentos internacionales, manejo todo personalmente—en
            su ubicación, según su horario.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <Card
                  key={service.id}
                  className="group overflow-hidden border-border/50 transition-all duration-300 hover:shadow-warm hover:border-gold/30"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{service.name}</CardTitle>
                        <p className="mt-1 text-sm text-gold font-medium">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Button asChild className="bg-navy hover:bg-navy-light">
                        <Link
                          href={`/es/services/${service.slug}`}
                          className="gap-2"
                        >
                          Más Información <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="/es/booking">Reservar Ahora</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            ¿Por Qué Elegir Mobile Notary Management?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Trabaja directamente conmigo en cada cita. Sin centros de llamadas, sin
            extraños—solo un servicio de notario confiable y profesional.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="text-3xl font-bold text-gold">5+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Años de Experiencia
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold">15,000+</div>
              <div className="text-sm text-muted-foreground mt-1">
                Documentos Notarizados
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold">4.9 ★</div>
              <div className="text-sm text-muted-foreground mt-1">
                Calificación Promedio
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
