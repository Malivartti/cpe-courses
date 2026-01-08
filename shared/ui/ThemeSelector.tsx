import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';

import { ThemeMode, useThemeStore } from '../store/theme.store';

const themeIcons: Record<ThemeMode, string> = {
  system: 'adjust',
  light: 'sun-o',
  dark: 'moon-o',
};

export function ThemeSelector() {
  const colors = useTheme();
  const { mode, setMode } = useThemeStore();

  const themes: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary.default }]}>
      {themes.map((theme) => {
        const isActive = mode === theme;
        return (
          <Pressable
            key={theme}
            style={[styles.option, isActive && { backgroundColor: colors.background.surface }]}
            onPress={() => setMode(theme)}
          >
            <FontAwesome
              name={themeIcons[theme] as any}
              size={20}
              color={isActive ? colors.primary.default : colors.text.secondary}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: spacing.sm,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: spacing.xs,
  },
});
