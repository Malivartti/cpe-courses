export type CourseDirection = {
  id: string;
  name: string;
};

export type CourseFormat = {
  id: string;
  name: string;
};

export type EducationType = {
  id: string;
  name: string;
};

export type Location = {
  id: string;
  name: string;
};

export type Instructor = {
  id: string;
  fullName: string;
  competencies: string[];
  avatar?: string;
};

export type CourseModule = {
  id: string;
  title: string;
  description: string;
  order: number;
};

export type CoursePreview = {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  discountPrice?: number;
  direction: CourseDirection;
  format: CourseFormat;
  educationType: EducationType;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseDetails = CoursePreview & {
  locations: Location[];
  modules: CourseModule[];
  instructors: Instructor[];
  requirements?: string[];
  outcomes?: string[];
  startDate?: string;
  endDate?: string;
  maxStudents?: number;
  currentStudents?: number;
};

export type CourseFilters = {
  search?: string;
  directionIds?: string[];
  formatIds?: string[];
  educationTypeIds?: string[];
  locationIds?: string[];
  priceMin?: number;
  priceMax?: number;
  durationMin?: number;
  durationMax?: number;
  hasDiscount?: boolean;
};

export type CourseSortField = 'title' | 'price' | 'duration' | 'none';
export type CourseSortOrder = 'asc' | 'desc';

export type CourseSortOptions = {
  field: CourseSortField;
  order: CourseSortOrder;
};

export type CoursesResponse = {
  courses: CoursePreview[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};
