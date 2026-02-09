// Business Information - Single source of truth for NAP consistency
export const BUSINESS = {
  name: "Mobile Notary Management",
  phone: "(510) 393-1860",
  phoneLink: "tel:+15103931860",
  textLink: "sms:+15103931860",
  email: "eliasgnotary@gmail.com",
  address: {
    street: "San Francisco Bay Area",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "US",
  },
  hours: {
    weekdays: "4:00 AM - 9:00 PM",
    weekends: "6:00 AM - 8:00 PM",
    display: "7 Days a Week • Early Morning to Late Evening",
  },
  social: {
    yelp: "https://www.yelp.com/biz/mobile-notary-management-hercules-12",
    google: "https://g.page/mobile-notary-management",
    googleReview: "https://www.google.com/search?q=mobile+notary+management&oq=mobile+&pf=cs&sourceid=chrome&ie=UTF-8&sei=R2KJaZ_fAqabwbkP15Xs-Ag&zx=1770611272459&no_sw_cr=1#lrd=0xc766d97ddd0d1a7:0x9ebc4fde799de45c,1,,,,", // Direct Google review link
    signingAgent: "https://www.signingagent.com/profile/160835769",
  },
  yearsInBusiness: 6,
  notarizationsCompleted: "5,000+",
} as const;

// Service areas with SEO-optimized slugs
export const SERVICE_AREAS = [
  { name: "San Francisco", slug: "san-francisco", region: "San Francisco" },
  { name: "Oakland", slug: "oakland", region: "East Bay" },
  { name: "San Jose", slug: "san-jose", region: "South Bay" },
  { name: "Berkeley", slug: "berkeley", region: "East Bay" },
  { name: "Fremont", slug: "fremont", region: "East Bay" },
  { name: "Palo Alto", slug: "palo-alto", region: "Peninsula" },
  { name: "Daly City", slug: "daly-city", region: "Peninsula" },
  { name: "Hayward", slug: "hayward", region: "East Bay" },
  { name: "Sunnyvale", slug: "sunnyvale", region: "South Bay" },
  { name: "Santa Clara", slug: "santa-clara", region: "South Bay" },
  { name: "Concord", slug: "concord", region: "East Bay" },
  { name: "Walnut Creek", slug: "walnut-creek", region: "East Bay" },
] as const;

// Services offered
export const SERVICES = [
  {
    id: "mobile-notary",
    slug: "mobile-notary",
    name: "Mobile Notary",
    shortDesc: "I come to you anywhere in the Bay Area",
    description: "Convenient notarization at your home, office, hospital, or any location. I'm available 7 days a week with same-day appointments.",
    icon: "car",
    price: "$15/signature",
  },
  {
    id: "loan-signing",
    slug: "loan-signing",
    name: "Loan Signing Agent",
    shortDesc: "Certified for all mortgage documents",
    description: "NNA-certified signing agent for refinances, purchases, HELOCs, and reverse mortgages. I provide fast turnaround for title companies.",
    icon: "home",
    price: "$15/signature",
  },
  {
    id: "apostille",
    slug: "apostille",
    name: "Apostille Services",
    shortDesc: "Authentication for international documents",
    description: "I handle the California Secretary of State apostille process for documents used abroad. Birth certificates, diplomas, and legal documents.",
    icon: "globe",
    price: "Call for info",
  },
  {
    id: "hospital",
    slug: "hospital-notary",
    name: "Hospital & Care Facility",
    shortDesc: "Sensitive situations handled with care",
    description: "Discreet and compassionate notarization at hospitals, nursing homes, and assisted living facilities. I offer priority scheduling when needed.",
    icon: "heart",
    price: "$15/signature",
  },
] as const;

// Pricing information - California state guidelines
export const PRICING = {
  notaryServices: {
    perSignature: 15,
    description: "Per California state guidelines",
  },
  additionalFees: {
    travel: "Travel expenses (based on distance)",
    afterHours: "After-hours service fee",
    sameDayPriority: "Same-day priority service",
    exceptional: "Exceptional circumstances",
  },
  apostille: {
    note: "Call for more information",
  },
} as const;

// FAQ data
export const FAQS = [
  {
    question: "What documents do I need to bring for notarization?",
    answer: "You'll need a valid, unexpired government-issued photo ID (driver's license, passport, or state ID). The document to be notarized should be unsigned—you'll sign in front of me. If the document requires witnesses, I can provide them.",
  },
  {
    question: "How quickly can you come to my location?",
    answer: "I offer same-day service throughout the Bay Area. Depending on your location and my schedule, I can often arrive within 1-3 hours. For planned appointments, I recommend booking at least 24 hours in advance.",
  },
  {
    question: "Do you notarize documents after regular business hours?",
    answer: "Yes! I'm available 7 days a week, from early morning to late evening. After-hours appointments (after 6 PM) may have a small additional fee. Weekend appointments have no extra charge.",
  },
  {
    question: "What forms of payment do you accept?",
    answer: "I accept cash, Venmo, and Zelle. Payment is due at the time of service.",
  },
  {
    question: "How far will you travel?",
    answer: "I cover the entire San Francisco Bay Area including San Francisco, Oakland, San Jose, and all surrounding cities. Travel fees vary by distance but are always quoted upfront before booking.",
  },
  {
    question: "Can you notarize documents at a hospital or nursing home?",
    answer: "Absolutely. I regularly visit hospitals, nursing homes, and assisted living facilities. I handle these situations with discretion and compassion, and can often accommodate urgent requests.",
  },
  {
    question: "What if I need a witness for my document?",
    answer: "I can provide witnesses for documents that require them, such as wills or powers of attorney. Please call me to discuss witness requirements for your specific document.",
  },
  {
    question: "Are you a certified loan signing agent?",
    answer: "Yes, I'm an NNA-certified signing agent with extensive experience handling all types of mortgage documents including refinances, purchases, HELOCs, and reverse mortgages.",
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "San Francisco",
    rating: 5,
    text: "Needed a notary for my mom's documents at the hospital on a Sunday evening. They came within 2 hours and handled everything with such compassion. Lifesaver!",
    service: "Hospital Visit",
  },
  {
    id: 2,
    name: "David L.",
    location: "Oakland",
    rating: 5,
    text: "As a title company, we've used Mobile Notary Management for dozens of loan signings. Always professional, always on time, never had a single issue with documents.",
    service: "Loan Signing",
  },
  {
    id: 3,
    name: "Jennifer K.",
    location: "San Jose",
    rating: 5,
    text: "Super convenient! They came to my office during lunch, notarized my power of attorney in 10 minutes. Fair pricing with no surprises.",
    service: "Mobile Notary",
  },
  {
    id: 4,
    name: "Michael R.",
    location: "Berkeley",
    rating: 5,
    text: "Needed an apostille for my degree to work abroad. They explained the whole process, handled everything, and got it done in 3 days. Highly recommend!",
    service: "Apostille",
  },
  {
    id: 5,
    name: "Patricia W.",
    location: "Fremont",
    rating: 5,
    text: "Called at 7 PM needing urgent documents notarized. They arrived by 8:30 PM and were incredibly professional. The after-hours fee was totally worth it.",
    service: "After-Hours",
  },
] as const;
