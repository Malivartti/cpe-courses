import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Card, Divider, Text } from '@/shared/ui';

interface CourseInstructorsProps {
  course: Course;
}

export function CourseInstructors({ course }: CourseInstructorsProps) {
  if (!course.lecturers || course.lecturers.length === 0) {
    return null;
  }

  return (
    <Card>
      <Text variant="h3" style={styles.title}>
        Преподаватели
      </Text>
      {course.lecturers.map((lecturer, index) => (
        <View key={lecturer.id}>
          {index > 0 && <Divider />}
          <View style={styles.instructor}>
            <Text variant="body" style={styles.instructorName}>
              {lecturer.name}
            </Text>
            {lecturer.position && (
              <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                {lecturer.position}
              </Text>
            )}
            {lecturer.bio && (
              <Text variant="bodySmall" style={{ marginTop: spacing.xs }}>
                {lecturer.bio}
              </Text>
            )}
            {lecturer.competencies && lecturer.competencies.length > 0 && (
              <View style={styles.competencies}>
                {lecturer.competencies.map((comp, compIndex) => (
                  <View key={compIndex} style={styles.competencyItem}>
                    <Text variant="caption">•</Text>
                    <Text variant="bodySmall" style={{ flex: 1 }}>
                      {comp}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  instructor: {
    gap: spacing.sm,
  },
  instructorName: {
    fontWeight: '600',
  },
  competencies: {
    gap: spacing.xs,
  },
  competencyItem: {
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
});
