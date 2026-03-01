export type Agency = {
  nom: string;
  ville: string;
  type: string;
  adresse: string;
  lat: string;
  lng: string;
  telephone: string;
  site: string;
  note?: string;
  nb_avis?: string;
  specialties?: string[];
  description?: string;
  slug: string;
  logo_b64?: string | null;
};

export type CityStats = {
  ville: string;
  averageRating: number;
  count: number;
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function computeCityStats(agencies: Agency[]): CityStats[] {
  const byCity = new Map<string, { totalRating: number; count: number }>();

  for (const agency of agencies) {
    const city = agency.ville || 'Unbekannt';
    const rating = agency.note ? Number(agency.note) || 0 : 0;
    const current = byCity.get(city) ?? { totalRating: 0, count: 0 };
    current.totalRating += rating;
    current.count += 1;
    byCity.set(city, current);
  }

  return Array.from(byCity.entries())
    .map(([ville, { totalRating, count }]) => ({
      ville,
      count,
      averageRating: count ? totalRating / count : 0,
    }))
    .sort((a, b) => b.count - a.count || b.averageRating - a.averageRating);
}

export function getAgencyBySlug(agencies: Agency[], slug: string): Agency | undefined {
  return agencies.find((a) => a.slug === slug);
}

