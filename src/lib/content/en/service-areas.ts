// Unique, helpful content for each service area page (not boilerplate)
// Each city has specific local information to satisfy SEO requirements

import { CITIES, type City, calculateTravelFee } from "../../cities";
import { BUSINESS } from "../../constants";

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

// Region-specific context for generating varied city content
const REGION_CONTEXT: Record<string, {
  description: string;
  landmarks: string[];
  transportNotes: string;
  popularServicesVariants: string[][];
  localFAQVariants: Array<{ question: string; answer: string }>[];
  aboutAreaTemplates: string[];
}> = {
  "East Bay": {
    description: "the East Bay's diverse communities",
    landmarks: ["BART stations", "local business districts", "community centers"],
    transportNotes: "I'm familiar with BART-accessible locations and East Bay traffic patterns, so I plan my routes to arrive on time.",
    popularServicesVariants: [
      [
        "Loan signings for home purchases and refinances",
        "Immigration documents and affidavits",
        "Powers of attorney and advance healthcare directives",
        "Real estate deeds and transfer documents",
        "Apostille services for documents used abroad",
      ],
      [
        "Real estate closings and escrow documents",
        "Business contracts and partnership agreements",
        "Trust and estate planning documents",
        "Hospital and care facility visits",
        "Vehicle title transfers and DMV documents",
      ],
      [
        "Mortgage refinance and HELOC signings",
        "Divorce and family law document notarization",
        "Power of attorney for aging parents",
        "Corporate resolutions and business filings",
        "International document authentication",
      ],
    ],
    localFAQVariants: [
      [
        {
          question: "Can you meet me near a BART station?",
          answer: "Yes! I frequently meet clients at coffee shops and offices near BART stations throughout the East Bay. Just let me know which station is most convenient for you.",
        },
        {
          question: "Do you serve businesses in this area?",
          answer: "Absolutely. I regularly visit offices, coworking spaces, and commercial locations throughout the East Bay. I can meet you at your workplace at a time that fits your schedule.",
        },
        {
          question: "What if I need notarization after work hours?",
          answer: "I'm available until 9 PM on weekdays and 8 PM on weekends. After-hours appointments (after 6 PM) may include a small additional fee, but weekends have no surcharge.",
        },
      ],
      [
        {
          question: "Do you handle real estate documents in this area?",
          answer: "Yes, I'm an NNA-certified signing agent and handle all types of real estate documents including purchase agreements, refinance packages, deeds, and title transfers.",
        },
        {
          question: "Can you visit care facilities in the East Bay?",
          answer: "I regularly visit hospitals, nursing homes, and assisted living facilities throughout the East Bay. I handle these situations with patience and discretion.",
        },
        {
          question: "How do I schedule a same-day appointment?",
          answer: "Call or text me directly at (510) 393-1860. Same-day appointments are available on most days, and I can often arrive within 2-3 hours of your call.",
        },
      ],
      [
        {
          question: "Do you notarize immigration documents?",
          answer: "Yes, I regularly notarize immigration-related documents including affidavits of support, travel consent forms, and translation certifications for the East Bay's diverse international community.",
        },
        {
          question: "Can you come to my home on a weekend?",
          answer: "Absolutely! I'm available 7 days a week with no extra weekend charge. Home visits are one of my most popular services—I'll come to your door at a time that works for you.",
        },
        {
          question: "What forms of payment do you accept?",
          answer: "I accept cash, credit/debit cards, Venmo, Zelle, and PayPal. Payment is collected at the time of the appointment.",
        },
      ],
    ],
    aboutAreaTemplates: [
      "I regularly serve {city} and the surrounding East Bay communities. The area's mix of residential neighborhoods and local businesses means I handle everything from home loan signings to business contracts. Whether you're at your kitchen table or in a conference room, I'll meet you where it's most convenient.",
      "{city} is part of my regular East Bay coverage area, and I know the neighborhoods well. From residential streets to commercial districts, I provide mobile notary services that save you a trip to a notary office. Residents here often need loan signings, estate documents, and powers of attorney—I handle them all.",
      "I'm proud to serve the {city} community as part of my East Bay coverage. The area has a strong demand for notary services tied to real estate transactions, business filings, and personal legal documents. I come directly to your location so you don't have to rearrange your day.",
    ],
  },
  Peninsula: {
    description: "Peninsula communities between SF and Silicon Valley",
    landmarks: ["Caltrain stations", "tech campuses", "downtown areas"],
    transportNotes: "I know the Peninsula corridors well—including Highway 101 and El Camino Real traffic patterns—and plan my travel accordingly.",
    popularServicesVariants: [
      [
        "Loan signings for home purchases and refinances",
        "Corporate document notarization for tech companies",
        "Estate planning and trust documents",
        "Real estate transfer documents",
        "Apostille services for international use",
      ],
      [
        "Mortgage and HELOC document signings",
        "Business formation and partnership agreements",
        "Powers of attorney for family members",
        "International document authentication",
        "Hospital and care facility visits",
      ],
      [
        "Real estate closings and escrow documents",
        "Start-up and venture capital documents",
        "Healthcare directives and advance care planning",
        "Immigration affidavits and declarations",
        "Vehicle and property title transfers",
      ],
    ],
    localFAQVariants: [
      [
        {
          question: "Can you come to my office on the Peninsula?",
          answer: "Yes! I regularly visit offices throughout the Peninsula, from small businesses to corporate campuses. I can meet you in a conference room, lobby, or wherever is convenient.",
        },
        {
          question: "Are you familiar with Caltrain station meetup locations?",
          answer: "I often meet clients near Caltrain stations at coffee shops or nearby offices. If you commute by train, I can time my visit to fit your schedule.",
        },
        {
          question: "Do you handle tech company documents?",
          answer: "Absolutely. I regularly notarize corporate documents, stock option agreements, board resolutions, and other business documents for Peninsula tech companies of all sizes.",
        },
      ],
      [
        {
          question: "How soon can you arrive for a same-day appointment?",
          answer: "For Peninsula locations, I can typically arrive within 1.5-3 hours for same-day requests, depending on traffic and my current schedule. Call or text for immediate availability.",
        },
        {
          question: "Do you notarize real estate documents?",
          answer: "Yes, I'm an NNA-certified signing agent. I handle refinances, purchases, HELOCs, and all real estate transfer documents. Title companies and escrow officers trust me for accurate, timely signings.",
        },
        {
          question: "Can you come on weekends?",
          answer: "I'm available Saturday and Sunday with no additional weekend surcharge. Weekend appointments are popular for families handling estate planning or personal documents.",
        },
      ],
      [
        {
          question: "Do you serve hospitals and care facilities on the Peninsula?",
          answer: "Yes, I visit hospitals, nursing homes, and assisted living facilities throughout the Peninsula. I handle these sensitive situations with care and can accommodate urgent requests.",
        },
        {
          question: "What's the parking situation for appointments?",
          answer: "I handle my own parking—it's included in the travel fee. You don't need to worry about arranging a spot for me, whether you're at home, in an office building, or at a medical facility.",
        },
        {
          question: "Can you notarize documents in languages other than English?",
          answer: "I can notarize documents in any language as long as you understand what you're signing. If needed, you may want to have a translator present. The notarization itself and my journal entry are in English, as required by California law.",
        },
      ],
    ],
    aboutAreaTemplates: [
      "{city} sits along the Peninsula corridor, and I serve residents and businesses here regularly. The area's combination of tech companies, established neighborhoods, and commuter-friendly locations means I handle a wide range of notary needs. I'll come to your home or office—no need to fight Peninsula traffic to find a notary.",
      "I cover {city} as part of my Peninsula service area. The local community has strong demand for real estate signings, business documents, and estate planning—all services I provide at your location. My familiarity with the area means I plan my routes efficiently and arrive on time.",
      "Serving {city} and nearby Peninsula communities is an important part of my coverage area. Whether you need a quick signature notarized or a full loan signing package handled, I bring the same professional service to your door. Many of my Peninsula clients appreciate not having to take time off work to visit a notary office.",
    ],
  },
  "South Bay": {
    description: "South Bay and Silicon Valley communities",
    landmarks: ["tech campuses", "shopping centers", "VTA light rail"],
    transportNotes: "I navigate South Bay traffic daily and know the best routes through the area, so I arrive when I say I will.",
    popularServicesVariants: [
      [
        "Loan signings for Silicon Valley homebuyers",
        "Corporate and startup document notarization",
        "Apostille services for international tech workers",
        "Estate planning and trust documents",
        "Hospital visits at local medical centers",
      ],
      [
        "Real estate purchase and refinance signings",
        "Immigration documents and visa affidavits",
        "Business formation and operating agreements",
        "Powers of attorney and healthcare directives",
        "International document authentication",
      ],
      [
        "HELOC and reverse mortgage signings",
        "Divorce and family law documents",
        "Intellectual property and patent assignments",
        "Vehicle title transfers and DMV paperwork",
        "Care facility visits throughout Santa Clara County",
      ],
    ],
    localFAQVariants: [
      [
        {
          question: "Can you visit tech company offices in this area?",
          answer: "Yes! I regularly visit corporate campuses and tech offices throughout the South Bay. I can handle notarizations in your office, a conference room, or even a campus cafeteria.",
        },
        {
          question: "Do you handle apostille services for international workers?",
          answer: "Absolutely. The South Bay's large international community means I frequently handle apostille requests for employment documents, diplomas, and personal records needed abroad.",
        },
        {
          question: "What's the travel fee for South Bay locations?",
          answer: "Travel fees for South Bay cities are based on distance from my base and are always quoted upfront before you book. There are no hidden charges.",
        },
      ],
      [
        {
          question: "How quickly can you come for an urgent signing?",
          answer: "For South Bay locations, I can typically arrive within 2-3 hours for same-day requests. For truly urgent matters—hospital visits or time-sensitive legal documents—call me directly and I'll prioritize your appointment.",
        },
        {
          question: "Do you notarize documents on weekends?",
          answer: "Yes, I'm available 7 days a week with no extra weekend charge. Weekend appointments are very popular with South Bay families who prefer not to take time off work.",
        },
        {
          question: "Can you come to my home in the evening?",
          answer: "I offer appointments until 9 PM on weekdays. Evening appointments after 6 PM may include a small after-hours fee, which I'll quote before booking.",
        },
      ],
      [
        {
          question: "Do you serve Santa Clara County hospitals?",
          answer: "Yes, I visit hospitals and medical facilities throughout Santa Clara County. I handle these visits with compassion and work around visiting hours and medical schedules.",
        },
        {
          question: "Can you notarize immigration documents?",
          answer: "I regularly notarize immigration-related documents including affidavits, sponsorship letters, and certified translations for the South Bay's diverse international community.",
        },
        {
          question: "What ID do I need for notarization?",
          answer: "You'll need a valid, unexpired government-issued photo ID such as a driver's license, passport, or state ID. The document must be current—expired IDs cannot be accepted under California law.",
        },
      ],
    ],
    aboutAreaTemplates: [
      "I proudly serve {city} and the greater South Bay area. Silicon Valley's fast-paced environment means people here value convenience—and that's exactly what a mobile notary provides. I come to your home, office, or any location so you can get documents notarized without disrupting your day.",
      "{city} is part of my regular South Bay coverage, and I've built strong relationships with residents and businesses in the area. From real estate transactions to corporate documents and international authentication, I handle the full range of notary services at your location.",
      "Serving {city} means understanding the local community's needs. Many clients here are busy professionals, families managing estate planning, or international workers needing document authentication. I bring efficient, reliable notary service to wherever you are in the South Bay.",
    ],
  },
  "North Bay": {
    description: "North Bay communities across the Golden Gate",
    landmarks: ["downtown districts", "waterfront areas", "local shopping villages"],
    transportNotes: "I cross the Golden Gate Bridge regularly for North Bay appointments and factor bridge traffic into my timing so I arrive promptly.",
    popularServicesVariants: [
      [
        "Real estate document notarization",
        "Estate planning and trust documents",
        "Powers of attorney for family members",
        "Business contracts and agreements",
        "Apostille services for international use",
      ],
      [
        "Loan signings for home purchases and refinances",
        "Healthcare directives and living wills",
        "Property transfer documents",
        "Immigration affidavits and declarations",
        "Care facility visits in Marin County",
      ],
      [
        "Mortgage refinance and HELOC signings",
        "Divorce and family law documents",
        "Small business and nonprofit filings",
        "Vehicle and boat title transfers",
        "Hospital notary services",
      ],
    ],
    localFAQVariants: [
      [
        {
          question: "Do you cross the Golden Gate Bridge for appointments?",
          answer: "Yes! I serve the entire North Bay and cross the bridge regularly. Bridge toll is included in my travel fee—no extra charge to you.",
        },
        {
          question: "How quickly can you get to the North Bay?",
          answer: "Travel time depends on bridge traffic, but I typically arrive within 1.5-3 hours for same-day requests. I monitor traffic conditions and plan accordingly.",
        },
        {
          question: "Do you serve Marin County care facilities?",
          answer: "Yes, I visit hospitals, nursing homes, and assisted living facilities throughout Marin County. I handle these visits with care and can accommodate urgent requests.",
        },
      ],
      [
        {
          question: "Is there an extra fee for North Bay locations?",
          answer: "Travel fees are based on distance and are quoted upfront. North Bay locations include a travel fee that reflects the drive from my base, but there are no hidden surcharges.",
        },
        {
          question: "Can you meet me at my home on a weekend?",
          answer: "Absolutely! Weekend home visits are popular with North Bay clients. I'm available Saturday and Sunday with no extra weekend charge.",
        },
        {
          question: "Do you handle real estate signings in this area?",
          answer: "Yes, I'm an NNA-certified signing agent and regularly handle real estate transactions in the North Bay. Title companies and buyers trust me for accurate, timely signings.",
        },
      ],
      [
        {
          question: "Can you come to my office in downtown?",
          answer: "Of course! I visit offices, coworking spaces, and commercial locations throughout the North Bay. I can meet you wherever is most convenient.",
        },
        {
          question: "What about evening appointments in the North Bay?",
          answer: "I offer appointments until 9 PM on weekdays. For North Bay evenings, I recommend booking a bit earlier to allow for bridge traffic. After-hours fees may apply after 6 PM.",
        },
        {
          question: "Do you notarize boat or vehicle documents?",
          answer: "Yes! I notarize vehicle title transfers, boat titles, and related DMV documents. This is especially common in waterfront North Bay communities.",
        },
      ],
    ],
    aboutAreaTemplates: [
      "I regularly cross the Golden Gate Bridge to serve {city} and the North Bay community. The area's residential character and scenic setting mean many clients prefer the convenience of a mobile notary over driving to find one. I bring professional service to your doorstep.",
      "{city} is part of my North Bay coverage, and I value the relationships I've built with clients in the area. From estate planning for longtime residents to loan signings for new homebuyers, I handle the full spectrum of notary needs right at your location.",
      "Serving {city} and the greater North Bay is an important part of my practice. Many clients here appreciate working with a notary who comes to them—especially for time-sensitive documents or situations where leaving home isn't convenient. I provide the same professional service you'd get at any office, delivered to your door.",
    ],
  },
  "San Francisco": {
    description: "San Francisco neighborhoods",
    landmarks: ["BART and Muni stations", "neighborhood commercial corridors", "downtown offices"],
    transportNotes: "San Francisco is my home base, so I know every neighborhood and can navigate even the trickiest parking situations.",
    popularServicesVariants: [
      [
        "Real estate closings for condo and home purchases",
        "Trust and estate documents",
        "Business formation and startup documents",
        "Powers of attorney for elderly parents",
        "Hospital visits at UCSF, Kaiser, and local facilities",
      ],
    ],
    localFAQVariants: [
      [
        {
          question: "Do you charge for parking in San Francisco?",
          answer: "No, parking is always included in my travel fee. I handle the parking logistics so you don't have to worry about it.",
        },
        {
          question: "Can you come to my office downtown?",
          answer: "Yes! I regularly visit offices throughout downtown SF, FiDi, SoMa, and surrounding areas. I can meet you in a conference room, lobby, or wherever works best.",
        },
        {
          question: "How quickly can you arrive in SF?",
          answer: "Since San Francisco is my home base, I can often arrive within 1-2 hours for same-day requests, depending on my schedule and your neighborhood.",
        },
      ],
    ],
    aboutAreaTemplates: [
      "I proudly serve {city} and surrounding areas. Whether you need documents notarized at your home, office, or another location, I'll come to you at a time that works for your schedule.",
    ],
  },
};

