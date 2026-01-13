import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses';
import { spacing, useTheme } from '@/shared/theme';
import { CourseSortField } from '@/shared/types/course_old';
import { SearchInput, Text } from '@/shared/ui';

const sortOptions: { value: CourseSortField; label: string }[] = [
  { value: 'title', label: 'Название' },
  { value: 'price', label: 'Цена' },
  { value: 'duration', label: 'Длительность' },
];

export function SortSelector() {
  const colors = useTheme();
  const { filter, setFilter } = useCoursesStore();

  const handleSortChange = (field: CourseSortField) => {
    if (filter.sortField !== field) {
      setFilter({ sortField: field, sortOrder: 'asc' });
      return;
    }

    if (filter.sortOrder === 'asc') {
      setFilter({ sortField: field, sortOrder: 'desc' });
      return;
    }

    setFilter({ sortField: 'none', sortOrder: 'desc' });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background.surface, borderColor: colors.border.light },
      ]}
    >
      <SearchInput
        value={filter.search ?? ''}
        onChangeText={(search: string) => setFilter({ ...filter, search })}
        placeholder="Поиск курсов..."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {sortOptions.map((option) => {
          const isActive = filter.sortField === option.value;
          const isAsc = isActive && filter.sortOrder === 'asc';

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
