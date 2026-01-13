export type CourseStatus = 'active' | 'enrolling' | 'archived' | 'draft';
export type CourseFormat = 'online' | 'offline' | 'mixed';
export type EducationFormat = 'group' | 'individual' | 'self_paced' | 'mentorled' | 'cohort';

export type CertificateType = 'certificate' | 'diploma' | 'attestation' | 'none';

export type CategoryAPI = {
  category_id: string;
  name: string;
  description: string | null;
};

export type TagAPI = {
  tag_id: string;
  value: string;
};

export type SkillAPI = {
  skill_id: string;
  name: string;
  description: string | null;
};

export type LecturerAPI = {
  lecturer_id: string;
  name: string;
  position: string | null;
  bio: string | null;
  photo_url: string | null;
  competencies: string[];
};

export type CourseSectionAPI = {
  section_id: string;
  name: string;
  description: string | null;
  order_num: number;
  hours: number | null;
};

export type CourseAPI = {
  course_id: string;
  name: string;
  description: string | null;
  format: CourseFormat;
  education_format: EducationFormat;
  duration_hours: number;
  cost: string;
  discounted_cost: string | null;
  start_date: string | null;
  end_date: string | null;
  certificate_type: CertificateType;
  status: CourseStatus;
  is_published: boolean;
  locations: string[];
  categories: CategoryAPI[];
  tags: string[];
  acquired_skills: SkillAPI[];
  lecturers: LecturerAPI[];
  sections: CourseSectionAPI[];
  created_at: string;
  updated_at: string;
};
