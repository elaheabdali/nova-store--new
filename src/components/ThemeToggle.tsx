'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeMode } from '@/context/theme-context';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const Toggle = styled.button`width:38px;height:38px;display:grid;place-items:center;border:1px solid ${({theme})=>theme.colors.border};background:${({theme})=>theme.colors.surface};color:${({theme})=>theme.colors.text};border-radius:50%;`;
export function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();
  const t = useTranslations('nav');
  return <Toggle type="button" onClick={toggleTheme} aria-label={t('theme')} title={t('theme')}>{mode === 'light' ? <Moon size={17}/> : <Sun size={17}/>}</Toggle>;
}
