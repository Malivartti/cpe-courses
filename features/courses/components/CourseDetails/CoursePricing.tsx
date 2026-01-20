import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

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
  const { enroll, isLoading, error, clearError, fetchMyEnrollments } = useEnrollmentsStore();

  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isCheckingEnrollment, setIsCheckingEnrollment] = useState(true);
  const { confirm, dialog } = useConfirm();

  const isEnrolled = useEnrollmentsStore((state) =>
    user ? state.myEnrollments.some((e) => e.course_id === course.id) : false
  );

  useEffect(() => {
    const checkEnrollment = async () => {
      if (user) {
        setIsCheckingEnrollment(true);
        await fetchMyEnrollments();
        setIsCheckingEnrollment(false);
      } else {
        setIsCheckingEnrollment(false);
      }
    };
    checkEnrollment();
  }, [user, fetchMyEnrollments]);

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

  const validatePhone = (phoneNumber: string): boolean => {
    if (!phoneNumber.trim()) {
      setPhoneError('');
      return true;
    }

    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    const phoneRegex = /^(\+7|8)\d{10}$/;

    if (!phoneRegex.test(cleaned)) {
      setPhoneError('Введите корректный российский номер (+7 или 8, затем 10 цифр)');
      return false;
    }

    setPhoneError('');
    return true;
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (value.trim()) {
      validatePhone(value);
    } else {
      setPhoneError('');
    }
  };

  const handleEnrollClick = () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    if (isEnrolled) {
      return;
    }
    setFullName(user.username);
    setShowEnrollForm(true);
    clearError();
    setPhoneError('');
  };

  const handleSubmit = async () => {
    if (!fullName.trim() || !user) return;

    if (phone.trim() && !validatePhone(phone)) {
      return;
    }

    try {
      await enroll(
        course.id,
        {
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          message: message.trim() || null,
        },
        {
          user_id: user.id ?? '',
          email: user.email ?? '',
        }
      );
      confirm(
        {
          title: 'Успешно!',
          message: 'Ваша заявка отправлена. Мы скоро с вами свяжемся.',
          confirmText: 'Хорошо',
          cancelText: undefined,
          style: 'success',
        },
        () => {
          setShowEnrollForm(false);
          setFullName('');
          setPhone('');
          setMessage('');
          setPhoneError('');
        }
      );
    } catch (error) {}
  };

  const handleCancel = () => {
    setShowEnrollForm(false);
    setFullName('');
    setPhone('');
    setMessage('');
    setPhoneError('');
    clearError();
  };

  const isFormValid = fullName.trim() && !phoneError;

  return (
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
          isCheckingEnrollment ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary.default} />
            </View>
          ) : isEnrolled ? (
            <View
              style={{
                ...styles.enrolledContainer,
                backgroundColor: colors.success.subtle,
                borderColor: colors.success.default,
              }}
            >
              <Text variant="body" style={{ color: colors.success.default, fontWeight: '600' }}>
                ✓ Вы записаны на курс
              </Text>
            </View>
          ) : (
            <Button title="Записаться" onPress={handleEnrollClick} />
          )
        ) : (
          <View style={styles.enrollForm}>
            <View style={styles.fieldContainer}>
              <Text variant="label" style={styles.label}>
                Имя <Text style={{ color: colors.error.default }}>*</Text>
              </Text>
              <Input
                placeholder="Иванов Иван Иванович"
                value={fullName}
                onChangeText={setFullName}
                autoFocus
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text variant="label" style={styles.label}>
                Телефон
              </Text>
              <Input
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
              />
              {phoneError ? (
                <Text
                  variant="caption"
                  style={{ color: colors.error.default, marginTop: spacing.xs }}
                >
                  {phoneError}
                </Text>
              ) : null}
            </View>

            <View style={styles.fieldContainer}>
              <Text variant="label" style={styles.label}>
                Сообщение
              </Text>
              <Input
                placeholder="Дополнительная информация"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={3}
              />
            </View>

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
                disabled={isLoading || !isFormValid}
                style={styles.formButton}
              />
            </View>
          </View>
        )}
      </View>

      <View
        style={{
          ...styles.divider,
          backgroundColor: colors.border.light,
        }}
      />

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text variant="body">Продолжительность:</Text>
          <Text variant="body" style={styles.infoValue}>
            {course.duration} ч
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body">Формат:</Text>
          <Text variant="body" style={styles.infoValue}>
            {getCourseFormatLabel(course.format)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body">Тип обучения:</Text>
          <Text variant="body" style={styles.infoValue}>
            {getEducationFormatLabel(course.educationType)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text variant="body">Сертификат:</Text>
          <Text variant="body" style={styles.infoValue}>
            {getCertificateTypeLabel(course.certificateType)}
          </Text>
        </View>
        {course.startDate && (
          <View style={styles.infoRow}>
            <Text variant="body">Начало:</Text>
            <Text variant="body" style={styles.infoValue}>
              {formatDate(course.startDate)}
            </Text>
          </View>
        )}
        {course.endDate && (
          <View style={styles.infoRow}>
            <Text variant="body">Окончание:</Text>
            <Text variant="body" style={styles.infoValue}>
              {formatDate(course.endDate)}
            </Text>
          </View>
        )}
      </View>
      {dialog}
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
  enrollForm: {
    gap: spacing.md,
  },
  fieldContainer: {
    gap: spacing.xs,
  },
  label: {
    fontWeight: '600',
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
  enrolledContainer: {
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
  },
  loadingContainer: {
    padding: spacing.md,
    alignItems: 'center',
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
