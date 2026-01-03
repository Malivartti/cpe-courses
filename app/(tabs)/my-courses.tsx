import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { Page } from '@/components/Page';
import { useAuthStore } from '@/shared/store/auth.store';

export default function MyCoursesScreen() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.role !== 'author') {
      router.replace('/');
    }
  }, [user]);

  if (user?.role !== 'author') {
    return null;
  }

  return (
    <Page hasHeader>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Мои курсы (автор)</Text>
        <Text>Список курсов автора (заглушка)</Text>
      </View>
    </Page>
  );
}
