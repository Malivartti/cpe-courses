import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { useProtectedRoute } from '@/shared/hooks/useProtectedRoute';
import { useEnrollmentsStore } from '@/shared/store/enrollments';
import { spacing, useTheme } from '@/shared/theme';
import { EnrollmentReadModel } from '@/shared/types/enrollment.api';
import { Button, Card, Text } from '@/shared/ui';

interface EnrollmentCardProps {
  enrollment: EnrollmentReadModel;
}

function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const colors = useTheme();

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('T')[0].split('-');
    return `${day}.${month}.${year}`;
  };

  return (
    <Card>
      <View style={styles.enrollmentHeader}>
        <Text variant="h3">{enrollment.full_name}</Text>
        <Text variant="caption" style={{ color: colors.text.tertiary }}>
          {formatDate(enrollment.created_at)}
        </Text>
      </View>

      <View style={styles.enrollmentInfo}>
        <View style={styles.infoRow}>
          <Text variant="body">Почта</Text>
          <Text variant="body" style={styles.infoValue}>
            {enrollment.email}
          </Text>
        </View>

        {enrollment.phone && (
          <View style={styles.infoRow}>
            <Text variant="body">Телефон</Text>
            <Text variant="body" style={styles.infoValue}>
              {enrollment.phone}
            </Text>
          </View>
        )}

        {enrollment.message && (
          <View style={styles.messageBlock}>
            <Text variant="body">Сообщение:</Text>
            <Text variant="body">{enrollment.message}</Text>
          </View>
        )}
      </View>
    </Card>
  );
}

export default function CourseEnrollmentsScreen() {
  const isAllowed = useProtectedRoute({
    type: 'role',
    allowedRoles: ['admin'],
    redirectTo: '/auth',
  });

  const { id } = useLocalSearchParams<{ id: string }>();
  const { enrollments, isLoading, error, fetchEnrollments } = useEnrollmentsStore();
  const colors = useTheme();

  useEffect(() => {
    if (id) {
      fetchEnrollments(id);
    }
  }, [id]);

  if (!isAllowed) {
    return null;
  }

  if (error) {
    return (
      <Page hasHeader>
        <View style={styles.centerContainer}>
          <Card>
            <View style={styles.errorContainer}>
              <Text variant="body" style={{ color: colors.error.default }}>
                {error}
              </Text>
              <Button
                title="Повторить"
                variant="secondary"
                onPress={() => id && fetchEnrollments(id)}
              />
            </View>
          </Card>
        </View>
      </Page>
    );
  }

  return (
    <Page hasHeader>
      <View style={styles.header}>
        <Text variant="h2">Записавшиеся на курс</Text>
        <Text variant="body" style={{ opacity: 0.7 }}>
          Всего записей: {enrollments.length}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <Text variant="body">Загрузка...</Text>
        </View>
      ) : enrollments.length === 0 ? (
        <View style={styles.centerContainer}>
          <Card>
            <Text variant="body" style={{ textAlign: 'center', opacity: 0.6 }}>
              Пока нет записей на этот курс
            </Text>
          </Card>
        </View>
      ) : (
        <FlatList
          data={enrollments}
          keyExtractor={(e) => e.enrollment_id}
          renderItem={({ item }) => <EnrollmentCard enrollment={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  errorContainer: {
    gap: spacing.md,
    alignItems: 'center',
  },
  enrollmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  enrollmentInfo: {
    gap: spacing.sm,
  },
  messageBlock: {
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: '600',
  },
});
