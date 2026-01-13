import { create } from 'zustand';

import { skillApi } from '../api/skills';
import { Skill } from '../types/course';

type SkillsState = {
  skills: Skill[];
  isLoading: boolean;
  error: string | null;

  fetchSkills: (skip?: number, limit?: number) => Promise<void>;
  getById: (skillId: string) => Promise<Skill | undefined>;
  create: (skill: Omit<Skill, 'id'>) => Promise<string>;
  update: (skillId: string, skill: Omit<Skill, 'id'>) => Promise<void>;
  delete: (skillId: string) => Promise<void>;
};

export const useSkillsStore = create<SkillsState>((set, get) => ({
  skills: [],
  isLoading: false,
  error: null,

  fetchSkills: async (skip = 0, limit = 100) => {
    set({ isLoading: true, error: null });
    try {
      const skills = await skillApi.list(skip, limit);
      set({ skills, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки навыков',
        isLoading: false,
      });
    }
  },

  getById: async (skillId: string) => {
    const existing = get().skills.find((s) => s.id === skillId);
    if (existing) return existing;

    set({ isLoading: true, error: null });
    try {
      const skill = await skillApi.getById(skillId);
      set((state) => ({
        skills: [...state.skills, skill],
        isLoading: false,
      }));
      return skill;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки навыка',
        isLoading: false,
      });
      return;
    }
  },

  create: async (skill: Omit<Skill, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      const newId = await skillApi.create(skill);

      set((state) => ({
        skills: [...state.skills, { ...skill, id: newId }],
        isLoading: false,
      }));

      return newId;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка создания навыка',
        isLoading: false,
      });
      throw error;
    }
  },

  update: async (skillId: string, skill: Omit<Skill, 'id'>) => {
    set({ isLoading: true, error: null });

    try {
      await skillApi.update(skillId, skill);

      set((state) => ({
        skills: state.skills.map((s) => (s.id === skillId ? { ...skill, id: skillId } : s)),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка обновления навыка',
        isLoading: false,
      });
      throw error;
    }
  },

  delete: async (skillId: string) => {
    set({ isLoading: true, error: null });

    try {
      await skillApi.delete(skillId);

      set((state) => ({
        skills: state.skills.filter((s) => s.id !== skillId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка удаления навыка',
        isLoading: false,
      });
      throw error;
    }
  },
}));
