import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTagsStore } from '@/shared/store/tags';
import { spacing, useTheme } from '@/shared/theme';
import { Tag } from '@/shared/types/course';
import { Text, useConfirm } from '@/shared/ui';

import { TagForm } from './TagForm';

interface TagItemProps {
  tag: Tag;
}

export function TagItem({ tag }: TagItemProps) {
  const colors = useTheme();
  const { delete: deleteTag, isLoading } = useTagsStore();
  const [isEditing, setIsEditing] = useState(false);
  const { confirm, dialog } = useConfirm();

  const handleDelete = () => {
    confirm(
      {
        title: 'Удалить тег?',
        message: `Вы уверены, что хотите удалить "${tag.name}"?`,
        confirmText: 'Удалить',
        cancelText: 'Отмена',
      },
      async () => {
        try {
          await deleteTag(tag.id);
        } catch (error) {}
      }
    );
  };

  if (isEditing) {
    return (
      <>
        <TagForm
          tag={tag}
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
        <Text variant="body" style={styles.name}>
          {tag.name}
        </Text>

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
  },
  name: {
    fontWeight: '600',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
});
