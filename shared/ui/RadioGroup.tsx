import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';

import { Text } from './Text';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                {
                  borderColor: isActive ? colors.primary.default : colors.border.default,
                  backgroundColor: isActive ? colors.primary.default : 'transparent',
                },
              ]}
              onPress={() => onChange(option.value)}
            >
              <Text
                variant="body"
                style={{
                  color: isActive ? colors.text.inverse : colors.text.primary,
                  fontWeight: '500',
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  option: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderRadius: spacing.sm,
    alignItems: 'center',
  },
});
