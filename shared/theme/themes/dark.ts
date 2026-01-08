import { Color, ColorScheme } from '../colors';
import { palette } from './palette';

export const darkColors: ColorScheme = {
  text: {
    primary: palette.gray50,
    secondary: palette.gray300,
    tertiary: palette.gray400,
    disabled: palette.gray600,
    inverse: palette.gray950,
    link: palette.emerald400,
    success: palette.green400,
    error: palette.red400,
  },
  background: {
    canvas: palette.gray950,
    surface: palette.gray900,
    surfaceElevated: palette.gray800,
    overlay: 'rgba(0, 0, 0, 0.7)' as Color,
  },
  border: {
    default: palette.gray700,
    light: palette.gray800,
    strong: palette.gray600,
    disabled: palette.gray700,
  },
  primary: {
    default: palette.emerald500,
    hover: palette.emerald400,
    active: palette.emerald300,
    disabled: palette.gray700,
    subtle: palette.emerald900,
    subtleBorder: palette.emerald800,
  },
  secondary: {
    default: palette.gray800,
    hover: palette.gray700,
    active: palette.gray600,
    disabled: palette.gray800,
  },
  success: {
    default: palette.green500,
    hover: palette.green400,
    active: palette.green300,
    subtle: palette.green900,
    subtleBorder: palette.green800,
  },
  warning: {
    default: palette.amber500,
    hover: palette.amber400,
    active: palette.amber300,
    subtle: palette.amber900,
    subtleBorder: palette.amber800,
  },
  error: {
    default: palette.red500,
    hover: palette.red400,
    active: palette.red300,
    subtle: palette.red900,
    subtleBorder: palette.red800,
  },
  info: {
    default: palette.sky500,
    hover: palette.sky400,
    active: palette.sky300,
    subtle: palette.sky900,
    subtleBorder: palette.sky800,
  },
  accent: {
    default: palette.amber500,
    hover: palette.amber400,
    active: palette.amber300,
    subtle: palette.amber900,
  },
} as const;
