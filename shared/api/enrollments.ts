import { EnrollAuthenticatedRequest, EnrollmentReadModel } from '../types/enrollment.api';
import { IDResponse } from '../types/general';
import { apiClient } from './client';

export const enrollmentsApi = {
  async enroll(courseId: string, request: EnrollAuthenticatedRequest): Promise<string> {
    const { data } = await apiClient.post<IDResponse>(
      `/api/courses/${courseId}/enrollments/authenticated`,
      request
    );
    return data.id;
  },

  async listEnrollments(courseId: string, skip = 0, limit = 100): Promise<EnrollmentReadModel[]> {
    const { data } = await apiClient.get<EnrollmentReadModel[]>(
      `/api/courses/${courseId}/enrollments`,
      {
        params: { skip, limit },
      }
    );
    return data;
  },

  async listMyEnrollments(skip = 0, limit = 100): Promise<EnrollmentReadModel[]> {
    const { data } = await apiClient.get<EnrollmentReadModel[]>('/api/courses/enrollments/me', {
      params: { skip, limit },
    });
    return data;
  },
};
