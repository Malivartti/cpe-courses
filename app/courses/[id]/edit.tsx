import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Page } from '@/components/Page';
import { CourseForm } from '@/features/course/CourseForm';
import { useCoursesStore } from '@/shared/store/courses';
import { Text } from '@/shared/ui';

export default function EditCourseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedCourse, isLoading, loadCourseById } = useCoursesStore();

  useEffect(() => {
    if (id) {
      loadCourseById(id);
    }
  }, [id]);

  if (isLoading && !selectedCourse) {
    return (
      <Page hasHeader>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text variant="body">Загрузка курса...</Text>
        </View>
      </Page>
    );
  }

  if (!selectedCourse) {
    return (
      <Page hasHeader>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text variant="body">Курс не найден</Text>
        </View>
      </Page>
    );
  }

  return (
    <Page hasHeader>
      <CourseForm course={selectedCourse} />
    </Page>
  );
}
