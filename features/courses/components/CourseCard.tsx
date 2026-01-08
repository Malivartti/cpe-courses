import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { shadows, spacing, useTheme } from '@/shared/theme';
import { CoursePreview } from '@/shared/types/course';
import { Badge, Text } from '@/shared/ui';

interface CourseCardProps {
  course: CoursePreview;
}

export function CourseCard({ course }: CourseCardProps) {
  const colors = useTheme();

  const actualPrice = course.discountPrice || course.price;
  const hasDiscount = course.discountPrice !== undefined;

  return (
    <Link href={`/course/${course.id}`} asChild>
      <Pressable style={{ ...styles.card, backgroundColor: colors.background.surface }}>
        <View style={styles.header}>
          <Text variant="h4" numberOfLines={2} style={styles.title}>
            {course.title}
          </Text>
          <View style={styles.badges}>
            <Badge label={course.direction.name} variant="primary" />
            {hasDiscount && <Badge label="Скидка" variant="success" />}
          </View>
        </View>

        <Text variant="body" numberOfLines={3} style={{ color: colors.text.secondary }}>
          {course.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.info}>
            <Text variant="caption" style={{ color: colors.text.tertiary }}>
              {course.duration} часов • {course.format.name}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            {hasDiscount && (
              <Text
                variant="bodySmall"
                style={{
                  color: colors.text.tertiary,
                  textDecorationLine: 'line-through',
                }}
              >
                {course.price.toLocaleString('ru-RU')} ₽
              </Text>
            )}
            <Text variant="h4" style={{ color: colors.primary.default }}>
              {actualPrice.toLocaleString('ru-RU')} ₽
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.md,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.md,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  info: {
    flex: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
});
