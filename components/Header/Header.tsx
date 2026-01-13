import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { useAuthStore } from '@/shared/store/auth';
import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

import { useBreakpoint } from '../useBreakpoint';
import { NavLink } from './NavLink';

export function Header() {
  const colors = useTheme();
  const { isPhone } = useBreakpoint();
  const { user } = useAuthStore((state) => state);

  if (isPhone || Platform.OS !== 'web') {
    return null;
  }

  const isGuest = !user;
  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background.surface,
          borderBottomColor: colors.border.default,
        },
      ]}
    >
      <View style={styles.container}>
        <Link href="/" asChild>
          <Pressable style={styles.logo}>
            <FontAwesome name="graduation-cap" size={24} color={colors.primary.default} />
            <Text variant="h4" style={{ color: colors.text.primary }}>
              Витрина курсов
            </Text>
          </Pressable>
        </Link>

        <View style={styles.nav}>
          {isUser && <NavLink href="/enrollments" icon="bookmark" label="Мои записи" />}

          {isAdmin && <NavLink href="/dictionaries" icon="book" label="Справочники" />}

          {isGuest ? (
            <NavLink href="/auth" icon="sign-in" label="Войти" />
          ) : (
            <NavLink href="/profile" icon="user" label="Профиль" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  nav: {
    flexDirection: 'row',
    gap: spacing.xl,
    alignItems: 'center',
  },
});
