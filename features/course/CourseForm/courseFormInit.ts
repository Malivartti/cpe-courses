import { Course } from '@/shared/types/course';

import { formatDateToDisplay } from './steps/DetailsStep';

export const getInitialCourseFormData = (course?: Course): Partial<Course> => {
  if (course) {
    return {
      ...course,
      startDate: course.startDate ? formatDateToDisplay(course.startDate) : null,
      endDate: course.endDate ? formatDateToDisplay(course.endDate) : null,
    };
  }

  return {
    title: '',
    description: null,
    format: 'online',
    educationType: 'group',
    certificateType: 'certificate',
    price: undefined,
    discountedPrice: null,
    duration: undefined,
    startDate: null,
    endDate: null,
    status: 'draft',
    isPublished: false,
    locations: [],
    tags: [],
    categories: [],
    acquired_skills: [],
    lecturers: [],
    sections: [],
  };
};
