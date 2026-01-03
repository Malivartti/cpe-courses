import { Text, View } from 'react-native';

import { Page } from '@/components/Page';

export default function ProfileScreen() {
  return (
    <Page hasHeader>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Профиль</Text>
        <Text>Гость / Пользователь / Автор (позже)</Text>
      </View>
    </Page>
  );
}
