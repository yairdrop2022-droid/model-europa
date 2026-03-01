"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import agencies from "@/data/agencies";
import type { Agency } from "@/lib/agency";

type Filters = {
  type: string | null;
  city: string | null;
};

const GERMANY_CENTER = { lat: 51.1657, lng: 10.4515 };
const GERMANY_ZOOM = 6;

export function KarteSection() {
  const [filters, setFilters] = useState<Filters>({ type: null, city: null });
  const [isMapReady, setIsMapReady] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const types = useMemo(
    () =>
      Array.from(
        new Set(
          agencies
            .map((a) => a.type)
            .filter(Boolean),
        ),
      ).sort(),
    [],
  );

  const cities = useMemo(
    () =>
      Array.from(
        new Set(
          agencies
            .map((a) => a.ville)
            .filter(Boolean),
        ),
      ).sort(),
    [],
  );

  const filteredAgencies = useMemo(() => {
    return agencies.filter((agency) => {
      if (filters.type && agency.type !== filters.type) return false;
      if (filters.city && agency.ville !== filters.city) return false;
      return true;
    });
  }, [filters]);

  useEffect(() => {
    if (!apiKey || !mapContainerRef.current) return;

    const existingScript = document.getElementById("google-maps-script") as HTMLScriptElement | null;

    const initMap = () => {
      if (!mapContainerRef.current) return;
      const google = (window as any).google;
      if (!google) return;

      if (!mapRef.current) {
        mapRef.current = new google.maps.Map(mapContainerRef.current, {
          center: GERMANY_CENTER,
          zoom: GERMANY_ZOOM,
          gestureHandling: "greedy",
          mapTypeId: "satellite",
        });
        setIsMapReady(true);
      }
    };

    if (existingScript) {
      if ((window as any).google) {
        initMap();
      } else {
        existingScript.addEventListener("load", initMap);
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, [apiKey]);

  useEffect(() => {
    const google = (window as any).google;
    if (!google || !mapRef.current || !isMapReady) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (!infoWindowRef.current) {
      infoWindowRef.current = new google.maps.InfoWindow();
    }

    const bounds = new google.maps.LatLngBounds();

    filteredAgencies.forEach((agency: Agency) => {
      const lat = parseFloat(agency.lat);
      const lng = parseFloat(agency.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return;
      }

      const position = { lat, lng };
      const marker = new google.maps.Marker({
        position,
        map: mapRef.current,
        title: agency.nom,
      });

      const specialties = (agency.specialties ?? []).join(", ");
      const rating = agency.note ? Number(agency.note).toFixed(1) : null;

      const content = `
        <div style="max-width: 260px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #0f172a;">${agency.nom}</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">${agency.ville} · ${
        agency.type
      }</div>
          ${
            rating
              ? `<div style="font-size: 12px; color: #166534; background-color: #ecfdf3; display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 999px; margin-bottom: 4px;">★ ${rating}</div>`
              : ""
          }
          ${
            specialties
              ? `<div style="font-size: 11px; color: #475569; margin-bottom: 6px;">${specialties}</div>`
              : ""
          }
          <a href="/bewerben" style="display: inline-flex; align-items: center; justify-content: center; padding: 6px 12px; border-radius: 999px; background-color: #020617; color: white; font-size: 11px; font-weight: 600; text-decoration: none;">Bewerben</a>
        </div>
      `;

      marker.addListener("click", () => {
        infoWindowRef.current.setContent(content);
        infoWindowRef.current.open({
          anchor: marker,
          map: mapRef.current,
        });
      });

      markersRef.current.push(marker);
      bounds.extend(position);
    });

    if (filteredAgencies.length > 0) {
      mapRef.current.fitBounds(bounds);
    } else {
      mapRef.current.setCenter(GERMANY_CENTER);
      mapRef.current.setZoom(GERMANY_ZOOM);
    }
  }, [filteredAgencies, isMapReady]);

  if (!apiKey) {
    return (
      <div className="bg-cream py-10">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="mb-2 font-serif text-2xl font-semibold text-slate-900">Karte</h1>
          <p className="text-sm text-slate-700">
            Die Google Maps API ist nicht konfiguriert. Bitte setzen Sie die Variable
            <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-[11px]">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
            in Ihrer Umgebung.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-serif text-xl font-semibold text-slate-900">Agenturen auf der Karte</h1>
          <span className="text-[11px] text-slate-500">
            {filteredAgencies.length} von {agencies.length} Agenturen
          </span>
        </div>

        <div className="mb-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-card">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                Typ
              </label>
              <select
                value={filters.type ?? ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    type: e.target.value || null,
                  }))
                }
                className="w-full rounded-full border border-slate-200 px-3 py-1.5 text-[11px] outline-none focus:border-navy"
              >
                <option value="">Alle Typen</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-700">
                Stadt
              </label>
              <select
                value={filters.city ?? ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    city: e.target.value || null,
                  }))
                }
                className="w-full rounded-full border border-slate-200 px-3 py-1.5 text-[11px] outline-none focus:border-navy"
              >
                <option value="">Alle Städte</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFilters({ type: null, city: null })}
            className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
          >
            Filter zurücksetzen
          </button>
        </div>

        <div className="h-[520px] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-card">
          <div ref={mapContainerRef} className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

