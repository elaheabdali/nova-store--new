import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { StyledComponentsRegistry } from '@/shared/StyledComponentsRegistry';
import { ThemeContextProvider } from '@/context/theme-context';
import { CartHydrator } from '@/shared/CartHydrator';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nova-store.example';
  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'NOVA',
      type: 'website',
      locale,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { fa: '/fa', en: '/en' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = locale === 'fa' ? 'rtl' : 'ltr';
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
            <ThemeContextProvider>
              <CartHydrator />
              {children}
            </ThemeContextProvider>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
