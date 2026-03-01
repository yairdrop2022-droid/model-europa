"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Agency } from "@/lib/agency";

export type AgencyFilters = {
  types: string[];
  specialties: string[];
  city: string | null;
  query: string | null;
};

type Props = {
  agencies: Agency[];
};

type Collapsible = "type" | "spec" | "city";

export function FilterSidebar({ agencies }: Props) {
  const [open, setOpen] = useState<Record<Collapsible, boolean>>({
    type: true,
    spec: false,
    city: false,
  });
  const [filters, setFilters] = useState<AgencyFilters>({
    types: ["Modelagentur"],
    specialties: [],
    city: null,
    query: null,
  });
  const [citySearch, setCitySearch] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const event = new CustomEvent("agentur:filter", { detail: filters });
    window.dispatchEvent(event);

    if (!hasInteracted) return;

    const params = new URLSearchParams();
    if (filters.types.length > 0) {
      params.set("type", filters.types[0]);
    }
    if (filters.city) {
      params.set("city", filters.city);
    }
    const search = params.toString();
    router.push(`/karte${search ? `?${search}` : ""}`);
  }, [filters, hasInteracted, router]);

  const toggle = (section: Collapsible) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayFilter = (key: "types" | "specialties", value: string) => {
    setHasInteracted(true);
    setFilters((prev) => {
      const current = prev[key];
      const exists = current.includes(value);
      const next = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const setCityFilter = (value: string | null) => {
    setHasInteracted(true);
    setFilters((prev) => ({ ...prev, city: value }));
  };

  const typeCounts = countBy(agencies, (a) => a.type);
  const specCounts = countByMany(agencies, (a) => a.specialties ?? []);
  const cityCounts = countBy(agencies, (a) => a.ville);

  const filteredCities = Object.entries(cityCounts)
    .filter(([city]) =>
      citySearch.trim() ? city.toLowerCase().includes(citySearch.toLowerCase()) : true,
    )
    .sort((a, b) => b[1] - a[1]);

  return (
    <aside className="w-full sm:w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-sm font-semibold text-slate-900">
          Filter
        </h2>
        <button
          type="button"
          onClick={() =>
            setFilters({ types: ["Modelagentur"], specialties: [], city: null, query: null })
          }
          className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
        >
          Zurücksetzen
        </button>
      </div>

      {/* Type */}
      <section className="border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => toggle("type")}
          className="flex w-full items-center justify-between text-xs font-semibold text-slate-800"
        >
          <span>AGENTURTYP</span>
          <span className="text-xs">{open.type ? "▾" : "▸"}</span>
        </button>
        {open.type && (
          <div className="mt-2 space-y-1">
            {[
              "Modelagentur",
              "Talent Agentur",
              "Casting Agentur",
              "Hostess Agentur",
              "Promotion Agentur",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between gap-2 text-[10px] text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-navy focus:ring-navy"
                    checked={filters.types.includes(label)}
                    onChange={() => toggleArrayFilter("types", label)}
                  />
                  <span>{label}</span>
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                  {typeCounts[label] ?? 0}
                </span>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* Specialties */}
      <section className="border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => toggle("spec")}
          className="flex w-full items-center justify-between text-xs font-semibold text-slate-800"
        >
          <span>SPEZIALISIERUNG</span>
          <span className="text-xs">{open.spec ? "▾" : "▸"}</span>
        </button>
        {open.spec && (
          <div className="mt-2 grid grid-cols-1 gap-1">
            {[
              "Fashion",
              "Commercial",
              "Events",
              "Acting",
              "Fitness",
              "Kids",
              "Plus Size",
              "Swimwear",
            ].map((label) => (
              <label
                key={label}
                className="flex items-center justify-between gap-2 text-[10px] text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-navy focus:ring-navy"
                    checked={filters.specialties.includes(label)}
                    onChange={() => toggleArrayFilter("specialties", label)}
                  />
                  <span>{label}</span>
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                  {specCounts[label] ?? 0}
                </span>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* City */}
      <section className="border-t border-slate-100 pt-3">
        <button
          type="button"
          onClick={() => toggle("city")}
          className="flex w-full items-center justify-between text-xs font-semibold text-slate-800"
        >
          <span>STADT / REGION</span>
          <span className="text-xs">{open.city ? "▾" : "▸"}</span>
        </button>
        {open.city && (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Stadt suchen..."
              className="w-full rounded-full border border-slate-200 px-3 py-1.5 text-[11px] outline-none placeholder:text-slate-400 focus:border-navy"
            />
            <div className="max-h-48 space-y-1 overflow-y-auto pr-1 text-[11px]">
              {filteredCities.map(([city, count]) => (
                <label
                  key={city}
                  className="flex items-center justify-between gap-2 text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="city-filter"
                      className="h-3.5 w-3.5 border-slate-300 text-navy focus:ring-navy"
                      checked={filters.city === city}
                      onChange={() =>
                        setCityFilter(filters.city === city ? null : city)
                      }
                    />
                    <span>{city}</span>
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                    {count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </section>

    </aside>
  );
}

function countBy<T>(items: T[], fn: (item: T) => string | null | undefined) {
  const out: Record<string, number> = {};
  for (const item of items) {
    const key = fn(item);
    if (!key) continue;
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}

function countByMany<T>(items: T[], fn: (item: T) => string[]) {
  const out: Record<string, number> = {};
  for (const item of items) {
    const keys = fn(item);
    for (const key of keys) {
      out[key] = (out[key] ?? 0) + 1;
    }
  }
  return out;
}

