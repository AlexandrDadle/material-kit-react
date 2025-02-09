// import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN_STORAGE_KEY } from 'src/utils/services/constants';

export const setToken = (token: string) => {
  console.log('Setting token:', token);
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  console.log('Token set:', localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
};

export const getToken = (): string | null => {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  console.log('Getting token:', token);  
  return token;
};

export const removeToken = () => {
  console.log('Removing token:', localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  console.log('Token removed:', localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
};

// export const decodeToken = (token: string) => {
//   try {
//     const decodedToken = jwtDecode(token); // Ensure the correct type is used
//     console.log(decodedToken);
//     return decodedToken;
//   } catch (e) {
//     console.error('Error decoding token:', e);
//     return null;
//   }
// };