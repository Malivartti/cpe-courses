import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthTokens, LoginRequest, RegisterRequest, User } from '@/shared/types/user';

import { ACCESS_TOKEN_LABEL, apiClient, REFRESH_TOKEN_LABEL } from './client';

export const authApi = {
  async login(data: LoginRequest): Promise<User> {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const { data: tokens } = await apiClient.post<AuthTokens>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_LABEL, tokens.access_token],
      [REFRESH_TOKEN_LABEL, tokens.refresh_token],
    ]);

    return await this.me();
  },

  async register(data: RegisterRequest): Promise<User> {
    await apiClient.post('/users/register', data);

    return await this.login({
      username: data.email,
      password: data.password,
    });
  },

  async me(): Promise<User> {
    const { data } = await apiClient.get<User>('/users/me');
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      role: data.role,
    };
  },

  async logout(): Promise<void> {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_LABEL);
    await apiClient.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    await AsyncStorage.multiRemove([ACCESS_TOKEN_LABEL, REFRESH_TOKEN_LABEL]);
  },
};
