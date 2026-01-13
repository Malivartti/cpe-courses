import { create } from 'zustand';

import { lecturersApi } from '../api/lectureres';
import { Lecturer } from '../types/course';

type LecturersState = {
  lecturers: Lecturer[];
  isLoading: boolean;
  error: string | null;

  fetchLecturers: (skip?: number, limit?: number) => Promise<void>;
  getById: (lecturerId: string) => Promise<Lecturer | undefined>;
  create: (lecturer: Omit<Lecturer, 'id'>) => Promise<string>;
  update: (lecturerId: string, lecturer: Omit<Lecturer, 'id'>) => Promise<void>;
  delete: (lecturerId: string) => Promise<void>;
};

export const useLecturersStore = create<LecturersState>((set, get) => ({
  lecturers: [],
  isLoading: false,
  error: null,

  fetchLecturers: async (skip = 0, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const lecturers = await lecturersApi.list(skip, limit);
      set({ lecturers, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки преподавателей',
        isLoading: false,
      });
    }
  },

  getById: async (lecturerId: string) => {
    const existing = get().lecturers.find((l) => l.id === lecturerId);
    if (existing) return existing;

    set({ isLoading: true, error: null });
    try {
      const lecturer = await lecturersApi.getById(lecturerId);
      set((state) => ({
        lecturers: [...state.lecturers, lecturer],
        isLoading: false,
      }));
      return lecturer;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки преподавателя',
        isLoading: false,
      });
      return;
    }
  },

  create: async (lecturer: Omit<Lecturer, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      const newId = await lecturersApi.create(lecturer);

      set((state) => ({
        lecturers: [...state.lecturers, { ...lecturer, id: newId }],
        isLoading: false,
      }));

      return newId;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка создания преподавателя',
        isLoading: false,
      });
      throw error;
    }
  },

  update: async (lecturerId: string, lecturer: Omit<Lecturer, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      await lecturersApi.update(lecturerId, lecturer);

      set((state) => ({
        lecturers: state.lecturers.map((l) =>
          l.id === lecturerId ? { ...lecturer, id: lecturerId } : l
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка обновления преподавателя',
        isLoading: false,
      });
      throw error;
    }
  },

  delete: async (lecturerId: string) => {
    set({ isLoading: true, error: null });

    try {
      await lecturersApi.delete(lecturerId);

      set((state) => ({
        lecturers: state.lecturers.filter((l) => l.id !== lecturerId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка удаления преподавателя',
        isLoading: false,
      });
      throw error;
    }
  },
}));
