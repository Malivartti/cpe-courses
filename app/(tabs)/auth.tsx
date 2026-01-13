import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { useProtectedRoute } from '@/shared/hooks/useProtectedRoute';
import { useAuthStore } from '@/shared/store/auth';
import { spacing, useTheme } from '@/shared/theme';
import { Button, Container, Input, SegmentedControl, Text } from '@/shared/ui';

type Mode = 'login' | 'register';

export default function AuthScreen() {
  const { isAllowed } = useProtectedRoute({ type: 'guest-only', redirectTo: '/' });

  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const colors = useTheme();
  const { login, register, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login({ username: email, password });
      router.replace('/');
    } catch (error) {}
  };

  const handleRegister = async () => {
    try {
      await register({ email, username, password });
      router.replace('/');
    } catch (error) {}
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
            onChange={(value) => {
              setMode(value as Mode);
              clearError();
            }}
          />

          {error && (
            <View style={[styles.errorContainer, { backgroundColor: colors.error.subtle }]}>
              <Text style={{ color: colors.error.default }}>{error}</Text>
            </View>
          )}

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
              <Input placeholder="Имя пользователя" value={username} onChangeText={setUsername} />

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
  errorContainer: {
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
