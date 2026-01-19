import { NextRequest, NextResponse } from "next/server";
import {
  getCityBySlug,
  calculateTravelFee,
  calculateHaversineDistance,
  BASE_LOCATION,
  CITIES,
} from "@/lib/cities";

export const runtime = "edge";

// Cache responses for 1 hour
const CACHE_MAX_AGE = 3600;

interface TravelFeeResponse {
  success: boolean;
  city?: {
    name: string;
    slug: string;
    region: string;
  };
  distance?: {
    miles: number;
    minutes?: number;
    source: "api" | "fallback";
  };
  fee?: {
    lowEstimate: number;
    highEstimate: number;
    currency: string;
  };
  error?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Validate input
  if (!slug && (!lat || !lng)) {
    return NextResponse.json<TravelFeeResponse>(
      { success: false, error: "Please provide a city slug or coordinates" },
      { status: 400 }
    );
  }

  let targetLat: number;
  let targetLng: number;
  let cityInfo: { name: string; slug: string; region: string } | undefined;

  if (slug) {
    // Look up city by slug
    const city = getCityBySlug(slug);
    if (!city) {
      // Check if it's a partial match
      const partialMatch = CITIES.find(
        (c) =>
          c.name.toLowerCase().includes(slug.toLowerCase()) ||
          c.slug.includes(slug.toLowerCase())
      );

      if (partialMatch) {
        targetLat = partialMatch.lat;
        targetLng = partialMatch.lng;
        cityInfo = {
          name: partialMatch.name,
          slug: partialMatch.slug,
          region: partialMatch.region,
        };
      } else {
        return NextResponse.json<TravelFeeResponse>(
          {
            success: false,
            error:
              "City not found in my service area. Contact me—service may be available.",
          },
          { status: 404 }
        );
      }
    } else {
      targetLat = city.lat;
      targetLng = city.lng;
      cityInfo = { name: city.name, slug: city.slug, region: city.region };
    }
  } else {
    // Use provided coordinates
    targetLat = parseFloat(lat!);
    targetLng = parseFloat(lng!);

    // Find nearest city
    let nearestCity = CITIES[0];
    let nearestDistance = Infinity;

    for (const city of CITIES) {
      const dist = calculateHaversineDistance(
        targetLat,
        targetLng,
        city.lat,
        city.lng
      );
      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestCity = city;
      }
    }

    cityInfo = {
      name: nearestCity.name,
      slug: nearestCity.slug,
      region: nearestCity.region,
    };
  }

  // Calculate distance using Haversine (fallback method)
  // In production, you would call Mapbox/Google Directions API here
  const miles = calculateHaversineDistance(
    BASE_LOCATION.lat,
    BASE_LOCATION.lng,
    targetLat,
    targetLng
  );

  // Try to get actual driving distance from Mapbox (if API key is available)
  let distanceSource: "api" | "fallback" = "fallback";
  let actualMiles = miles;
  let drivingMinutes: number | undefined;

  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
  if (mapboxToken) {
    try {
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${BASE_LOCATION.lng},${BASE_LOCATION.lat};${targetLng},${targetLat}?access_token=${mapboxToken}`;

      const response = await fetch(directionsUrl, {
        next: { revalidate: CACHE_MAX_AGE },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          actualMiles = route.distance * 0.000621371; // Convert meters to miles
          drivingMinutes = Math.round(route.duration / 60);
          distanceSource = "api";
        }
      }
    } catch {
      // Fall back to Haversine calculation
      console.log("Mapbox API failed, using fallback calculation");
    }
  }

  // Calculate fee
  const fee = calculateTravelFee(actualMiles);

  const responseData: TravelFeeResponse = {
    success: true,
    city: cityInfo,
    distance: {
      miles: Math.round(actualMiles),
      minutes: drivingMinutes,
      source: distanceSource,
    },
    fee: {
      lowEstimate: fee.lowEstimate,
      highEstimate: fee.highEstimate,
      currency: "USD",
    },
  };

  return NextResponse.json(responseData, {
    headers: {
      "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate`,
    },
  });
}
