// Spanish translations of constants - Auto-generated
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
    weekdays: "7:00 AM - 9:00 PM",
    weekends: "8:00 AM - 8:00 PM",
    display: "7 días a la semana • De madrugada a última hora de la noche",
  },
  social: {
    yelp: "https://www.yelp.com/biz/mobile-notary-management-hercules-12",
    google: "https://g.page/mobile-notary-management",
    googleReview: "https://share.google/oyAsFNHkycJxCdxIY", // Direct Google review link
    signingAgent: "https://www.signingagent.com/profile/160835769",
  },
  yearsInBusiness: 5,
  notarizationsCompleted: "15,000+",
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
    name: "Notario Móvil",
    shortDesc: "Voy a donde usted esté en el Área de la Bahía",
    description: "Notarización conveniente en su hogar, oficina, hospital o cualquier ubicación. Estoy disponible 7 días a la semana con citas el mismo día.",
    icon: "car",
    price: "$15/firma",
  },
  {
    id: "loan-signing",
    slug: "loan-signing",
    name: "Agente de Firma de Préstamos",
    shortDesc: "Certificado para todos los documentos hipotecarios",
    description: "Agente de firma certificado por NNA para refinanciamientos, compras, HELOCs e hipotecas inversas. Ofrezco servicio rápido para compañías de títulos.",
    icon: "home",
    price: "$15/firma",
  },
  {
    id: "apostille",
    slug: "apostille",
    name: "Servicios de Apostilla",
    shortDesc: "Autenticación para documentos internacionales",
    description: "Manejo el proceso de apostilla del Secretario de Estado de California para documentos que se usan en el extranjero. Actas de nacimiento, diplomas y documentos legales.",
    icon: "globe",
    price: "Llame para información",
  },
  {
    id: "hospital",
    slug: "hospital-notary",
    name: "Hospital y Centro de Cuidado",
    shortDesc: "Situaciones sensibles manejadas con cuidado",
    description: "Notarización discreta y compasiva en hospitales, hogares de ancianos e instalaciones de vida asistida. Ofrezco programación prioritaria cuando sea necesario.",
    icon: "heart",
    price: "$15/firma",
  },
] as const;

// Pricing information - California state guidelines
export const PRICING = {
  notaryServices: {
    perSignature: 15,
    description: "Según las pautas del estado de California",
  },
  additionalFees: {
    travel: "Gastos de viaje (según la distancia)",
    afterHours: "Tarifa por servicio fuera de horario",
    sameDayPriority: "Servicio prioritario el mismo día",
    exceptional: "Circunstancias excepcionales",
  },
  apostille: {
    note: "Llame para más información",
  },
} as const;

// FAQ data
export const FAQS = [
  {
    question: "¿Qué documentos necesito traer para la notarización?",
    answer: "Necesitará una identificación con foto emitida por el gobierno válida y no vencida (licencia de conducir, pasaporte o identificación estatal). El documento a notarizar debe estar sin firmar—firmará delante de mí. Si el documento requiere testigos, puedo proporcionarlos.",
  },
  {
    question: "¿Qué tan rápido puede venir a mi ubicación?",
    answer: "Ofrezco servicio el mismo día en toda el Área de la Bahía. Dependiendo de su ubicación y mi horario, a menudo puedo llegar en 1-3 horas. Para citas planificadas, recomiendo reservar con al menos 24 horas de anticipación.",
  },
  {
    question: "¿Notariza documentos después del horario comercial regular?",
    answer: "¡Sí! Estoy disponible 7 días a la semana, desde temprano en la mañana hasta tarde en la noche. Las citas fuera de horario (después de las 6 PM) pueden tener una pequeña tarifa adicional. Las citas de fin de semana no tienen cargo extra.",
  },
  {
    question: "¿Qué formas de pago acepta?",
    answer: "Acepto efectivo, Venmo y Zelle. El pago se debe realizar al momento del servicio.",
  },
  {
    question: "¿Qué tan lejos viaja?",
    answer: "Cubro toda el Área de la Bahía de San Francisco incluyendo San Francisco, Oakland, San José y todas las ciudades circundantes. Las tarifas de viaje varían según la distancia pero siempre se cotizan por adelantado antes de reservar.",
  },
  {
    question: "¿Puede notarizar documentos en un hospital o hogar de ancianos?",
    answer: "Absolutamente. Visito regularmente hospitales, hogares de ancianos e instalaciones de vida asistida. Manejo estas situaciones con discreción y compasión, y a menudo puedo acomodar solicitudes urgentes.",
  },
  {
    question: "¿Qué pasa si necesito un testigo para mi documento?",
    answer: "Puedo proporcionar testigos para documentos que los requieran, como testamentos o poderes notariales. Por favor llámeme para discutir los requisitos de testigos para su documento específico.",
  },
  {
    question: "¿Es usted un agente certificado de firma de préstamos?",
    answer: "Sí, soy un agente de firma certificado por NNA con amplia experiencia manejando todo tipo de documentos hipotecarios incluyendo refinanciamientos, compras, HELOCs e hipotecas inversas.",
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "San Francisco",
    rating: 5,
    text: "Necesitaba un notario para los documentos de mi mamá en el hospital un domingo por la noche. Vinieron en 2 horas y manejaron todo con tanta compasión. ¡Salvavidas!",
    service: "Visita a Hospital",
  },
  {
    id: 2,
    name: "David L.",
    location: "Oakland",
    rating: 5,
    text: "Como compañía de títulos, hemos usado Mobile Notary Management para docenas de firmas de préstamos. Siempre profesional, siempre a tiempo, nunca tuvimos un solo problema con los documentos.",
    service: "Firma de Préstamo",
  },
  {
    id: 3,
    name: "Jennifer K.",
    location: "San Jose",
    rating: 5,
    text: "¡Súper conveniente! Vinieron a mi oficina durante el almuerzo, notarizaron mi poder notarial en 10 minutos. Precios justos sin sorpresas.",
    service: "Notario Móvil",
  },
  {
    id: 4,
    name: "Michael R.",
    location: "Berkeley",
    rating: 5,
    text: "Necesitaba una apostilla para mi título para trabajar en el extranjero. Explicaron todo el proceso, manejaron todo y lo terminaron en 3 días. ¡Muy recomendado!",
    service: "Apostilla",
  },
  {
    id: 5,
    name: "Patricia W.",
    location: "Fremont",
    rating: 5,
    text: "Llamé a las 7 PM necesitando documentos urgentes notarizados. Llegaron a las 8:30 PM y fueron increíblemente profesionales. La tarifa fuera de horario valió totalmente la pena.",
    service: "Fuera de Horario",
  },
] as const;
