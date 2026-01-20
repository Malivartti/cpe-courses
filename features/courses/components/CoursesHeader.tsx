import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { useAuthStore } from '@/shared/store/auth';
import { useCoursesStore } from '@/shared/store/courses';
import { spacing, useTheme } from '@/shared/theme';
import { CourseSortField } from '@/shared/types/course_old';
import { Button, SearchInput, Text } from '@/shared/ui';

import { FilterChips } from './CourseFilters/FilterChips';

const sortOptions: { field: CourseSortField; label: string; icon: string }[] = [
  { field: 'title', label: 'По названию', icon: 'font' },
  { field: 'price', label: 'По цене', icon: 'rouble' },
  { field: 'duration', label: 'По длительности', icon: 'clock-o' },
];

interface CoursesHeaderProps {
  isVisible?: boolean;
}

export function CoursesHeader({ isVisible = true }: CoursesHeaderProps) {
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

  const [showSortMenu, setShowSortMenu] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    if (!isVisible && showSortMenu) {
      setShowSortMenu(false);
    }
  }, [isVisible, showSortMenu]);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    setSearchQuery(localQuery);
    performSearch();
  };

  const handleOpenFilters = () => {
    if (searchMode === 'recommendations') return;
    router.push('/filters');
  };

  const handleSort = (field: CourseSortField) => {
    if (searchMode === 'recommendations') return;

    if (filter.sortField === field) {
      if (filter.sortOrder === 'asc') {
        setFilter({ sortField: field, sortOrder: 'desc' });
      } else {
        setFilter({ sortField: 'none', sortOrder: 'asc' });
      }
    } else {
      setFilter({ sortField: field, sortOrder: 'asc' });
    }
  };

  const toggleSortMenu = () => {
    if (searchMode === 'recommendations') return;
    setShowSortMenu(!showSortMenu);
  };

  const closeSortMenu = () => {
    setShowSortMenu(false);
  };

  const toggleSearchMode = () => {
    const newMode = searchMode === 'standard' ? 'recommendations' : 'standard';
    setSearchMode(newMode);
  };

  const getSortButtonIcon = () => {
    if (filter.sortField === 'none') return 'sort';
    const option = sortOptions.find((opt) => opt.field === filter.sortField);
    return option?.icon || 'sort';
  };

  const sortButtonIcon = getSortButtonIcon();
  const isDefaultSort = filter.sortField === 'none' && filter.sortOrder === 'asc';
  const isRecommendations = searchMode === 'recommendations';

  return (
    <>
      {showSortMenu && (
        <TouchableWithoutFeedback onPress={closeSortMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={[styles.container, { backgroundColor: colors.background.surface }]}>
        <View style={styles.searchRow}>
          <SearchInput
            value={localQuery}
            onChangeText={setLocalQuery}
            onSubmit={handleSearchSubmit}
            placeholder={isRecommendations ? 'Опишите желаемый курс...' : 'Поиск курсов...'}
            searchMode={searchMode}
            onToggleMode={toggleSearchMode}
            isLoading={isLoading}
          />
        </View>

        <View style={styles.actionsRow}>
          <View style={styles.leftActions}>
            <Pressable
              style={[
                styles.iconButton,
                {
                  backgroundColor: isDefaultSort
                    ? colors.background.surface
                    : colors.primary.subtle,
                  borderColor: colors.border.default,
                  opacity: isRecommendations ? 0.5 : 1,
                },
              ]}
              onPress={toggleSortMenu}
              disabled={isRecommendations}
            >
              {!isDefaultSort && filter.sortOrder === 'desc' && (
                <FontAwesome
                  name="arrow-down"
                  size={10}
                  color={colors.primary.default}
                  style={styles.directionIconSmall}
                />
              )}
              <FontAwesome
                name={sortButtonIcon as any}
                size={18}
                color={isDefaultSort ? colors.text.secondary : colors.primary.default}
              />
              {!isDefaultSort && filter.sortOrder === 'asc' && (
                <FontAwesome
                  name="arrow-up"
                  size={10}
                  color={colors.primary.default}
                  style={styles.directionIconSmall}
                />
              )}
            </Pressable>

            <Pressable
              style={[
                styles.iconButton,
                {
                  backgroundColor: isRecommendations
                    ? colors.background.surfaceElevated
                    : colors.background.surface,
                  borderColor: colors.border.default,
                  opacity: isRecommendations ? 0.5 : 1,
                },
              ]}
              onPress={handleOpenFilters}
              disabled={isRecommendations}
            >
              <FontAwesome name="sliders" size={18} color={colors.text.secondary} />
            </Pressable>
          </View>

          {isAdmin && (
            <Button title="Создать курс" onPress={() => router.push('/courses/create')} />
          )}
        </View>

        {showSortMenu && !isRecommendations && (
          <View
            style={[
              styles.sortMenu,
              {
                backgroundColor: colors.background.surface,
                borderColor: colors.border.default,
              },
            ]}
          >
            {sortOptions.map((option) => {
              const isActive = filter.sortField === option.field;
              const showDirection = isActive && option.field !== 'none';

              return (
                <Pressable
                  key={option.field}
                  style={[
                    styles.sortOption,
                    isActive && { backgroundColor: colors.primary.subtle },
                  ]}
                  onPress={() => handleSort(option.field)}
                >
                  <FontAwesome
                    name={option.icon as any}
                    size={16}
                    color={isActive ? colors.primary.default : colors.text.primary}
                  />
                  <Text
                    variant="body"
                    style={{
                      flex: 1,
                      color: isActive ? colors.primary.default : colors.text.primary,
                      fontWeight: isActive ? '600' : '400',
                    }}
                  >
                    {option.label}
                  </Text>
                  {showDirection && (
                    <FontAwesome
                      name={filter.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                      size={14}
                      color={colors.primary.default}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {!isRecommendations && <FilterChips />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  container: {
    gap: spacing.sm,
    zIndex: 10,
    padding: spacing.sm,
    borderRadius: spacing.md,
  },
  searchRow: {
    width: '100%',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  leftActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    flexShrink: 0,
  },
  createButton: {
    width: 50,
    height: 50,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  directionIconSmall: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  sortMenu: {
    borderRadius: spacing.sm,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: spacing.xs,
  },
});
