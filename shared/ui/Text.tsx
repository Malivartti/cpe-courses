import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { typography, type TypographyVariant, useTheme } from '@/shared/theme';

interface Props extends TextProps {
  variant?: TypographyVariant;
}

export function Text({ variant = 'body', style, ...props }: Props) {
  const colors = useTheme();

  const getColor = () => {
    if (variant === 'link') return colors.text.link;
    if (variant === 'caption') return colors.text.tertiary;
    if (variant === 'label') return colors.text.secondary;
    return colors.text.primary;
  };

  return <RNText style={[typography[variant], { color: getColor() }, style]} {...props} />;
}
