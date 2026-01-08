import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { spacing, typography, useTheme } from '@/shared/theme';

export function Input({ style, ...props }: TextInputProps) {
  const colors = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderColor: colors.border.default,
          color: colors.text.primary,
          backgroundColor: colors.background.surface,
        },
        style,
      ]}
      placeholderTextColor={colors.text.tertiary}
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
