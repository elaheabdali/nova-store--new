import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CartPageClient } from '@/components/CartPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('cart');
  return { title: `${t('title')} | NOVA`, robots: { index: false, follow: true } };
}

export default function CartPage() {
  return <CartPageClient />;
}
