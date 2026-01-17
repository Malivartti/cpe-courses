import { Course } from '@/shared/types/course';
import { CourseAPI } from '@/shared/types/course.api';
import { CoursesFilter } from '@/shared/types/course_filters';
import { IDResponse } from '@/shared/types/general';

import { apiClient } from './client';
import { toAPIFilter } from './normalizers/courseFiltersNormalizer';
import { fromAPICourse, fromAPICourses } from './normalizers/courseNormaliser';

export const courseApi = {
  async list(filter: CoursesFilter): Promise<Course[]> {
    const { data } = await apiClient.get<CourseAPI[]>('/api/courses/filter', {
      params: toAPIFilter(filter),
      paramsSerializer: {
        indexes: null,
      },
    });
    return fromAPICourses(data);
  },

  async getById(courseId: string): Promise<Course> {
    const { data } = await apiClient.get<CourseAPI>(`/api/courses/${courseId}`);
    return fromAPICourse(data);
  },

  async create(course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const request = {
      name: course.title,
      description: course.description,
      format: course.format,
      education_format: course.educationType,
      certificate_type: course.certificateType,
      cost: course.price.toString(),
      discounted_cost: course.discountedPrice !== null ? course.discountedPrice.toString() : null,
      duration_hours: course.duration,
      start_date: course.startDate,
      end_date: course.endDate,
      status: course.status,
      is_published: course.isPublished,
      locations: course.locations,
      sections: course.sections.map((section) => ({
        name: section.name,
        description: section.description,
        order_num: section.order,
        hours: section.hours,
      })),
      tags: course.tags,
      acquired_skill_ids: course.acquired_skills.map((skill) => skill.id),
      category_ids: course.categories.map((cat) => cat.id),
      lecturer_ids: course.lecturers.map((lect) => lect.id),
    };

    const { data } = await apiClient.post<IDResponse>('/api/courses/', request);
    return data.id;
  },

  async update(
    courseId: string,
    course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const request = {
      name: course.title,
      description: course.description,
      format: course.format,
      education_format: course.educationType,
      certificate_type: course.certificateType,
      cost: course.price.toString(),
      discounted_cost: course.discountedPrice !== null ? course.discountedPrice.toString() : null,
      duration_hours: course.duration,
      start_date: course.startDate,
      end_date: course.endDate,
      status: course.status,
      is_published: course.isPublished,
      locations: course.locations,
      sections: course.sections.map((section) => ({
        name: section.name,
        description: section.description,
        order_num: section.order,
        hours: section.hours,
      })),
      tags: course.tags,
      acquired_skill_ids: course.acquired_skills.map((skill) => skill.id),
      category_ids: course.categories.map((cat) => cat.id),
      lecturer_ids: course.lecturers.map((lect) => lect.id),
    };

    await apiClient.put(`/api/courses/${courseId}`, request);
  },

  async delete(courseId: string): Promise<void> {
    await apiClient.delete(`/api/courses/${courseId}`);
  },

  async search(query: string, skip = 0, limit = 50): Promise<Course[]> {
    const { data } = await apiClient.get<CourseAPI[]>('/api/courses/search', {
      params: { q: query, skip, limit },
    });
    return fromAPICourses(data);
  },
};