// Simple hash function for deterministic variant selection
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate content for cities that don't have custom content
function generateDefaultContent(city: City): ServiceAreaContent {
  const regionCtx = REGION_CONTEXT[city.region];
  if (!regionCtx) {
    // Fallback for any unmapped region
    return generateBasicFallbackContent(city);
  }

  const hash = hashSlug(city.slug);
  const variantIndex = hash % regionCtx.popularServicesVariants.length;
  const faqVariantIndex = hash % regionCtx.localFAQVariants.length;
  const aboutVariantIndex = hash % regionCtx.aboutAreaTemplates.length;

  // Calculate travel fee based on distance
  const fee = calculateTravelFee(city.approxMilesFromBase);
  const arrivalTime = city.approxMilesFromBase <= 15
    ? "1-2 hours"
    : city.approxMilesFromBase <= 35
    ? "2-3 hours"
    : "2-4 hours";

  const aboutArea = regionCtx.aboutAreaTemplates[aboutVariantIndex].replace(
    /\{city\}/g,
    city.name
  );

  // Inject city name into FAQ answers
  const localFAQs = regionCtx.localFAQVariants[faqVariantIndex].map((faq) => ({
    question: faq.question.includes("{city}")
      ? faq.question.replace(/\{city\}/g, city.name)
      : faq.question,
    answer: faq.answer.includes("{city}")
      ? faq.answer.replace(/\{city\}/g, city.name)
      : faq.answer,
  }));

  return {
    slug: city.slug,
    name: city.name,
    region: city.region,
    metaTitle: `Mobile Notary ${city.name} | Same-Day Service | ${BUSINESS.name}`,
    metaDescription: `Mobile notary services in ${city.name}, CA. I come to your location 7 days a week—you work directly with me. Same-day appointments, loan signings, and more. Call now!`,
    heroTitle: `Mobile Notary Services in ${city.name}`,
    heroSubtitle: `Professional mobile notary services throughout ${city.name} and the ${city.region}. I come to you—at home, work, or anywhere you need.`,
    aboutArea,
    travelInfo: `For ${city.name} appointments, travel fees are $${fee.lowEstimate}-${fee.highEstimate} based on your exact location. ${regionCtx.transportNotes} Same-day service is available on most days, and I can usually arrive within ${arrivalTime}.`,
    popularServices: regionCtx.popularServicesVariants[variantIndex],
    localFAQs,
  };
}

