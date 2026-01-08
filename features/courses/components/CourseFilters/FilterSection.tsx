import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing } from '@/shared/theme';
import { CourseFilters } from '@/shared/types/course';
import { Checkbox } from '@/shared/ui/Checkbox';

import { CollapsibleFilterSection } from './CollapsibleFilterSection';

type FilterType = 'directions' | 'formats' | 'educationTypes' | 'locations';

interface FilterSectionProps {
  type: FilterType;
  title: string;
}

const filterKeyMap: Record<FilterType, keyof CourseFilters> = {
  directions: 'directionIds',
  formats: 'formatIds',
  educationTypes: 'educationTypeIds',
  locations: 'locationIds',
};

export function FilterSection({ type, title }: FilterSectionProps) {
  const { dictionaries, filters, setFilters } = useCoursesStore();

  if (!dictionaries) return null;

  const options = dictionaries[type];
  const filterKey = filterKeyMap[type];
  const selectedIds = (filters[filterKey] as string[]) || [];

  const handleToggle = (id: string) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setFilters({ ...filters, [filterKey]: newIds.length > 0 ? newIds : undefined });
  };

  return (
    <CollapsibleFilterSection title={title}>
      <View style={styles.options}>
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.name}
            checked={selectedIds.includes(option.id)}
            onToggle={() => handleToggle(option.id)}
          />
        ))}
      </View>
    </CollapsibleFilterSection>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: spacing.sm,
  },
});
