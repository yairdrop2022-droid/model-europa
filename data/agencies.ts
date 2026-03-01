import rawAgencies from '../agences_enrichies.json';
import agenciesWithLogos from '../agencies_with_b64_images.json';
import { Agency, slugify } from '@/lib/agency';

type RawAgency = Omit<Agency, 'slug' | 'logo_b64'> & {
  description?: string;
};

type LogoEntry = {
  nom: string;
  logo_b64?: string | null;
};

const logos = agenciesWithLogos as LogoEntry[];

function findLogoFor(name: string): string | null {
  const targetSlug = slugify(name);
  const match = logos.find((entry) => slugify(entry.nom) === targetSlug);
  return match?.logo_b64 ?? null;
}

const agencies: Agency[] = (rawAgencies as RawAgency[]).map((item) => ({
  ...item,
  slug: slugify(item.nom),
  logo_b64: findLogoFor(item.nom),
}));

export default agencies;

