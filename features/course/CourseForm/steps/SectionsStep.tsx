import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Course, CourseSection } from '@/shared/types/course';
import { Button, Card, Input, Text } from '@/shared/ui';

interface SectionsStepProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export function SectionsStep({ data, onChange }: SectionsStepProps) {
  const colors = useTheme();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [sectionForm, setSectionForm] = useState<Partial<CourseSection>>({
    name: '',
    description: null,
    order: 0,
    hours: null,
  });

  const sections = data.sections || [];

  const normalizeOrder = (sections: CourseSection[]): CourseSection[] => {
    return sections.map((section, index) => ({
      ...section,
      order: index,
    }));
  };

  const resetForm = () => {
    setSectionForm({
      name: '',
      description: null,
      order: sections.length,
      hours: null,
    });
    setEditingIndex(null);
  };

  const handleAdd = () => {
    if (!sectionForm.name?.trim()) return;

    const newSection: CourseSection = {
      id: `temp-${Date.now()}`,
      name: sectionForm.name.trim(),
      description: sectionForm.description?.trim() || null,
      order: sections.length,
      hours: sectionForm.hours ?? null,
    };

    onChange({ sections: normalizeOrder([...sections, newSection]) });
    resetForm();
  };

  const handleEdit = (index: number) => {
    const section = sections[index];
    setSectionForm(section);
    setEditingIndex(index);
  };

  const handleUpdate = () => {
    if (editingIndex === null || !sectionForm.name?.trim()) return;

    const updatedSections = sections.map((section, i) =>
      i === editingIndex
        ? {
            ...section,
            name: sectionForm.name!.trim(),
            description: sectionForm.description?.trim() || null,
            order: sectionForm.order || 0,
            hours: sectionForm.hours ?? null,
          }
        : section
    );

    onChange({ sections: normalizeOrder(updatedSections) });
    resetForm();
  };

  const handleDelete = (index: number) => {
    const filtered = sections.filter((_, i) => i !== index);
    onChange({ sections: normalizeOrder(filtered) });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    onChange({ sections: normalizeOrder(newSections) });
  };

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    onChange({ sections: normalizeOrder(newSections) });
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text variant="h3" style={styles.title}>
          {editingIndex !== null ? 'Редактирование модулей' : 'Добавить модуль'}
        </Text>

        <View style={styles.form}>
          <Input
            placeholder="Название *"
            value={sectionForm.name}
            onChangeText={(name) => setSectionForm({ ...sectionForm, name })}
          />

          <Input
            placeholder="Описание"
            value={sectionForm.description ?? ''}
            onChangeText={(description) => setSectionForm({ ...sectionForm, description })}
            multiline
            numberOfLines={3}
          />

          <Input
            placeholder="Часы"
            value={sectionForm.hours?.toString() ?? ''}
            onChangeText={(value) =>
              setSectionForm({ ...sectionForm, hours: value ? parseInt(value) : null })
            }
            keyboardType="numeric"
            style={styles.halfInput}
          />

          <View style={styles.buttonRow}>
            {editingIndex !== null && (
              <Button
                title="Отмена"
                variant="secondary"
                onPress={resetForm}
                style={styles.button}
              />
            )}
            <Button
              title={editingIndex !== null ? 'Обновить' : 'Добавить'}
              onPress={editingIndex !== null ? handleUpdate : handleAdd}
              disabled={!sectionForm.name?.trim()}
              style={styles.button}
            />
          </View>
        </View>
      </Card>

      {sections.length > 0 && (
        <Card>
          <Text variant="h3" style={styles.title}>
            Модули ({sections.length})
          </Text>

          <View style={styles.sectionsList}>
            {sections.map((section, index) => (
              <View
                key={section.id || index}
                style={[
                  styles.sectionItem,
                  {
                    backgroundColor: colors.background.surfaceElevated,
                    borderColor: colors.border.light,
                  },
                ]}
              >
                <View style={styles.sectionContent}>
                  <View style={styles.sectionHeader}>
                    <View style={{ marginRight: spacing.md }}>
                      <Pressable
                        onPress={() => handleMoveUp(index)}
                        disabled={index === 0}
                        style={[styles.iconButton, { opacity: index === 0 ? 0.3 : 1 }]}
                      >
                        <FontAwesome name="arrow-up" size={16} color={colors.text.secondary} />
                      </Pressable>
                      <Pressable
                        onPress={() => handleMoveDown(index)}
                        disabled={index === sections.length - 1}
                        style={[
                          styles.iconButton,
                          { opacity: index === sections.length - 1 ? 0.3 : 1 },
                        ]}
                      >
                        <FontAwesome name="arrow-down" size={16} color={colors.text.secondary} />
                      </Pressable>
                    </View>

                    <Text variant="body" style={styles.sectionName}>
                      {section.order + 1}. {section.name}
                    </Text>
                    {section.hours && (
                      <Text variant="caption" style={{ color: colors.text.tertiary }}>
                        {section.hours} ч
                      </Text>
                    )}
                  </View>
                  {section.description && (
                    <Text
                      variant="bodySmall"
                      numberOfLines={2}
                      style={{ color: colors.text.secondary }}
                    >
                      {section.description}
                    </Text>
                  )}
                </View>

                <View style={styles.sectionActions}>
                  <Pressable onPress={() => handleEdit(index)} style={styles.iconButton}>
                    <FontAwesome name="edit" size={16} color={colors.primary.default} />
                  </Pressable>
                  <Pressable onPress={() => handleDelete(index)} style={styles.iconButton}>
                    <FontAwesome name="trash" size={16} color={colors.error.default} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
  },
  sectionsList: {
    gap: spacing.sm,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    gap: spacing.md,
  },
  sectionContent: {
    flex: 1,
    gap: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionName: {
    fontWeight: '600',
    flex: 1,
  },
  sectionActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  iconButton: {
    padding: spacing.xs,
  },
});
