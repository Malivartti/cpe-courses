import { Dictionaries } from '@/shared/types/dictionaries';

export const MOCK_DICTIONARIES: Dictionaries = {
  directions: [
    { id: '1', name: 'IT и программирование' },
    { id: '2', name: 'Дизайн' },
    { id: '3', name: 'Аналитика' },
    { id: '4', name: 'Маркетинг' },
    { id: '5', name: 'Менеджмент' },
    { id: '6', name: 'Финансы' },
  ],
  formats: [
    { id: '1', name: 'Онлайн' },
    { id: '2', name: 'Офлайн' },
    { id: '3', name: 'Гибрид' },
  ],
  educationTypes: [
    { id: '1', name: 'Самостоятельно' },
    { id: '2', name: 'С куратором' },
    { id: '3', name: 'С наставником' },
  ],
  locations: [
    { id: '1', name: 'Москва, ул. Тверская, д. 1' },
    { id: '2', name: 'Москва, ул. Арбат, д. 5' },
    { id: '3', name: 'Санкт-Петербург, Невский проспект, д. 10' },
    { id: '4', name: 'Екатеринбург, ул. Ленина, д. 15' },
  ],
};
