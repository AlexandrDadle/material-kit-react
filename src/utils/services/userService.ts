import type * as UserTypes from 'src/types/user.types';

import { USER_STORAGE_KEY } from './constants';

type USER_TYPES = UserTypes.BaseUser | UserTypes.SuperAdmin;

export const setUser = (user: USER_TYPES): void => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const getUser = (): USER_TYPES | null => {
  const user = localStorage.getItem(USER_STORAGE_KEY);

  return user ? JSON.parse(user) as USER_TYPES : null;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getRole = (): string | null => {
  const user = getUser();
  return user ? user.role : null;
};
