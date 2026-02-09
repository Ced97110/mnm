import { BUSINESS, SERVICE_AREAS, SERVICES } from "./constants";
import type { Locale } from "./i18n/config";

// Generate LocalBusiness JSON-LD schema
export function generateLocalBusinessSchema(city?: string, locale: Locale = 'en') {
  const areaServed = SERVICE_AREAS.map((area) => ({
    "@type": "City",
    name: area.name,
    containedInPlace: {
      "@type": "State",
      name: "California",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mobile-notary-management.com/#business",
    name: BUSINESS.name,
    description: "Owner-operated mobile notary serving the San Francisco Bay Area. You work directly with the notary for every appointment.",
    image: "https://mobile-notary-management.com/favicon.png",
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: "https://mobile-notary-management.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: city || BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Venmo, Zelle",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Notary Services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
    sameAs: [BUSINESS.social.yelp, BUSINESS.social.google],
  };
}

// Generate Service schema
export function generateServiceSchema(service: (typeof SERVICES)[number], locale: Locale = 'en') {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
  };
}

// Generate FAQ schema
export function generateFAQSchema(
  faqs: readonly { readonly question: string; readonly answer: string }[],
  locale: Locale = 'en'
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: Locale = 'en'
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate detailed Service schema for dedicated service pages
export function generateDetailedServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
  pricing?: { base: string };
  faqs?: Array<{ question: string; answer: string }>;
}, locale: Locale = 'en') {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    url: `https://mobile-notary-management.com/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://mobile-notary-management.com/#business",
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    serviceType: "Notary Public",
    ...(service.pricing && {
      offers: {
        "@type": "Offer",
        price: service.pricing.base,
        priceCurrency: "USD",
      },
    }),
  };
}

// Generate Article schema for blog posts
export function generateArticleSchema(article: {
  title: string;
  metaDescription: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}, locale: Locale = 'en') {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    inLanguage: locale === 'es' ? 'es-US' : 'en-US',
    description: article.metaDescription,
    url: `https://mobile-notary-management.com/blog/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: "Elias G.",
      jobTitle: "Certified Notary Public & NNA Signing Agent",
    },
    publisher: {
      "@type": "LocalBusiness",
      "@id": "https://mobile-notary-management.com/#business",
      name: BUSINESS.name,
      logo: {
        "@type": "ImageObject",
        url: "https://mobile-notary-management.com/favicon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mobile-notary-management.com/blog/${article.slug}`,
    },
  };
}
