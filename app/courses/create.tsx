import React from 'react';

import { Page } from '@/components/Page';
import { CourseForm } from '@/features/course/CourseForm';

export default function CreateCourseScreen() {
  return (
    <Page hasHeader>
      <CourseForm />
    </Page>
  );
}
