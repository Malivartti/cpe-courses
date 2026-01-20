import { create } from 'zustand';

import { enrollmentsApi } from '../api/enrollments';
import { EnrollAuthenticatedRequest, EnrollmentReadModel } from '../types/enrollment.api';

type EnrollmentsState = {
  enrollments: EnrollmentReadModel[];
  myEnrollments: EnrollmentReadModel[];
  isLoading: boolean;
  error: string | null;
  enroll: (
    courseId: string,
    data: EnrollAuthenticatedRequest,
    userData: { user_id: string; email: string }
  ) => Promise<string>;
  fetchMyEnrollments: (skip?: number, limit?: number) => Promise<void>;
  fetchEnrollments: (courseId: string, skip?: number, limit?: number) => Promise<void>;
  clearError: () => void;
  reset: () => void;
  isEnrolledInCourse: (courseId: string) => boolean;
};

export const useEnrollmentsStore = create<EnrollmentsState>((set, get) => ({
  enrollments: [],
  myEnrollments: [],
  isLoading: false,
  error: null,

  enroll: async (
    courseId: string,
    data: EnrollAuthenticatedRequest,
    userData: { user_id: string; email: string }
  ) => {
    set({ isLoading: true, error: null });
    try {
      const enrollmentId = await enrollmentsApi.enroll(courseId, data);

      const newEnrollment: EnrollmentReadModel = {
        enrollment_id: enrollmentId,
        user_id: userData.user_id,
        course_id: courseId,
        full_name: data.full_name,
        email: userData.email,
        phone: data.phone || '',
        message: data.message || '',
        created_at: new Date().toISOString(),
      };

      set((state) => ({
        myEnrollments: [...state.myEnrollments, newEnrollment],
        isLoading: false,
      }));

      return enrollmentId;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка при записи';
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
        error: error instanceof Error ? error.message : 'Ошибка при загрузке записей',
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
        error: error instanceof Error ? error.message : 'Ошибка при загрузке записей',
        isLoading: false,
      });
    }
  },

  isEnrolledInCourse: (courseId: string): boolean => {
    const { myEnrollments } = get();
    return myEnrollments.some((e) => e.course_id === courseId);
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      enrollments: [],
      myEnrollments: [],
      isLoading: false,
      error: null,
    });
  },
}));
