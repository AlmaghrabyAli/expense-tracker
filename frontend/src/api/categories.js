import apiClient from './client';

export const categoriesApi = {
  getCategories: async (type = null) => {
    const params = type ? { type } : {};
    const response = await apiClient.get('/api/categories', { params });
    return response.data;
  },

  createCategory: async ({ name, type, color }) => {
    const response = await apiClient.post('/api/categories', { name, type, color });
    return response.data;
  },

  updateCategory: async (id, { name, color }) => {
    // Note: Category PUT has no type per backend contract
    const response = await apiClient.put(`/api/categories/${id}`, { name, color });
    return response.data;
  },

  deleteCategory: async (id) => {
    await apiClient.delete(`/api/categories/${id}`);
    return true;
  },
};
