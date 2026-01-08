import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/shared/ui/Text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Упс!' }} />
      <View style={styles.container}>
        <Text variant="h3" style={styles.title}>
          Страница не найдена
        </Text>
        <Link href="/" style={styles.link}>
          <Text variant="link">Вернуться на главный экран</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {},
  link: {
    paddingVertical: 15,
  },
});
