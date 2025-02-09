import axios from 'axios';
import { ACCESS_TOKEN_STORAGE_KEY } from 'src/utils/services/constants';

/**
 * Axios instance for sending requests to the server
 */
const apiClient = axios.create({
  baseURL: 'https://rentme.test/rest-api/', // Hardcoded Base URL for the API requests
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

/**
 * Add token to request config headers if it exists
 * @param config - request configuration
 * @returns request configuration with token or without it
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  console.log('token:', token);

  config.headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  console.log('Request headers:', config.headers); // Добавлено для отладки

  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
      window.location.reload();
    } else if (error.response?.status === 403) {
      window.location.href = '/403';
    } else if (error.response?.status === 404) {
      window.location.href = '/404';
    } else if (error.response?.status === 500) {
      window.location.href = '/500';
    } else if (error.response?.status === 503) {
      window.location.href = '/503';
    } else if (error.response?.status === 422) {
      console.error('Validation errors:', error.response.data.errors);
    } else if (error.message === 'Network Error' && !error.response) {
      console.error('CORS error:', error);
    } else {
      console.error('Unexpected error:', error);
    }

    return Promise.reject(error);
  },
);

export const postRequest = async <T, R>(
  path: string,
  data: T,
  config?: Record<string, unknown>,
): Promise<R> => {
  const url = appendXdebugSessionStart(path);

  try {
    const response = await apiClient.post<R>(url, data, { ...config });
    console.log('response:', response); // Добавлено для отладки
    return response.data;
  } catch (error) {
    console.error('Error while posting data:', error.response?.data);
    throw error;
  }
};

export const getData = async <R>(
  path: string,
  config?: Record<string, unknown>,
): Promise<R> => {
  const url = appendXdebugSessionStart(path);
  console.log(`Making GET request to ${url}`); // Debug log

  try {
    const response = await apiClient.get<R>(url, { ...config });
    console.log('response:', response); // Debug log
    return response.data as R;
  } catch (error) {
    if (error.response) {
      console.error(`Error while getting data from ${url}:`, error.response.data);
    } else {
      console.error(`Error while getting data from ${url}:`, error.message);
    }
    throw error;
  }
};

/**
 * Add XDEBUG_SESSION_START to the URL if the app is running in development mode
 *
 * @param url - URL to which to add XDEBUG_SESSION_START for debugging in PHPStorm
 * @returns URL with XDEBUG_SESSION_START
 */
function appendXdebugSessionStart(url: string): string {
  return url.includes('?')
    ? `${url}&XDEBUG_SESSION_START=PHPSTORM`
    : `${url}?XDEBUG_SESSION_START=PHPSTORM`;
}