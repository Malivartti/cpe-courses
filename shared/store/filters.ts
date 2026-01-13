import { create } from 'zustand';

import { categoryApi } from '../api/categories';
import { tagsApi } from '../api/tags';
import { Category, Tag } from '../types/course';
import { CertificateType, CourseFormat, EducationFormat } from '../types/course.api';

type FiltersDataState = {
  categories: Category[];
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  fetchFiltersData: () => Promise<void>;
};

export const FORMATS: CourseFormat[] = ['online', 'offline', 'mixed'];
export const EDUCATION_TYPES: EducationFormat[] = [
  'group',
  'individual',
  'self_paced',
  'mentorled',
  'cohort',
];
export const CERTIFICATE_TYPES: CertificateType[] = [
  'certificate',
  'diploma',
  'attestation',
  'none',
];

export const useFiltersDataStore = create<FiltersDataState>((set, get) => ({
  categories: [],
  tags: [],
  isLoading: false,
  error: null,

  fetchFiltersData: async () => {
    if (get().categories.length > 0 && get().tags.length > 0) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const [categories, tags] = await Promise.all([
        categoryApi.list(0, 100),
        tagsApi.list(0, 100),
      ]);

      set({ categories, tags, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки данных фильтров',
        isLoading: false,
      });
    }
  },
}));
