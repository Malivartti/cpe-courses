import { create } from 'zustand';

import { categoryApi } from '../api/categories';
import { Category } from '../types/course';

type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;

  fetchCategories: (skip?: number, limit?: number) => Promise<void>;
  getById: (categoryId: string) => Promise<Category | undefined>;
  create: (category: Omit<Category, 'id'>) => Promise<string>;
  update: (categoryId: string, category: Omit<Category, 'id'>) => Promise<void>;
  delete: (categoryId: string) => Promise<void>;
};

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async (skip = 0, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const categories = await categoryApi.list(skip, limit);
      set({ categories, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки категорий',
        isLoading: false,
      });
    }
  },

  getById: async (categoryId: string) => {
    const existing = get().categories.find((c) => c.id === categoryId);
    if (existing) return existing;

    set({ isLoading: true, error: null });
    try {
      const category = await categoryApi.getById(categoryId);
      set((state) => ({
        categories: [...state.categories, category],
        isLoading: false,
      }));
      return category;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки категории',
        isLoading: false,
      });
      return;
    }
  },

  create: async (category: Omit<Category, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      const newId = await categoryApi.create(category);

      set((state) => ({
        categories: [...state.categories, { ...category, id: newId }],
        isLoading: false,
      }));

      return newId;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка создания категории',
        isLoading: false,
      });
      throw error;
    }
  },

  update: async (categoryId: string, category: Omit<Category, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      await categoryApi.update(categoryId, category);

      set((state) => ({
        categories: state.categories.map((c) =>
          c.id === categoryId ? { ...category, id: categoryId } : c
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка обновления категории',
        isLoading: false,
      });
      throw error;
    }
  },

  delete: async (categoryId: string) => {
    set({ isLoading: true, error: null });

    try {
      await categoryApi.delete(categoryId);

      set((state) => ({
        categories: state.categories.filter((c) => c.id !== categoryId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка удаления категории',
        isLoading: false,
      });
      throw error;
    }
  },
}));
