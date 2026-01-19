"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CITIES, BASE_LOCATION, type City } from "@/lib/cities";

interface ServiceAreaMapProps {
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

export function ServiceAreaMap({ onCitySelect, selectedCity }: ServiceAreaMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      setMapError("Map configuration error");
      return;
    }

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [BASE_LOCATION.lng, BASE_LOCATION.lat],
        zoom: 9,
        attributionControl: false,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      map.current.on("load", () => {
        setIsLoaded(true);

        // Add markers for each city
        CITIES.forEach((city) => {
          const el = document.createElement("div");
          el.className = "city-marker";
          el.style.width = "12px";
          el.style.height = "12px";
          el.style.backgroundColor = "#d4a853";
          el.style.borderRadius = "50%";
          el.style.border = "2px solid #0a0a0a";
          el.style.cursor = "pointer";
          el.style.transition = "transform 0.2s, background-color 0.2s";

          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.5)";
          });
          el.addEventListener("mouseleave", () => {
            if (selectedCity?.slug !== city.slug) {
              el.style.transform = "scale(1)";
            }
          });

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([city.lng, city.lat])
            .addTo(map.current!);

          el.addEventListener("click", () => {
            onCitySelect(city);
          });

          markers.current.push(marker);
        });

        // Add base location marker (home)
        const homeEl = document.createElement("div");
        homeEl.className = "home-marker";
        homeEl.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a0a0a" stroke="#d4a853" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        `;
        homeEl.style.cursor = "pointer";

        new mapboxgl.Marker({ element: homeEl })
          .setLngLat([BASE_LOCATION.lng, BASE_LOCATION.lat])
          .addTo(map.current!);
      });

      map.current.on("error", () => {
        setMapError("Failed to load map");
      });
    } catch {
      setMapError("Failed to initialize map");
    }

    return () => {
      markers.current.forEach((m) => m.remove());
      markers.current = [];
      map.current?.remove();
      map.current = null;
    };
  }, [onCitySelect, selectedCity]);

  // Update marker styles when selection changes
  useEffect(() => {
    if (!isLoaded) return;

    markers.current.forEach((marker, index) => {
      const el = marker.getElement();
      const city = CITIES[index];
      
      if (selectedCity?.slug === city.slug) {
        el.style.transform = "scale(1.5)";
        el.style.backgroundColor = "#0a0a0a";
        el.style.borderColor = "#d4a853";
      } else {
        el.style.transform = "scale(1)";
        el.style.backgroundColor = "#d4a853";
        el.style.borderColor = "#0a0a0a";
      }
    });

    // Pan to selected city
    if (selectedCity && map.current) {
      map.current.flyTo({
        center: [selectedCity.lng, selectedCity.lat],
        zoom: 11,
        duration: 1000,
      });
    }
  }, [selectedCity, isLoaded]);

  if (mapError) {
    return (
      <div className="w-full h-[300px] md:h-[400px] rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
        <p>{mapError}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      )}
    </div>
  );
}
