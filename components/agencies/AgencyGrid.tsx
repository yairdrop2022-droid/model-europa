"use client";

import { useEffect, useMemo, useState } from "react";
import type { Agency } from "@/lib/agency";
import { AgencyCard } from "./AgencyCard";
import type { AgencyFilters } from "./FilterSidebar";

type Props = {
  agencies: Agency[];
  initialQuery?: string | null;
};

export function AgencyGrid({ agencies, initialQuery = null }: Props) {
  const [filters, setFilters] = useState<AgencyFilters>({
    types: ["Modelagentur"],
    specialties: [],
    city: null,
    query: initialQuery,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event: Event) => {
      const custom = event as CustomEvent<AgencyFilters>;
      setFilters(custom.detail);
    };
    window.addEventListener("agentur:filter", handler);
    return () => {
      window.removeEventListener("agentur:filter", handler);
    };
  }, []);

  const filtered = useMemo(() => {
    return agencies
      .filter((agency) => {
        if (filters.types.length > 0 && !filters.types.includes(agency.type)) {
          return false;
        }
        if (filters.specialties.length > 0) {
          const specs = agency.specialties ?? [];
          if (!filters.specialties.some((s) => specs.includes(s))) {
            return false;
          }
        }
        if (filters.city && agency.ville !== filters.city) {
          return false;
        }
        if (filters.query) {
          const q = filters.query.toLowerCase();
          const haystack =
            `${agency.nom} ${agency.ville} ${agency.type} ${(agency.specialties ?? []).join(
              " ",
            )}`.toLowerCase();
          if (!haystack.includes(q)) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        const ra = a.note ? Number(a.note) : 0;
        const rb = b.note ? Number(b.note) : 0;
        return rb - ra;
      });
  }, [agencies, filters]);

  return (
    <section className="flex-1">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg font-semibold text-slate-900">
            Modelagenturen in Deutschland
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            {filtered.length} Agenturen mit Profil · {agencies.length} insgesamt
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <span>Sortierung:</span>
          <select
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] outline-none focus:border-navy"
            defaultValue="rating"
          >
            <option value="rating">Beste Bewertung</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((agency) => (
          <AgencyCard key={agency.slug} agency={agency} />
        ))}
      </div>
    </section>
  );
}

