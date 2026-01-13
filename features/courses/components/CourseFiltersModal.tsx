import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses';
import { spacing } from '@/shared/theme';
import { Button } from '@/shared/ui';

import { CourseFilters } from './CourseFilters/CourseFilters';

export function CourseFiltersModal() {
  const { resetFilter } = useCoursesStore();

  const handleApply = () => {
    router.back();
  };

  const handleReset = () => {
    resetFilter();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
        <CourseFilters />
      </ScrollView>

      <View style={styles.actions}>
        <Button title="Сбросить" variant="secondary" onPress={handleReset} style={styles.button} />
        <Button title="Применить" onPress={handleApply} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: -spacing.lg,
  },
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
});
