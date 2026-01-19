// Canonical list of Bay Area cities served with coordinates for map markers

export interface City {
  name: string;
  slug: string;
  region: string;
  lat: number;
  lng: number;
  // Fallback distance in miles from SF (used if API fails)
  approxMilesFromBase: number;
}

// Base location for the notary (Downtown San Francisco)
export const BASE_LOCATION = {
  name: "San Francisco",
  lat: 37.7749,
  lng: -122.4194,
};

// Travel fee configuration
export const TRAVEL_FEE_CONFIG = {
  baseFee: 0, // Base fee in dollars
  perMileRate: 1.5, // Dollars per mile
  minimumTravelFee: 25, // Minimum travel fee
  maximumTravelFee: 75, // Maximum cap
  feeRangePadding: 0.15, // ±15% for range
};

// Canonical list of Bay Area cities
export const CITIES: City[] = [
  // San Francisco
  { name: "San Francisco", slug: "san-francisco", region: "San Francisco", lat: 37.7749, lng: -122.4194, approxMilesFromBase: 0 },
  
  // East Bay
  { name: "Oakland", slug: "oakland", region: "East Bay", lat: 37.8044, lng: -122.2712, approxMilesFromBase: 12 },
  { name: "Berkeley", slug: "berkeley", region: "East Bay", lat: 37.8716, lng: -122.2727, approxMilesFromBase: 14 },
  { name: "Fremont", slug: "fremont", region: "East Bay", lat: 37.5485, lng: -121.9886, approxMilesFromBase: 40 },
  { name: "Hayward", slug: "hayward", region: "East Bay", lat: 37.6688, lng: -122.0808, approxMilesFromBase: 28 },
  { name: "Concord", slug: "concord", region: "East Bay", lat: 37.9780, lng: -122.0311, approxMilesFromBase: 32 },
  { name: "Walnut Creek", slug: "walnut-creek", region: "East Bay", lat: 37.9101, lng: -122.0652, approxMilesFromBase: 28 },
  { name: "Richmond", slug: "richmond", region: "East Bay", lat: 37.9358, lng: -122.3477, approxMilesFromBase: 18 },
  { name: "Alameda", slug: "alameda", region: "East Bay", lat: 37.7652, lng: -122.2416, approxMilesFromBase: 10 },
  { name: "San Leandro", slug: "san-leandro", region: "East Bay", lat: 37.7249, lng: -122.1561, approxMilesFromBase: 18 },
  { name: "Pleasanton", slug: "pleasanton", region: "East Bay", lat: 37.6624, lng: -121.8747, approxMilesFromBase: 38 },
  { name: "Livermore", slug: "livermore", region: "East Bay", lat: 37.6819, lng: -121.7680, approxMilesFromBase: 45 },
  { name: "Union City", slug: "union-city", region: "East Bay", lat: 37.5934, lng: -122.0439, approxMilesFromBase: 32 },
  { name: "Newark", slug: "newark", region: "East Bay", lat: 37.5297, lng: -122.0402, approxMilesFromBase: 35 },
  
  // Peninsula
  { name: "Daly City", slug: "daly-city", region: "Peninsula", lat: 37.6879, lng: -122.4702, approxMilesFromBase: 8 },
  { name: "South San Francisco", slug: "south-san-francisco", region: "Peninsula", lat: 37.6547, lng: -122.4077, approxMilesFromBase: 10 },
  { name: "San Mateo", slug: "san-mateo", region: "Peninsula", lat: 37.5630, lng: -122.3255, approxMilesFromBase: 20 },
  { name: "Redwood City", slug: "redwood-city", region: "Peninsula", lat: 37.4852, lng: -122.2364, approxMilesFromBase: 28 },
  { name: "Palo Alto", slug: "palo-alto", region: "Peninsula", lat: 37.4419, lng: -122.1430, approxMilesFromBase: 35 },
  { name: "Menlo Park", slug: "menlo-park", region: "Peninsula", lat: 37.4530, lng: -122.1817, approxMilesFromBase: 32 },
  { name: "Burlingame", slug: "burlingame", region: "Peninsula", lat: 37.5841, lng: -122.3660, approxMilesFromBase: 16 },
  { name: "San Bruno", slug: "san-bruno", region: "Peninsula", lat: 37.6305, lng: -122.4111, approxMilesFromBase: 12 },
  { name: "Foster City", slug: "foster-city", region: "Peninsula", lat: 37.5585, lng: -122.2711, approxMilesFromBase: 22 },
  { name: "Mountain View", slug: "mountain-view", region: "Peninsula", lat: 37.3861, lng: -122.0839, approxMilesFromBase: 38 },
  
  // South Bay
  { name: "San Jose", slug: "san-jose", region: "South Bay", lat: 37.3382, lng: -121.8863, approxMilesFromBase: 48 },
  { name: "Santa Clara", slug: "santa-clara", region: "South Bay", lat: 37.3541, lng: -121.9552, approxMilesFromBase: 45 },
  { name: "Sunnyvale", slug: "sunnyvale", region: "South Bay", lat: 37.3688, lng: -122.0363, approxMilesFromBase: 42 },
  { name: "Cupertino", slug: "cupertino", region: "South Bay", lat: 37.3230, lng: -122.0322, approxMilesFromBase: 45 },
  { name: "Milpitas", slug: "milpitas", region: "South Bay", lat: 37.4323, lng: -121.8996, approxMilesFromBase: 42 },
  { name: "Campbell", slug: "campbell", region: "South Bay", lat: 37.2872, lng: -121.9500, approxMilesFromBase: 50 },
  
  // North Bay
  { name: "Sausalito", slug: "sausalito", region: "North Bay", lat: 37.8591, lng: -122.4853, approxMilesFromBase: 8 },
  { name: "Mill Valley", slug: "mill-valley", region: "North Bay", lat: 37.9060, lng: -122.5450, approxMilesFromBase: 12 },
  { name: "San Rafael", slug: "san-rafael", region: "North Bay", lat: 37.9735, lng: -122.5311, approxMilesFromBase: 18 },
  { name: "Novato", slug: "novato", region: "North Bay", lat: 38.1074, lng: -122.5697, approxMilesFromBase: 32 },
];

// Group cities by region
export const CITIES_BY_REGION = CITIES.reduce((acc, city) => {
  if (!acc[city.region]) {
    acc[city.region] = [];
  }
  acc[city.region].push(city);
  return acc;
}, {} as Record<string, City[]>);

// Find city by slug
export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

// Calculate fee from miles
export function calculateTravelFee(miles: number): {
  lowEstimate: number;
  highEstimate: number;
  baseFee: number;
} {
  const { baseFee, perMileRate, minimumTravelFee, maximumTravelFee, feeRangePadding } = TRAVEL_FEE_CONFIG;
  
  let calculatedFee = baseFee + miles * perMileRate;
  
  // Apply minimum
  calculatedFee = Math.max(calculatedFee, minimumTravelFee);
  
  // Apply maximum cap
  calculatedFee = Math.min(calculatedFee, maximumTravelFee);
  
  // Calculate range
  const lowEstimate = Math.round(calculatedFee * (1 - feeRangePadding));
  const highEstimate = Math.round(calculatedFee * (1 + feeRangePadding));
  
  return {
    lowEstimate: Math.max(lowEstimate, minimumTravelFee),
    highEstimate: Math.min(highEstimate, maximumTravelFee),
    baseFee: minimumTravelFee,
  };
}

// Calculate approximate distance using Haversine formula (fallback)
export function calculateHaversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Multiply by 1.3 to approximate driving distance vs straight line
  return R * c * 1.3;
}
