"use client";

import { useEffect, useState } from "react";

type Step =
  | "who"
  | "category"
  | "urgency"
  | "city"
  | "loading"
  | "contact";

type Answers = {
  who?: string;
  category?: string;
  urgency?: string;
  city?: string;
};

const FORM_ENDPOINT = "https://formspree.io/f/xpqjeanl";

const buttonBase =
  "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-navy";

const primary =
  "border-navy bg-navy text-white hover:bg-navy/90 hover:border-navy/90";
const secondary =
  "border-slate-200 bg-white text-slate-800 hover:border-navy/40 hover:bg-slate-50";

export function QuizClient() {
  const [step, setStep] = useState<Step>("who");
  const [answers, setAnswers] = useState<Answers>({});
  const [otherCity, setOtherCity] = useState("");
  const [showOtherCityInput, setShowOtherCityInput] = useState(false);

  const go = (next: Step) => setStep(next);

  const pick = (key: keyof Answers, value: string, next: Step) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep(next);
  };

  useEffect(() => {
    if (step === "loading") {
      const id = setTimeout(() => setStep("contact"), 2000);
      return () => clearTimeout(id);
    }
  }, [step]);

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-card">
      {step === "who" && (
        <StepWrapper title="Für wen suchst du eine Agentur?">
          <div className="space-y-3">
            <button
              type="button"
              className={`${buttonBase} ${primary}`}
              onClick={() => pick("who", "Ich selbst", "category")}
            >
              Ich selbst
            </button>
            <button
              type="button"
              className={`${buttonBase} ${secondary}`}
              onClick={() => pick("who", "Für ein Unternehmen", "category")}
            >
              Für ein Unternehmen
            </button>
            <button
              type="button"
              className={`${buttonBase} ${secondary}`}
              onClick={() => pick("who", "Für ein Event", "category")}
            >
              Für ein Event
            </button>
            <button
              type="button"
              className={`${buttonBase} ${secondary}`}
              onClick={() => pick("who", "Sonstiges", "category")}
            >
              Sonstiges
            </button>
          </div>
        </StepWrapper>
      )}

      {step === "category" && (
        <StepWrapper title="In welcher Kategorie?">
          <div className="space-y-3">
            {[
              "Fashion",
              "Commercial",
              "Fitness",
              "Kids",
              "Plus Size",
              "Events",
              "Acting",
            ].map((label) => (
              <button
                key={label}
                type="button"
                className={`${buttonBase} ${
                  label === "Fashion" ? primary : secondary
                }`}
                onClick={() => pick("category", label, "urgency")}
              >
                {label}
              </button>
            ))}
          </div>
        </StepWrapper>
      )}

      {step === "urgency" && (
        <StepWrapper title="Wie dringend ist deine Anfrage?">
          <div className="space-y-3">
            {[
              "Sofort",
              "Innerhalb 30 Tage",
              "Innerhalb 60 Tage",
              "Keine Eile",
            ].map((label) => (
              <button
                key={label}
                type="button"
                className={`${buttonBase} ${
                  label === "Sofort" ? primary : secondary
                }`}
                onClick={() => pick("urgency", label, "city")}
              >
                {label}
              </button>
            ))}
          </div>
        </StepWrapper>
      )}

      {step === "city" && !showOtherCityInput && (
        <StepWrapper title="In welcher Stadt?">
          <div className="grid gap-3 sm:grid-cols-2">
            {["Berlin", "München", "Hamburg", "Frankfurt"].map((city) => (
              <button
                key={city}
                type="button"
                className={`${buttonBase} ${
                  city === "Berlin" ? primary : secondary
                }`}
                onClick={() => pick("city", city, "loading")}
              >
                {city}
              </button>
            ))}
            <button
              type="button"
              className={`${buttonBase} ${secondary} sm:col-span-2`}
              onClick={() => setShowOtherCityInput(true)}
            >
              Andere
            </button>
          </div>
        </StepWrapper>
      )}

      {step === "city" && showOtherCityInput && (
        <StepWrapper title="Name Ihrer Stadt">
          <div className="space-y-3">
            <input
              type="text"
              value={otherCity}
              onChange={(e) => setOtherCity(e.target.value)}
              placeholder="Stadt eingeben..."
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
            />
            <button
              type="button"
              className={`${buttonBase} ${primary}`}
              onClick={() => {
                pick("city", otherCity.trim() || "Andere", "loading");
                setShowOtherCityInput(false);
                setOtherCity("");
              }}
            >
              Weiter →
            </button>
          </div>
        </StepWrapper>
      )}

      {step === "loading" && (
        <StepWrapper title="Wir stellen deine Liste zusammen...">
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-20 rounded-2xl bg-gradient-to-br from-navy/90 via-navy/70 to-gold/70" />
            <div className="h-20 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-700 to-gold/70" />
            <div className="h-20 rounded-2xl bg-gradient-to-br from-gold/80 via-gold/60 to-navy/70" />
          </div>
          <p className="mt-4 text-xs text-slate-600">
            Wir gleichen deine Antworten mit passenden Agenturen ab. Einen
            Moment noch…
          </p>
        </StepWrapper>
      )}

      {step === "contact" && (
        <StepWrapper title="Fast geschafft – wohin dürfen wir die Ergebnisse schicken?">
          <form
            action={FORM_ENDPOINT}
            method="POST"
            className="mt-2 space-y-3 text-sm"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Vorname
                </label>
                <input
                  name="vorname"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Nachname
                </label>
                <input
                  name="nachname"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Telefon
              </label>
              <input
                type="tel"
                name="telefon"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-navy"
              />
            </div>

            {/* Hidden fields with quiz answers */}
            <input type="hidden" name="quiz_who" value={answers.who ?? ""} />
            <input
              type="hidden"
              name="quiz_category"
              value={answers.category ?? ""}
            />
            <input
              type="hidden"
              name="quiz_urgency"
              value={answers.urgency ?? ""}
            />
            <input type="hidden" name="quiz_city" value={answers.city ?? ""} />

            <button
              type="submit"
              className="mt-3 w-full rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-navy/90"
            >
              Meine Ergebnisse anzeigen
            </button>
          </form>
        </StepWrapper>
      )}
    </div>
  );
}

function StepWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-4 text-center font-serif text-lg font-semibold text-slate-900">
        {title}
      </h2>
      {children}
    </div>
  );
}

