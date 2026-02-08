"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/blog";
import { getAllBlogPosts } from "@/lib/content/es/blog";

const categories = [
  { value: "all", label: "Todos los Artículos" },
  { value: "guides", label: "Guías" },
  { value: "comparisons", label: "Comparaciones" },
  { value: "faq", label: "Preguntas Frecuentes" },
];

export default function SpanishBlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const allPosts = getAllBlogPosts();

  const filteredPosts =
    activeCategory === "all"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

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
            <span className="text-navy font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-gold/10 text-navy border-gold/20"
          >
            Recursos de Notario
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Guías y Recursos de Notario
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Guías útiles sobre notarización, firmas de préstamos, servicios de apostilla
            y más. Escritas por un notario activo en el Área de la Bahía.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.value
                    ? "bg-navy text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-gold/20 hover:text-navy"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <ArticleCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                datePublished={post.datePublished}
                readTime={`${post.readTime} min de lectura`}
                category={post.category}
                heroImage={post.heroImage}
                locale="es"
              />
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No se encontraron artículos en esta categoría.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
