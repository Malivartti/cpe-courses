import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { shadows, spacing, useTheme } from '@/shared/theme';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
  const colors = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.background.surface }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.md,
    padding: spacing.lg,
    ...shadows.md,
  },
});
