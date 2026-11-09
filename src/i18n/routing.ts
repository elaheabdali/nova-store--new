import { defineRouting } from 'next-intl/routing';
import { SupportedLocale } from '@/types/enums/Locale';

export const routing = defineRouting({
  locales: [SupportedLocale.Persian, SupportedLocale.English],
  defaultLocale: SupportedLocale.Persian,
  localePrefix: 'always',
});
