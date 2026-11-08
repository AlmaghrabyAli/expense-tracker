import apiClient from './client';

export const transactionsApi = {
  getTransactions: async (params = {}) => {
    const response = await apiClient.get('/api/transactions', { params });
    return response.data;
  },

  getTransaction: async (id) => {
    const response = await apiClient.get(`/api/transactions/${id}`);
    return response.data;
  },

  createTransaction: async ({ type, categoryId, amount, date, note }) => {
    const response = await apiClient.post('/api/transactions', {
      type,
      categoryId: Number(categoryId),
      amount: Number(amount),
      date,
      note: note || null,
    });
    return response.data;
  },

  updateTransaction: async (id, { type, categoryId, amount, date, note }) => {
    const response = await apiClient.put(`/api/transactions/${id}`, {
      type,
      categoryId: Number(categoryId),
      amount: Number(amount),
      date,
      note: note || null,
    });
    return response.data;
  },

  deleteTransaction: async (id) => {
    await apiClient.delete(`/api/transactions/${id}`);
    return true;
  },
};
