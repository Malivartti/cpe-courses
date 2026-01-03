import { Text, View } from 'react-native';

import { Page } from '@/components/Page';

export default function FiltersScreen() {
  return (
    <Page hasHeader>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Фильтры</Text>
        <Text>Формат • Вид образования • Стоимость (позже)</Text>
      </View>
    </Page>
  );
}
