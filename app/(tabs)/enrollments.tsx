import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { EnrollmentCard } from '@/features/enrollments/components/EnrollmentCard';
import { courseApi } from '@/shared/api/courses';
import { useProtectedRoute } from '@/shared/hooks/useProtectedRoute';
import { useEnrollmentsStore } from '@/shared/store/enrollments';
import { spacing, useTheme } from '@/shared/theme';
import { Course } from '@/shared/types/course';
import { EnrollmentReadModel } from '@/shared/types/enrollment.api';
import { Button, Card, Text } from '@/shared/ui';

interface EnrichedEnrollment {
  enrollment: EnrollmentReadModel;
  course: Course | null;
}

export default function EnrollmentsScreen() {
  const isAllowed = useProtectedRoute({ type: 'auth-only', redirectTo: '/auth' });

  const {
    myEnrollments,
    isLoading: enrollmentsLoading,
    error,
    fetchMyEnrollments,
  } = useEnrollmentsStore();

  const [enrichedEnrollments, setEnrichedEnrollments] = useState<EnrichedEnrollment[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  const colors = useTheme();

  /** Загружаем записи */
  useEffect(() => {
    fetchMyEnrollments();
  }, []);

  /** Когда пришли записи — загружаем курсы */
  useEffect(() => {
    if (myEnrollments.length === 0) {
      setEnrichedEnrollments([]);
      return;
    }

    loadCoursesForEnrollments();
  }, [myEnrollments]);

  const loadCoursesForEnrollments = async () => {
    setIsLoadingCourses(true);

    try {
      const uniqueCourseIds = [...new Set(myEnrollments.map((e) => e.course_id))];

      const courses = await Promise.all(uniqueCourseIds.map((id) => courseApi.getById(id)));

      const courseMap = new Map<string, Course>();
      courses.forEach((course) => {
        courseMap.set(course.id, course);
      });

      const enriched: EnrichedEnrollment[] = myEnrollments.map((enrollment) => ({
        enrollment,
        course: courseMap.get(enrollment.course_id) ?? null,
      }));

      setEnrichedEnrollments(enriched);
    } catch (err) {
      console.error('Не удалось загрузить курсы для записей:', err);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  if (!isAllowed) {
    return null;
  }

  const isLoading = enrollmentsLoading || isLoadingCourses;

  if (error) {
    return (
      <Page hasHeader hasTabs>
        <View style={styles.centerContainer}>
          <Card>
            <View style={styles.errorContainer}>
              <Text variant="body" style={{ color: colors.error.default }}>
                {error}
              </Text>
              <Button title="Обновить" variant="secondary" onPress={() => fetchMyEnrollments()} />
            </View>
          </Card>
        </View>
      </Page>
    );
  }

  return (
    <Page hasHeader hasTabs>
      <View style={styles.header}>
        <Text variant="h2">Мои записи</Text>
        <Text variant="body" style={{ opacity: 0.7 }}>
          Список курсов, на которые вы записались ({myEnrollments.length})
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <Text variant="body">Загрузка записей...</Text>
        </View>
      ) : enrichedEnrollments.length === 0 ? (
        <View style={styles.centerContainer}>
          <Card>
            <Text variant="body" style={{ textAlign: 'center', opacity: 0.6 }}>
              У вас пока нет записей на курсы
            </Text>
          </Card>
        </View>
      ) : (
        <FlatList
          data={enrichedEnrollments}
          keyExtractor={({ enrollment }) => enrollment.enrollment_id}
          renderItem={({ item }) => <EnrollmentCard enrichedEnrollment={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  errorContainer: {
    gap: spacing.md,
    alignItems: 'center',
  },
});
