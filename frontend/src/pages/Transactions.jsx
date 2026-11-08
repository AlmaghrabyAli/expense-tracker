import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import FilterBar from '../components/transactions/FilterBar';
import TransactionsTable from '../components/transactions/TransactionsTable';
import TransactionCard from '../components/transactions/TransactionCard';
import TransactionFormModal from '../components/transactions/TransactionFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Pagination from '../components/ui/Pagination';
import ErrorState from '../components/ui/ErrorState';
import { useTransactions, useCreateTransaction, useUpdateTransaction, useDeleteTransaction } from '../hooks/useTransactions';
import { useCategories } from '../hooks/useCategories';
import { useDebounce } from '../hooks/useDebounce';
import { getApiErrorMessage } from '../utils/errors';

export default function Transactions() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [searchParams] = useSearchParams();
  const urlCategoryId = searchParams.get('categoryId');

  // Query filters state
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    type: '',
    categoryId: urlCategoryId ? Number(urlCategoryId) : '',
    fromDate: '',
    toDate: '',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  useEffect(() => {
    if (urlCategoryId) {
      setFilters((prev) => ({
        ...prev,
        categoryId: Number(urlCategoryId),
        page: 1,
      }));
    }
  }, [urlCategoryId]);


  const debouncedSearch = useDebounce(filters.search, 300);

  const queryParams = {
    page: filters.page,
    pageSize: filters.pageSize,
    type: filters.type || undefined,
    categoryId: filters.categoryId || undefined,
    from: filters.fromDate || undefined,
    to: filters.toDate || undefined,
    search: debouncedSearch || undefined,
    sortBy: filters.sortBy || 'date',
    sortDir: filters.sortOrder || 'desc',
  };

  const { data: txData, isLoading, error: txError, refetch: refetchTx } = useTransactions(queryParams);
  const { data: categories = [] } = useCategories();

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [modalError, setModalError] = useState('');

  const [txToDelete, setTxToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handlers
  const handleOpenAdd = () => {
    setModalError('');
    setSelectedTx(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (tx) => {
    setModalError('');
    setSelectedTx(tx);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (payload) => {
    setModalError('');
    try {
      if (selectedTx?.id) {
        await updateMutation.mutateAsync({ id: selectedTx.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsFormOpen(false);
    } catch (err) {
      const msg = getApiErrorMessage(err, lang);
      setModalError(msg);
    }
  };

  const handleOpenDelete = (tx) => {
    setTxToDelete(tx);
  };

  const handleConfirmDelete = async () => {
    if (!txToDelete?.id) return;
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync(txToDelete.id);
      if (items.length === 1 && filters.page > 1) {
        setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
      }
      setTxToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
      type: '',
      categoryId: '',
      fromDate: '',
      toDate: '',
      search: '',
    }));
  };

  const handleSort = (field, order) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: order,
      page: 1,
    }));
  };

  const items = txData?.items || [];
  const total = txData?.totalCount ?? txData?.total ?? 0;
  const totalPages = txData?.totalPages || 1;

  useEffect(() => {
    if (txData && txData.totalPages && filters.page > txData.totalPages) {
      setFilters((prev) => ({ ...prev, page: Math.max(1, txData.totalPages) }));
    }
  }, [txData, filters.page]);

  return (
    <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {t('transactions.title')}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('transactions.subtitle')}
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            icon={Plus}
            onClick={handleOpenAdd}
            className="self-start sm:self-auto shrink-0 shadow-sm"
          >
            {t('transactions.addTransaction')}
          </Button>
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          categories={categories}
          onClear={handleClearFilters}
        />

        {/* Content View: Desktop Table & Mobile Cards */}
        <div className="hidden md:block">
          {txError ? (
            <ErrorState onRetry={refetchTx} />
          ) : (
            <TransactionsTable
              transactions={items}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSort={handleSort}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              isLoading={isLoading}
            />
          )}
        </div>

        <div className="md:hidden space-y-3">
          {txError ? (
            <ErrorState onRetry={refetchTx} />
          ) : isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
            ))
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              {t('transactions.emptyFilterTitle')}
            </div>
          ) : (
            items.map((tx) => (
              <TransactionCard
                key={tx.id}
                transaction={tx}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {total > 0 && (
          <div className="pt-2">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              totalItems={total}
              pageSize={filters.pageSize}
              onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
              onPageSizeChange={(s) => setFilters((prev) => ({ ...prev, pageSize: s, page: 1 }))}
            />
          </div>
        )}

        {/* Add/Edit Modal */}
        <TransactionFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={selectedTx}
          categories={categories}
          isLoading={createMutation.isPending || updateMutation.isPending}
          serverError={modalError}
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={Boolean(txToDelete)}
          onClose={() => setTxToDelete(null)}
          onConfirm={handleConfirmDelete}
          title={t('transactions.deleteTitle')}
          message={t('transactions.deleteConfirm')}
          confirmLabel={t('transactions.deleteBtn')}
          cancelLabel={t('transactions.cancelBtn')}
          variant="danger"
          isLoading={isDeleting}
        />
      </div>
  );
}
