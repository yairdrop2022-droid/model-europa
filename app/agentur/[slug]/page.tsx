import type { Metadata } from 'next';
import agencies from '@/data/agencies';
import { getAgencyBySlug } from '@/lib/agency';
import { BlurredBlock } from '@/components/agencies/BlurredBlock';
import { AgencyMap } from '@/components/agencies/AgencyMap';
import Link from 'next/link';

export const runtime = 'edge';

type Params = { slug: string };

export async function generateStaticParams() {
  return agencies.map((agency) => ({ slug: agency.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const agency = getAgencyBySlug(agencies, params.slug);
  if (!agency) {
    return {
      title: 'Agentur nicht gefunden',
    };
  }
  const title = `${agency.nom} – ${agency.type} in ${agency.ville}`;
  const ratingPart = agency.note && agency.nb_avis
    ? ` Bewertung: ${agency.note}/5 (${agency.nb_avis} Bewertungen).`
    : '';
  const specialtiesPart = agency.specialties?.length
    ? ` Spezialitäten: ${agency.specialties.join(', ')}.`
    : '';
  const description = `${agency.nom} ist eine ${agency.type} in ${agency.ville}.${ratingPart}${specialtiesPart}`;
  const url = `https://model-europa.de/agentur/${agency.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
  };
}

export default function AgencyDetailPage({ params }: { params: Params }) {
  const agency = getAgencyBySlug(agencies, params.slug);

  if (!agency) {
    return (
      <div className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-serif text-2xl font-semibold text-slate-900">
            Agentur nicht gefunden
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Die angefragte Agentur existiert nicht oder wurde entfernt.
          </p>
          <Link
            href="/agencies"
            className="mt-4 inline-flex rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy/90"
          >
            Zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  const rating = agency.note ? Number(agency.note) : undefined;
  const reviews = agency.nb_avis ? Number(agency.nb_avis) : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: agency.nom,
    address: agency.adresse,
    ...(agency.telephone && { telephone: agency.telephone }),
    ...(agency.site && { url: agency.site }),
    ...(agency.note &&
      agency.nb_avis && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: agency.note,
          reviewCount: agency.nb_avis,
        },
      }),
  };

  const uberText = `${agency.nom} ist eine ${agency.type} mit Sitz in ${agency.ville}, Deutschland. Die Agentur ist spezialisiert auf ${agency.specialties?.join(', ') ?? 'verschiedene Bereiche'}. Mit einer Bewertung von ${agency.note ?? '–'}/5 basierend auf ${agency.nb_avis ?? '0'} Kundenbewertungen gehört sie zu den empfohlenen Agenturen in der Region. Interessierte Models können sich direkt über AgenturFinder bewerben.`;

  return (
    <div className="bg-cream py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-white shadow-card">
              {agency.logo_b64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`data:image/png;base64,${agency.logo_b64}`}
                  alt={agency.nom}
                  className="h-full w-full object-contain p-2.5"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
                  <span className="text-[10px] font-semibold text-slate-500">
                    Kein Logo
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {agency.type}
              </p>
              <h1 className="mt-1 font-serif text-2xl font-semibold text-slate-900">
                {agency.nom}
              </h1>
              <p className="mt-1 text-xs text-slate-600">{agency.ville}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-xs text-slate-700">
            {rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>{index < Math.round(rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="font-semibold text-slate-900">
                  {rating.toFixed(1)} / 5
                </span>
                {reviews !== undefined && (
                  <span className="text-slate-500">({reviews} Bewertungen)</span>
                )}
              </div>
            )}
            {agency.specialties && agency.specialties.length > 0 && (
              <div className="flex flex-wrap justify-end gap-1.5">
                {agency.specialties.slice(0, 5).map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            <BlurredBlock>
              <div className="space-y-2 text-sm text-slate-700">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Adresse
                  </div>
                  <div>{agency.adresse}</div>
                </div>
                {agency.telephone && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Telefon
                    </div>
                    <div>{agency.telephone}</div>
                  </div>
                )}
                {agency.site && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Website
                    </div>
                    <div className="truncate text-slate-700">{agency.site}</div>
                  </div>
                )}
              </div>
            </BlurredBlock>

            <BlurredBlock>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Agenturprofil
                </div>
                <p className="whitespace-pre-line text-sm text-slate-700">
                  {agency.description ?? 'Ausführliche Beschreibung folgt in Kürze.'}
                </p>
              </div>
            </BlurredBlock>

            <section className="space-y-2">
              <h2 className="font-serif text-base font-semibold text-slate-900">
                Über diese Agentur
              </h2>
              <p className="text-sm leading-relaxed text-slate-700">{uberText}</p>
            </section>

            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                href="/bewerben"
                className="rounded-full border border-navy px-5 py-2.5 text-xs font-semibold text-navy hover:bg-navy/5"
              >
                Direkt bei dieser Agentur bewerben
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <AgencyMap address={agency.adresse} />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex w-full max-w-xl flex-col gap-3 rounded-2xl bg-slate-900/80 px-6 py-4 text-xs text-white backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="font-semibold">Möchten Sie die Kontaktdaten dieser Agentur?</p>
              <p className="mt-1 text-[11px] text-slate-200">
                Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen alle Details kostenlos zu.
              </p>
            </div>
            <div>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-gold px-4 py-2 text-[11px] font-semibold text-slate-900 shadow-sm hover:bg-gold/90"
              >
                Kontaktdaten anfordern →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

