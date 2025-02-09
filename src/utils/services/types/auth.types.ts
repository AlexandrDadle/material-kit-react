import type { BaseUser, SuperAdmin } from 'src/types/user.types';

export interface AuthResponse {
  access_token: string;
  user: BaseUser | SuperAdmin;
}

export interface AuthRequest {
  email: string;
  password: string;
}
