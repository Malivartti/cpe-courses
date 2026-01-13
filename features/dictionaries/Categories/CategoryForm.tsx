import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useCategoriesStore } from '@/shared/store/categories';
import { spacing, useTheme } from '@/shared/theme';
import { Category } from '@/shared/types/course';
import { Button, Input } from '@/shared/ui';

interface CategoryFormProps {
  category?: Category;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
  const colors = useTheme();
  const { create, update, isLoading } = useCategoriesStore();
  const [name, setName] = useState(category?.name ?? '');
  const [description, setDescription] = useState(category?.description ?? '');

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (category) {
        await update(category.id, {
          name: name.trim(),
          description: description.trim() || null,
        });
      } else {
        await create({
          name: name.trim(),
          description: description.trim() || null,
        });
      }
      onSuccess();
    } catch (error) {}
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background.canvas,
          borderColor: colors.border.default,
        },
      ]}
    >
      <Input placeholder="Название категории *" value={name} onChangeText={setName} autoFocus />
      <Input
        placeholder="Описание (опционально)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <View style={styles.actions}>
        <Button
          title="Отмена"
          variant="secondary"
          onPress={onCancel}
          disabled={isLoading}
          style={styles.button}
        />
        <Button
          title={isLoading ? 'Сохранение...' : 'Сохранить'}
          onPress={handleSubmit}
          disabled={isLoading || !name.trim()}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
  },
});
