import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Card, Text } from '@/shared/ui';

interface CourseModulesProps {
  course: Course;
}

export function CourseModules({ course }: CourseModulesProps) {
  const colors = useTheme();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  if (!course.sections || course.sections.length === 0) {
    return null;
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <Card>
      <Text variant="h3" style={styles.title}>
        Программа курса
      </Text>
      <View>
        {course.sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          return (
            <View key={section.id} style={styles.sectionContainer}>
              <Pressable style={styles.sectionHeader} onPress={() => toggleSection(section.id)}>
                <View style={{ flex: 1 }}>
                  <Text variant="body" style={styles.sectionTitle}>
                    {section.order}. {section.name}
                  </Text>
                  {section.hours && (
                    <Text variant="caption" style={{ color: colors.text.tertiary }}>
                      {section.hours} часов
                    </Text>
                  )}
                </View>
                <FontAwesome
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.text.tertiary}
                />
              </Pressable>
              {isExpanded && section.description && (
                <View style={styles.sectionContent}>
                  <Text variant="body">{section.description}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  sectionContainer: {
    borderRadius: spacing.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  sectionContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});
