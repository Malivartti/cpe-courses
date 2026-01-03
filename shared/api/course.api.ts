import { Course } from '../types/course';
import { delay, MOCK_DELAY } from './client';

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'React Native: мобильные приложения',
    description: 'Полный курс по разработке мобильных приложений',
    price: 15000,
    format: 'онлайн',
    educationType: 'повышение квалификации',
  },
  {
    id: '2',
    title: 'Дизайн-паттерны',
    description: 'Изучение паттернов проектирования',
    price: 12000,
    format: 'очно',
    educationType: 'профпереподготовка',
  },
];

export const courseApi = {
  async getAll(): Promise<Course[]> {
    await delay(MOCK_DELAY);

    return MOCK_COURSES;
  },
  async getById(id: string): Promise<Course> {
    await delay(MOCK_DELAY);

    const course = MOCK_COURSES.find((c) => c.id === id);
    if (!course) {
      throw new Error('Курс не найден');
    }

    return course;
  },
};
