import { create } from 'zustand';

import { enrollmentsApi } from '../api/enrollments';
import { EnrollAuthenticatedRequest, EnrollmentReadModel } from '../types/enrollment.api';

type EnrollmentsState = {
  enrollments: EnrollmentReadModel[];
  myEnrollments: EnrollmentReadModel[];
  isLoading: boolean;
  error: string | null;

  enroll: (courseId: string, data: EnrollAuthenticatedRequest) => Promise<string>;

  fetchMyEnrollments: (skip?: number, limit?: number) => Promise<void>;

  fetchEnrollments: (courseId: string, skip?: number, limit?: number) => Promise<void>;

  clearError: () => void;
  reset: () => void;
};

export const useEnrollmentsStore = create<EnrollmentsState>((set, get) => ({
  enrollments: [],
  myEnrollments: [],
  isLoading: false,
  error: null,

  enroll: async (courseId: string, data: EnrollAuthenticatedRequest) => {
    set({ isLoading: true, error: null });
    try {
      const enrollmentId = await enrollmentsApi.enroll(courseId, data);
      set({ isLoading: false });
      return enrollmentId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось записаться на курс';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchMyEnrollments: async (skip = 0, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const enrollments = await enrollmentsApi.listMyEnrollments(skip, limit);
      set({ myEnrollments: enrollments, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Не удалось загрузить ваши записи',
        isLoading: false,
      });
    }
  },

  fetchEnrollments: async (courseId: string, skip = 0, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const enrollments = await enrollmentsApi.listEnrollments(courseId, skip, limit);
      set({ enrollments, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Не удалось загрузить список записавшихся',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      enrollments: [],
      myEnrollments: [],
      isLoading: false,
      error: null,
    }),
}));
