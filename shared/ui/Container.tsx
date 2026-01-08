import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useBreakpoint } from '@/components/useBreakpoint';

interface ContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'full';
  centered?: boolean;
  style?: ViewStyle;
}

const maxWidths = {
  sm: 480,
  md: 640,
  lg: 960,
  full: undefined,
};

export function Container({
  children,
  maxWidth = 'full',
  centered = false,
  style,
}: ContainerProps) {
  const { isPhone } = useBreakpoint();

  const containerStyle: ViewStyle = {
    ...styles.container,
  };

  if (!isPhone && maxWidth !== 'full') {
    containerStyle.maxWidth = maxWidths[maxWidth];
    if (centered) {
      containerStyle.alignSelf = 'center';
    }
  }

  return <View style={[containerStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
