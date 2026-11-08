import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useByCategory } from '../hooks/useReports';
import { reportsApi } from '../api/reports';

describe('reports queries & useByCategory', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('calls reportsApi.getByCategory with type, from, and to parameters', async () => {
    const spy = vi.spyOn(reportsApi, 'getByCategory').mockResolvedValue([]);

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = ({ children }) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children);

    const { result } = renderHook(
      () => useByCategory('Expense', '2026-11-01', '2026-11-30'),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(spy).toHaveBeenCalledWith({
      type: 'Expense',
      from: '2026-11-01',
      to: '2026-11-30',
    });
  });
});
