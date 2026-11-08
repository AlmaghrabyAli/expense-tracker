import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { transactionsApi } from '../api/transactions';
import { getLocalizedErrorMessage } from '../utils/errors';

export function useTransactions(params = {}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsApi.getTransactions(params),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useTransaction(id) {
  return useQuery({
    queryKey: ['transactions', 'detail', id],
    queryFn: () => transactionsApi.getTransaction(id),
    enabled: Boolean(id),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: transactionsApi.createTransaction,
    onSuccess: () => {
      // Invalidate transactions and reports
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(t('toasts.transactionCreated'));
    },
    onError: (err) => {
      toast.error(getLocalizedErrorMessage(err, t));
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ id, data }) => transactionsApi.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(t('toasts.transactionUpdated'));
    },
    onError: (err) => {
      toast.error(getLocalizedErrorMessage(err, t));
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id) => transactionsApi.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success(t('toasts.transactionDeleted'));
    },
    onError: (err) => {
      toast.error(getLocalizedErrorMessage(err, t));
    },
  });
}
