import { Skill } from '../types/course';
import { SkillAPI } from '../types/course.api';
import { IDResponse } from '../types/general';
import { apiClient } from './client';
import { fromAPISkill } from './normalizers/courseNormaliser';

export const skillApi = {
  async list(skip = 0, limit = 100): Promise<Skill[]> {
    const { data } = await apiClient.get<SkillAPI[]>('/api/skills/', {
      params: { skip, limit },
    });
    return data.map(fromAPISkill);
  },

  async getById(skillId: string): Promise<Skill> {
    const { data } = await apiClient.get<SkillAPI>(`/api/skills/${skillId}`);
    return fromAPISkill(data);
  },

  async create(skill: Omit<Skill, 'id'>): Promise<string> {
    const request = {
      name: skill.name,
      description: skill.description,
    };
    const { data } = await apiClient.post<IDResponse>('/api/skills/', request);
    return data.id;
  },

  async update(skillId: string, skill: Omit<Skill, 'id'>): Promise<void> {
    const request = {
      name: skill.name,
      description: skill.description,
    };
    await apiClient.put(`/api/skills/${skillId}`, request);
  },

  async delete(skillId: string): Promise<void> {
    await apiClient.delete(`/api/skills/${skillId}`);
  },
};
