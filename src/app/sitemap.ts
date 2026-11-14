import type { MetadataRoute } from 'next';
import { productRequests } from '@/requests/productRequests';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nova-store.example';
  const now = new Date();
  const locales = ['fa', 'en'] as const;

  const homeRoutes: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: { fa: `${baseUrl}/fa`, en: `${baseUrl}/en` },
    },
  }));

  try {
    const products = await productRequests.getAll();
    const productRoutes: MetadataRoute.Sitemap = products.flatMap((product) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/products/${product.id}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            fa: `${baseUrl}/fa/products/${product.id}`,
            en: `${baseUrl}/en/products/${product.id}`,
          },
        },
      })),
    );
    return [...homeRoutes, ...productRoutes];
  } catch {
    return homeRoutes;
  }
}