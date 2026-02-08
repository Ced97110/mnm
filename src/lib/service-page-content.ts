// Detailed content for dedicated service pages (/services/[slug])

import { SERVICES } from "./constants";

export interface ServicePageContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string[];
  documentsToBring: string[];
  process: Array<{ step: number; title: string; description: string }>;
  timing: { typical: string; details: string };
  pricing: { base: string; details: string; note?: string };
  faqs: Array<{ question: string; answer: string }>;
  relatedCitySlugs: string[];
}

const servicePages: Record<string, ServicePageContent> = {
  "mobile-notary": {
    slug: "mobile-notary",
    name: "Mobile Notary",
    metaTitle:
      "Mobile Notary Services Bay Area | I Come to You | Mobile Notary Management",
    metaDescription:
      "Mobile notary services throughout the San Francisco Bay Area. I travel to your home, office, or any location 7 days a week. Same-day appointments available. $15 per signature.",
    heroTitle: "Mobile Notary Services Throughout the Bay Area",
    heroSubtitle:
      "Skip the trip to a notary office. I come directly to you—at your home, office, coffee shop, or anywhere in the Bay Area. Same-day appointments available 7 days a week.",
    overview: [
      "A mobile notary brings professional notarization services directly to your location, saving you time and hassle. Instead of searching for a notary office, scheduling around their hours, and driving across town, I come to you—wherever you are in the San Francisco Bay Area.",
      "I handle all types of documents that require notarization: powers of attorney, real estate deeds, affidavits, trust documents, medical directives, business agreements, and more. As a commissioned California notary public, I verify your identity, witness your signature, and apply my official seal—all at a location and time that works for you.",
      "Whether you need a single signature notarized or a stack of documents for a real estate transaction, I provide the same professional, thorough service. Every appointment is handled by me personally—you never get handed off to a stranger.",
    ],
    documentsToBring: [
      "Valid, unexpired government-issued photo ID (driver's license, passport, or state ID)",
      "The document(s) to be notarized — do NOT sign them beforehand",
      "Any additional signers who need to be present",
      "Payment (cash, card, Venmo, Zelle, or PayPal)",
    ],
    process: [
      {
        step: 1,
        title: "Contact Me",
        description:
          "Call, text, or book online. Let me know what documents you need notarized, your location, and your preferred time. I'll confirm availability—often same day.",
      },
      {
        step: 2,
        title: "I Travel to You",
        description:
          "I drive to your chosen location anywhere in the Bay Area. I'll text when I'm on my way and arrive on time—no waiting around wondering when I'll show up.",
      },
      {
        step: 3,
        title: "Verify & Notarize",
        description:
          "I verify your identity with a valid photo ID, confirm you understand the document and are signing willingly, then witness your signature and apply my notary seal.",
      },
      {
        step: 4,
        title: "Done — You're All Set",
        description:
          "The entire process typically takes 10-15 minutes per document. I record the transaction in my notary journal as required by California law, and you're on your way.",
      },
    ],
    timing: {
      typical: "10-15 minutes per document",
      details:
        "Most notarizations take about 10-15 minutes. If you have multiple documents or a loan signing package, allow 30-60 minutes. I can usually arrive within 1-3 hours for same-day requests, depending on your location and my schedule.",
    },
    pricing: {
      base: "$15 per signature",
      details:
        "California law sets the maximum notary fee at $15 per signature. Travel fees range from $0-75 depending on your distance from San Francisco and are always quoted upfront before booking.",
      note: "After-hours appointments (after 6 PM) may include a small additional fee. Weekend appointments have no extra charge.",
    },
    faqs: [
      {
        question: "What is a mobile notary?",
        answer:
          "A mobile notary is a commissioned notary public who travels to your location to perform notarizations. Instead of you going to an office, UPS Store, or bank, I come to you—at your home, office, hospital, or any convenient location.",
      },
      {
        question: "Can you notarize any document?",
        answer:
          "I can notarize most documents that require a notary seal, including powers of attorney, deeds, affidavits, contracts, medical directives, and more. California law does have some restrictions—for example, I cannot notarize vital records like birth or death certificates, or documents where I have a personal interest. If you're unsure, call me and I'll let you know.",
      },
      {
        question: "Do I need to sign the document before you arrive?",
        answer:
          "No—do NOT sign the document before I arrive. The entire point of notarization is that I witness you signing. If you've already signed, I cannot notarize it and you may need to get a new copy of the document.",
      },
      {
        question: "Can you provide witnesses?",
        answer:
          "Yes, I can provide witnesses for documents that require them, such as wills or certain powers of attorney. Let me know when you book so I can make arrangements.",
      },
      {
        question: "What if I don't have a valid ID?",
        answer:
          "California law requires me to verify your identity before notarizing. Acceptable IDs include a valid driver's license, state ID, passport, or military ID. If your ID is expired or you don't have one, call me to discuss alternative identification methods allowed under California law.",
      },
      {
        question: "How far in advance do I need to book?",
        answer:
          "I offer same-day service on most days and can often arrive within 1-3 hours. For guaranteed time slots, I recommend booking at least 24 hours in advance. For urgent situations—hospitals, time-sensitive legal matters—call me directly and I'll do my best to accommodate.",
      },
      {
        question: "Do you work on weekends and holidays?",
        answer:
          "I'm available 7 days a week, including Saturdays and Sundays, with no extra weekend charge. For major holidays, availability may be limited—call ahead to check.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "berkeley",
      "palo-alto",
      "fremont",
    ],
  },

  "loan-signing": {
    slug: "loan-signing",
    name: "Loan Signing Agent",
    metaTitle:
      "Loan Signing Agent Bay Area | NNA Certified | Mobile Notary Management",
    metaDescription:
      "NNA-certified loan signing agent serving the San Francisco Bay Area. Refinances, purchases, HELOCs, reverse mortgages. Fast turnaround for title companies and borrowers.",
    heroTitle: "NNA-Certified Loan Signing Agent",
    heroSubtitle:
      "Professional, error-free loan signings for refinances, purchases, HELOCs, and reverse mortgages. Trusted by title companies and borrowers across the Bay Area.",
    overview: [
      "A loan signing agent is a notary public with specialized training in mortgage and real estate documents. When you buy a home, refinance, or take out a home equity loan, someone needs to guide you through the signing of your loan package and notarize the required documents. That's what I do.",
      "As an NNA-certified signing agent, I've completed extensive training on mortgage documents, closing procedures, and compliance requirements. Title companies, escrow offices, and lenders trust me to handle their loan packages accurately and professionally—and borrowers appreciate having someone who can explain what they're signing in plain English.",
      "I work directly with your title company or escrow officer to coordinate the signing. I receive the document package, review it for completeness, travel to your location at the scheduled time, guide you through each document, notarize the required pages, and return the completed package—often the same day.",
    ],
    documentsToBring: [
      "Valid, unexpired government-issued photo ID for all borrowers",
      "A second form of ID if specified by your lender",
      "Any documents your escrow officer or title company asked you to bring",
      "Payment for notary fees (unless paid by the title company)",
    ],
    process: [
      {
        step: 1,
        title: "Title Company Contacts Me",
        description:
          "Your title company, escrow officer, or lender sends me the loan document package and scheduling details. You can also contact me directly if you need a signing agent.",
      },
      {
        step: 2,
        title: "I Review the Package",
        description:
          "Before the appointment, I review the entire document package to check for missing pages, errors, or anything that might cause delays. This pre-review saves time during the signing.",
      },
      {
        step: 3,
        title: "We Meet for the Signing",
        description:
          "I travel to your home, office, or another convenient location. I'll walk you through each document, explain what you're signing (without offering legal advice), and ensure everything is signed and notarized correctly.",
      },
      {
        step: 4,
        title: "Package Returned Same Day",
        description:
          "After the signing, I ship the completed package back to the title company—typically via overnight courier the same day. I handle all the logistics so your closing stays on schedule.",
      },
    ],
    timing: {
      typical: "45-90 minutes per signing",
      details:
        "A standard refinance takes about 45 minutes. Purchase transactions and more complex signings (reverse mortgages, HELOCs) typically take 60-90 minutes. I never rush through documents—every borrower deserves time to read and ask questions.",
    },
    pricing: {
      base: "$15 per signature/notarization",
      details:
        "Notary fees are $15 per signature as set by California law. Signing agent fees (for document handling, travel, and package return) are typically paid by the title company. If you're a borrower arranging your own signing, contact me for a complete quote.",
      note: "Title companies: Contact me for volume pricing and availability.",
    },
    faqs: [
      {
        question: "What's the difference between a notary and a loan signing agent?",
        answer:
          "All loan signing agents are notaries, but not all notaries are loan signing agents. A loan signing agent has specialized training in mortgage documents and closing procedures. I'm NNA-certified, which means I've passed background checks and completed training specifically for handling loan packages.",
      },
      {
        question: "Can you explain the loan documents to me?",
        answer:
          "I can walk you through each document and explain its general purpose—for example, 'This is your Truth in Lending disclosure showing your interest rate and total cost of the loan.' However, I cannot offer legal or financial advice. If you have questions about your specific terms, I'll recommend you contact your lender or attorney.",
      },
      {
        question: "What if there's an error in my loan documents?",
        answer:
          "If I catch an error during my pre-review or during the signing, I'll contact your title company or escrow officer immediately. Many issues can be resolved quickly with a corrected document. This is one of the biggest advantages of working with an experienced signing agent—fewer errors means fewer delays.",
      },
      {
        question: "Do both spouses need to be present?",
        answer:
          "If both names are on the loan, both borrowers typically need to sign. I can coordinate schedules to find a time that works for everyone. In some cases, one spouse may be able to sign via power of attorney—check with your title company first.",
      },
      {
        question: "How quickly can you handle a signing?",
        answer:
          "I can often accommodate same-day and next-day signings. For end-of-month closings and time-sensitive transactions, I prioritize getting your documents signed and returned as quickly as possible. Contact me as soon as you know your closing date.",
      },
      {
        question: "Do you handle reverse mortgages?",
        answer:
          "Yes, I have extensive experience with reverse mortgage signings, which require additional patience and care. These signings typically take 60-90 minutes, and I ensure borrowers have plenty of time to review and understand each document.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "palo-alto",
      "walnut-creek",
      "fremont",
    ],
  },

  apostille: {
    slug: "apostille",
    name: "Apostille Services",
    metaTitle:
      "Apostille Services California | Bay Area | Mobile Notary Management",
    metaDescription:
      "California apostille services for documents used internationally. Birth certificates, diplomas, powers of attorney, and more. I handle the entire process for you.",
    heroTitle: "California Apostille Services",
    heroSubtitle:
      "Need documents authenticated for international use? I handle the entire California apostille process—from notarization to Secretary of State filing and return.",
    overview: [
      "An apostille is an official certificate that authenticates a document for use in another country. If you need to use a U.S. document abroad—for work, school, marriage, real estate, or legal matters—most countries that are part of the Hague Convention require an apostille rather than traditional consular legalization.",
      "The California Secretary of State issues apostilles for documents originating in California. The process involves getting the document notarized (if it's not already a certified government document), submitting it to the Secretary of State with the correct forms and fees, and waiting for processing. I handle all of these steps for you.",
      "Common documents that need apostilles include birth certificates, marriage certificates, diplomas and transcripts, powers of attorney, corporate documents, and court orders. Whether you need one document or a dozen, I'll guide you through the requirements and manage the entire process from start to finish.",
    ],
    documentsToBring: [
      "The original document(s) that need an apostille",
      "Valid government-issued photo ID",
      "Information about the destination country and purpose",
      "Any additional certified copies needed",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description:
          "Contact me with details about your document and destination country. I'll confirm whether your document qualifies for an apostille and explain exactly what's needed.",
      },
      {
        step: 2,
        title: "Notarization (If Required)",
        description:
          "Some documents need to be notarized before the apostille can be issued. I'll handle the notarization at your location. Certified copies of vital records (birth, marriage, death certificates) go directly to the Secretary of State without separate notarization.",
      },
      {
        step: 3,
        title: "Secretary of State Submission",
        description:
          "I prepare and submit your documents to the California Secretary of State along with the required forms and fees. I track the submission and keep you updated on its status.",
      },
      {
        step: 4,
        title: "Apostille Returned to You",
        description:
          "Once the Secretary of State processes your documents (typically 5-10 business days for standard processing), I deliver the apostilled documents back to you.",
      },
    ],
    timing: {
      typical: "5-10 business days (standard processing)",
      details:
        "Standard processing through the California Secretary of State takes about 5-10 business days. Expedited processing (2-3 business days) is available for an additional state fee. Same-day processing may be available for in-person submissions in Sacramento. Total timeline including notarization, submission, and return is typically 1-2 weeks.",
    },
    pricing: {
      base: "Call for a quote",
      details:
        "Apostille pricing depends on the number of documents, whether notarization is required, and your preferred processing speed. The California Secretary of State charges $20 per apostille. I provide a complete quote covering all fees—notarization, state fees, shipping, and my service fee—before you commit.",
      note: "Rush processing is available for time-sensitive situations.",
    },
    faqs: [
      {
        question: "What is an apostille?",
        answer:
          "An apostille is a certificate issued by the California Secretary of State that authenticates a document for use in another country. It's recognized by all countries that are members of the Hague Apostille Convention (over 120 countries). Think of it as an international stamp of approval that verifies the document is legitimate.",
      },
      {
        question: "How long does the apostille process take?",
        answer:
          "Standard processing is 5-10 business days through the Secretary of State. With expedited processing, it can be done in 2-3 business days for an additional fee. Including the time for notarization, submission, and return delivery, the total process typically takes 1-2 weeks.",
      },
      {
        question:
          "Do I need to get my document notarized before getting an apostille?",
        answer:
          "It depends on the document type. Certified copies of vital records (birth, marriage, death certificates) and documents already bearing a state official's signature can go directly to the Secretary of State. Private documents like powers of attorney, affidavits, and corporate documents typically need notarization first. I'll advise you on exactly what's needed.",
      },
      {
        question: "Can you apostille a birth certificate?",
        answer:
          "Yes! Birth certificates issued by a California county recorder can be apostilled directly by the Secretary of State. You'll need an official certified copy—not a photocopy. If you need to obtain a certified copy first, I can guide you through that process as well.",
      },
      {
        question: "What countries accept apostilles?",
        answer:
          "Over 120 countries accept apostilles under the Hague Convention, including most of Europe, Japan, South Korea, Australia, Brazil, Mexico, India, and many more. A few countries (including China, Canada, and some Middle Eastern nations) are not Hague members and require a different authentication process called embassy legalization. Contact me with your destination country and I'll confirm what's needed.",
      },
      {
        question: "Can you apostille a diploma or transcript?",
        answer:
          "Yes. University diplomas and transcripts from California institutions can be apostilled. The process typically requires the document to be notarized first, then submitted to the Secretary of State. I handle the entire process for you.",
      },
      {
        question: "What if my document is from another state?",
        answer:
          "The California Secretary of State can only apostille documents that originate in California or are notarized by a California notary. If your document is from another state, it would need to be apostilled by that state's Secretary of State. I can help with the California portion and advise on out-of-state processes.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "berkeley",
      "fremont",
      "sunnyvale",
    ],
  },

  "hospital-notary": {
    slug: "hospital-notary",
    name: "Hospital & Care Facility Notary",
    metaTitle:
      "Hospital Notary Services Bay Area | Care Facility | Mobile Notary Management",
    metaDescription:
      "Compassionate notary services at hospitals, nursing homes, and assisted living facilities in the Bay Area. Priority scheduling for urgent situations. Available 7 days a week.",
    heroTitle: "Hospital & Care Facility Notary Services",
    heroSubtitle:
      "Compassionate, discreet notarization at hospitals, nursing homes, and assisted living facilities. Priority scheduling available for urgent situations.",
    overview: [
      "When a loved one is in the hospital or a care facility, notarization needs don't wait. Powers of attorney, healthcare directives, estate documents, and other legal papers often need to be signed urgently—and the person who needs to sign them can't easily travel to a notary office.",
      "I provide mobile notary services at hospitals, nursing homes, rehabilitation centers, and assisted living facilities throughout the Bay Area. I understand the sensitivity of these situations and approach every appointment with patience, compassion, and discretion. I work around visiting hours, medical schedules, and the physical limitations of patients and residents.",
      "If you're facing an urgent situation—a parent who needs to sign a power of attorney before surgery, or estate documents that can't wait—call me directly. I offer priority scheduling and can often arrive within hours, even on evenings and weekends.",
    ],
    documentsToBring: [
      "Valid, unexpired photo ID for the signer (the patient or resident)",
      "The document(s) to be notarized — unsigned",
      "Contact information for the attorney or family member who prepared the documents",
      "Any facility-specific requirements (visitor pass, COVID protocols, etc.)",
    ],
    process: [
      {
        step: 1,
        title: "Call Me Directly",
        description:
          "For hospital and care facility visits, I recommend calling rather than booking online. This lets me understand the urgency, the signer's condition, and any facility-specific requirements so I can prepare appropriately.",
      },
      {
        step: 2,
        title: "I Coordinate with the Facility",
        description:
          "I'll work around visiting hours and any facility rules. If needed, I can coordinate with nursing staff or social workers to find the best time for the signing. I come prepared and won't take more time than necessary.",
      },
      {
        step: 3,
        title: "Patient Assessment",
        description:
          "Before notarizing, I must confirm that the signer is alert, aware, and signing voluntarily. This is a legal requirement. I assess their ability to understand the document and communicate their wishes. If I have concerns, I'll discuss them privately with the family.",
      },
      {
        step: 4,
        title: "Notarization with Care",
        description:
          "I handle the signing efficiently but never rush. I accommodate physical limitations—for example, if someone can't hold a pen, I can discuss alternatives. I maintain a calm, professional presence throughout.",
      },
    ],
    timing: {
      typical: "15-30 minutes at bedside",
      details:
        "The actual notarization takes about 15-30 minutes, but I always allow extra time for hospital and care facility visits. Travel time to the facility is additional. For urgent situations, I can often arrive within 1-3 hours of your call.",
    },
    pricing: {
      base: "$15 per signature",
      details:
        "Notary fees are $15 per signature per California law, plus a travel fee based on the facility location. Hospital and care facility visits during regular hours have no additional surcharge. After-hours visits may include a small additional fee.",
      note: "I never upcharge families in difficult situations. The price I quote is the price you pay.",
    },
    faqs: [
      {
        question:
          "Can someone in the hospital sign legal documents?",
        answer:
          "Yes, as long as the person is alert, aware of what they're signing, and signing voluntarily. I'm trained to assess a signer's capacity and will ensure all legal requirements are met. If the signer is heavily sedated or unable to communicate, we may need to wait or explore alternatives with your attorney.",
      },
      {
        question:
          "What if my family member can't physically sign their name?",
        answer:
          "California law allows alternatives if someone cannot sign their name due to physical limitations. They may be able to make a mark (such as an 'X') in the presence of witnesses, or direct someone else to sign on their behalf. Call me to discuss the specific situation—there are usually options.",
      },
      {
        question: "Do you visit patients in the ICU?",
        answer:
          "Yes, I can visit ICU patients, but it depends on the facility's policies and the patient's condition. I'll coordinate with the nursing staff to find an appropriate time. ICU visits require extra sensitivity and flexibility—I've handled many of these situations.",
      },
      {
        question: "Can you come to a nursing home or assisted living facility?",
        answer:
          "Absolutely. I regularly visit nursing homes, assisted living facilities, and memory care facilities throughout the Bay Area. I'm familiar with the requirements and pace needed for these environments.",
      },
      {
        question: "What about COVID or other infection control protocols?",
        answer:
          "I follow all facility infection control protocols. I carry hand sanitizer, can wear a mask if required, and will comply with any screening, vaccination, or testing requirements the facility has in place.",
      },
      {
        question: "How quickly can you come for an urgent hospital visit?",
        answer:
          "For urgent situations, I offer priority scheduling and can often arrive within 1-3 hours, even on evenings and weekends. Call me directly at (510) 393-1860 rather than booking online—this is the fastest way to schedule an urgent visit.",
      },
      {
        question:
          "What hospitals do you serve?",
        answer:
          "I serve all hospitals and care facilities in the San Francisco Bay Area, including UCSF, Kaiser locations, Stanford Medical Center, John Muir Health, Sutter Health facilities, Regional Medical Center, and many more. If there's a facility in the Bay Area, I can get there.",
      },
    ],
    relatedCitySlugs: [
      "san-francisco",
      "oakland",
      "san-jose",
      "berkeley",
      "walnut-creek",
      "hayward",
    ],
  },
};

export function getServicePageContent(
  slug: string
): ServicePageContent | null {
  return servicePages[slug] || null;
}

export function getAllServicePageSlugs(): string[] {
  return Object.keys(servicePages);
}

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
