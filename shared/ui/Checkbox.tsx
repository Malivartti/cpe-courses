import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { spacing, useTheme } from '../theme';
import { Text } from './Text';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export function Checkbox({ label, checked, onToggle }: CheckboxProps) {
  const colors = useTheme();

  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <FontAwesome
        name={checked ? 'check-square-o' : 'square-o'}
        size={20}
        color={checked ? colors.primary.default : colors.text.tertiary}
      />
      <Text variant="body" style={{ color: colors.text.primary }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
});
