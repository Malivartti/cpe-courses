import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps } from 'react-native';

import { spacing, typography, useTheme } from '@/shared/theme';

export function Input({ style, ...props }: TextInputProps) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: isFocused ? colors.primary.default : colors.border.default,
          color: colors.text.primary,
          backgroundColor: colors.background.surface,
        },
        Platform.OS === 'web' && { outlineStyle: 'none' as any },
        style,
      ]}
      placeholderTextColor={colors.text.tertiary}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: spacing.sm,
    padding: spacing.md,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
});
