import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTagsStore } from '@/shared/store/tags';
import { spacing } from '@/shared/theme';
import { Button, Card, Text } from '@/shared/ui';

import { TagForm } from './TagForm';
import { TagItem } from './TagItem';

export function TagsSection() {
  const { tags, isLoading, error, fetchTags } = useTagsStore();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  if (error) {
    return (
      <Card>
        <View style={styles.errorContainer}>
          <Text variant="body" style={styles.errorText}>
            Ошибка: {error}
          </Text>
          <Button title="Повторить" variant="secondary" onPress={() => fetchTags()} />
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <View style={styles.header}>
        <Text variant="h3">Теги</Text>
        <Button
          title={isCreating ? 'Отмена' : 'Добавить'}
          variant={isCreating ? 'secondary' : 'primary'}
          onPress={() => setIsCreating(!isCreating)}
          disabled={isLoading}
          size="md"
        />
      </View>

      {isCreating && (
        <TagForm onSuccess={() => setIsCreating(false)} onCancel={() => setIsCreating(false)} />
      )}

      {isLoading && tags.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body">Загрузка...</Text>
        </View>
      ) : tags.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body" style={styles.emptyText}>
            Нет тегов
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {tags.map((tag) => (
            <TagItem key={tag.id} tag={tag} />
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
