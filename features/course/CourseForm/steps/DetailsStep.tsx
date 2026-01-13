import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  getCertificateTypeLabel,
  getCourseFormatLabel,
  getCourseStatusLabel,
  getEducationFormatLabel,
} from '@/shared/api/labels/courseLabels';
import { spacing, useTheme } from '@/shared/theme';
import {
  CertificateType,
  Course,
  CourseFormat,
  CourseStatus,
  EducationFormat,
} from '@/shared/types/course';
import { Card, Input, Text } from '@/shared/ui';

import { CourseValidationErrors } from '../courseValidation';

interface DetailsStepProps {
  data: Partial<Course>;
  onChange: (data: Partial<Course>) => void;
  errors: CourseValidationErrors;
  touchedFields: Set<string>;
  onFieldTouch: (field: string) => void;
}

const FORMATS: CourseFormat[] = ['online', 'offline', 'mixed'];
const EDUCATION_TYPES: EducationFormat[] = [
  'group',
  'individual',
  'self_paced',
  'mentorled',
  'cohort',
];
const CERTIFICATE_TYPES: CertificateType[] = ['certificate', 'diploma', 'attestation', 'none'];
const STATUSES: CourseStatus[] = ['draft', 'active', 'enrolling', 'archived'];

export const formatDateToDisplay = (isoDate: string | null): string => {
  if (!isoDate) return '';

  if (isoDate.includes('.')) return isoDate;

  const datePart = isoDate.split('T')[0];
  const parts = datePart.split('-');
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts;
  return `${day}.${month}.${year}`;
};

const formatDateToISO = (displayDate: string): string | null => {
  if (!displayDate) return null;
  if (displayDate.includes('-')) return displayDate;

  const parts = displayDate.split('.');
  if (parts.length !== 3) return null;

  const [day, month, year] = parts;
  if (!day || !month || !year || day.length !== 2 || month.length !== 2 || year.length !== 4) {
    return null;
  }

  return `${year}-${month}-${day}`;
};

export function DetailsStep({
  data,
  onChange,
  errors,
  touchedFields,
  onFieldTouch,
}: DetailsStepProps) {
  const colors = useTheme();

  const handleFieldChange = (field: string, value: any) => {
    onFieldTouch(field);
    onChange({ [field]: value });
  };

  const showError = (field: string) =>
    touchedFields.has(field) && errors[field as keyof CourseValidationErrors];

  const renderSelector = <T extends string>(
    title: string,
    field: string,
    options: T[],
    selected: T | undefined,
    onSelect: (value: T) => void,
    getLabel: (value: T) => string,
    required: boolean = true
  ) => (
    <View style={styles.selectorContainer}>
      <Text variant="label" style={styles.selectorTitle}>
        {title} {required && '*'}
      </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Pressable
            key={option}
            onPress={() => {
              handleFieldChange(field, option);
              onSelect(option);
            }}
            style={[
              styles.option,
              {
                backgroundColor:
                  selected === option ? colors.primary.subtle : colors.background.surfaceElevated,
                borderColor: selected === option ? colors.primary.default : colors.border.light,
              },
            ]}
          >
            <Text
              variant="bodySmall"
              style={{
                color: selected === option ? colors.primary.default : colors.text.secondary,
                fontWeight: selected === option ? '600' : '400',
              }}
            >
              {getLabel(option)}
            </Text>
          </Pressable>
        ))}
      </View>
      {showError(field) && (
        <Text variant="caption" style={{ color: colors.error.default }}>
          {errors[field as keyof CourseValidationErrors]}
        </Text>
      )}
    </View>
  );

  return (
    <Card>
      <Text variant="h3" style={styles.title}>
        Детали курса
      </Text>

      <View style={styles.form}>
        {renderSelector(
          'Формат курса',
          'format',
          FORMATS,
          data.format as CourseFormat,
          (format) => onChange({ format }),
          getCourseFormatLabel
        )}

        {renderSelector(
          'Тип обучения',
          'educationType',
          EDUCATION_TYPES,
          data.educationType as EducationFormat,
          (educationType) => onChange({ educationType }),
          getEducationFormatLabel
        )}

        {renderSelector(
          'Тип сертификата',
          'certificateType',
          CERTIFICATE_TYPES,
          data.certificateType as CertificateType,
          (certificateType) => onChange({ certificateType }),
          getCertificateTypeLabel
        )}

        {renderSelector(
          'Статус курса',
          'status',
          STATUSES,
          data.status as CourseStatus,
          (status) => onChange({ status }),
          getCourseStatusLabel
        )}

        <View style={styles.selectorContainer}>
          <Text variant="label" style={styles.selectorTitle}>
            Статус публикации *
          </Text>
          <View style={styles.optionsContainer}>
            <Pressable
              onPress={() => handleFieldChange('isPublished', true)}
              style={[
                styles.option,
                {
                  backgroundColor: data.isPublished
                    ? colors.primary.subtle
                    : colors.background.surfaceElevated,
                  borderColor: data.isPublished ? colors.primary.default : colors.border.light,
                },
              ]}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: data.isPublished ? colors.primary.default : colors.text.secondary,
                  fontWeight: data.isPublished ? '600' : '400',
                }}
              >
                Опубликован
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleFieldChange('isPublished', false)}
              style={[
                styles.option,
                {
                  backgroundColor: !data.isPublished
                    ? colors.primary.subtle
                    : colors.background.surfaceElevated,
                  borderColor: !data.isPublished ? colors.primary.default : colors.border.light,
                },
              ]}
            >
              <Text
                variant="bodySmall"
                style={{
                  color: !data.isPublished ? colors.primary.default : colors.text.secondary,
                  fontWeight: !data.isPublished ? '600' : '400',
                }}
              >
                Черновик
              </Text>
            </Pressable>
          </View>
          <Text variant="caption" style={{ color: colors.text.tertiary }}>
            Опубликованные курсы видны всем пользователям
          </Text>
        </View>

        <View style={styles.divider} />

        <Text variant="label" style={styles.sectionTitle}>
          Даты проведения (опционально)
        </Text>

        <View style={styles.fieldContainer}>
          <Input
            placeholder="Дата начала (ДД.ММ.ГГГГ)"
            value={formatDateToDisplay(data.startDate || null)}
            onChangeText={(value) => {
              const isoDate = formatDateToISO(value);
              handleFieldChange('startDate', isoDate);
            }}
            keyboardType="numeric"
          />
          {showError('startDate') && (
            <Text variant="caption" style={{ color: colors.error.default }}>
              {errors.startDate}
            </Text>
          )}
          <Text variant="caption" style={{ color: colors.text.tertiary }}>
            Формат: 15.03.2026
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Input
            placeholder="Дата окончания (ДД.ММ.ГГГГ)"
            value={formatDateToDisplay(data.endDate || null)}
            onChangeText={(value) => {
              const isoDate = formatDateToISO(value);
              handleFieldChange('endDate', isoDate);
            }}
            keyboardType="numeric"
          />
          {showError('endDate') && (
            <Text variant="caption" style={{ color: colors.error.default }}>
              {errors.endDate}
            </Text>
          )}
          <Text variant="caption" style={{ color: colors.text.tertiary }}>
            Формат: 15.06.2026
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
    gap: spacing.lg,
  },
  selectorContainer: {
    gap: spacing.sm,
  },
  selectorTitle: {
    fontWeight: '600',
    fontSize: 15,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: spacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    borderWidth: 1.5,
    minWidth: 100,
    alignItems: 'center',
  },
  fieldContainer: {
    gap: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: spacing.sm,
  },
});
