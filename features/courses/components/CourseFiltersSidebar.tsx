import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

import { CourseFilters } from './CourseFilters/CourseFilters';

export function CourseFiltersSidebar() {
  const colors = useTheme();
  const { height } = useWindowDimensions();

  return (
    <View
      style={[
        styles.sidebar,
        {
          backgroundColor: colors.background.surface,
          borderColor: colors.border.light,
          maxHeight: height - 65 - spacing.md * 2,
        },
      ]}
    >
      <Text variant="h4" style={styles.title}>
        Фильтры
      </Text>
      <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
        <CourseFilters />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 320,
    borderWidth: 1,
    borderRadius: spacing.md,
    padding: spacing.lg,
    alignSelf: 'flex-start',
  },
  title: {
    marginBottom: spacing.lg,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: -spacing.lg,
  },
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
