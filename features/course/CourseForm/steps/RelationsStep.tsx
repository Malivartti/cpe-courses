import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useCategoriesStore } from '@/shared/store/categories';
import { useLecturersStore } from '@/shared/store/lecturers';
import { useSkillsStore } from '@/shared/store/skills';
import { useTagsStore } from '@/shared/store/tags';
import { spacing, useTheme } from '@/shared/theme';
import { Category, Course, Lecturer, Skill, Tag } from '@/shared/types/course';
import { Card, Input, Text } from '@/shared/ui';

interface RelationsStepProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
}

export function RelationsStep({ data, onChange }: RelationsStepProps) {
  const colors = useTheme();
  const { categories, fetchCategories } = useCategoriesStore();
  const { skills, fetchSkills } = useSkillsStore();
  const { lecturers, fetchLecturers } = useLecturersStore();
  const { tags, fetchTags } = useTagsStore();

  const [newLocation, setNewLocation] = useState('');
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchSkills();
    fetchLecturers();
    fetchTags();
  }, []);

  const toggleCategory = (category: Category) => {
    const current = data.categories || [];
    const exists = current.find((c) => c.id === category.id);

    if (exists) {
      onChange({ categories: current.filter((c) => c.id !== category.id) });
    } else {
      onChange({ categories: [...current, category] });
    }
  };

  const toggleSkill = (skill: Skill) => {
    const current = data.acquired_skills || [];
    const exists = current.find((s) => s.id === skill.id);

    if (exists) {
      onChange({ acquired_skills: current.filter((s) => s.id !== skill.id) });
    } else {
      onChange({ acquired_skills: [...current, skill] });
    }
  };

  const toggleLecturer = (lecturer: Lecturer) => {
    const current = data.lecturers || [];
    const exists = current.find((l) => l.id === lecturer.id);

    if (exists) {
      onChange({ lecturers: current.filter((l) => l.id !== lecturer.id) });
    } else {
      onChange({ lecturers: [...current, lecturer] });
    }
  };

  const addLocation = () => {
    if (newLocation.trim()) {
      onChange({ locations: [...(data.locations || []), newLocation.trim()] });
      setNewLocation('');
    }
  };

  const removeLocation = (index: number) => {
    onChange({ locations: data.locations?.filter((_, i) => i !== index) });
  };

  const toggleTag = (tag: string) => {
    const current = data.tags || [];
    const exists = current.find((t) => t === tag);

    if (exists) {
      onChange({ tags: current.filter((t) => t !== tag) });
    } else {
      onChange({ tags: [...current, tag] });
    }
  };

  const removeTag = (tag: string) => {
    onChange({ tags: data.tags?.filter((t) => t !== tag) });
  };

  const filteredTags = tags
    .filter((tag) => tag.name.toLowerCase().includes(tagSearchQuery.toLowerCase()))
    .map((t) => t.name);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Text variant="h3" style={styles.title}>
          Категории
        </Text>
        <View style={styles.chipsContainer}>
          {categories.map((category) => {
            const isSelected = data.categories?.some((c) => c.id === category.id);
            return (
              <Pressable
                key={category.id}
                onPress={() => toggleCategory(category)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? colors.primary.subtle
                      : colors.background.surfaceElevated,
                    borderColor: isSelected ? colors.primary.default : colors.border.light,
                  },
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    color: isSelected ? colors.primary.default : colors.text.secondary,
                  }}
                >
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <Text variant="h3" style={styles.title}>
          Навыки
        </Text>
        <View style={styles.chipsContainer}>
          {skills.map((skill) => {
            const isSelected = data.acquired_skills?.some((s) => s.id === skill.id);
            return (
              <Pressable
                key={skill.id}
                onPress={() => toggleSkill(skill)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? colors.primary.subtle
                      : colors.background.surfaceElevated,
                    borderColor: isSelected ? colors.primary.default : colors.border.light,
                  },
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    color: isSelected ? colors.primary.default : colors.text.secondary,
                  }}
                >
                  {skill.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <Text variant="h3" style={styles.title}>
          Преподаватели
        </Text>
        <View style={styles.chipsContainer}>
          {lecturers.map((lecturer) => {
            const isSelected = data.lecturers?.some((l) => l.id === lecturer.id);
            return (
              <Pressable
                key={lecturer.id}
                onPress={() => toggleLecturer(lecturer)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected
                      ? colors.primary.subtle
                      : colors.background.surfaceElevated,
                    borderColor: isSelected ? colors.primary.default : colors.border.light,
                  },
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    color: isSelected ? colors.primary.default : colors.text.secondary,
                  }}
                >
                  {lecturer.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <Text variant="h3" style={styles.title}>
          Локации
        </Text>
        <View style={styles.inputWithButton}>
          <Input
            placeholder="Добавить локацию"
            value={newLocation}
            onChangeText={setNewLocation}
            onSubmitEditing={addLocation}
            style={styles.input}
          />
          <Pressable
            onPress={addLocation}
            style={[styles.addButton, { backgroundColor: colors.primary.default }]}
          >
            <FontAwesome name="plus" size={16} color={colors.text.inverse} />
          </Pressable>
        </View>
        {data.locations && data.locations.length > 0 && (
          <View style={[styles.tagsContainer, { marginTop: spacing.md }]}>
            {data.locations.map((location, index) => (
              <View
                key={index}
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.primary.subtle,
                    borderColor: colors.primary.default,
                  },
                ]}
              >
                <Text variant="bodySmall" style={{ color: colors.primary.default }}>
                  {location}
                </Text>
                <Pressable onPress={() => removeLocation(index)}>
                  <FontAwesome name="times" size={14} color={colors.primary.default} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </Card>

      <Card>
        <Text variant="h3" style={styles.title}>
          Теги
        </Text>

        <Input
          placeholder="Поиск по тегам..."
          value={tagSearchQuery}
          onChangeText={setTagSearchQuery}
          style={{ marginBottom: spacing.md }}
        />

        {filteredTags.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.chipsContainer}>
              {filteredTags.map((tag) => {
                const isSelected = data.tags?.some((t) => t === tag);
                return (
                  <Pressable
                    key={tag}
                    onPress={() => toggleTag(tag)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: isSelected
                          ? colors.primary.subtle
                          : colors.background.surfaceElevated,
                        borderColor: isSelected ? colors.primary.default : colors.border.light,
                      },
                    ]}
                  >
                    <Text
                      variant="bodySmall"
                      style={{
                        color: isSelected ? colors.primary.default : colors.text.secondary,
                      }}
                    >
                      {tag}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text variant="body" style={{ color: colors.text.tertiary, textAlign: 'center' }}>
              {tagSearchQuery
                ? 'Теги не найдены. Попробуйте изменить запрос.'
                : 'Нет доступных тегов. Создайте теги в справочнике.'}
            </Text>
          </View>
        )}

        <View style={{ marginBottom: spacing.md }} />

        {data.tags && data.tags.length > 0 && (
          <View style={styles.section}>
            <Text variant="label" style={styles.sectionLabel}>
              Выбранные теги ({data.tags.length})
            </Text>
            <View style={styles.tagsContainer}>
              {data.tags.map((tag) => (
                <View
                  key={tag}
                  style={[
                    styles.tag,
                    {
                      backgroundColor: colors.primary.subtle,
                      borderColor: colors.primary.default,
                    },
                  ]}
                >
                  <Text variant="bodySmall" style={{ color: colors.primary.default }}>
                    {tag}
                  </Text>
                  <Pressable onPress={() => removeTag(tag)}>
                    <FontAwesome name="times" size={14} color={colors.primary.default} />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    marginBottom: spacing.md,
  },
  section: {
    gap: spacing.sm,
  },
  sectionLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    borderWidth: 1,
  },
  inputWithButton: {
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    borderWidth: 1,
  },
  emptyState: {
    paddingVertical: spacing.xl,
  },
});
