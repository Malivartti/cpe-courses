import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useBreakpoint } from '@/components/useBreakpoint';
import { useAuthStore } from '@/shared/store/auth';
import { spacing } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Badge, Button, Text } from '@/shared/ui';

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'admin';
  const { isDesktop } = useBreakpoint();

  return (
    <View style={styles.header}>
      <View style={isDesktop ? styles.titleDesktop : styles.titleMobile}>
        <Text variant="h1">{course.title}</Text>
        {isAdmin && (
          <View style={styles.adminButtons}>
            <Button
              title="Редактировать"
              variant="secondary"
              size="sm"
              onPress={() => router.push(`/courses/${course.id}/edit`)}
            />
            <Button
              title="Участники"
              variant="secondary"
              size="sm"
              onPress={() => router.push(`/courses/${course.id}/enrollments`)}
            />
          </View>
        )}
      </View>

      <View style={styles.badges}>
        {course.categories?.map((category) => (
          <Badge key={category.id} label={category.name} variant="primary" />
        ))}
        {course.tags?.map((tag) => (
          <Badge key={tag} label={tag} variant="secondary" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  titleDesktop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleMobile: {
    gap: spacing.md,
  },
  adminButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
