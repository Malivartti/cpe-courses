import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

type Options = {
  phoneMax?: number;
  tabletMax?: number;
};

export function useBreakpoint(options: Options = {}) {
  const { width, height, scale, fontScale } = useWindowDimensions();

  const phoneMax = options.phoneMax ?? 599;
  const tabletMax = options.tabletMax ?? 899;

  return useMemo(() => {
    const breakpoint: Breakpoint =
      width <= phoneMax ? 'phone' : width <= tabletMax ? 'tablet' : 'desktop';

    return {
      width,
      height,
      scale,
      fontScale,

      breakpoint,
      isPhone: breakpoint === 'phone',
      isTablet: breakpoint === 'tablet',
      isDesktop: breakpoint === 'desktop',

      isPortrait: height >= width,
      isLandscape: width > height,
    };
  }, [width, height, scale, fontScale, phoneMax, tabletMax]);
}
