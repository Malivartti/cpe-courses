import { IDResponse } from '@/shared/types/general';

import { Tag } from '../types/course';
import { TagAPI } from '../types/course.api';
import { apiClient } from './client';
import { fromAPITag } from './normalizers/courseNormaliser';

export const tagsApi = {
  async list(skip = 0, limit = 100): Promise<Tag[]> {
    const { data } = await apiClient.get<TagAPI[]>('/api/tags/', {
      params: { skip, limit },
    });
    return data.map(fromAPITag);
  },

  async getById(tagId: string): Promise<Tag> {
    const { data } = await apiClient.get<TagAPI>(`/api/tags/${tagId}`);
    return fromAPITag(data);
  },

  async create(tag: Omit<Tag, 'id'>): Promise<string> {
    const request = {
      name: tag.name,
    };
    const { data } = await apiClient.post<IDResponse>('/api/tags/', request);
    return data.id;
  },

  async update(tagId: string, tag: Omit<Tag, 'id'>): Promise<void> {
    const request = {
      name: tag.name,
    };
    await apiClient.put(`/api/tags/${tagId}`, request);
  },

  async delete(tagId: string): Promise<void> {
    await apiClient.delete(`/api/tags/${tagId}`);
  },
};
