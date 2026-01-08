import { create } from 'zustand';

import { courseApi } from '../api/course.api';
import { dictionariesApi } from '../api/dictionaries.api';
import { CourseDetails, CourseFilters, CoursePreview, CourseSortOptions } from '../types/course';
import { Dictionaries } from '../types/dictionaries';

type CoursesState = {
  courses: CoursePreview[];
  selectedCourse: CourseDetails | null;
  dictionaries: Dictionaries | null;
  filters: CourseFilters;
  sort: CourseSortOptions;
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;

  loadDictionaries: () => Promise<void>;
  loadCourses: (append?: boolean) => Promise<void>;
  loadCourseById: (id: string) => Promise<void>;
  setFilters: (filters: CourseFilters) => void;
  setSort: (sort: CourseSortOptions) => void;
  resetFilters: () => void;
  nextPage: () => void;
  clearSelectedCourse: () => void;
};

const DEFAULT_SORT: CourseSortOptions = {
  field: 'none',
  order: 'asc',
};

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  selectedCourse: null,
  dictionaries: null,
  filters: {},
  sort: DEFAULT_SORT,
  page: 1,
  pageSize: 10,
  total: 0,
  hasMore: false,
  isLoading: false,
  error: null,

  loadDictionaries: async () => {
    try {
      set({ isLoading: true, error: null });
      const dictionaries = await dictionariesApi.getAll();
      set({ dictionaries, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  loadCourses: async (append = false) => {
    try {
      set({ isLoading: true, error: null });
      const { filters, sort, page, pageSize } = get();

      const response = await courseApi.getAll(filters, sort, page, pageSize);

      set({
        courses: append ? [...get().courses, ...response.courses] : response.courses,
        total: response.total,
        hasMore: response.hasMore,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  loadCourseById: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const course = await courseApi.getById(id);
      set({ selectedCourse: course, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setFilters: (filters: CourseFilters) => {
    set({ filters, page: 1 });
    get().loadCourses();
  },

  setSort: (sort: CourseSortOptions) => {
    set({ sort, page: 1 });
    get().loadCourses();
  },

  resetFilters: () => {
    set({ filters: {}, sort: DEFAULT_SORT, page: 1 });
    get().loadCourses();
  },

  nextPage: () => {
    const { hasMore, page } = get();
    if (hasMore) {
      set({ page: page + 1 });
      get().loadCourses(true);
    }
  },
  clearSelectedCourse: () => {
    set({ selectedCourse: null });
  },
}));
