import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Page } from '@/components/Page';
import { useAuthStore } from '@/shared/store/auth.store';

type Mode = 'login' | 'register';

export default function AuthScreen() {
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
      Alert.alert('Ошибка', (error as Error).message);
    }
  };

  const handleRegister = async () => {
    try {
      await register({ email, password, name, role });
      router.replace('/');
    } catch (error) {
      Alert.alert('Ошибка', (error as Error).message);
    }
  };

  return (
    <Page hasHeader>
      <View style={styles.container}>
        {/* Переключатель режимов */}
        <View style={styles.modeSwitch}>
          <Pressable
            style={[styles.modeButton, mode === 'login' && styles.modeButtonActive]}
            onPress={() => setMode('login')}
          >
            <Text style={[styles.modeText, mode === 'login' && styles.modeTextActive]}>Вход</Text>
          </Pressable>
          <Pressable
            style={[styles.modeButton, mode === 'register' && styles.modeButtonActive]}
            onPress={() => setMode('register')}
          >
            <Text style={[styles.modeText, mode === 'register' && styles.modeTextActive]}>
              Регистрация
            </Text>
          </Pressable>
        </View>

        {/* Форма входа */}
        {mode === 'login' && (
          <>
            <Text style={styles.hint}>
              Тестовые данные:{'\n'}user@test.com / 123456{'\n'}author@test.com / 123456
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Pressable
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? 'Загрузка...' : 'Войти'}</Text>
            </Pressable>
          </>
        )}

        {/* Форма регистрации */}
        {mode === 'register' && (
          <>
            <TextInput style={styles.input} placeholder="Имя" value={name} onChangeText={setName} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.roleContainer}>
              <Text style={styles.label}>Роль:</Text>
              <Pressable
                style={[styles.roleButton, role === 'user' && styles.roleButtonActive]}
                onPress={() => setRole('user')}
              >
                <Text style={role === 'user' && styles.roleTextActive}>Пользователь</Text>
              </Pressable>
              <Pressable
                style={[styles.roleButton, role === 'author' && styles.roleButtonActive]}
                onPress={() => setRole('author')}
              >
                <Text style={role === 'author' && styles.roleTextActive}>Автор</Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? 'Загрузка...' : 'Создать аккаунт'}</Text>
            </Pressable>
          </>
        )}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16, paddingTop: 24 },
  modeSwitch: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    padding: 4,
    marginBottom: 8,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  modeTextActive: {
    color: '#2f95dc',
  },
  hint: { fontSize: 12, color: '#666', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  roleContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '600' },
  roleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  roleButtonActive: { backgroundColor: '#2f95dc', borderColor: '#2f95dc' },
  roleTextActive: { color: '#fff' },
  button: {
    backgroundColor: '#2f95dc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
