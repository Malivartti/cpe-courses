import { create } from 'zustand';

import { authApi } from '../api/auth';
import { LoginRequest, RegisterRequest, User } from '../types/user';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  clearError: () => void;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (data) => {
    set({ isLoading: true });
    try {
      const user = await authApi.login(data);
      set({ user, isLoading: false });
    } catch (error: any) {
      const message = error?.response?.data?.detail?.message || 'Authentication failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.register(data);
      set({ user, isLoading: false });
    } catch (error: any) {
      const message = error?.response?.data?.detail?.message || 'Registration failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ user: null, isLoading: false });
    } catch (error: any) {
      const message = error?.response?.data?.detail?.message || 'Logout failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authApi.me();
      set({ user, isInitialized: true, isLoading: false });
    } catch {
      set({ user: null, isInitialized: true, isLoading: false });
    }
  },
}));
