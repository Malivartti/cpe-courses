import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { useThemeStore } from '../store/theme.store';
import { darkColors } from './themes/dark';
import { lightColors } from './themes/ligth';

type ThemeColors = typeof lightColors;

const ThemeContext = createContext<ThemeColors | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const { mode, loadMode } = useThemeStore();

  useEffect(() => {
    loadMode();
  }, [loadMode]);

  const getActiveColorScheme = () => {
    if (mode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  };

  const colors = getActiveColorScheme() === 'dark' ? darkColors : lightColors;

  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeColors {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
