import { Category } from '../types/course';
import { CategoryAPI } from '../types/course.api';
import { IDResponse } from '../types/general';
import { apiClient } from './client';
import { fromAPICategory } from './normalizers/courseNormaliser';

export const categoryApi = {
  async list(skip = 0, limit = 100): Promise<Category[]> {
    const { data } = await apiClient.get<CategoryAPI[]>('/api/categories/', {
      params: { skip, limit },
    });
    return data.map(fromAPICategory);
  },

  async getById(categoryId: string): Promise<Category> {
    const { data } = await apiClient.get<CategoryAPI>(`/api/categories/${categoryId}`);
    return fromAPICategory(data);
  },

  async create(category: Omit<Category, 'id'>): Promise<string> {
    const request = {
      name: category.name,
      description: category.description,
    };
    const { data } = await apiClient.post<IDResponse>('/api/categories/', request);
    return data.id;
  },

  async update(categoryId: string, category: Omit<Category, 'id'>): Promise<void> {
    const request = {
      name: category.name,
      description: category.description,
    };
    await apiClient.put(`/api/categories/${categoryId}`, request);
  },

  async delete(categoryId: string): Promise<void> {
    await apiClient.delete(`/api/categories/${categoryId}`);
  },
};
