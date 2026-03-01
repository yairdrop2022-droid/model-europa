import Link from 'next/link';
import { Agency } from '@/lib/agency';
import { BlurredBlock } from './BlurredBlock';

type Props = {
  agency: Agency;
};

export function AgencyCard({ agency }: Props) {
  const rating = agency.note ? Number(agency.note) : undefined;
  const reviews = agency.nb_avis ? Number(agency.nb_avis) : undefined;
  const specialties = agency.specialties ?? [];

  const getPlaceholderImageForType = (type: string): string | null => {
    switch (type) {
      case 'Modelagentur':
        return 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80';
      case 'Talent Agentur':
        return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80';
      case 'Casting Agentur':
        return 'https://images.unsplash.com/photo-1598387993441-a364f854cfds?w=400&q=80';
      case 'Hostess Agentur':
        return 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80';
      case 'Promotion Agentur':
        return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80';
      default:
        return null;
    }
  };

  const placeholderImage = getPlaceholderImageForType(agency.type);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative h-40 w-full bg-slate-100">
        {agency.logo_b64 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`data:image/png;base64,${agency.logo_b64}`}
            alt={agency.nom}
            className="h-full w-full object-contain p-4"
          />
        ) : agency.site ? (
          <div className="flex h-full w-full items-center justify-center bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                agency.site,
              )}&sz=128`}
              alt={agency.nom}
              className="h-16 w-16 object-contain"
            />
          </div>
        ) : placeholderImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={placeholderImage} alt={agency.type} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-slate-200" />
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
          {agency.type.toUpperCase()}
        </div>

        {rating && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
            <span className="text-amber-400">★</span>
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-2 font-serif text-sm font-semibold text-slate-900">
            {agency.nom}
          </h3>
          <div className="mt-1 text-xs text-slate-600">{agency.ville}</div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-700">
          {rating && (
            <>
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>{index < Math.round(rating) ? '★' : '☆'}</span>
                ))}
              </div>
              {reviews !== undefined && (
                <span className="text-slate-500">({reviews} Bewertungen)</span>
              )}
            </>
          )}
        </div>

        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specialties.slice(0, 4).map((spec) => (
              <span
                key={spec}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        <BlurredBlock variant="compact">
          <div className="flex flex-col gap-1 text-[11px]">
            <div className="line-clamp-2 text-slate-600">{agency.adresse}</div>
            {agency.telephone && (
              <div className="text-slate-600">
                Tel.: <span>{agency.telephone}</span>
              </div>
            )}
          </div>
        </BlurredBlock>

        <div className="mt-auto flex gap-2 pt-1">
          <Link
            href={`/agentur/${agency.slug}`}
            className="flex-1 rounded-full bg-black px-3 py-2 text-center text-xs font-semibold text-white hover:bg-black/90"
          >
            Profil ansehen
          </Link>
          <Link
            href="/bewerben"
            className="flex-1 rounded-full bg-navy px-3 py-2 text-center text-xs font-semibold text-white hover:bg-navy/90"
          >
            Bewerben
          </Link>
        </div>
      </div>
    </article>
  );
}

