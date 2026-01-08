import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { CourseDetails } from '@/shared/types/course';
import { Card, Divider, Text } from '@/shared/ui';

interface CourseInstructorsProps {
  course: CourseDetails;
}

export function CourseInstructors({ course }: CourseInstructorsProps) {
  if (!course.instructors || course.instructors.length === 0) return null;

  return (
    <Card>
      <Text variant="h3" style={styles.title}>
        Преподаватели
      </Text>
      {course.instructors.map((instructor, index) => (
        <View key={instructor.id}>
          {index > 0 && <Divider />}
          <View style={styles.instructor}>
            <Text variant="body" style={styles.instructorName}>
              {instructor.fullName}
            </Text>
            <View style={styles.competencies}>
              {instructor.competencies.map((comp, compIndex) => (
                <View key={compIndex} style={styles.competencyItem}>
                  <Text variant="caption">•</Text>
                  <Text variant="bodySmall" style={{ flex: 1 }}>
                    {comp}
                  </Text>
                </View>
              ))}
            </View>
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
