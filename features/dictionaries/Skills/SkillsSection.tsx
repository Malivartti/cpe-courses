import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSkillsStore } from '@/shared/store/skills';
import { spacing } from '@/shared/theme';
import { Button, Card, Text } from '@/shared/ui';

import { SkillForm } from './SkillForm';
import { SkillItem } from './SkillItem';

export function SkillsSection() {
  const { skills, isLoading, error, fetchSkills } = useSkillsStore();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  if (error) {
    return (
      <Card>
        <View style={styles.errorContainer}>
          <Text variant="body" style={styles.errorText}>
            Ошибка: {error}
          </Text>
          <Button title="Повторить" variant="secondary" onPress={() => fetchSkills()} />
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <View style={styles.header}>
        <Text variant="h3">Навыки</Text>
        <Button
          title={isCreating ? 'Отмена' : 'Добавить'}
          variant={isCreating ? 'secondary' : 'primary'}
          onPress={() => setIsCreating(!isCreating)}
          disabled={isLoading}
          size="md"
        />
      </View>

      {isCreating && (
        <SkillForm onSuccess={() => setIsCreating(false)} onCancel={() => setIsCreating(false)} />
      )}

      {isLoading && skills.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body">Загрузка...</Text>
        </View>
      ) : skills.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body" style={styles.emptyText}>
            Нет навыков
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {skills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
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
