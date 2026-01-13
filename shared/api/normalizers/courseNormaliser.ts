import { Category, Course, CourseSection, Lecturer, Skill, Tag } from '@/shared/types/course';
import {
  CategoryAPI,
  CourseAPI,
  CourseSectionAPI,
  LecturerAPI,
  SkillAPI,
  TagAPI,
} from '@/shared/types/course.api';

export const fromAPICategory = (apiCategory: CategoryAPI): Category => ({
  id: apiCategory.category_id,
  name: apiCategory.name,
  description: apiCategory.description,
});

export const toAPICategory = (category: Category): CategoryAPI => ({
  category_id: category.id,
  name: category.name,
  description: category.description,
});

export const fromAPISkill = (apiSkill: SkillAPI): Skill => ({
  id: apiSkill.skill_id,
  name: apiSkill.name,
  description: apiSkill.description,
});

export const toAPISkill = (skill: Skill): SkillAPI => ({
  skill_id: skill.id,
  name: skill.name,
  description: skill.description,
});

export const fromAPILecturer = (apiLecturer: LecturerAPI): Lecturer => ({
  id: apiLecturer.lecturer_id,
  name: apiLecturer.name,
  position: apiLecturer.position,
  bio: apiLecturer.bio,
  competencies: apiLecturer.competencies,
});

export const toAPILecturer = (lecturer: Lecturer): LecturerAPI => ({
  lecturer_id: lecturer.id,
  name: lecturer.name,
  position: lecturer.position,
  bio: lecturer.bio,
  photo_url: null,
  competencies: lecturer.competencies,
});

export const fromAPISection = (apiSection: CourseSectionAPI): CourseSection => ({
  id: apiSection.section_id,
  name: apiSection.name,
  description: apiSection.description,
  order: apiSection.order_num,
  hours: apiSection.hours,
});

export const toAPISection = (section: CourseSection): CourseSectionAPI => ({
  section_id: section.id,
  name: section.name,
  description: section.description,
  order_num: section.order,
  hours: section.hours,
});

export const fromAPITag = (apiTag: TagAPI): Tag => ({
  id: apiTag.tag_id,
  name: apiTag.value,
});

export const toAPITag = (tag: Tag): TagAPI => ({
  tag_id: tag.id,
  value: tag.name,
});

export const fromAPICourse = (apiCourse: CourseAPI): Course => ({
  id: apiCourse.course_id,
  title: apiCourse.name,
  description: apiCourse.description,
  format: apiCourse.format,
  educationType: apiCourse.education_format,
  duration: apiCourse.duration_hours,
  price: Number(apiCourse.cost),
  discountedPrice: apiCourse.discounted_cost ? Number(apiCourse.discounted_cost) : null,
  startDate: apiCourse.start_date,
  endDate: apiCourse.end_date,
  certificateType: apiCourse.certificate_type,
  status: apiCourse.status,
  isPublished: apiCourse.is_published,
  locations: apiCourse.locations,
  categories: apiCourse.categories.map(fromAPICategory),
  tags: apiCourse.tags,
  acquired_skills: apiCourse.acquired_skills.map(fromAPISkill),
  lecturers: apiCourse.lecturers.map(fromAPILecturer),
  sections: apiCourse.sections.map(fromAPISection),
  createdAt: apiCourse.created_at,
  updatedAt: apiCourse.updated_at,
});

export const toAPICourse = (course: Course): CourseAPI => ({
  course_id: course.id,
  name: course.title,
  description: course.description,
  format: course.format,
  education_format: course.educationType,
  duration_hours: course.duration,
  cost: String(course.price),
  discounted_cost: course.discountedPrice !== null ? course.discountedPrice.toString() : null,
  start_date: course.startDate,
  end_date: course.endDate,
  certificate_type: course.certificateType,
  status: course.status,
  is_published: course.isPublished,
  locations: course.locations,
  categories: course.categories.map(toAPICategory),
  tags: course.tags,
  acquired_skills: course.acquired_skills.map(toAPISkill),
  lecturers: course.lecturers.map(toAPILecturer),
  sections: course.sections.map(toAPISection),
  created_at: course.createdAt,
  updated_at: course.updatedAt,
});

export const fromAPICourses = (apiCourses: CourseAPI[]): Course[] => apiCourses.map(fromAPICourse);

export const toAPICourses = (courses: Course[]): CourseAPI[] => courses.map(toAPICourse);
