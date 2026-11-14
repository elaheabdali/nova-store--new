import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { productRequests } from '@/requests/productRequests';
import { ProductDetailClient } from '@/components/ProductDetailClient';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: 'productDetails' });
  const product = await productRequests.getById(id).catch(() => null);

  if (!product) {
    return { title: `${t('notFoundTitle')} | NOVA` };
  }

  return {
    title: `${product.title} | NOVA`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
    alternates: {
      canonical: `/${locale}/products/${id}`,
      languages: {
        fa: `/fa/products/${id}`,
        en: `/en/products/${id}`,
      },
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const product = await productRequests.getById(id).catch(() => null);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
