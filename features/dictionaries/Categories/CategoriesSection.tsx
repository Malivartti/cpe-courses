import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useCategoriesStore } from '@/shared/store/categories';
import { spacing } from '@/shared/theme';
import { Button, Card, Text } from '@/shared/ui';

import { CategoryForm } from './CategoryForm';
import { CategoryItem } from './CategoryItem';

export function CategoriesSection() {
  const { categories, isLoading, error, fetchCategories } = useCategoriesStore();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (error) {
    return (
      <Card>
        <View style={styles.errorContainer}>
          <Text variant="body" style={styles.errorText}>
            Ошибка: {error}
          </Text>
          <Button title="Повторить" variant="secondary" onPress={() => fetchCategories()} />
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <View style={styles.header}>
        <Text variant="h3">Категории</Text>
        <Button
          title={isCreating ? 'Отмена' : 'Добавить'}
          variant={isCreating ? 'secondary' : 'primary'}
          onPress={() => setIsCreating(!isCreating)}
          disabled={isLoading}
          size="md"
        />
      </View>

      {isCreating && (
        <CategoryForm
          onSuccess={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {isLoading && categories.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body">Загрузка...</Text>
        </View>
      ) : categories.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text variant="body" style={styles.emptyText}>
            Нет категорий
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
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
