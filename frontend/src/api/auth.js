import apiClient from './client';

export const authApi = {
  login: async (credentials, passwordArg) => {
    const payload =
      typeof credentials === 'string'
        ? { email: credentials, password: passwordArg }
        : credentials;
    const response = await apiClient.post('/api/auth/login', payload);
    return response.data;
  },

  register: async (userData, emailArg, passwordArg) => {
    const payload =
      typeof userData === 'string'
        ? { fullName: userData, email: emailArg, password: passwordArg }
        : userData;
    const response = await apiClient.post('/api/auth/register', payload);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  },
};
