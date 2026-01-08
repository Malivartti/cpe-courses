import { Stack } from 'expo-router';
import React from 'react';

import { AppTabs } from '@/components/AppTabs';
import { useBreakpoint } from '@/components/useBreakpoint';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function DesktopWebStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="enrollments" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}

export default function TabsLayoutWeb() {
  const { isPhone } = useBreakpoint();

  const isClient = useClientOnlyValue(false, true);

  if (!isClient) return <DesktopWebStack />;

  return isPhone ? <AppTabs /> : <DesktopWebStack />;
}
