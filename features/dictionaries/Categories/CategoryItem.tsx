import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useCategoriesStore } from '@/shared/store/categories';
import { spacing, useTheme } from '@/shared/theme';
import { Category } from '@/shared/types/course';
import { Text, useConfirm } from '@/shared/ui';

import { CategoryForm } from './CategoryForm';

interface CategoryItemProps {
  category: Category;
}

export function CategoryItem({ category }: CategoryItemProps) {
  const colors = useTheme();
  const { delete: deleteCategory, isLoading } = useCategoriesStore();
  const [isEditing, setIsEditing] = useState(false);
  const { confirm, dialog } = useConfirm();

  const handleDelete = () => {
    confirm(
      {
        title: 'Удалить категорию?',
        message: `Вы уверены, что хотите удалить "${category.name}"?`,
        confirmText: 'Удалить',
        cancelText: 'Отмена',
      },
      async () => {
        try {
          await deleteCategory(category.id);
        } catch (error) {}
      }
    );
  };

  if (isEditing) {
    return (
      <>
        <CategoryForm
          category={category}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
        {dialog}
      </>
    );
  }

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background.surfaceElevated,
            borderColor: colors.border.light,
          },
        ]}
      >
        <View style={styles.content}>
          <Text variant="body" style={styles.name}>
            {category.name}
          </Text>
          {category.description && (
            <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
              {category.description}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => setIsEditing(true)}
            disabled={isLoading}
            style={[styles.iconButton, { opacity: isLoading ? 0.5 : 1 }]}
          >
            <FontAwesome name="edit" size={18} color={colors.primary.default} />
          </Pressable>
          <Pressable
            onPress={handleDelete}
            disabled={isLoading}
            style={[styles.iconButton, { opacity: isLoading ? 0.5 : 1 }]}
          >
            <FontAwesome name="trash" size={18} color={colors.error.default} />
          </Pressable>
        </View>
      </View>
      {dialog}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
});
