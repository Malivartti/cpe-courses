export type Color = `#${string}`;

export type ColorScheme = {
  text: {
    primary: Color;
    secondary: Color;
    tertiary: Color;
    disabled: Color;
    inverse: Color;
    link: Color;
    success: Color;
    error: Color;
  };
  background: {
    canvas: Color;
    surface: Color;
    surfaceElevated: Color;
    overlay: Color;
  };
  border: {
    default: Color;
    light: Color;
    strong: Color;
    disabled: Color;
  };
  primary: {
    default: Color;
    hover: Color;
    active: Color;
    disabled: Color;
    subtle: Color;
    subtleBorder: Color;
  };
  secondary: {
    default: Color;
    hover: Color;
    active: Color;
    disabled: Color;
  };
  success: {
    default: Color;
    hover: Color;
    active: Color;
    subtle: Color;
    subtleBorder: Color;
  };
  warning: {
    default: Color;
    hover: Color;
    active: Color;
    subtle: Color;
    subtleBorder: Color;
  };
  error: {
    default: Color;
    hover: Color;
    active: Color;
    subtle: Color;
    subtleBorder: Color;
  };
  info: {
    default: Color;
    hover: Color;
    active: Color;
    subtle: Color;
    subtleBorder: Color;
  };
  accent: {
    default: Color;
    hover: Color;
    active: Color;
    subtle: Color;
  };
};
