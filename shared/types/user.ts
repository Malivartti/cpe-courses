export type Role = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  username: string;
  role: Role;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
};

export type LoginRequest = {
  username: string; // email
  password: string;
};

export type RegisterRequest = {
  email: string;
  username: string;
  password: string;
};
