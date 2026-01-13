import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  getCertificateTypeLabel,
  getCourseFormatLabel,
  getEducationFormatLabel,
} from '@/shared/api/labels/courseLabels';
import { useAuthStore } from '@/shared/store/auth';
import { useEnrollmentsStore } from '@/shared/store/enrollments';
import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Badge, Button, Card, Input, Text, useConfirm } from '@/shared/ui';

interface CoursePricingProps {
  course: Course;
}

export function CoursePricing({ course }: CoursePricingProps) {
  const colors = useTheme();
  const user = useAuthStore((state) => state.user);
  const { enroll, isLoading, error, clearError } = useEnrollmentsStore();
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { confirm, dialog } = useConfirm();

  const actualPrice = course.discountedPrice ?? course.price;
  const hasDiscount =
    course.discountedPrice !== null &&
    course.discountedPrice !== undefined &&
    course.discountedPrice < (course.price ?? 0);

  const formatDate = (isoDate: string | null) => {
    if (!isoDate) return null;
    const [year, month, day] = isoDate.split('T')[0].split('-');
    return `${day}.${month}.${year}`;
  };

  const handleEnrollClick = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    setShowEnrollForm(true);
    clearError();
  };

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      return;
    }

    try {
      await enroll(course.id, {
        full_name: fullName.trim(),
        phone: phone.trim() || null,
        message: message.trim() || null,
      });

      confirm(
        {
          title: 'Успешно!',
          message: 'Ваша заявка на запись принята. Мы свяжемся с вами в ближайшее время.',
          confirmText: 'Хорошо',
          cancelText: undefined,
        },
        () => {
          setShowEnrollForm(false);
          setFullName('');
          setPhone('');
          setMessage('');
        }
      );
    } catch (error) {}
  };

  const handleCancel = () => {
    setShowEnrollForm(false);
    setFullName('');
    setPhone('');
    setMessage('');
    clearError();
  };

  return (
    <>
      <Card>
        <View style={styles.priceSection}>
          {hasDiscount && (
            <View style={{ alignItems: 'flex-start' }}>
              <Badge label="Скидка" variant="success" />
            </View>
          )}
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
          {!showEnrollForm ? (
            <Button title="Записаться" onPress={handleEnrollClick} />
          ) : (
            <View style={styles.enrollForm}>
              <Input
                placeholder="Ваше имя *"
                value={fullName}
                onChangeText={setFullName}
                autoFocus
              />
              <Input
                placeholder="Телефон"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Input
                placeholder="Сообщение"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={3}
              />
              {error && (
                <View
                  style={{
                    ...styles.errorContainer,
                    backgroundColor: colors.error.subtle,
                  }}
                >
                  <Text variant="bodySmall" style={{ color: colors.error.default }}>
                    {error}
                  </Text>
                </View>
              )}
              <View style={styles.formActions}>
                <Button
                  title="Отмена"
                  variant="secondary"
                  onPress={handleCancel}
                  disabled={isLoading}
                  style={styles.formButton}
                />
                <Button
                  title={isLoading ? 'Отправка...' : 'Отправить'}
                  onPress={handleSubmit}
                  disabled={isLoading || !fullName.trim()}
                  style={styles.formButton}
                />
              </View>
            </View>
          )}
        </View>
        <View style={{ ...styles.divider, backgroundColor: colors.border.light }} />
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text variant="body">Продолжительность</Text>
            <Text variant="body" style={styles.infoValue}>
              {course.duration} ч
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="body">Формат</Text>
            <Text variant="body" style={styles.infoValue}>
              {getCourseFormatLabel(course.format)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="body">Тип обучения</Text>
            <Text variant="body" style={styles.infoValue}>
              {getEducationFormatLabel(course.educationType)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="body">Документ</Text>
            <Text variant="body" style={styles.infoValue}>
              {getCertificateTypeLabel(course.certificateType)}
            </Text>
          </View>
          {course.startDate && (
            <View style={styles.infoRow}>
              <Text variant="body">Начало</Text>
              <Text variant="body" style={styles.infoValue}>
                {formatDate(course.startDate)}
              </Text>
            </View>
          )}
          {course.endDate && (
            <View style={styles.infoRow}>
              <Text variant="body">Окончание</Text>
              <Text variant="body" style={styles.infoValue}>
                {formatDate(course.endDate)}
              </Text>
            </View>
          )}
        </View>
      </Card>
      {dialog}
    </>
  );
}

const styles = StyleSheet.create({
  priceSection: {
    gap: spacing.md,
  },
  priceBlock: {
    gap: spacing.xs,
  },
  enrollForm: {
    gap: spacing.md,
  },
  formActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  formButton: {
    flex: 1,
  },
  errorContainer: {
    padding: spacing.md,
    borderRadius: spacing.sm,
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
