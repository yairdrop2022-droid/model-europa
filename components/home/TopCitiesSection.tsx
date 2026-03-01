"use client";

import { computeCityStats } from '@/lib/agency';
import agencies from '@/data/agencies';

export function TopCitiesSection() {
  const stats = computeCityStats(agencies).slice(0, 8);

  return (
    <section className="border-t border-slate-200 bg-cream py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          MODELAGENTUREN NACH STADT
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-900">
          Top Städte für Modelagenturen
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-700">
          Entdecken Sie die wichtigsten Standorte für Modelagenturen in Deutschland – von
          Berlin über München bis Hamburg. Klicken Sie auf eine Stadt, um die passende
          Auswahl zu sehen.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((city) => (
            <button
              key={city.ville}
              type="button"
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
              onClick={() => {
                if (typeof window === 'undefined') return;
                const event = new CustomEvent('agentur:filter', {
                  detail: {
                    types: [],
                    specialties: [],
                    city: city.ville,
                    query: null,
                  },
                });
                window.dispatchEvent(event);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {city.averageRating.toFixed(1)}
                </div>
                <div>
                  <div className="font-serif text-sm font-semibold text-slate-900">
                    {city.ville}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {city.count} Agenturen
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-400">›</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
