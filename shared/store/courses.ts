import { create } from 'zustand';

import { courseApi } from '@/shared/api/courses';
import { Course } from '@/shared/types/course';
import { CoursesFilter } from '@/shared/types/course_filters';

import { SortField, SortOrder } from '../types/course_filters.api';

type Pagination = {
  skip: number;
  limit: number;
  hasMore: boolean;
};

type CoursesState = {
  courses: Course[];
  selectedCourse: Course | null;
  filter: CoursesFilter;
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;

  loadCourses: () => Promise<void>;
  loadMoreCourses: () => Promise<void>;
  loadCourseById: (courseId: string) => Promise<void>;
  clearSelectedCourse: () => void;

  setFilter: (filter: Partial<CoursesFilter>) => void;
  setSearch: (search: string | null) => void;
  setSorting: (sortField: SortField, sortOrder: SortOrder) => void;
  resetFilter: () => void;

  createCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateCourse: (
    courseId: string,
    course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;

  reset: () => void;
};

const DEFAULT_LIMIT = 20;

const DEFAULT_FILTER: CoursesFilter = {
  isPublished: null,
  status: null,
  search: null,
  formats: null,
  educationTypes: null,
  tags: null,
  categoryIds: null,
  priceMin: null,
  priceMax: null,
  durationMin: null,
  durationMax: null,
  hasDiscount: null,
  isUpcoming: null,
  sortField: 'none',
  sortOrder: 'asc',
  skip: 0,
  limit: DEFAULT_LIMIT,
};

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  selectedCourse: null,
  filter: DEFAULT_FILTER,
  pagination: {
    skip: 0,
    limit: DEFAULT_LIMIT,
    hasMore: true,
  },
  isLoading: false,
  error: null,

  loadCourses: async () => {
    const { filter } = get();
    set({ isLoading: true, error: null });

    try {
      const data = await courseApi.list({
        ...filter,
        skip: 0,
        limit: filter.limit ?? DEFAULT_LIMIT,
      });

      set({
        courses: data,
        pagination: {
          skip: 0,
          limit: filter.limit ?? DEFAULT_LIMIT,
          hasMore: data.length >= (filter.limit ?? DEFAULT_LIMIT),
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки курсов',
        isLoading: false,
      });
    }
  },

  loadMoreCourses: async () => {
    const { filter, courses, pagination } = get();

    if (!pagination.hasMore || get().isLoading) return;

    set({ isLoading: true, error: null });
    const newSkip = pagination.skip + pagination.limit;

    try {
      const data = await courseApi.list({
        ...filter,
        skip: newSkip,
        limit: pagination.limit,
      });

      set({
        courses: [...courses, ...data],
        pagination: {
          skip: newSkip,
          limit: pagination.limit,
          hasMore: data.length >= pagination.limit,
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки курсов',
        isLoading: false,
      });
    }
  },

  loadCourseById: async (courseId: string) => {
    set({ isLoading: true, error: null });

    try {
      const data = await courseApi.getById(courseId);
      set({ selectedCourse: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки курса',
        isLoading: false,
      });
    }
  },

  clearSelectedCourse: () => {
    set({ selectedCourse: null });
  },

  setFilter: (newFilter: Partial<CoursesFilter>) => {
    set((state) => ({
      filter: { ...state.filter, ...newFilter },
    }));
    get().loadCourses();
  },

  setSearch: (search: string | null) => {
    set((state) => ({
      filter: { ...state.filter, search },
    }));
    get().loadCourses();
  },

  setSorting: (sortField: SortField, sortOrder: SortOrder) => {
    set((state) => ({
      filter: { ...state.filter, sortField, sortOrder },
    }));
    get().loadCourses();
  },

  resetFilter: () => {
    set((state) => ({
      filter: {
        ...DEFAULT_FILTER,
        search: state.filter.search,
        sortField: state.filter.sortField,
        sortOrder: state.filter.sortOrder,
      },
    }));
    get().loadCourses();
  },

  createCourse: async (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    set({ isLoading: true, error: null });

    try {
      const newId = await courseApi.create(course);

      await get().loadCourses();

      set({ isLoading: false });
      return newId;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка создания курса',
        isLoading: false,
      });
      throw error;
    }
  },

  updateCourse: async (
    courseId: string,
    course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    set({ isLoading: true, error: null });

    try {
      await courseApi.update(courseId, course);

      await get().loadCourses();

      if (get().selectedCourse?.id === courseId) {
        await get().loadCourseById(courseId);
      }

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка обновления курса',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteCourse: async (courseId: string) => {
    set({ isLoading: true, error: null });

    try {
      await courseApi.delete(courseId);

      set((state) => ({
        courses: state.courses.filter((c) => c.id !== courseId),
        selectedCourse: state.selectedCourse?.id === courseId ? null : state.selectedCourse,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка удаления курса',
        isLoading: false,
      });
      throw error;
    }
  },

  reset: () => {
    set({
      courses: [],
      selectedCourse: null,
      filter: DEFAULT_FILTER,
      pagination: {
        skip: 0,
        limit: DEFAULT_LIMIT,
        hasMore: true,
      },
      isLoading: false,
      error: null,
    });
  },
}));
