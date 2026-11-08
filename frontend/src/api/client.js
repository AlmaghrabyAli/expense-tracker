import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';
import { normalizeApiError } from '../utils/errors';

const rawApiUrl = import.meta.env.VITE_API_URL;
if (!rawApiUrl) {
  console.error(
    'Missing VITE_API_URL environment variable. Please define VITE_API_URL (e.g. https://localhost:7105) in your .env file.'
  );
}

// Strip trailing slash to prevent path concatenation issues
export const API_BASE_URL = (rawApiUrl || '').replace(/\/+$/, '');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: Attach Bearer token if available
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore storage access errors
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Normalize errors and handle session expiry on protected calls
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || error.response?.config?.url || '';
    const isAuthRoute =
      requestUrl.includes('/api/auth/login') ||
      requestUrl.includes('/api/auth/register');

    if (error.response?.status === 401 && !isAuthRoute) {
      // Clear user session on 401 from protected endpoint
      try {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.EXPIRES);
        localStorage.removeItem(STORAGE_KEYS.USER);
      } catch {
        // ignore storage access errors
      }

      // Notify application of session expiration
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('et:session-expired'));
      }
    }

    const normalized = normalizeApiError(error);
    return Promise.reject(normalized);
  }
);

export default apiClient;
