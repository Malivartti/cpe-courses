import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { useProtectedRoute } from '@/shared/hooks/useProtectedRoute';
import { useAuthStore } from '@/shared/store/auth.store';
import { spacing } from '@/shared/theme';
import { Button, Container, Input, RadioGroup, SegmentedControl } from '@/shared/ui';

type Mode = 'login' | 'register';

export default function AuthScreen() {
  const { isAllowed } = useProtectedRoute({ type: 'guest-only', redirectTo: '/' });

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('user1@test.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'user' | 'author'>('user');

  const { login, register, isLoading } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      router.replace('/');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleRegister = async () => {
    try {
      await register({ email, password, name, role });
      router.replace('/');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  if (!isAllowed) {
    return null;
  }

  return (
    <Page hasHeader hasTabs>
      <Container maxWidth="sm" centered>
        <View style={styles.content}>
          <SegmentedControl
            options={[
              { value: 'login', label: 'Вход' },
              { value: 'register', label: 'Регистрация' },
            ]}
            value={mode}
            onChange={(value) => setMode(value as Mode)}
          />

          {mode === 'login' && (
            <>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Button
                title={isLoading ? 'Вход...' : 'Войти'}
                onPress={handleLogin}
                disabled={isLoading}
              />
            </>
          )}

          {mode === 'register' && (
            <>
              <Input placeholder="Имя" value={name} onChangeText={setName} />

              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <RadioGroup
                label="Роль"
                options={[
                  { value: 'user', label: 'Студент' },
                  { value: 'author', label: 'Автор' },
                ]}
                value={role}
                onChange={(value) => setRole(value as 'user' | 'author')}
              />

              <Button
                title={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                onPress={handleRegister}
                disabled={isLoading}
              />
            </>
          )}
        </View>
      </Container>
    </Page>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
});
