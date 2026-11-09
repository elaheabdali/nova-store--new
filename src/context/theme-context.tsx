'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { appThemes } from './themes';

type ThemeMode = 'light' | 'dark';
interface ThemeContextValue { mode: ThemeMode; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  useEffect(() => {
    const stored = window.localStorage.getItem('nova-store-theme');
    if (stored === 'dark' || stored === 'light') setMode(stored);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem('nova-store-theme', mode);
  }, [mode]);
  const value = useMemo(() => ({ mode, toggleTheme: () => setMode((current) => current === 'light' ? 'dark' : 'light') }), [mode]);
  return <ThemeContext.Provider value={value}><StyledThemeProvider theme={appThemes[mode]}>{children}</StyledThemeProvider></ThemeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used inside ThemeContextProvider');
  return context;
}
