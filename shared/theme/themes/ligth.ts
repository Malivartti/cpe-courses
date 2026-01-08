import { Color, ColorScheme } from '../colors';
import { palette } from './palette';

export const lightColors: ColorScheme = {
  text: {
    primary: palette.gray950,
    secondary: palette.gray600,
    tertiary: palette.gray500,
    disabled: palette.gray400,
    inverse: palette.white,
    link: palette.emerald600,
    success: palette.green600,
    error: palette.red600,
  },

  background: {
    canvas: palette.gray50,
    surface: palette.white,
    surfaceElevated: palette.white,
    overlay: 'rgba(0, 0, 0, 0.5)' as Color,
  },

  border: {
    default: palette.gray200,
    light: palette.gray100,
    strong: palette.gray300,
    disabled: palette.gray300,
  },

  primary: {
    default: palette.emerald600,
    hover: palette.emerald700,
    active: palette.emerald800,
    disabled: palette.gray300,
    subtle: palette.emerald50,
    subtleBorder: palette.emerald200,
  },

  secondary: {
    default: palette.gray100,
    hover: palette.gray200,
    active: palette.gray300,
    disabled: palette.gray100,
  },

  success: {
    default: palette.green500,
    hover: palette.green600,
    active: palette.green700,
    subtle: palette.green50,
    subtleBorder: palette.green200,
  },

  warning: {
    default: palette.amber500,
    hover: palette.amber600,
    active: palette.amber700,
    subtle: palette.amber50,
    subtleBorder: palette.amber200,
  },

  error: {
    default: palette.red500,
    hover: palette.red600,
    active: palette.red700,
    subtle: palette.red50,
    subtleBorder: palette.red200,
  },

  info: {
    default: palette.sky500,
    hover: palette.sky600,
    active: palette.sky700,
    subtle: palette.sky50,
    subtleBorder: palette.sky200,
  },

  accent: {
    default: palette.amber500,
    hover: palette.amber600,
    active: palette.amber700,
    subtle: palette.amber50,
  },
} as const;
