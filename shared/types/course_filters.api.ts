import { CourseFormat, CourseStatus, EducationFormat } from './course.api';

export type SortField = 'title' | 'price' | 'duration' | 'none';
export type SortOrder = 'asc' | 'desc';

export type CoursesFilterAPI = {
  is_published?: boolean;
  status?: CourseStatus;
  search?: string | null;

  formats?: CourseFormat[] | null;
  education_types?: EducationFormat[] | null;
  tags?: string[] | null;
  category_ids?: string[] | null;

  price_min?: number | null;
  price_max?: number | null;
  duration_min?: number | null;
  duration_max?: number | null;

  has_discount?: boolean | null;
  is_upcoming?: boolean;

  sort_field?: SortField;
  sort_order?: SortOrder;

  skip?: number;
  limit?: number;
};
