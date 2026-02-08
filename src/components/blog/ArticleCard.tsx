import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
  readTime: string;
  category: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  locale?: "en" | "es";
}

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    guides: "Guide",
    faq: "FAQ",
    comparisons: "Comparison",
  },
  es: {
    guides: "Guía",
    faq: "Preguntas Frecuentes",
    comparisons: "Comparación",
  },
};

const readMoreLabels: Record<string, string> = {
  en: "Read more",
  es: "Leer más",
};

export function ArticleCard({
  slug,
  title,
  excerpt,
  datePublished,
  readTime,
  category,
  heroImage,
  locale = "en",
}: ArticleCardProps) {
  const localeCode = locale === "es" ? "es-ES" : "en-US";
  const formattedDate = new Date(datePublished).toLocaleDateString(localeCode, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const blogPath = locale === "es" ? "/es/blog" : "/blog";

  return (
    <Link href={`${blogPath}/${slug}`} className="group">
      <Card className="h-full overflow-hidden border-border/50 transition-all duration-300 hover:shadow-warm hover:border-gold/30">
        {/* Hero Image on Top */}
        {heroImage && (
          <div className="relative w-full aspect-[2/1] bg-muted overflow-hidden">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className="bg-gold/10 text-navy border-gold/20 text-xs"
            >
              {categoryLabels[locale][category] || category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>
          <h3 className="text-lg font-semibold leading-snug group-hover:text-gold transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formattedDate}
            </span>
            <span className="inline-flex items-center text-sm font-medium text-gold gap-1">
              {readMoreLabels[locale]} <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
