"use client";

type Props = {
  address: string;
};

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export function AgencyMap({ address }: Props) {
  if (!apiKey) {
    return null;
  }

  const src = `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
    apiKey,
  )}&q=${encodeURIComponent(address)}`;

  return (
    <div className="blurred-block relative h-64 overflow-hidden rounded-2xl bg-slate-100">
      <div className="blurred-block-content h-full w-full">
        <iframe
          title="Agenturkarte"
          src={src}
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
      <div className="blurred-block-overlay">
        <div className="flex max-w-md items-center justify-between gap-3 rounded-xl bg-slate-900/65 px-4 py-3 text-xs text-white backdrop-blur">
          <p className="flex-1 font-semibold">
            Erhalten Sie die vollständigen Kontaktdaten per E-Mail – kostenlos und sofort.
          </p>
          <a
            href="/quiz"
            className="whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:bg-navy/90"
          >
            Kontaktdaten anfordern →
          </a>
        </div>
      </div>
    </div>
  );
}

