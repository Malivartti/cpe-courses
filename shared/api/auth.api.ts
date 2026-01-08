import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthTokens, LoginRequest, RegisterRequest, User } from '@/shared/types/user';

import { ACCESS_TOKEN_LABEL, delay, MOCK_DELAY, REFRESH_TOKEN_LABEL } from './client';
import { MOCK_USERS } from './mocks/users.mock';

export const authApi = {
  async login(data: LoginRequest): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(MOCK_DELAY);

    const user = MOCK_USERS.find((u) => u.email === data.email && u.password === data.password);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const tokens: AuthTokens = {
      accessToken: `mock_access_${user.id}_${Date.now()}`,
      refreshToken: `mock_refresh_${user.id}_${Date.now()}`,
    };

    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_LABEL, tokens.accessToken],
      [REFRESH_TOKEN_LABEL, tokens.refreshToken],
    ]);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, tokens };
  },
  async register(data: RegisterRequest): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(MOCK_DELAY);

    if (MOCK_USERS.some((u) => u.email === data.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser: User = {
      id: String(Date.now()),
      email: data.email,
      name: data.name,
      role: data.role || 'user',
    };

    const tokens: AuthTokens = {
      accessToken: `mock_access_${newUser.id}_${Date.now()}`,
      refreshToken: `mock_refresh_${newUser.id}_${Date.now()}`,
    };

    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_LABEL, tokens.accessToken],
      [REFRESH_TOKEN_LABEL, tokens.refreshToken],
    ]);

    return { user: newUser, tokens };
  },
  async me(): Promise<User> {
    await delay(MOCK_DELAY);

    const token = await AsyncStorage.getItem(ACCESS_TOKEN_LABEL);
    if (!token) {
      throw new Error('Не авторизирован');
    }

    const userId = token.split('_')[2];
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const { password, ...userWithotPassword } = user;
    return userWithotPassword;
  },
  async logout(): Promise<void> {
    await delay(MOCK_DELAY);
    await AsyncStorage.multiRemove([ACCESS_TOKEN_LABEL, REFRESH_TOKEN_LABEL]);
  },
};
