import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

export function AppTabs() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: 'left' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="th-large" color={color} />,
        }}
      />
      <Tabs.Screen
        name="enrollments"
        options={{
          title: 'Мои записи',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="bookmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <FontAwesome size={22} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
