import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useLecturersStore } from '@/shared/store/lecturers';
import { spacing, useTheme } from '@/shared/theme';
import { Lecturer } from '@/shared/types/course';
import { Text, useConfirm } from '@/shared/ui';

import { LecturerForm } from './LecturerForm';

interface LecturerItemProps {
  lecturer: Lecturer;
}

export function LecturerItem({ lecturer }: LecturerItemProps) {
  const colors = useTheme();
  const { delete: deleteLecturer, isLoading } = useLecturersStore();
  const [isEditing, setIsEditing] = useState(false);
  const { confirm, dialog } = useConfirm();

  const handleDelete = () => {
    confirm(
      {
        title: 'Удалить преподавателя?',
        message: `Вы уверены, что хотите удалить "${lecturer.name}"?`,
        confirmText: 'Удалить',
        cancelText: 'Отмена',
      },
      async () => {
        try {
          await deleteLecturer(lecturer.id);
        } catch (error) {}
      }
    );
  };

  if (isEditing) {
    return (
      <>
        <LecturerForm
          lecturer={lecturer}
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
          <View style={styles.mainInfo}>
            <Text variant="body" style={styles.name}>
              {lecturer.name}
            </Text>
            {lecturer.position && (
              <Text variant="caption" style={{ color: colors.text.secondary }}>
                {lecturer.position}
              </Text>
            )}
          </View>

          {lecturer.bio && (
            <Text variant="bodySmall" numberOfLines={2} style={{ color: colors.text.secondary }}>
              {lecturer.bio}
            </Text>
          )}

          {lecturer.competencies && lecturer.competencies.length > 0 && (
            <View style={styles.competencies}>
              {lecturer.competencies.slice(0, 3).map((comp, index) => (
                <View
                  key={index}
                  style={[styles.competencyBadge, { backgroundColor: colors.primary.subtle }]}
                >
                  <Text variant="caption" style={{ color: colors.primary.default }}>
                    {comp}
                  </Text>
                </View>
              ))}
              {lecturer.competencies.length > 3 && (
                <Text variant="caption" style={{ color: colors.text.tertiary }}>
                  +{lecturer.competencies.length - 3}
                </Text>
              )}
            </View>
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
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.sm,
  },
  mainInfo: {
    gap: spacing.xs,
  },
  name: {
    fontWeight: '600',
  },
  competencies: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  competencyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
});
