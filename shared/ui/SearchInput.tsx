import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';

import { spacing, typography, useTheme } from '../theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, placeholder = 'Поиск...' }: SearchInputProps) {
  const colors = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = isFocused ? colors.primary.default : colors.border.default;
  const iconColor = isFocused ? colors.primary.default : colors.text.tertiary;

  return (
    <View style={[styles.container, { backgroundColor: colors.background.surface, borderColor }]}>
      <FontAwesome name="search" size={18} color={iconColor} />
      <TextInput
        style={[
          styles.input,
          { color: colors.text.primary },
          Platform.OS === 'web' && ({ outlineStyle: 'none' } as any),
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    paddingVertical: spacing.xs,
  },
});
