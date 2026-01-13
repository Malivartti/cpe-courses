import React from 'react';
import { Platform, Pressable, PressableProps, StyleSheet, Text, ViewStyle } from 'react-native';

import { shadows, spacing, typography, useTheme } from '@/shared/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'lg',
  disabled,
  style,
  ...props
}: Props) {
  const colors = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.primary.disabled;

    const isInteractive = Platform.OS === 'web' ? isHovered : pressed;

    switch (variant) {
      case 'primary':
        return isInteractive ? colors.primary.hover : colors.primary.default;
      case 'secondary':
        return isInteractive ? colors.secondary.hover : colors.secondary.default;
      case 'error':
        return isInteractive ? colors.error.hover : colors.error.default;
      case 'success':
        return isInteractive ? colors.success.hover : colors.success.default;
      default:
        return isInteractive ? colors.primary.hover : colors.primary.default;
    }
  };

  const textColor = variant === 'secondary' ? colors.text.primary : colors.text.inverse;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[size],
        { backgroundColor: getBackgroundColor(pressed) },
        disabled && styles.disabled,
        style,
      ]}
      // @ts-ignore – web only
      onMouseEnter={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
      onMouseLeave={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, styles[`text_${size}`], { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },

  disabled: {
    opacity: 0.6,
  },

  text: {
    ...typography.button,
  },
  text_sm: {
    fontSize: 12,
  },
  text_md: {
    fontSize: 14,
  },
  text_lg: {
    fontSize: 16,
  },
});
