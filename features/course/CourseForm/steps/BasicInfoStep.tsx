import { StyleSheet, View } from 'react-native';

import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Card, Input, Text } from '@/shared/ui';

import { CourseValidationErrors } from '../courseValidation';

interface BasicInfoStepProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
  errors: CourseValidationErrors;
  touchedFields: Set<string>;
  onFieldTouch: (field: string) => void;
}

export function BasicInfoStep({
  data,
  onChange,
  errors,
  touchedFields,
  onFieldTouch,
}: BasicInfoStepProps) {
  const colors = useTheme();

  const handleFieldChange = (field: string, value: any) => {
    onFieldTouch(field);
    onChange({ [field]: value });
  };

  const showError = (field: string) =>
    touchedFields.has(field) && errors[field as keyof CourseValidationErrors];

  return (
    <Card>
      <Text variant="h3" style={styles.title}>
        Основная информация
      </Text>

      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Input
            placeholder="Название курса *"
            value={data.title || ''}
            onChangeText={(title) => handleFieldChange('title', title)}
            autoFocus
          />
          {showError('title') && (
            <Text variant="caption" style={{ color: colors.error.default }}>
              {errors.title}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Input
            placeholder="Описание курса"
            value={data.description || ''}
            onChangeText={(description) => handleFieldChange('description', description || null)}
            multiline
            numberOfLines={4}
          />
          <Text variant="caption" style={{ color: colors.text.tertiary }}>
            Краткое описание курса для карточки
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Input
            placeholder="Длительность (часы) *"
            value={
              data.duration !== null && data.duration !== undefined ? data.duration.toString() : ''
            }
            onChangeText={(value) => {
              const duration = value ? parseInt(value) : undefined;
              handleFieldChange('duration', duration);
            }}
            keyboardType="numeric"
          />
          {showError('duration') && (
            <Text variant="caption" style={{ color: colors.error.default }}>
              {errors.duration}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Input
            placeholder="Цена (₽) *"
            value={data.price !== null && data.price !== undefined ? data.price.toString() : ''}
            onChangeText={(value) => {
              const price = value ? parseFloat(value) : undefined;
              handleFieldChange('price', price);
            }}
            keyboardType="numeric"
          />
          {showError('price') && (
            <Text variant="caption" style={{ color: colors.error.default }}>
              {errors.price}
            </Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Input
            placeholder="Цена со скидкой (₽)"
            value={
              data.discountedPrice !== null && data.discountedPrice !== undefined
                ? data.discountedPrice.toString()
                : ''
            }
            onChangeText={(value) => {
              const discountedPrice = value ? parseFloat(value) : null;
              handleFieldChange('discountedPrice', discountedPrice);
            }}
            keyboardType="numeric"
          />
          {showError('discountedPrice') && (
            <Text variant="caption" style={{ color: colors.error.default }}>
              {errors.discountedPrice}
            </Text>
          )}
          <Text variant="caption" style={{ color: colors.text.tertiary }}>
            Оставьте пустым, если скидки нет
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  fieldContainer: {
    gap: spacing.xs,
  },
});
