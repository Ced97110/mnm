import { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";
import { getAllServicePageSlugs } from "@/lib/service-page-content";
import { getAllBlogPosts } from "@/lib/blog-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mobile-notary-management.com";

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Service area pages (all 33 cities)
  const serviceAreaPages = CITIES.map((city) => ({
    url: `${baseUrl}/mobile-notary-${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Services index
  const servicesIndex = {
    url: `${baseUrl}/services`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  // Service detail pages
  const servicePages = getAllServicePageSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Blog index
  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  // Blog posts
  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...mainPages,
    servicesIndex,
    ...servicePages,
    ...serviceAreaPages,
    blogIndex,
    ...blogPosts,
  ];
}
