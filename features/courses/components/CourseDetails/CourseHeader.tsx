import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '@/shared/theme';
import { CourseDetails } from '@/shared/types/course';
import { Badge, Text } from '@/shared/ui';

interface CourseHeaderProps {
  course: CourseDetails;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const hasDiscount = course.discountPrice !== undefined;

  return (
    <View style={styles.header}>
      <Text variant="h1">{course.title}</Text>
      <View style={styles.badges}>
        <Badge label={course.direction.name} variant="primary" />
        <Badge label={course.format.name} variant="info" />
        {hasDiscount && <Badge label="Скидка" variant="success" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
});
