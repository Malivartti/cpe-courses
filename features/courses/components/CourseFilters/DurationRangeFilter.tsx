import { StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing } from '@/shared/theme';
import { Input, Text } from '@/shared/ui';

import { CollapsibleFilterSection } from './CollapsibleFilterSection';

export function DurationRangeFilter() {
  const { filters, setFilters } = useCoursesStore();

  const handleMinChange = (value: string) => {
    const num = parseInt(value) || undefined;
    setFilters({ ...filters, durationMin: num });
  };

  const handleMaxChange = (value: string) => {
    const num = parseInt(value) || undefined;
    setFilters({ ...filters, durationMax: num });
  };

  return (
    <CollapsibleFilterSection title="Длительность (ч)">
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text variant="caption" style={styles.label}>
            От
          </Text>
          <Input
            placeholder="0"
            value={filters.durationMin?.toString() || ''}
            onChangeText={handleMinChange}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text variant="caption" style={styles.label}>
            До
          </Text>
          <Input
            placeholder="∞"
            value={filters.durationMax?.toString() || ''}
            onChangeText={handleMaxChange}
            keyboardType="numeric"
          />
        </View>
      </View>
    </CollapsibleFilterSection>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  inputWrapper: {
    gap: spacing.xs,
  },
  label: {
    fontWeight: '600',
  },
});
