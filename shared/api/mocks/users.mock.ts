import { User } from '@/shared/types/user';

export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'user1@test.com',
    name: 'User 1',
    password: 'password123',
    role: 'user',
  },
  {
    id: '2',
    email: 'author1@test.com',
    name: 'Author 1',
    password: 'password123',
    role: 'author',
  },
];
