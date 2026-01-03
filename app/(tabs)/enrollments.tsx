import { Text, View } from 'react-native';

import { Page } from '@/components/Page';

export default function EnrollmentsScreen() {
  return (
    <Page hasHeader>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Мои записи</Text>
        <Text>Пока пусто (заглушка)</Text>
      </View>
    </Page>
  );
}
