import { Link, router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  getCourseFormatLabel,
  getCourseStatusLabel,
  getEducationFormatLabel,
} from '@/shared/api/labels/courseLabels';
import { useAuthStore } from '@/shared/store/auth';
import { useCoursesStore } from '@/shared/store/courses';
import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Badge, Button, Card, Text, useConfirm } from '@/shared/ui';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const colors = useTheme();
  const { confirm, dialog } = useConfirm();
  const { deleteCourse } = useCoursesStore();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === 'admin';

  const hasDiscount =
    course.discountedPrice !== null &&
    course.discountedPrice !== undefined &&
    course.discountedPrice < (course.price ?? 0);

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('T')[0].split('-');
    return `${day}.${month}.${year}`;
  };

  const handleDelete = () => {
    confirm(
      {
        title: 'Удаление курса',
        message: `Удалить курс «${course.title}»?`,
        confirmText: 'Удалить',
        cancelText: 'Отмена',
      },
      async () => {
        await deleteCourse(course.id);
      }
    );
  };

  return (
    <>
      <Card style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.tagsRow}>
            {course.categories?.slice(0, 3).map((category) => (
              <Badge key={category.id} label={category.name} variant="primary" />
            ))}
            {course.tags?.slice(0, 5).map((tag, i) => (
              <Badge key={i} label={tag} variant="secondary" />
            ))}
          </View>

          <View style={styles.priceContainer}>
            {hasDiscount ? (
              <>
                <Text
                  variant="bodySmall"
                  style={{
                    textDecorationLine: 'line-through',
                    color: colors.text.tertiary,
                    textAlign: 'right',
                  }}
                >
                  {course.price.toLocaleString('ru-RU')} ₽
                </Text>
                <Text variant="h4" style={{ color: colors.primary.default }}>
                  {course.discountedPrice?.toLocaleString('ru-RU')} ₽
                </Text>
              </>
            ) : (
              <Text variant="h4">{course.price} ₽</Text>
            )}
          </View>
        </View>

        <Link href={`/courses/${course.id}`} asChild>
          <Pressable>
            <Text variant="h3" numberOfLines={2}>
              {course.title}
            </Text>

            {course.description && (
              <Text variant="bodySmall" numberOfLines={3} style={{ color: colors.text.secondary }}>
                {course.description}
              </Text>
            )}
          </Pressable>
        </Link>

        <View style={styles.middleRow}>
          <Badge label={getCourseFormatLabel(course.format)} variant="outline" />
          <Badge label={getEducationFormatLabel(course.educationType)} variant="outline" />
          {course.duration && <Badge label={`${course.duration} ч`} variant="outline" />}
          {course.startDate && (
            <Badge label={`Старт: ${formatDate(course.startDate)}`} variant="outline" />
          )}
        </View>

        {isAdmin && (
          <View style={styles.adminRow}>
            <Badge
              label={getCourseStatusLabel(course.status)}
              variant={course.isPublished ? 'success' : 'warning'}
            />

            <View style={styles.adminActions}>
              <Button
                title="Редактировать"
                variant="secondary"
                size="sm"
                onPress={() => router.push(`/courses/${course.id}/edit`)}
              />
              <Button title="Удалить" variant="error" size="sm" onPress={handleDelete} />
            </View>
          </View>
        )}
      </Card>

      {dialog}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },

  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
    flex: 1,
  },

  priceContainer: {
    alignItems: 'flex-end',
  },

  middleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },

  adminRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },

  adminActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
