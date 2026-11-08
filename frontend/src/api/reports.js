import apiClient from './client';

export const reportsApi = {
  getSummary: async (params = {}) => {
    const response = await apiClient.get('/api/reports/summary', { params });
    return response.data;
  },

  getByCategory: async (params = {}) => {
    const response = await apiClient.get('/api/reports/by-category', { params });
    return response.data;
  },

  getMonthly: async (params = {}) => {
    const response = await apiClient.get('/api/reports/monthly', { params });
    return response.data;
  },
};
