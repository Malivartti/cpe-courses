import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/shared/theme';

export function Divider() {
  const colors = useTheme();

  return <View style={[styles.divider, { backgroundColor: colors.border.light }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
