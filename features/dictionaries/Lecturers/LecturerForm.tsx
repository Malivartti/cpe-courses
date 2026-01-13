import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useLecturersStore } from '@/shared/store/lecturers';
import { spacing, useTheme } from '@/shared/theme';
import { Lecturer } from '@/shared/types/course';
import { Button, Input, Text } from '@/shared/ui';

interface LecturerFormProps {
  lecturer?: Lecturer;
  onSuccess: () => void;
  onCancel: () => void;
}

export function LecturerForm({ lecturer, onSuccess, onCancel }: LecturerFormProps) {
  const colors = useTheme();
  const { create, update, isLoading } = useLecturersStore();
  const [name, setName] = useState(lecturer?.name ?? '');
  const [position, setPosition] = useState(lecturer?.position ?? '');
  const [bio, setBio] = useState(lecturer?.bio ?? '');
  const [competencies, setCompetencies] = useState<string[]>(lecturer?.competencies ?? []);
  const [newCompetency, setNewCompetency] = useState('');

  const handleAddCompetency = () => {
    const trimmed = newCompetency.trim();
    if (trimmed && !competencies.includes(trimmed)) {
      setCompetencies([...competencies, trimmed]);
      setNewCompetency('');
    }
  };

  const handleRemoveCompetency = (index: number) => {
    setCompetencies(competencies.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      if (lecturer) {
        await update(lecturer.id, {
          name: name.trim(),
          position: position.trim() || null,
          bio: bio.trim() || null,
          competencies,
        });
      } else {
        await create({
          name: name.trim(),
          position: position.trim() || null,
          bio: bio.trim() || null,
          competencies,
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
      <Input placeholder="Имя преподавателя *" value={name} onChangeText={setName} autoFocus />
      <Input placeholder="Должность (опционально)" value={position} onChangeText={setPosition} />
      <Input
        placeholder="Биография (опционально)"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3}
      />

      <View style={styles.competenciesSection}>
        <Text variant="label">Компетенции</Text>

        <View style={styles.competencyInput}>
          <Input
            placeholder="Добавить компетенцию"
            value={newCompetency}
            onChangeText={setNewCompetency}
            onSubmitEditing={handleAddCompetency}
            style={styles.input}
          />
          <Pressable
            onPress={handleAddCompetency}
            disabled={!newCompetency.trim()}
            style={[
              styles.addButton,
              {
                backgroundColor: colors.primary.default,
                opacity: !newCompetency.trim() ? 0.5 : 1,
              },
            ]}
          >
            <FontAwesome name="plus" size={16} color={colors.text.inverse} />
          </Pressable>
        </View>

        {competencies.length > 0 && (
          <View style={styles.competenciesList}>
            {competencies.map((comp, index) => (
              <View
                key={index}
                style={[
                  styles.competencyTag,
                  {
                    backgroundColor: colors.primary.subtle,
                    borderColor: colors.primary.default,
                  },
                ]}
              >
                <Text variant="bodySmall" style={{ color: colors.primary.default }}>
                  {comp}
                </Text>
                <Pressable onPress={() => handleRemoveCompetency(index)}>
                  <FontAwesome name="times" size={14} color={colors.primary.default} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </View>

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
  competenciesSection: {
    gap: spacing.sm,
  },
  competencyInput: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  competenciesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  competencyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
  },
});
