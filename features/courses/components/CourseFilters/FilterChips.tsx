import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { getCourseFormatLabel } from '@/shared/api/labels/courseLabels';
import { useCoursesStore } from '@/shared/store/courses';
import { useFiltersDataStore } from '@/shared/store/filters';
import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

export function FilterChips() {
  const colors = useTheme();
  const { filter, setFilter } = useCoursesStore();
  const { categories } = useFiltersDataStore();

  const chips: { label: string; onRemove: () => void }[] = [];

  if (filter.categoryIds) {
    filter.categoryIds.forEach((id) => {
      const category = categories.find((c) => c.id === id);
      if (category) {
        chips.push({
          label: category.name,
          onRemove: () =>
            setFilter({
              ...filter,
              categoryIds: filter.categoryIds!.filter((i) => i !== id),
            }),
        });
      }
    });
  }

  if (filter.formats) {
    filter.formats.forEach((format) => {
      chips.push({
        label: getCourseFormatLabel(format),
        onRemove: () =>
          setFilter({
            ...filter,
            formats: filter.formats!.filter((f) => f !== format),
          }),
      });
    });
  }

  if (filter.hasDiscount) {
    chips.push({
      label: 'Со скидкой',
      onRemove: () => setFilter({ ...filter, hasDiscount: undefined }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <View style={styles.container}>
      {chips.map((chip, index) => (
        <Pressable
          key={index}
          style={{
            ...styles.chip,
            backgroundColor: colors.primary.subtle,
          }}
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
