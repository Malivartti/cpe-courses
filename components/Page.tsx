import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { spacing, useTheme } from '@/shared/theme';

import { Header } from './Header/Header';

type Props = {
  children: React.ReactNode;
  hasHeader?: boolean;
};

export function Page({ children, hasHeader = false }: Props) {
  const colors = useTheme();

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webOuter, { backgroundColor: colors.background.canvas }]}>
        <Header />
        <View style={styles.webInner}>{children}</View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.nativeOuter, { backgroundColor: colors.background.canvas }]}
      edges={hasHeader ? ['left', 'right', 'bottom'] : undefined}
    >
      <View style={styles.nativeInner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webOuter: {
    flex: 1,
  },
  webInner: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    padding: spacing.lg,
  },
  nativeOuter: {
    flex: 1,
  },
  nativeInner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
