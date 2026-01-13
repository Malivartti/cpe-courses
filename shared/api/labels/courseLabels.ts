import {
  CertificateType,
  CourseFormat,
  CourseStatus,
  EducationFormat,
} from '@/shared/types/course.api';

export const courseStatusLabels: Record<CourseStatus, string> = {
  active: 'Активный',
  enrolling: 'Идет набор',
  archived: 'Архивный',
  draft: 'Черновик',
};

export const courseFormatLabels: Record<CourseFormat, string> = {
  online: 'Онлайн',
  offline: 'Оффлайн',
  mixed: 'Смешанный',
};

export const educationFormatLabels: Record<EducationFormat, string> = {
  group: 'Групповой',
  individual: 'Индивидуальный',
  self_paced: 'Самостоятельный',
  mentorled: 'С наставником',
  cohort: 'Поток',
};

export const certificateTypeLabels: Record<CertificateType, string> = {
  certificate: 'Сертификат',
  diploma: 'Диплом',
  attestation: 'Аттестация',
  none: 'Без сертификата',
};

export const getCourseStatusLabel = (value: CourseStatus): string =>
  courseStatusLabels[value] || value;

export const getCourseFormatLabel = (value: CourseFormat): string =>
  courseFormatLabels[value] || value;

export const getEducationFormatLabel = (value: EducationFormat): string =>
  educationFormatLabels[value] || value;

export const getCertificateTypeLabel = (value: CertificateType): string =>
  certificateTypeLabels[value] || value;
