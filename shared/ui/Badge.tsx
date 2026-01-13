import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';

import { Text } from './Text';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';

interface Props {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'primary' }: Props) {
  const colors = useTheme();

  const isOutline = variant === 'outline';

  const getBackgroundColor = () => {
    if (isOutline) return 'transparent';

    switch (variant) {
      case 'primary':
        return colors.primary.default;
      case 'secondary':
        return colors.text.secondary;
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

  const getBorderColor = () => {
    if (!isOutline) return 'transparent';

    return colors.border.default;
  };

  const textColor = isOutline ? colors.text.primary : colors.text.inverse;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: isOutline ? 1 : 0,
        },
      ]}
    >
      <Text variant="caption" style={{ color: textColor, fontWeight: '600' }}>
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
