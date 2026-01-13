import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useSkillsStore } from '@/shared/store/skills';
import { spacing, useTheme } from '@/shared/theme';
import { Skill } from '@/shared/types/course';
import { Text, useConfirm } from '@/shared/ui';

import { SkillForm } from './SkillForm';

interface SkillItemProps {
  skill: Skill;
}

export function SkillItem({ skill }: SkillItemProps) {
  const colors = useTheme();
  const { delete: deleteSkill, isLoading } = useSkillsStore();
  const [isEditing, setIsEditing] = useState(false);
  const { confirm, dialog } = useConfirm();

  const handleDelete = () => {
    confirm(
      {
        title: 'Удалить навык?',
        message: `Вы уверены, что хотите удалить "${skill.name}"?`,
        confirmText: 'Удалить',
        cancelText: 'Отмена',
      },
      async () => {
        try {
          await deleteSkill(skill.id);
        } catch (error) {}
      }
    );
  };

  if (isEditing) {
    return (
      <>
        <SkillForm
          skill={skill}
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
            {skill.name}
          </Text>
          {skill.description && (
            <Text variant="bodySmall" style={{ color: colors.text.secondary }}>
              {skill.description}
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
