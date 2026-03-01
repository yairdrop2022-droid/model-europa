"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/quiz");
  };

  return (
    <section className="border-b border-slate-200 bg-cream pb-10 pt-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl font-serif text-3xl font-semibold leading-snug text-slate-900 sm:text-4xl">
            Finden Sie die perfekte Modelagentur in Ihrer Nähe
          </h1>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-full bg-white px-4 py-2 shadow-card"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stadt oder Agenturname..."
            className="flex-1 border-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-full bg-navy px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-navy/90"
          >
            Suchen
          </button>
        </form>

        <div className="flex flex-col gap-4 rounded-card bg-sky-50 px-6 py-5 shadow-card">
          <div>
            <h2 className="font-serif text-lg font-semibold text-slate-900">
              Ihre Suche, Ihr Weg
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              Wählen Sie, wie Sie zu Ihrer passenden Modelagentur kommen möchten – flexibel, diskret
              und auf Ihre Situation zugeschnitten.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-navy/90"
              onClick={() => router.push("/quiz")}
            >
              Online Optionen ansehen
            </button>
            <button
              type="button"
              className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-navy/90"
              onClick={() => {
                window.location.href = "mailto:datenschutz.agenturfinder@proton.me";
              }}
            >
              Kontaktieren Sie uns
            </button>
            <button
              type="button"
              className="rounded-full border border-navy px-4 py-2 text-xs font-semibold text-navy hover:bg-navy/5"
              onClick={() => router.push("/quiz")}
            >
              Ich recherchiere noch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
