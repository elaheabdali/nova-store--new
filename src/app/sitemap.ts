import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nova-store.example';
  const now = new Date();
  return ['fa', 'en'].map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
    alternates: { languages: { fa: `${baseUrl}/fa`, en: `${baseUrl}/en` } },
  }));
}
