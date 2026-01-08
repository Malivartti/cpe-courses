import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';

import { Text } from './Text';

interface Props {
  label: string;
  value: string | ReactNode;
}

export function InfoRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text variant="label">{label}</Text>
      {typeof value === 'string' ? (
        <Text variant="body" style={styles.value}>
          {value}
        </Text>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  value: {
    fontWeight: '600',
  },
});
