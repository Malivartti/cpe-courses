import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';

import { DurationRangeFilter } from './DurationRangeFilter';
import { FilterSection } from './FilterSection';
import { PriceRangeFilter } from './PriceRangeFilter';

export function CourseFilters() {
  return (
    <View style={styles.filter}>
      <FilterSection type="categories" title="Категории" />
      <FilterSection type="tags" title="Теги" />
      <FilterSection type="formats" title="Формат обучения" />
      <FilterSection type="educationTypes" title="Тип обучения" />
      <PriceRangeFilter />
      <DurationRangeFilter />
    </View>
  );
}

const styles = StyleSheet.create({
  filter: {
    gap: spacing.sm,
  },
});
