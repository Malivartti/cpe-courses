import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Page } from '@/components/Page';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Page hasHeader>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Курс #{id}</Text>
        <Text>Детальная курса (заглушка)</Text>
      </View>
    </Page>
  );
}
