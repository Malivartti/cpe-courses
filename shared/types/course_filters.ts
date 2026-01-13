import { CourseFormat, CourseStatus, EducationFormat } from './course.api';
import { SortField, SortOrder } from './course_filters.api';

export type CoursesFilter = {
  isPublished?: boolean | null;
  status?: CourseStatus | null;
  search?: string | null;

  formats?: CourseFormat[] | null;
  educationTypes?: EducationFormat[] | null;
  tags?: string[] | null;
  categoryIds?: string[] | null;

  priceMin?: number | null;
  priceMax?: number | null;
  durationMin?: number | null;
  durationMax?: number | null;

  hasDiscount?: boolean | null;
  isUpcoming?: boolean | null;

  sortField?: SortField;
  sortOrder?: SortOrder;

  skip?: number;
  limit?: number;
};
