import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useLecturersStore } from '@/shared/store/lecturers';
import { spacing } from '@/shared/theme';
import { Button, Card, Text } from '@/shared/ui';

import { LecturerForm } from './LecturerForm';
import { LecturerItem } from './LecturerItem';

export function LecturersSection() {
  const { lecturers, isLoading, error, fetchLecturers } = useLecturersStore();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchLecturers();
  }, [fetchLecturers]);

  if (error) {
    return (
      <Card>
        <View style={styles.errorContainer}>
          <Text variant="body" style={styles.errorText}>
            Ошибка: {error}
          </Text>
          <Button title="Повторить" variant="secondary" onPress={() => fetchLecturers()} />
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <View style={styles.header}>
        <Text variant="h3">Преподаватели</Text>
        <Button
          title={isCreating ? 'Отмена' : 'Добавить'}
          variant={isCreating ? 'secondary' : 'primary'}
          onPress={() => setIsCreating(!isCreating)}
          disabled={isLoading}
          size="md"
        />
      </View>

      {isCreating && (
        <LecturerForm
          onSuccess={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {isLoading && lecturers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body">Загрузка...</Text>
        </View>
      ) : lecturers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body" style={styles.emptyText}>
            Нет преподавателей
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {lecturers.map((lecturer) => (
            <LecturerItem key={lecturer.id} lecturer={lecturer} />
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.sm,
  },
  centerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    opacity: 0.6,
  },
  errorContainer: {
    gap: spacing.md,
    alignItems: 'center',
  },
  errorText: {
    color: '#dc2626',
  },
});
