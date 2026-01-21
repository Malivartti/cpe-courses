import { Course } from '../types/course';
import { CourseAPI } from '../types/course.api';
import { apiClient } from './client';
import { fromAPICourses } from './normalizers/courseNormaliser';

export interface RecommendationsParams {
  q: string;
  skip?: number;
  limit?: number;
}

export enum RecommendationNotice {
  QUERY_INVALID = 'query_invalid',
  QUERY_AMBIGUOUS = 'query_ambiguous',
  FALLBACK_USED = 'fallback_used',
  RANKING_WEAK = 'ranking_weak',
  FILTERS_INFERRED = 'filters_inferred',
}

interface RecommendationsAPIResponse {
  notices: RecommendationNotice[];
  courses: CourseAPI[];
  skip: number;
}

export interface RecommendationsResponse {
  notices: RecommendationNotice[];
  courses: Course[];
  skip: number;
}

export const recommendationsApi = {
  async recommend(params: RecommendationsParams): Promise<RecommendationsResponse> {
    const response = await apiClient.get<RecommendationsAPIResponse>('/api/recommendations/', {
      params: {
        q: params.q,
        skip: params.skip ?? 0,
        limit: params.limit ?? 10,
      },
    });

    const data = response.data;

    return {
      notices: data.notices || [],
      courses: fromAPICourses(data.courses),
      skip: data.skip,
    };
  },
};
