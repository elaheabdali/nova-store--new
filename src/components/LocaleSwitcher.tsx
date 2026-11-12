'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Languages } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import styled from 'styled-components';

const Switch = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 11px;
  font-size: 12px;
  font-weight: 700;
  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    padding: 0;
    justify-content: center;
    font-size: 0;
  }
`;
export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === 'fa' ? 'en' : 'fa';
  return (
    <Switch
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
    >
      <Languages size={15} />
      {t('language')}
    </Switch>
  );
}
