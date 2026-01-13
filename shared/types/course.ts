export type CourseStatus = 'active' | 'enrolling' | 'archived' | 'draft';
export type CourseFormat = 'online' | 'offline' | 'mixed';
export type EducationFormat = 'group' | 'individual' | 'self_paced' | 'mentorled' | 'cohort';

export type CertificateType = 'certificate' | 'diploma' | 'attestation' | 'none';

export type Category = {
  id: string;
  name: string;
  description: string | null;
};

export type Skill = {
  id: string;
  name: string;
  description: string | null;
};

export type Lecturer = {
  id: string;
  name: string;
  position: string | null;
  bio: string | null;
  competencies: string[];
};

export type CourseSection = {
  id: string;
  name: string;
  description: string | null;
  order: number;
  hours: number | null;
};

export type Tag = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  format: CourseFormat;
  educationType: EducationFormat;
  duration: number;
  price: number;
  discountedPrice: number | null;
  startDate: string | null;
  endDate: string | null;
  certificateType: CertificateType;
  status: CourseStatus;
  isPublished: boolean;
  locations: string[];
  categories: Category[];
  tags: string[];
  acquired_skills: Skill[];
  lecturers: Lecturer[];
  sections: CourseSection[];
  createdAt: string;
  updatedAt: string;
};
