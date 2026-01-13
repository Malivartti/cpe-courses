export interface EnrollAuthenticatedRequest {
  full_name: string;
  phone?: string | null;
  message?: string | null;
}

export interface EnrollmentReadModel {
  enrollment_id: string;
  course_id: string;
  email: string;
  full_name: string;
  phone: string | null;
  message: string | null;
  user_id: string | null;
  created_at: string;
}
