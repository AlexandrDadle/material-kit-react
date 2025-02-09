import { ROLES } from 'src/constants/roles';
import { removeToken } from 'src/utils/helpers/jwtHelper';
import { postRequest } from 'src/utils/services/axiosService';
import type { AuthRequest, AuthResponse } from 'src/utils/services/types/auth.types';
import { removeUser } from './userService';

export async function loginUser(authData: AuthRequest): Promise<AuthResponse | null> {
  try {
    const response = await postRequest<AuthRequest, AuthResponse>('/auth/login', authData);
    if (response && Object.values(ROLES).includes(response.user.role)) {
      return response;
    } 

    throw new Error('Invalid role');
  } catch (error) {
    console.error('Error during user login:', error);
    return null;
  }
}

export function logoutUser(): void {
  removeToken();
  removeUser();
}
