import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTagsStore } from '@/shared/store/tags';
import { spacing, useTheme } from '@/shared/theme';
import { Tag } from '@/shared/types/course';
import { Button, Input } from '@/shared/ui';

interface TagFormProps {
  tag?: Tag;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TagForm({ tag, onSuccess, onCancel }: TagFormProps) {
  const colors = useTheme();
  const { create, update, isLoading } = useTagsStore();
  const [value, setValue] = useState(tag?.name ?? '');

  const handleSubmit = async () => {
    if (!value.trim()) return;

    try {
      if (tag) {
        await update(tag.id, { name: value.trim() });
      } else {
        await create({ name: value.trim() });
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
      <Input placeholder="Название тега *" value={value} onChangeText={setValue} autoFocus />

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
          disabled={isLoading || !value.trim()}
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
