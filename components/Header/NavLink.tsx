import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Text } from '@/shared/ui';

import { useActiveRoute } from './useActiveRoute';

interface NavLinkProps {
  href: Href;
  icon: string;
  label: string;
}

export function NavLink({ href, icon, label }: NavLinkProps) {
  const colors = useTheme();
  const isActive = useActiveRoute(typeof href === 'string' ? href : href.pathname || '');

  return (
    <Link href={href} asChild>
      <Pressable style={styles.navItem}>
        <FontAwesome
          name={icon as any}
          size={18}
          color={isActive ? colors.primary.default : colors.text.secondary}
        />
        <Text
          variant="body"
          style={{
            color: isActive ? colors.primary.default : colors.text.secondary,
            fontWeight: isActive ? '600' : '400',
          }}
        >
          {label}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
