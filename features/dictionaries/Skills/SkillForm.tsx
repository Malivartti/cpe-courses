import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useSkillsStore } from '@/shared/store/skills';
import { spacing, useTheme } from '@/shared/theme';
import { Skill } from '@/shared/types/course';
import { Button, Input } from '@/shared/ui';

interface SkillFormProps {
  skill?: Skill;
  onSuccess: () => void;
  onCancel: () => void;
}

export function SkillForm({ skill, onSuccess, onCancel }: SkillFormProps) {
  const colors = useTheme();
  const { create, update, isLoading } = useSkillsStore();
  const [name, setName] = useState(skill?.name ?? '');
  const [description, setDescription] = useState(skill?.description ?? '');

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (skill) {
        await update(skill.id, {
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
      <Input placeholder="Название навыка *" value={name} onChangeText={setName} autoFocus />
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
