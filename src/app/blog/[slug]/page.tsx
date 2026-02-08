import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleBody, InlineCTA, BlogHeroImage } from "@/components/blog";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  getBlogPost,
  getAllBlogPosts,
} from "@/lib/get-content";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { SERVICES } from "@/lib/constants";
import { getCityBySlug } from "@/lib/cities";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Page Not Found" };
  }

  const ogImage = post.heroImage
    ? `https://mobile-notary-management.com${post.heroImage.src}`
    : "https://mobile-notary-management.com/favicon.png";

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://mobile-notary-management.com/blog/${slug}`,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.heroImage?.alt || post.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://mobile-notary-management.com/blog/${slug}`,
    },
  };
}

const categoryLabels: Record<string, string> = {
  guides: "Guide",
  faq: "FAQ",
  comparisons: "Comparison",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    metaDescription: post.metaDescription,
    slug: post.slug,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://mobile-notary-management.com" },
    { name: "Blog", url: "https://mobile-notary-management.com/blog" },
    {
      name: post.title,
      url: `https://mobile-notary-management.com/blog/${slug}`,
    },
  ]);

  const formattedDate = new Date(post.datePublished).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Get related content
  const relatedServices = SERVICES.filter((s) =>
    post.relatedServiceSlugs.includes(s.slug)
  );
  const relatedCities = post.relatedCitySlugs
    .map((s) => getCityBySlug(s))
    .filter(Boolean);
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts.filter((p) =>
    post.relatedPostSlugs.includes(p.slug)
  );

  // Insert InlineCTA after roughly the middle section
  const midIndex = Math.floor(post.sections.length / 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
            <Link href="/blog" className="hover:text-navy transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-navy font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className="bg-gold/10 text-navy border-gold/20"
            >
              {categoryLabels[post.category] || post.category}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </span>
          </div>

          {/* Hero Image */}
          {post.heroImage && (
            <div className="mt-8">
              <BlogHeroImage
                src={post.heroImage.src}
                alt={post.heroImage.alt}
              />
              {post.heroImage.credit && (
                <p className="mt-2 text-xs text-muted-foreground text-right">
                  Photo credit:{" "}
                  {post.heroImage.creditUrl ? (
                    <a
                      href={post.heroImage.creditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold transition-colors"
                    >
                      {post.heroImage.credit}
                    </a>
                  ) : (
                    post.heroImage.credit
                  )}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          {/* First half of sections */}
          <ArticleBody sections={post.sections.slice(0, midIndex)} />

          {/* Mid-article CTA */}
          <InlineCTA />

          {/* Second half of sections */}
          <ArticleBody sections={post.sections.slice(midIndex)} />

          {/* Sources Section */}
          {post.sources && post.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-gold" />
                Sources & References
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                All information in this article has been verified against official government sources and authoritative references:
              </p>
              <ul className="space-y-3">
                {post.sources.map((source, idx) => (
                  <li key={idx} className="text-sm">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy hover:text-gold transition-colors group flex items-start gap-2"
                    >
                      <ExternalLink className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground group-hover:text-gold" />
                      <div>
                        <div className="font-medium">{source.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {source.organization}
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Related Content */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Related Resources
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-navy">
                  Related Services
                </h3>
                <ul className="space-y-2">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Cities */}
            {relatedCities.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-navy">
                  Service Areas
                </h3>
                <ul className="space-y-2">
                  {relatedCities.map((city) =>
                    city ? (
                      <li key={city.slug}>
                        <Link
                          href={`/mobile-notary-${city.slug}`}
                          className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                          Mobile Notary {city.name}
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-navy">
                  More Articles
                </h3>
                <ul className="space-y-2">
                  {relatedPosts.map((relPost) => (
                    <li key={relPost.slug}>
                      <Link
                        href={`/blog/${relPost.slug}`}
                        className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        {relPost.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
