import React from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing } from '@/shared/theme';
import { Button, Text } from '@/shared/ui';

import { CourseCard } from './CourseCard';

interface CourseListProps {
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  headerHeight?: number;
}

export function CourseList({ onScroll, headerHeight = 0 }: CourseListProps) {
  const { courses, isLoading, hasMore, nextPage } = useCoursesStore();

  return (
    <FlatList
      data={courses}
      renderItem={({ item }) => <CourseCard course={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        ...styles.list,
        paddingTop: headerHeight > 0 ? headerHeight : spacing.lg,
        paddingHorizontal: spacing.lg,
      }}
      style={{ marginHorizontal: -spacing.lg }}
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListEmptyComponent={
        !isLoading ? (
          <View style={styles.empty}>
            <Text variant="body" style={styles.emptyText}>
              Курсы не найдены
            </Text>
          </View>
        ) : null
      }
      ListFooterComponent={
        hasMore ? (
          <Button
            title={isLoading ? 'Загрузка...' : 'Загрузить ещё'}
            variant="secondary"
            onPress={nextPage}
            disabled={isLoading}
          />
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  empty: {
    paddingVertical: spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});
