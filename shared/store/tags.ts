import { create } from 'zustand';

import { tagsApi } from '@/shared/api/tags';
import { Tag } from '@/shared/types/course';

type TagsState = {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;

  fetchTags: (skip?: number, limit?: number) => Promise<void>;
  getById: (tagId: string) => Promise<Tag | undefined>;

  create: (tag: Omit<Tag, 'id'>) => Promise<string>;
  update: (tagId: string, tag: Omit<Tag, 'id'>) => Promise<void>;
  delete: (tagId: string) => Promise<void>;
};

export const useTagsStore = create<TagsState>((set, get) => ({
  tags: [],
  isLoading: false,
  error: null,

  fetchTags: async (skip = 0, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const tags = await tagsApi.list(skip, limit);
      set({ tags, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки тегов',
        isLoading: false,
      });
    }
  },

  getById: async (tagId: string) => {
    const existing = get().tags.find((t) => t.id === tagId);
    if (existing) return existing;

    set({ isLoading: true, error: null });
    try {
      const tag = await tagsApi.getById(tagId);
      set((state) => ({
        tags: [...state.tags, tag],
        isLoading: false,
      }));
      return tag;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки тега',
        isLoading: false,
      });
      return undefined;
    }
  },

  create: async (tag: Omit<Tag, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      const newId = await tagsApi.create(tag);

      set((state) => ({
        tags: [...state.tags, { id: newId, name: tag.name }],
        isLoading: false,
      }));

      return newId;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка создания тега',
        isLoading: false,
      });
      throw error;
    }
  },

  update: async (tagId: string, tag: Omit<Tag, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      await tagsApi.update(tagId, tag);

      set((state) => ({
        tags: state.tags.map((t) => (t.id === tagId ? { id: tagId, name: tag.name } : t)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка обновления тега',
        isLoading: false,
      });
      throw error;
    }
  },

  delete: async (tagId: string) => {
    set({ isLoading: true, error: null });

    try {
      await tagsApi.delete(tagId);

      set((state) => ({
        tags: state.tags.filter((t) => t.id !== tagId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка удаления тега',
        isLoading: false,
      });
      throw error;
    }
  },
}));
