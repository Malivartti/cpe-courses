import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

export function FilterChips() {
  const colors = useTheme();
  const { filters, dictionaries, setFilters } = useCoursesStore();

  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.directionIds && dictionaries) {
    filters.directionIds.forEach((id) => {
      const dir = dictionaries.directions.find((d) => d.id === id);
      if (dir) {
        chips.push({
          label: dir.name,
          onRemove: () =>
            setFilters({
              ...filters,
              directionIds: filters.directionIds!.filter((i) => i !== id),
            }),
        });
      }
    });
  }

  if (filters.formatIds && dictionaries) {
    filters.formatIds.forEach((id) => {
      const format = dictionaries.formats.find((f) => f.id === id);
      if (format) {
        chips.push({
          label: format.name,
          onRemove: () =>
            setFilters({
              ...filters,
              formatIds: filters.formatIds!.filter((i) => i !== id),
            }),
        });
      }
    });
  }

  if (filters.hasDiscount) {
    chips.push({
      label: 'Со скидкой',
      onRemove: () => setFilters({ ...filters, hasDiscount: undefined }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <View style={styles.container}>
      {chips.map((chip, index) => (
        <Pressable
          key={index}
          style={[styles.chip, { backgroundColor: colors.primary.subtle }]}
          onPress={chip.onRemove}
        >
          <Text variant="caption" style={{ color: colors.primary.default }}>
            {chip.label}
          </Text>
          <FontAwesome name="times" size={12} color={colors.primary.default} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.lg,
  },
});
