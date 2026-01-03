import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { Page } from '@/components/Page';

export default function HomeScreen() {
  return (
    <Page hasHeader>
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Витрина курсов</Text>

        <Link href="/filters" asChild>
          <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 10 }}>
            <Text>Открыть фильтры</Text>
          </Pressable>
        </Link>

        <Link href="/course/1" asChild>
          <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 14 }}>
            <Text style={{ fontWeight: '700' }}>React Native: мобильные приложения</Text>
            <Text>Открыть детальную (пример)</Text>
          </Pressable>
        </Link>
      </View>
    </Page>
  );
}
