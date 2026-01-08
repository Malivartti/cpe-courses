import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { CourseDetails } from '@/shared/types/course';
import { Badge, Button, Card, Text } from '@/shared/ui';

interface CoursePricingProps {
  course: CourseDetails;
}

export function CoursePricing({ course }: CoursePricingProps) {
  const colors = useTheme();
  const actualPrice = course.discountPrice ?? course.price;
  const hasDiscount = course.discountPrice !== undefined;

  return (
    <Card>
      <View style={styles.priceSection}>
        {hasDiscount && <Badge label="Скидка" variant="success" />}
        <View style={styles.priceBlock}>
          {hasDiscount && (
            <Text
              variant="body"
              style={{
                color: colors.text.tertiary,
                textDecorationLine: 'line-through',
              }}
            >
              {course.price.toLocaleString('ru-RU')} ₽
            </Text>
          )}
          <Text variant="h2" style={{ color: colors.primary.default }}>
            {actualPrice.toLocaleString('ru-RU')} ₽
          </Text>
        </View>
        <Button title="Записаться на курс" onPress={() => {}} />
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border.light }]} />

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text variant="body">Длительность</Text>
          <Text variant="body" style={styles.infoValue}>
            {course.duration} часов
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text variant="body">Студентов</Text>
          <Text variant="body" style={styles.infoValue}>
            {course.currentStudents}/{course.maxStudents}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text variant="body">Формат</Text>
          <Text variant="body" style={styles.infoValue}>
            {course.educationType.name}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  priceSection: {
    gap: spacing.md,
  },
  priceBlock: {
    gap: spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  infoSection: {
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: '600',
  },
});
