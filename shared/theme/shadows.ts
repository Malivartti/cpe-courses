import { Platform, ViewStyle } from 'react-native';

export type ShadowVariant = 'sm' | 'md' | 'lg' | 'xl';

export const shadows: Record<ShadowVariant, ViewStyle> = {
  sm: Platform.select({
    web: {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    } as ViewStyle,
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  }),
  md: Platform.select({
    web: {
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    } as ViewStyle,
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  }),
  lg: Platform.select({
    web: {
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    } as ViewStyle,
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  }),
  xl: Platform.select({
    web: {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    } as ViewStyle,
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  }),
} as const;
