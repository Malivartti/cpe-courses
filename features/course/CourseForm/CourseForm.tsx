import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useCoursesStore } from '@/shared/store/courses';
import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { Button, Card, Text } from '@/shared/ui';

import { getInitialCourseFormData } from './courseFormInit';
import { CourseValidationErrors, CourseValidator } from './courseValidation';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { DetailsStep } from './steps/DetailsStep';
import { RelationsStep } from './steps/RelationsStep';
import { ReviewStep } from './steps/ReviewStep';
import { SectionsStep } from './steps/SectionsStep';

interface CourseFormProps {
  course?: Course;
}

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { number: 1, title: 'Основная информация' },
  { number: 2, title: 'Детали курса' },
  { number: 3, title: 'Категоризация' },
  { number: 4, title: 'Модули' },
  { number: 5, title: 'Проверка' },
];

export function CourseForm({ course }: CourseFormProps) {
  const colors = useTheme();
  const { createCourse, updateCourse, isLoading, error: storeError } = useCoursesStore();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [validationErrors, setValidationErrors] = useState<CourseValidationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>(() => getInitialCourseFormData(course));

  const isEditMode = !!course;

  const updateFormData = (data: Partial<Course>) => {
    setFormData({ ...formData, ...data });
    setSubmitError(null);
  };

  const handleFieldTouch = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));

    if (validationErrors[field as keyof CourseValidationErrors]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof CourseValidationErrors];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    let errors: CourseValidationErrors = {};

    if (currentStep === 1) {
      errors = CourseValidator.validateBasicInfo(formData);
    } else if (currentStep === 2) {
      errors = CourseValidator.validateDetails(formData);
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setTouchedFields((prev) => {
        const newSet = new Set(prev);
        Object.keys(errors).forEach((key) => newSet.add(key));
        return newSet;
      });
      return;
    }

    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    const allErrors = CourseValidator.validateAll(formData);

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      setCurrentStep(1);
      return;
    }

    try {
      setSubmitError(null);

      const convertDateToISO = (dateString: string | null): string | null => {
        if (!dateString) return null;

        if (dateString.includes('T')) return dateString;

        const [day, month, year] = dateString.split('.');
        if (!day || !month || !year) return null;

        const isoDate = `${year}-${month}-${day}T00:00:00Z`;
        return isoDate;
      };

      const courseData = {
        ...formData,
        startDate: convertDateToISO(formData.startDate ?? null),
        endDate: convertDateToISO(formData.endDate ?? null),
        tags: formData.tags || [],
        categories: formData.categories || [],
        acquired_skills: formData.acquired_skills || [],
        lecturers: formData.lecturers || [],
        locations: formData.locations || [],
        sections: formData.sections || [],
      };

      if (isEditMode && course) {
        await updateCourse(course.id, courseData as Omit<Course, 'id' | 'createdAt' | 'updatedAt'>);
      } else {
        await createCourse(courseData as Omit<Course, 'id' | 'createdAt' | 'updatedAt'>);
      }
      router.back();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при сохранении курса';
      setSubmitError(errorMessage);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={formData}
            onChange={updateFormData}
            errors={validationErrors}
            touchedFields={touchedFields}
            onFieldTouch={handleFieldTouch}
          />
        );
      case 2:
        return (
          <DetailsStep
            data={formData}
            onChange={updateFormData}
            errors={validationErrors}
            touchedFields={touchedFields}
            onFieldTouch={handleFieldTouch}
          />
        );
      case 3:
        return <RelationsStep data={formData} onChange={updateFormData} />;
      case 4:
        return <SectionsStep data={formData} onChange={updateFormData} />;
      case 5:
        return <ReviewStep data={formData as Course} />;
      default:
        return null;
    }
  };

  const displayError = submitError || storeError;

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="h2">{isEditMode ? 'Редактирование курса' : 'Создание курса'}</Text>
      </View>

      <Card>
        <View style={styles.progressContainer}>
          {STEPS.map((step) => (
            <View key={step.number} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor:
                      currentStep >= step.number
                        ? colors.primary.default
                        : colors.background.surfaceElevated,
                    borderColor:
                      currentStep >= step.number ? colors.primary.default : colors.border.default,
                  },
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={{
                    color: currentStep >= step.number ? colors.text.inverse : colors.text.tertiary,
                    fontWeight: '600',
                  }}
                >
                  {step.number}
                </Text>
              </View>
              <Text
                variant="caption"
                style={{
                  color: currentStep >= step.number ? colors.text.primary : colors.text.tertiary,
                  textAlign: 'center',
                }}
              >
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {displayError && (
        <View
          style={[
            styles.errorContainer,
            {
              backgroundColor: colors.error.subtle,
              borderColor: colors.error.default,
            },
          ]}
        >
          <Text variant="body" style={{ color: colors.error.default, fontWeight: '600' }}>
            Ошибка
          </Text>
          <Text variant="body" style={{ color: colors.error.default }}>
            {displayError}
          </Text>
        </View>
      )}

      {renderStep()}

      <View style={styles.navigation}>
        {currentStep > 1 && (
          <Button
            title="Назад"
            variant="secondary"
            onPress={handlePrev}
            disabled={isLoading}
            style={styles.button}
          />
        )}
        {currentStep < 5 ? (
          <Button title="Далее" onPress={handleNext} disabled={isLoading} style={styles.button} />
        ) : (
          <Button
            title={isLoading ? 'Сохранение...' : isEditMode ? 'Обновить' : 'Создать'}
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.button}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  header: {
    marginBottom: spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: spacing.lg,
    borderRadius: spacing.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  navigation: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  button: {
    flex: 1,
  },
});
