import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useAuthStore } from '@/shared/store/auth';
import { useCoursesStore } from '@/shared/store/courses';
import { spacing, useTheme } from '@/shared/theme';
import { CourseSortField } from '@/shared/types/course_old';
import { Button, SearchInput, Text } from '@/shared/ui';

const sortOptions: { value: CourseSortField; label: string }[] = [
  { value: 'title', label: 'По названию' },
  { value: 'price', label: 'По цене' },
  { value: 'duration', label: 'По длительности' },
];

export function SortSelector() {
  const colors = useTheme();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'admin';
  const {
    filter,
    setFilter,
    searchMode,
    searchQuery,
    setSearchMode,
    setSearchQuery,
    performSearch,
    isLoading,
  } = useCoursesStore();

  const [localQuery, setLocalQuery] = React.useState(searchQuery);
  const isRecommendations = searchMode === 'recommendations';

  React.useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    setSearchQuery(localQuery);
    performSearch();
  };

  const toggleSearchMode = () => {
    const newMode = searchMode === 'standard' ? 'recommendations' : 'standard';
    setSearchMode(newMode);
  };

  const handleSortChange = (field: CourseSortField) => {
    if (isRecommendations) return;

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
        {
          backgroundColor: colors.background.surface,
          borderColor: colors.border.light,
        },
      ]}
    >
      <SearchInput
        value={localQuery}
        onChangeText={setLocalQuery}
        onSubmit={handleSearchSubmit}
        placeholder={isRecommendations ? 'Опишите желаемый курс...' : 'Поиск курсов...'}
        searchMode={searchMode}
        onToggleMode={toggleSearchMode}
        isLoading={isLoading}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[styles.scrollView, isRecommendations && { opacity: 0.5, pointerEvents: 'none' }]}
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
                disabled={isRecommendations}
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
        </View>
        {isAdmin && <Button title="Создать курс" onPress={() => router.push('/courses/create')} />}
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
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.md,
  },
  scrollContent: {
    width: '100%',
    justifyContent: 'space-between',
    gap: spacing.md,
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
  hint: {
    padding: spacing.sm,
    borderRadius: spacing.xs,
  },
});
