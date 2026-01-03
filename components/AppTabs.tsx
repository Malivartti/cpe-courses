import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { useAuthStore } from '@/shared/store/auth.store';

export function AppTabs() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role || 'guest';
  const isGuest = !user;

  return (
    <Tabs screenOptions={{ headerTitleAlign: 'left' }}>
      {/* Главная — видят все */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="th-large" color={color} />,
        }}
      />

      {/* Мои записи — только user */}
      <Tabs.Screen
        name="enrollments"
        options={{
          title: 'Мои записи',
          href: role === 'user' ? '/enrollments' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="bookmark" color={color} />,
        }}
      />

      {/* Мои курсы — только author */}
      <Tabs.Screen
        name="my-courses"
        options={{
          title: 'Мои курсы',
          href: role === 'author' ? '/my-courses' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="book" color={color} />,
        }}
      />

      {/* Вход/Регистрация — только для гостей */}
      <Tabs.Screen
        name="auth"
        options={{
          title: 'Аккаунт',
          href: isGuest ? '/auth' : null,
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="sign-in" color={color} />,
        }}
      />

      {/* Профиль — только для авторизованных */}
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
