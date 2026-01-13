import { Lecturer } from '../types/course';
import { LecturerAPI } from '../types/course.api';
import { IDResponse } from '../types/general';
import { apiClient } from './client';
import { fromAPILecturer } from './normalizers/courseNormaliser';

export const lecturersApi = {
  async list(skip = 0, limit = 100): Promise<Lecturer[]> {
    const { data } = await apiClient.get<LecturerAPI[]>('/api/lecturers', {
      params: { skip, limit },
    });
    return data.map(fromAPILecturer);
  },

  async getById(lecturerId: string): Promise<Lecturer> {
    const { data } = await apiClient.get<LecturerAPI>(`/api/lecturers/${lecturerId}`);
    return fromAPILecturer(data);
  },

  async create(lecturer: Omit<Lecturer, 'id'>): Promise<string> {
    const request = {
      name: lecturer.name,
      position: lecturer.position,
      bio: lecturer.bio,
      photo_url: null,
      competencies: lecturer.competencies,
    };
    const { data } = await apiClient.post<IDResponse>('/api/lecturers', request);
    return data.id;
  },

  async update(lecturerId: string, lecturer: Omit<Lecturer, 'id'>): Promise<void> {
    const request = {
      name: lecturer.name,
      position: lecturer.position,
      bio: lecturer.bio,
      photo_url: null,
      competencies: lecturer.competencies,
    };
    await apiClient.put(`/api/lecturers/${lecturerId}`, request);
  },

  async delete(lecturerId: string): Promise<void> {
    await apiClient.delete(`/api/lecturers/${lecturerId}`);
  },
};
