import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses';
import { spacing, useTheme } from '@/shared/theme';
import { CourseSortField } from '@/shared/types/course_old';
import { SearchInput, Text } from '@/shared/ui';

import { FilterChips } from './CourseFilters/FilterChips';

const sortOptions: { field: CourseSortField; label: string; icon: string }[] = [
  { field: 'title', label: 'Название', icon: 'font' },
  { field: 'price', label: 'Цена', icon: 'rouble' },
  { field: 'duration', label: 'Длительность', icon: 'clock-o' },
];

interface CoursesHeaderProps {
  isVisible?: boolean;
}

export function CoursesHeader({ isVisible = true }: CoursesHeaderProps) {
  const colors = useTheme();
  const { filter, setFilter } = useCoursesStore();
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    if (!isVisible && showSortMenu) {
      setShowSortMenu(false);
    }
  }, [isVisible, showSortMenu]);

  const handleSearch = (search: string) => {
    setFilter({ ...filter, search });
  };

  const handleOpenFilters = () => {
    router.push('/filters');
  };

  const handleSort = (field: CourseSortField) => {
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
    setShowSortMenu(!showSortMenu);
  };

  const closeSortMenu = () => {
    setShowSortMenu(false);
  };

  const getSortButtonIcon = () => {
    if (filter.sortField === 'none') {
      return 'sort';
    }
    const option = sortOptions.find((opt) => opt.field === filter.sortField);
    return option?.icon || 'sort';
  };

  const sortButtonIcon = getSortButtonIcon();
  const isDefaultSort = filter.sortField === 'none' && filter.sortOrder === 'asc';

  return (
    <>
      {showSortMenu && (
        <TouchableWithoutFeedback onPress={closeSortMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.searchInput}>
            <SearchInput
              value={filter.search ?? ''}
              onChangeText={handleSearch}
              placeholder="Поиск курсов..."
            />
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[
                styles.iconButton,
                {
                  backgroundColor: isDefaultSort
                    ? colors.background.surface
                    : colors.primary.subtle,
                  borderColor: colors.border.default,
                },
              ]}
              onPress={toggleSortMenu}
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
                color={isDefaultSort ? colors.text.primary : colors.primary.default}
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
              style={[styles.iconButton, { backgroundColor: colors.primary.default }]}
              onPress={handleOpenFilters}
            >
              <FontAwesome name="sliders" size={18} color={colors.text.inverse} />
            </Pressable>
          </View>
        </View>

        {showSortMenu && (
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
              const showDirection =
                isActive && !(option.field === 'none' && filter.sortOrder === 'asc');

              return (
                <Pressable
                  key={option.field}
                  style={[
                    styles.sortOption,
                    isActive && {
                      backgroundColor: colors.primary.subtle,
                    },
                  ]}
                  onPress={() => handleSort(option.field)}
                >
                  <FontAwesome
                    name={option.icon as any}
                    size={16}
                    color={isActive ? colors.primary.default : colors.text.secondary}
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

        <FilterChips />
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
  },
  topRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'stretch',
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexShrink: 0,
  },
  iconButton: {
    width: 50,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
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
});
