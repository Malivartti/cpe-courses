import {
  CourseDetails,
  CourseFilters,
  CoursePreview,
  CourseSortOptions,
  CoursesResponse,
} from '@/shared/types/course';

import { delay, MOCK_DELAY } from './client';
import { MOCK_COURSES } from './mocks/courses.mock';

export const courseApi = {
  async getAll(
    filters?: CourseFilters,
    sort?: CourseSortOptions,
    page: number = 1,
    pageSize: number = 10
  ): Promise<CoursesResponse> {
    await delay(MOCK_DELAY);

    let courses: CoursePreview[] = MOCK_COURSES.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price,
      discountPrice: course.discountPrice,
      direction: course.direction,
      format: course.format,
      educationType: course.educationType,
      thumbnail: course.thumbnail,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    }));

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.directionIds && filters.directionIds.length > 0) {
      courses = courses.filter((c) => filters.directionIds!.includes(c.direction.id));
    }

    if (filters?.formatIds && filters.formatIds.length > 0) {
      courses = courses.filter((c) => filters.formatIds!.includes(c.format.id));
    }

    if (filters?.educationTypeIds && filters.educationTypeIds.length > 0) {
      courses = courses.filter((c) => filters.educationTypeIds!.includes(c.educationType.id));
    }

    if (filters?.hasDiscount) {
      courses = courses.filter((c) => c.discountPrice !== undefined);
    }

    if (filters?.priceMin !== undefined) {
      courses = courses.filter((c) => (c.discountPrice || c.price) >= filters.priceMin!);
    }

    if (filters?.priceMax !== undefined) {
      courses = courses.filter((c) => (c.discountPrice || c.price) <= filters.priceMax!);
    }

    if (filters?.durationMin !== undefined) {
      courses = courses.filter((c) => c.duration >= filters.durationMin!);
    }

    if (filters?.durationMax !== undefined) {
      courses = courses.filter((c) => c.duration <= filters.durationMax!);
    }

    if (sort) {
      courses.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sort.field) {
          case 'price':
            aValue = a.discountPrice || a.price;
            bValue = b.discountPrice || b.price;
            break;
          case 'duration':
            aValue = a.duration;
            bValue = b.duration;
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          default:
            aValue = a.title;
            bValue = b.title;
        }

        if (sort.order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedCourses = courses.slice(start, end);

    return {
      courses: paginatedCourses,
      total: courses.length,
      page,
      pageSize,
      hasMore: end < courses.length,
    };
  },

  async getById(id: string): Promise<CourseDetails> {
    await delay(MOCK_DELAY);

    const course = MOCK_COURSES.find((c) => c.id === id);

    if (!course) {
      throw new Error('Курс не найден');
    }

    return course;
  },
};
