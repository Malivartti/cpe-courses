import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useAuthStore } from '@/shared/store/auth.store';
import { spacing } from '@/shared/theme';

export function AppTabs() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role ?? 'guest';
  const isGuest = !user;

  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'left',
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: spacing.sm,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Курсы',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="th-large" color={color} />,
        }}
      />
      <Tabs.Screen
        name="enrollments"
        options={{
          title: 'Мои записи',
          href: role === 'user' ? '/enrollments' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="bookmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-courses"
        options={{
          title: 'Мои курсы',
          href: role === 'author' ? '/my-courses' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          title: 'Вход',
          href: isGuest ? '/auth' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="sign-in" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          href: isGuest ? null : '/profile',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
