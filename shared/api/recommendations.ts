import { Course } from '../types/course';
import { apiClient } from './client';
import { fromAPICourses } from './normalizers/courseNormaliser';

export interface RecommendationsParams {
  q: string;
  skip?: number;
  limit?: number;
}

export interface RecommendationsResponse {
  courses: Course[];
  skip: number;
}

export const recommendationsApi = {
  async recommend(params: RecommendationsParams): Promise<RecommendationsResponse> {
    const { data } = await apiClient.get<any>('/api/recommendations/', {
      params: {
        q: params.q,
        skip: params.skip ?? 0,
        limit: params.limit ?? 10,
      },
    });

    return {
      courses: fromAPICourses(data.courses),
      skip: data.skip,
    };
  },
};
