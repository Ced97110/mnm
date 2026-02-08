import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Award, Shield, Clock, Heart, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Conozca a Su Notario Móvil",
  description: `Conozca al profesional detrás de ${BUSINESS.name}. ${BUSINESS.yearsInBusiness}+ años de experiencia, certificado por NNA, sirviendo toda el Área de la Bahía de San Francisco.`,
  openGraph: {
    title: "Sobre Nosotros | Conozca a Su Notario Móvil",
    description: `Conozca al profesional detrás de ${BUSINESS.name}. Confiable, experimentado y dedicado a su conveniencia.`,
  },
  alternates: {
    canonical: "https://mobile-notary-management.com/es/about",
    languages: {
      'en-US': 'https://mobile-notary-management.com/about',
      'es-ES': 'https://mobile-notary-management.com/es/about',
    },
  },
};

const credentials = [
  {
    icon: Award,
    title: "Certificado por NNA",
    description: "Agente de Firma Notarial Certificado a través de la Asociación Nacional de Notarios",
  },
  {
    icon: Shield,
    title: "Con Licencia y Asegurado",
    description: "Notario comisionado de California con seguro E&O de $100,000",
  },
  {
    icon: Clock,
    title: `${BUSINESS.yearsInBusiness}+ Años de Experiencia`,
    description: "Miles de documentos notarizados en toda el Área de la Bahía",
  },
  {
    icon: Heart,
    title: "Enfocado en la Comunidad",
    description: "Dedicado a servir a los residentes del Área de la Bahía con cuidado y profesionalismo",
  },
];

export default function SpanishAboutPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/es" className="hover:text-navy transition-colors">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium">Sobre Nosotros</span>
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
                Conozca a Su Notario
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Hola, soy Elias
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Su notario móvil de confianza sirviendo el Área de la Bahía de San Francisco
              </p>

              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Durante más de {BUSINESS.yearsInBusiness} años, he estado ayudando a residentes
                  y negocios del Área de la Bahía con sus necesidades de notarización. Lo que comenzó
                  como una manera de proporcionar un servicio conveniente se ha convertido en una
                  pasión por ayudar a las personas a navegar momentos importantes de la vida.
                </p>
                <p>
                  Ya sea que esté cerrando su primera casa, estableciendo un poder notarial para
                  un padre anciano o necesite documentos autenticados para uso internacional,
                  entiendo que estos momentos importan. Por eso traigo el mismo nivel de cuidado
                  y profesionalismo a cada cita, ya sea en una oficina corporativa o al lado de
                  una cama de hospital.
                </p>
                <p>
                  Me enorgullece ser un agente de firma certificado por NNA con amplia experiencia
                  en firmas de préstamos, y estoy comprometido a hacer que el proceso de notarización
                  sea lo más fluido y sin estrés posible.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-navy hover:bg-navy-light gap-2">
                  <a href={BUSINESS.phoneLink}>
                    <Phone className="h-5 w-5" />
                    Llámame Ahora
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/es/booking">Reservar Cita</a>
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
              Credenciales y Experiencia
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuando elige {BUSINESS.name}, está eligiendo un profesional con la capacitación,
              experiencia y dedicación para manejar sus documentos importantes.
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
                alt="Certificado de Notario"
                width={100}
                height={100}
                className="mx-auto"
              />
              <p className="mt-2 text-sm text-muted-foreground">Comisionado de California</p>
            </div>
            <a
              href={BUSINESS.social.signingAgent}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group"
            >
              <Image
                src="/certificate1.png"
                alt="Certificación Profesional - Haga clic para verificar"
                width={100}
                height={100}
                className="mx-auto transition-transform group-hover:scale-105"
              />
              <p className="mt-2 text-sm text-muted-foreground group-hover:text-navy transition-colors">
                Miembro de NNA
              </p>
              <p className="text-xs text-gold font-medium">
                Haga clic para verificar credenciales →
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Mi Compromiso con Usted
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Cada cita, cada documento, cada cliente importa
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Conveniencia Primero",
                description: "Voy a usted—su casa, oficina, hospital o donde necesite. Su tiempo es valioso, y respeto eso.",
              },
              {
                title: "Transparencia Siempre",
                description: "Sin tarifas ocultas, sin sorpresas. Cotizo todo por adelantado para que sepa exactamente qué esperar antes de reservar.",
              },
              {
                title: "Servicio Compasivo",
                description: "Ya sea un cierre de casa alegre o una visita difícil al hospital, manejo cada situación con cuidado y profesionalismo.",
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
            ¿Listo para Trabajar Juntos?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Estoy aquí para hacer que su experiencia de notarización sea lo más fluida posible.
            Llámeme o reserve una cita en línea.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gold hover:bg-gold-light text-navy gap-2">
              <a href={BUSINESS.phoneLink}>
                <Phone className="h-5 w-5" />
                {BUSINESS.phone}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/es/booking">Reservar en Línea</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
