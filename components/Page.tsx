import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  hasHeader?: boolean;
};

export function Page({ children, hasHeader = false }: Props) {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webOuter}>
        <View style={styles.webInner}>{children}</View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.nativeOuter}
      edges={hasHeader ? ['left', 'right', 'bottom'] : undefined}
    >
      <View style={styles.nativeInner}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webOuter: { flex: 1, backgroundColor: '#f2f2f2' },
  webInner: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    padding: 16,
  },
  nativeOuter: { flex: 1, backgroundColor: '#f2f2f2' },
  nativeInner: { flex: 1, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },
});
