import { StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses';
import { spacing } from '@/shared/theme';
import { Input, Text } from '@/shared/ui';

import { CollapsibleFilterSection } from './CollapsibleFilterSection';

export function PriceRangeFilter() {
  const { filter, setFilter } = useCoursesStore();

  const handleMinChange = (value: string) => {
    const num = parseInt(value) || undefined;
    setFilter({ ...filter, priceMin: num });
  };

  const handleMaxChange = (value: string) => {
    const num = parseInt(value) || undefined;
    setFilter({ ...filter, priceMax: num });
  };

  return (
    <CollapsibleFilterSection title="Цена (₽)">
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text variant="caption" style={styles.label}>
            От
          </Text>
          <Input
            placeholder="0"
            value={filter.priceMin?.toString() || ''}
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
            value={filter.priceMax?.toString() || ''}
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
