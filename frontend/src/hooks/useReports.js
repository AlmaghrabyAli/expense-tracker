import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../api/reports';

export function useSummary(from = '', to = '') {
  return useQuery({
    queryKey: ['reports', 'summary', { from, to }],
    queryFn: () => reportsApi.getSummary({ from, to }),
    staleTime: 1000 * 60,
  });
}

export function useByCategory(type = 'Expense', from = '', to = '') {
  return useQuery({
    queryKey: ['reports', 'by-category', { type, from, to }],
    queryFn: () => reportsApi.getByCategory({ type, from, to }),
    staleTime: 1000 * 60,
  });
}

export function useMonthly(year = new Date().getFullYear()) {
  return useQuery({
    queryKey: ['reports', 'monthly', { year }],
    queryFn: () => reportsApi.getMonthly({ year }),
    staleTime: 1000 * 60 * 2,
  });
}
