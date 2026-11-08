import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { categoriesApi } from '../api/categories';
import { getLocalizedErrorMessage } from '../utils/errors';

export function useCategories(type = null) {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: () => categoriesApi.getCategories(type),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: categoriesApi.createCategory,
    onSuccess: () => {
      // Invalidate categories, transactions (embedded data), reports
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(t('toasts.categoryCreated'));
    },
    onError: (err) => {
      toast.error(getLocalizedErrorMessage(err, t));
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, data }) => categoriesApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(t('toasts.categoryUpdated'));
    },
    onError: (err) => {
      toast.error(getLocalizedErrorMessage(err, t));
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id) => categoriesApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(t('toasts.categoryDeleted'));
    },
    // Don't toast generic error automatically if it's 409 because component handles 409 dialog
    onError: (err) => {
      if (err.status !== 409) {
        toast.error(getLocalizedErrorMessage(err, t));
      }
    },
  });
}
