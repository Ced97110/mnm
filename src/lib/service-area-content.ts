// Unique, helpful content for each service area page (not boilerplate)
// Each city has specific local information to satisfy SEO requirements

import { CITIES, type City } from "./cities";
import { BUSINESS } from "./constants";

type ServiceAreaSlug = City["slug"];

interface ServiceAreaContent {
  slug: string;
  name: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutArea: string;
  travelInfo: string;
  popularServices: string[];
  localFAQs: Array<{ question: string; answer: string }>;
}

const serviceAreaContent: Record<string, ServiceAreaContent> = {
  "san-francisco": {
    slug: "san-francisco",
    name: "San Francisco",
    region: "San Francisco",
    metaTitle: "Mobile Notary San Francisco | Same-Day Service | Mobile Notary Management",
    metaDescription:
      "Need a mobile notary in San Francisco? I come to your home, office, or hospital. Same-day appointments available. Licensed, insured, and you work directly with me.",
    heroTitle: "Mobile Notary Services in San Francisco",
    heroSubtitle:
      "From the Financial District to the Sunset, I bring professional notary services directly to you. Same-day appointments available throughout SF.",
    aboutArea:
      "San Francisco is my home base, and I know the city inside and out. Whether you're in a high-rise in SoMa, a Victorian in the Haight, or an office in the Financial District, I'll come to you. I regularly serve clients in all SF neighborhoods including the Mission, Marina, Richmond, Nob Hill, and beyond.",
    travelInfo:
      "For San Francisco appointments, travel fees range from $0-25 depending on your neighborhood. I can usually arrive within 1-2 hours for same-day requests.",
    popularServices: [
      "Real estate closings for condo purchases",
      "Trust and estate documents",
      "Business formation documents",
      "Powers of attorney for elderly parents",
      "Hospital visits at UCSF, Kaiser, and St. Mary's",
    ],
    localFAQs: [
      {
        question: "Do you charge for parking in San Francisco?",
        answer:
          "No, parking is included in my travel fee. I handle all the stress of finding parking so you don't have to worry about it.",
      },
      {
        question: "Can you come to my office in the Financial District?",
        answer:
          "Absolutely! I regularly visit offices throughout downtown SF, FiDi, and SoMa. I can meet you in a conference room or lobby—wherever is convenient.",
      },
      {
        question: "Do you serve UCSF Medical Center?",
        answer:
          "Yes, I frequently visit patients at UCSF Parnassus, UCSF Mission Bay, and all SF hospitals. I understand the sensitivity required and can accommodate visiting hours.",
      },
    ],
  },
  oakland: {
    slug: "oakland",
    name: "Oakland",
    region: "East Bay",
    metaTitle: "Mobile Notary Oakland | Same-Day Service | East Bay Coverage",
    metaDescription:
      "Oakland mobile notary services. I travel to you in Downtown, Rockridge, Temescal, Lake Merritt & all Oakland neighborhoods. NNA-certified loan signing agent.",
    heroTitle: "Mobile Notary Services in Oakland",
    heroSubtitle:
      "Serving all Oakland neighborhoods from Downtown to the Hills. Fast, professional notary services at your location.",
    aboutArea:
      "I proudly serve all of Oakland, from the bustling Downtown and Jack London Square areas to the charming neighborhoods of Rockridge, Temescal, and Piedmont Avenue. Whether you're closing on a home in the Oakland Hills or need documents notarized at your Lake Merritt office, I've got you covered.",
    travelInfo:
      "Oakland appointments typically have a $25-40 travel fee depending on your location. Same-day service is available, and I can often arrive within 2 hours.",
    popularServices: [
      "Loan signings for home purchases and refinances",
      "Real estate documents for property sales",
      "Business contracts and agreements",
      "Immigration documents and affidavits",
      "Care facility visits throughout Alameda County",
    ],
    localFAQs: [
      {
        question: "Do you serve the Oakland Hills area?",
        answer:
          "Yes! I regularly visit clients in the Oakland Hills, Montclair, and Piedmont. The travel fee may be slightly higher due to distance, but I'll quote you upfront.",
      },
      {
        question: "Can you meet me at my office in Downtown Oakland?",
        answer:
          "Of course! I frequently meet clients at offices throughout Downtown Oakland, including near City Center and Lake Merritt BART stations.",
      },
      {
        question: "Do you cover West Oakland and Emeryville?",
        answer:
          "Absolutely. I serve all of Oakland including West Oakland, Emeryville, and the entire East Bay. No area is too far.",
      },
    ],
  },
  "san-jose": {
    slug: "san-jose",
    name: "San Jose",
    region: "South Bay",
    metaTitle: "Mobile Notary San Jose | South Bay Notary Services",
    metaDescription:
      "San Jose mobile notary services. Serving Downtown SJ, Willow Glen, Almaden, and all South Bay. Loan signing agent, apostille services, 7 days a week.",
    heroTitle: "Mobile Notary Services in San Jose",
    heroSubtitle:
      "The South Bay's trusted mobile notary. From Downtown to Almaden Valley, I bring professional notary services to your door.",
    aboutArea:
      "As the largest city in the Bay Area, San Jose has diverse notary needs—and I'm here to meet them all. I serve clients throughout San Jose including Downtown, Willow Glen, Rose Garden, Almaden Valley, Evergreen, and the tech campuses scattered across the city.",
    travelInfo:
      "San Jose travel fees range from $35-50 depending on your location within the city. I offer same-day service and can typically arrive within 2-3 hours.",
    popularServices: [
      "Loan signings for Silicon Valley homebuyers",
      "Corporate document notarization for tech companies",
      "Apostille services for international workers",
      "Estate planning documents",
      "Hospital visits at Regional Medical Center and Good Samaritan",
    ],
    localFAQs: [
      {
        question: "Do you offer services in the Willow Glen area?",
        answer:
          "Yes, Willow Glen is one of my most frequently served neighborhoods. I love the area and know it well.",
      },
      {
        question: "Can you come to tech company offices in San Jose?",
        answer:
          "Absolutely! I regularly visit corporate campuses throughout San Jose and the greater Silicon Valley. I can meet you in your office, a conference room, or lobby.",
      },
      {
        question: "What about Almaden Valley and South San Jose?",
        answer:
          "I cover all of San Jose including Almaden Valley, Blossom Valley, and South San Jose. Travel fees for these areas are quoted upfront.",
      },
    ],
  },
  berkeley: {
    slug: "berkeley",
    name: "Berkeley",
    region: "East Bay",
    metaTitle: "Mobile Notary Berkeley | UC Berkeley Area Coverage",
    metaDescription:
      "Berkeley mobile notary services. Serving Downtown Berkeley, UC Berkeley, Elmwood, and North Berkeley. Fast, professional, same-day appointments.",
    heroTitle: "Mobile Notary Services in Berkeley",
    heroSubtitle:
      "Serving the Berkeley community from the UC campus to the hills. Convenient notary services at your location.",
    aboutArea:
      "Berkeley's unique mix of academic, residential, and commercial areas means diverse notary needs. I serve UC Berkeley students and faculty, downtown businesses, and residents in neighborhoods like Elmwood, North Berkeley, and the Berkeley Hills.",
    travelInfo:
      "Berkeley appointments have a $25-35 travel fee. I'm familiar with campus logistics and can meet you at convenient locations. Same-day service usually available.",
    popularServices: [
      "Student visa and immigration documents",
      "Academic credential authentication",
      "Real estate transactions",
      "Powers of attorney and healthcare directives",
      "Research grant and contract documents",
    ],
    localFAQs: [
      {
        question: "Can you come to UC Berkeley campus?",
        answer:
          "Yes! I regularly meet students, faculty, and staff on campus. I can meet you at a coffee shop, library, or any convenient campus location.",
      },
      {
        question: "Do you handle student immigration documents?",
        answer:
          "Absolutely. I'm experienced with the specific notarization needs of international students, including affidavits and document authentication.",
      },
      {
        question: "What about the Berkeley Hills?",
        answer:
          "I serve the Berkeley Hills and all surrounding areas. The travel fee may be slightly higher, but I'll quote you exactly before booking.",
      },
    ],
  },
  fremont: {
    slug: "fremont",
    name: "Fremont",
    region: "East Bay",
    metaTitle: "Mobile Notary Fremont | Tri-City Area Coverage",
    metaDescription:
      "Fremont mobile notary services. Covering Fremont, Newark, and Union City. Same-day appointments, loan signing agent, apostille services.",
    heroTitle: "Mobile Notary Services in Fremont",
    heroSubtitle:
      "Serving Fremont and the Tri-City area. Professional notary services at your home, office, or any location.",
    aboutArea:
      "Fremont and the Tri-City area (including Newark and Union City) have a thriving community with diverse notary needs. I regularly serve the tech workers, families, and businesses throughout Fremont's many neighborhoods including Niles, Mission San Jose, and Warm Springs.",
    travelInfo:
      "Fremont travel fees are typically $35-45. I cover all of Fremont, Newark, and Union City with same-day availability on most days.",
    popularServices: [
      "Loan signings for home purchases",
      "Immigration documents and affidavits",
      "Business and corporate documents",
      "Estate planning and powers of attorney",
      "Apostille services for international use",
    ],
    localFAQs: [
      {
        question: "Do you cover Newark and Union City too?",
        answer:
          "Yes! I serve the entire Tri-City area including Fremont, Newark, and Union City, as well as nearby Milpitas.",
      },
      {
        question: "Can you come to my office near Tesla or other Fremont businesses?",
        answer:
          "Absolutely. I regularly serve businesses throughout Fremont's industrial and commercial areas. Conference room or parking lot—I'm flexible.",
      },
      {
        question: "What about weekend availability in Fremont?",
        answer:
          "I'm available 7 days a week with no extra charge for weekends. Same-day Saturday and Sunday appointments are often available.",
      },
    ],
  },
};

