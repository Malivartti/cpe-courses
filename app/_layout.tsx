import 'react-native-reanimated';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useBreakpoint } from '@/components/useBreakpoint';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuthInit } from '@/shared/hooks/useAuthInit';
import { useThemeStore } from '@/shared/store/theme.store';
import { ThemeProvider } from '@/shared/theme';
import { darkColors } from '@/shared/theme/themes/dark';
import { lightColors } from '@/shared/theme/themes/ligth';

export { ErrorBoundary } from 'expo-router';
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const { isInitialized } = useAuthInit();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isInitialized]);

  if (!loaded || !isInitialized) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const systemColorScheme = useColorScheme();
  const { mode } = useThemeStore();
  const { isPhone } = useBreakpoint();

  const getActiveColorScheme = () => {
    if (mode === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return mode;
  };

  const isDark = getActiveColorScheme() === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const navigationTheme: Theme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        primary: colors.primary.default,
        background: colors.background.canvas,
        card: colors.background.surface,
        text: colors.text.primary,
        border: colors.border.default,
        notification: colors.error.default,
      },
    }),
    [isDark, colors]
  );

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationThemeProvider value={navigationTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="course/[id]"
              options={() => ({
                title: 'Курс',
                headerShown: (Platform.OS === 'web' && isPhone) || Platform.OS !== 'web',
              })}
            />
            <Stack.Screen
              name="filters"
              options={() => ({
                title: 'Фильтры',
                headerShown: (Platform.OS === 'web' && isPhone) || Platform.OS !== 'web',
              })}
            />
          </Stack>
        </NavigationThemeProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
