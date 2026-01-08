import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing, useTheme } from '@/shared/theme';
import { CourseSortField } from '@/shared/types/course';
import { Text } from '@/shared/ui';

const sortOptions: { value: CourseSortField; label: string }[] = [
  { value: 'title', label: 'Название' },
  { value: 'price', label: 'Цена' },
  { value: 'duration', label: 'Длительность' },
];

export function SortSelector() {
  const colors = useTheme();
  const { sort, setSort } = useCoursesStore();

  const handleSortChange = (field: CourseSortField) => {
    if (sort.field !== field) {
      setSort({ field, order: 'asc' });
      return;
    }

    if (sort.order === 'asc') {
      setSort({ field, order: 'desc' });
      return;
    }

    setSort({ field: 'none', order: 'desc' });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background.surface, borderColor: colors.border.light },
      ]}
    >
      <Text variant="h4">Сортировка</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {sortOptions.map((option) => {
          const isActive = sort.field === option.value;
          const isAsc = isActive && sort.order === 'asc';

          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                {
                  backgroundColor: isActive
                    ? colors.primary.subtle
                    : colors.background.surfaceElevated,
                  borderColor: isActive ? colors.primary.default : colors.border.light,
                },
              ]}
              onPress={() => handleSortChange(option.value)}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: isActive ? colors.primary.default : colors.text.secondary,
                  fontWeight: isActive ? '600' : '400',
                }}
              >
                {option.label}
              </Text>
              {isActive && (
                <FontAwesome
                  name={isAsc ? 'arrow-up' : 'arrow-down'}
                  size={14}
                  color={colors.primary.default}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: spacing.md,
    padding: spacing.lg,
    gap: spacing.md,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    gap: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    borderWidth: 1,
  },
});
