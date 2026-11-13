'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { appThemes } from './themes';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = window.localStorage.getItem(
      'nova_store_theme',
    ) as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('nova_store_theme', newMode);
      return newMode;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={appThemes[mode]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => useContext(ThemeContext);
