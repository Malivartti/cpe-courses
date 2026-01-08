import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { CourseDetails } from '@/shared/types/course';
import { Card, Text } from '@/shared/ui';

interface CourseModulesProps {
  course: CourseDetails;
}

export function CourseModules({ course }: CourseModulesProps) {
  const colors = useTheme();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  if (!course.modules || course.modules.length === 0) return null;

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  return (
    <Card>
      <Text variant="h3" style={styles.title}>
        Модули курса
      </Text>
      <View>
        {course.modules.map((module) => {
          const isExpanded = expandedModules.has(module.id);

          return (
            <View key={module.id} style={styles.moduleContainer}>
              <Pressable style={[styles.moduleHeader]} onPress={() => toggleModule(module.id)}>
                <Text variant="body" style={styles.moduleTitle}>
                  {module.order}. {module.title}
                </Text>
                <FontAwesome
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.text.tertiary}
                />
              </Pressable>

              {isExpanded && (
                <View style={styles.moduleContent}>
                  <Text variant="body">{module.description}</Text>
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
  moduleContainer: {
    borderRadius: spacing.sm,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  moduleTitle: {
    flex: 1,
    fontWeight: '600',
  },
  moduleContent: {
    paddingHorizontal: spacing.md,
  },
});
