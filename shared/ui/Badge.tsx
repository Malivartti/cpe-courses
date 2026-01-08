import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';

import { Text } from './Text';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';

interface Props {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'primary' }: Props) {
  const colors = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary.default;
      case 'success':
        return colors.success.default;
      case 'warning':
        return colors.warning.default;
      case 'error':
        return colors.error.default;
      case 'info':
        return colors.info.default;
      default:
        return colors.primary.default;
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
      <Text variant="caption" style={{ color: colors.text.inverse, fontWeight: '600' }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.lg,
  },
});