// Bare fallback for regions not in REGION_CONTEXT (shouldn't happen, but safe)
function generateBasicFallbackContent(city: City): ServiceAreaContent {
  const fee = calculateTravelFee(city.approxMilesFromBase);
  return {
    slug: city.slug,
    name: city.name,
    region: city.region,
    metaTitle: `Mobile Notary ${city.name} | Same-Day Service | ${BUSINESS.name}`,
    metaDescription: `Mobile notary services in ${city.name}, CA. I come to your location 7 days a week—you work directly with me. Same-day appointments, loan signings, and more. Call now!`,
    heroTitle: `Mobile Notary Services in ${city.name}`,
    heroSubtitle: `Professional mobile notary services throughout ${city.name} and the ${city.region}. I come to you—at home, work, or anywhere you need.`,
    aboutArea: `I proudly serve ${city.name} and surrounding areas in the ${city.region}. Whether you need documents notarized at your home, office, or another location, I'll come to you at a time that works for your schedule.`,
    travelInfo: `For ${city.name} appointments, travel fees are $${fee.lowEstimate}-${fee.highEstimate}. Same-day service is available on most days, and I can often arrive within 2-3 hours.`,
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
        answer: `Travel fees for ${city.name} are $${fee.lowEstimate}-${fee.highEstimate}. I always quote the total cost upfront before booking so there are no surprises.`,
      },
      {
        question: `Do you offer weekend service in ${city.name}?`,
        answer: `Yes! I'm available 7 days a week including weekends with no extra charge. Same-day weekend appointments are often available.`,
      },
    ],
  };
}

// Export content and type
export const SERVICE_AREA_CONTENT = serviceAreaContent;
export type { ServiceAreaContent };

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
