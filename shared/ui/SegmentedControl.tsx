import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { shadows, spacing, useTheme } from '@/shared/theme';

import { Text } from './Text';

interface Option {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary.default }]}>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <Pressable
            key={option.value}
            style={[
              styles.option,
              isActive && [styles.optionActive, { backgroundColor: colors.background.surface }],
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text
              variant="body"
              style={[
                styles.optionText,
                { color: isActive ? colors.primary.default : colors.text.secondary },
              ]}
            >
              {option.label}
            </Text>
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
  optionActive: {
    ...shadows.sm,
  },
  optionText: {
    fontWeight: '600',
  },
});
