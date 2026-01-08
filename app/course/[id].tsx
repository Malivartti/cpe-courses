import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Page } from '@/components/Page';
import { useBreakpoint } from '@/components/useBreakpoint';
import { CourseHeader } from '@/features/courses/components/CourseDetails/CourseHeader';
import { CourseInstructors } from '@/features/courses/components/CourseDetails/CourseInstructors';
import { CourseLocations } from '@/features/courses/components/CourseDetails/CourseLocations';
import { CourseModules } from '@/features/courses/components/CourseDetails/CourseModules';
import { CoursePricing } from '@/features/courses/components/CourseDetails/CoursePricing';
import { useCoursesStore } from '@/shared/store/courses.store';
import { spacing } from '@/shared/theme';
import { Card, Text } from '@/shared/ui';

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDesktop } = useBreakpoint();
  const { selectedCourse, isLoading, loadCourseById, clearSelectedCourse } = useCoursesStore();

  useEffect(() => {
    if (id) {
      loadCourseById(id);
    }
    return () => clearSelectedCourse();
  }, [id]);

  if (isLoading || !selectedCourse) {
    return (
      <Page hasHeader>
        <Text variant="body">Загрузка...</Text>
      </Page>
    );
  }

  const course = selectedCourse;

  return (
    <Page hasHeader>
      <ScrollView contentContainerStyle={styles.content} style={styles.scrollView}>
        <CourseHeader course={course} />

        {isDesktop ? (
          <View style={styles.twoColumns}>
            <View style={styles.leftColumn}>
              <Card>
                <Text variant="h3">Описание</Text>
                <Text variant="body">{course.description}</Text>
              </Card>

              <CourseModules course={course} />

              {course.requirements && course.requirements.length > 0 && (
                <Card>
                  <Text variant="h3">Требования</Text>
                  {course.requirements.map((req, index) => (
                    <Text key={index} variant="body">
                      • {req}
                    </Text>
                  ))}
                </Card>
              )}

              {course.outcomes && course.outcomes.length > 0 && (
                <Card>
                  <Text variant="h3">Чему вы научитесь</Text>
                  {course.outcomes.map((outcome, index) => (
                    <Text key={index} variant="body">
                      • {outcome}
                    </Text>
                  ))}
                </Card>
              )}
            </View>

            <View style={styles.rightColumn}>
              <CoursePricing course={course} />
              <CourseLocations course={course} />
              <CourseInstructors course={course} />
            </View>
          </View>
        ) : (
          <>
            <CoursePricing course={course} />

            <Card>
              <Text variant="h3">Описание</Text>
              <Text variant="body">{course.description}</Text>
            </Card>

            <CourseLocations course={course} />
            <CourseModules course={course} />
            <CourseInstructors course={course} />

            {course.requirements && course.requirements.length > 0 && (
              <Card>
                <Text variant="h3">Требования</Text>
                {course.requirements.map((req, index) => (
                  <Text key={index} variant="body">
                    • {req}
                  </Text>
                ))}
              </Card>
            )}

            {course.outcomes && course.outcomes.length > 0 && (
              <Card>
                <Text variant="h3">Чему вы научитесь</Text>
                {course.outcomes.map((outcome, index) => (
                  <Text key={index} variant="body">
                    • {outcome}
                  </Text>
                ))}
              </Card>
            )}
          </>
        )}
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: -spacing.lg,
  },
  content: {
    gap: spacing.md,
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 2,
    gap: spacing.md,
  },
  rightColumn: {
    flex: 1,
    gap: spacing.md,
  },
});
