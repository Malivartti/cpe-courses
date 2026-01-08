import React from 'react';
import { Platform, Pressable, PressableProps, StyleSheet, Text, ViewStyle } from 'react-native';

import { shadows, spacing, typography, useTheme } from '@/shared/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'success';

interface Props extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, variant = 'primary', disabled, style, ...props }: Props) {
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
        { backgroundColor: getBackgroundColor(pressed) },
        disabled && styles.disabled,
        style,
      ]}
      // @ts-ignore - web-only props
      onMouseEnter={Platform.OS === 'web' ? () => setIsHovered(true) : undefined}
      onMouseLeave={Platform.OS === 'web' ? () => setIsHovered(false) : undefined}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: 'center',
    ...shadows.sm,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    ...typography.button,
  },
});
