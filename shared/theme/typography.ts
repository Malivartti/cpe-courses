import { TextStyle } from 'react-native';

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'button'
  | 'link';

export const typography: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.black,
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
  },
  h2: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  },
  h3: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes['2xl'] * lineHeights.tight,
  },
  h4: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xl * lineHeights.normal,
  },
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.lg * lineHeights.normal,
  },
  body: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.base * lineHeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xs * lineHeights.normal,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.sm * lineHeights.normal,
  },
  button: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.base * lineHeights.tight,
  },
  link: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: fontSizes.base * lineHeights.normal,
    textDecorationLine: 'underline',
  },
} as const;

export type TypographyToken = typeof typography;
