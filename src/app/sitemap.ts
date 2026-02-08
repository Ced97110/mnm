import { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";
import { getAllServicePageSlugs, getAllBlogPosts } from "@/lib/get-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mobile-notary-management.com";

  // Helper to create bilingual entries
  const createBilingualEntry = (path: string, options: {
    lastModified?: Date;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
  }) => {
    const englishUrl = `${baseUrl}${path}`;
    const spanishUrl = `${baseUrl}/es${path}`;

    return [
      {
        url: englishUrl,
        lastModified: options.lastModified || new Date(),
        changeFrequency: options.changeFrequency || "monthly" as const,
        priority: options.priority || 0.5,
        alternates: {
          languages: {
            'en': englishUrl,
            'es': spanishUrl,
          },
        },
      },
      {
        url: spanishUrl,
        lastModified: options.lastModified || new Date(),
        changeFrequency: options.changeFrequency || "monthly" as const,
        priority: options.priority || 0.5,
        alternates: {
          languages: {
            'en': englishUrl,
            'es': spanishUrl,
          },
        },
      },
    ];
  };

  // Main pages (bilingual)
  const mainPages = [
    ...createBilingualEntry('', { changeFrequency: "weekly", priority: 1 }),
    ...createBilingualEntry('/booking', { changeFrequency: "monthly", priority: 0.9 }),
    ...createBilingualEntry('/about', { changeFrequency: "monthly", priority: 0.7 }),
    ...createBilingualEntry('/privacy', { changeFrequency: "yearly", priority: 0.3 }),
  ];

  // Service area pages (all 33 cities, bilingual)
  const serviceAreaPages = CITIES.flatMap((city) =>
    createBilingualEntry(`/mobile-notary-${city.slug}`, {
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Services index (bilingual)
  const servicesIndex = createBilingualEntry('/services', {
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // Service detail pages (bilingual)
  const servicePages = getAllServicePageSlugs().flatMap((slug) =>
    createBilingualEntry(`/services/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  // Blog index (bilingual)
  const blogIndex = createBilingualEntry('/blog', {
    changeFrequency: "weekly",
    priority: 0.7,
  });

  // Blog posts (bilingual)
  const blogPosts = getAllBlogPosts().flatMap((post) =>
    createBilingualEntry(`/blog/${post.slug}`, {
      lastModified: new Date(post.dateModified),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [
    ...mainPages,
    ...servicesIndex,
    ...servicePages,
    ...serviceAreaPages,
    ...blogIndex,
    ...blogPosts,
  ];
}
