import type { MetadataRoute } from 'next';
import agencies from '@/data/agencies';

const BASE_URL = 'https://agenturfinder.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/karte`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/quiz`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/bewerben`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/impressum`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/datenschutz`, lastModified: now, changeFrequency: 'daily', priority: 1 },
  ];

  const agencyPages: MetadataRoute.Sitemap = agencies.map((agency) => ({
    url: `${BASE_URL}/agentur/${agency.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...agencyPages];
}