// Generate content for cities that don't have custom content
function generateDefaultContent(city: City): ServiceAreaContent {
  return {
    slug: city.slug,
    name: city.name,
    region: city.region,
    metaTitle: `Mobile Notary ${city.name} | Same-Day Service | ${BUSINESS.name}`,
    metaDescription: `Mobile notary services in ${city.name}, CA. I come to your location 7 days a week—you work directly with me. Same-day appointments, loan signings, and more. Call now!`,
    heroTitle: `Mobile Notary Services in ${city.name}`,
    heroSubtitle: `Professional mobile notary services throughout ${city.name} and the ${city.region}. I come to you—at home, work, or anywhere you need.`,
    aboutArea: `I proudly serve ${city.name} and surrounding areas in the ${city.region}. Whether you need documents notarized at your home, office, or another location, I'll come to you at a time that works for your schedule.`,
    travelInfo: `Travel fees for ${city.name} are quoted upfront based on your specific location. Same-day service is available on most days, and I can often arrive within 2-3 hours.`,
    popularServices: [
      "Mobile notary services at your location",
      "Loan signing and mortgage documents",
      "Powers of attorney and healthcare directives",
      "Real estate documents and deeds",
      "Apostille services for international documents",
    ],
    localFAQs: [
      {
        question: `How quickly can you get to ${city.name}?`,
        answer: `I offer same-day service to ${city.name} and can typically arrive within 2-3 hours depending on my schedule and traffic conditions.`,
      },
      {
        question: `What is the travel fee for ${city.name}?`,
        answer: `Travel fees vary based on your exact location in ${city.name}. I always quote the total cost upfront before booking so there are no surprises.`,
      },
      {
        question: `Do you offer weekend service in ${city.name}?`,
        answer: `Yes! I'm available 7 days a week including weekends with no extra charge. Same-day weekend appointments are often available.`,
      },
    ],
  };
}

export function getServiceAreaContent(slug: string): ServiceAreaContent | null {
  // Check for custom content first
  if (slug in serviceAreaContent) {
    return serviceAreaContent[slug];
  }

  // Find the city in CITIES and generate default content
  const city = CITIES.find((c) => c.slug === slug);
  if (city) {
    return generateDefaultContent(city);
  }

  return null;
}

export function getAllServiceAreaSlugs(): string[] {
  return CITIES.map((city) => city.slug);
}
