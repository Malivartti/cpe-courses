import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const THEME_STORAGE_KEY = 'theme-preference';

export type ThemeMode = 'system' | 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
  loadMode: () => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',

  setMode: async (mode: ThemeMode) => {
    set({ mode });
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
  },

  loadMode: async () => {
    try {
      const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedMode && ['system', 'light', 'dark'].includes(storedMode)) {
        set({ mode: storedMode as ThemeMode });
      }
    } catch (error) {
      console.error('Failed to load theme mode:', error);
    }
  },
}));
