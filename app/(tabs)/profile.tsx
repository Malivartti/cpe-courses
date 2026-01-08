import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { useBreakpoint } from '@/components/useBreakpoint';
import { useProtectedRoute } from '@/shared/hooks/useProtectedRoute';
import { useAuthStore } from '@/shared/store/auth.store';
import { spacing } from '@/shared/theme';
import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  InfoRow,
  Text,
  ThemeSelector,
  useConfirm,
} from '@/shared/ui';

export default function ProfileScreen() {
  const { isAllowed } = useProtectedRoute({ type: 'auth-only', redirectTo: '/auth' });

  const { user, logout, isLoading } = useAuthStore();
  const { isPhone } = useBreakpoint();
  const { confirm, dialog } = useConfirm();

  const handleLogout = async () => {
    confirm(
      {
        title: 'Выход',
        message: 'Вы уверены, что хотите выйти?',
        confirmText: 'Выйти',
        cancelText: 'Отмена',
      },
      async () => {
        await logout();
        router.replace('/');
      }
    );
  };

  if (!isAllowed || !user) {
    return null;
  }

  return (
    <Page hasHeader>
      <Container maxWidth="md" centered>
        <View style={styles.content}>
          {/* Карточка с информацией */}
          <Card>
            <InfoRow label="Имя" value={user.name} />

            <Divider />

            <InfoRow label="Email" value={user.email} />

            <Divider />

            <InfoRow
              label="Роль"
              value={
                <Badge
                  label={user.role === 'user' ? 'Студент' : 'Автор'}
                  variant={user.role === 'author' ? 'success' : 'primary'}
                />
              }
            />
          </Card>

          {/* Настройки темы */}
          <Card>
            <View style={styles.themeSection}>
              <Text variant="label" style={styles.themeLabel}>
                Тема приложения
              </Text>
              <ThemeSelector />
            </View>
          </Card>

          {/* Кнопка выхода */}
          <Button
            title={isLoading ? 'Выход...' : 'Выйти'}
            variant="error"
            onPress={handleLogout}
            disabled={isLoading}
            style={isPhone ? undefined : styles.logoutButton}
          />
        </View>
      </Container>

      {dialog}
    </Page>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
  },
  themeSection: {
    gap: spacing.md,
  },
  themeLabel: {
    fontWeight: '600',
  },
  logoutButton: {
    alignSelf: 'center',
  },
});
