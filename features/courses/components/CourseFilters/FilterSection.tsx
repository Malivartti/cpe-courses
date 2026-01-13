import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  getCertificateTypeLabel,
  getCourseFormatLabel,
  getEducationFormatLabel,
} from '@/shared/api/labels/courseLabels';
import { useCoursesStore } from '@/shared/store/courses';
import {
  CERTIFICATE_TYPES,
  EDUCATION_TYPES,
  FORMATS,
  useFiltersDataStore,
} from '@/shared/store/filters';
import { spacing } from '@/shared/theme';
import { CourseFormat, EducationFormat } from '@/shared/types/course.api';
import { CoursesFilter } from '@/shared/types/course_filters';
import { Checkbox } from '@/shared/ui/Checkbox';

import { CollapsibleFilterSection } from './CollapsibleFilterSection';

type FilterType = 'categories' | 'tags' | 'formats' | 'educationTypes';

interface FilterSectionProps {
  type: FilterType;
  title: string;
}

export function FilterSection({ type, title }: FilterSectionProps) {
  const { filter, setFilter } = useCoursesStore();
  const { categories, tags, fetchFiltersData, isLoading } = useFiltersDataStore();

  useEffect(() => {
    if (type === 'categories' || type === 'tags') {
      fetchFiltersData();
    }
  }, [type, fetchFiltersData]);

  const getOptions = () => {
    switch (type) {
      case 'categories':
        return categories.map((cat) => ({ id: cat.id, name: cat.name }));
      case 'tags':
        return tags.map((tag) => ({ id: tag.name, name: tag.name }));
      case 'formats':
        return FORMATS.map((format) => ({
          id: format,
          name: getCourseFormatLabel(format),
        }));
      case 'educationTypes':
        return EDUCATION_TYPES.map((type) => ({
          id: type,
          name: getEducationFormatLabel(type),
        }));
      default:
        return [];
    }
  };

  const getSelectedIds = (): string[] => {
    switch (type) {
      case 'categories':
        return filter.categoryIds || [];
      case 'tags':
        return filter.tags || [];
      case 'formats':
        return filter.formats || [];
      case 'educationTypes':
        return filter.educationTypes || [];
      default:
        return [];
    }
  };

  const handleToggle = (id: string) => {
    const selectedIds = getSelectedIds();
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];

    const updates: Partial<CoursesFilter> = {};

    switch (type) {
      case 'categories':
        updates.categoryIds = newIds.length > 0 ? newIds : undefined;
        break;
      case 'tags':
        updates.tags = newIds.length > 0 ? newIds : undefined;
        break;
      case 'formats':
        updates.formats = newIds.length > 0 ? (newIds as CourseFormat[]) : undefined;
        break;
      case 'educationTypes':
        updates.educationTypes = newIds.length > 0 ? (newIds as EducationFormat[]) : undefined;
        break;
    }

    setFilter(updates);
  };

  const options = getOptions();
  const selectedIds = getSelectedIds();

  if (isLoading && (type === 'categories' || type === 'tags')) {
    return null;
  }

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
