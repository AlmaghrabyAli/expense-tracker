import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import CategoryRow from '../components/categories/CategoryRow';
import CategoryFormModal from '../components/categories/CategoryFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import CannotDeleteDialog from '../components/categories/CannotDeleteDialog';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories';
import { getApiErrorMessage } from '../utils/errors';

export default function Categories() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { data: categories = [], isLoading } = useCategories();

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalError, setModalError] = useState('');

  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [cannotDeleteCat, setCannotDeleteCat] = useState(null);

  // Split into Expense and Income
  const expenseCategories = categories.filter((c) => c.type === 'Expense');
  const incomeCategories = categories.filter((c) => c.type === 'Income');

  const handleOpenAdd = () => {
    setModalError('');
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setModalError('');
    setSelectedCategory(cat);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (payload) => {
    setModalError('');
    try {
      if (selectedCategory?.id) {
        await updateMutation.mutateAsync({
          id: selectedCategory.id,
          data: payload,
        });
        toast.success(t('messages.categoryUpdated', 'Category updated successfully'));
      } else {
        await createMutation.mutateAsync(payload);
        toast.success(t('messages.categoryCreated', 'Category created successfully'));
      }
      setIsFormOpen(false);
    } catch (err) {
      const msg = getApiErrorMessage(err, lang);
      setModalError(msg);
    }
  };

  const handleOpenDelete = (cat) => {
    setCategoryToDelete(cat);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete?.id) return;
    setIsDeleting(true);
    try {
      await deleteMutation.mutateAsync(categoryToDelete.id);
      toast.success(t('messages.categoryDeleted', 'Category deleted successfully'));
      setCategoryToDelete(null);
    } catch (err) {
      // If 409 conflict, show specialized CannotDeleteDialog
      if (err.status === 409) {
        const cat = categoryToDelete;
        setCategoryToDelete(null);
        setCannotDeleteCat(cat);
      } else {
        toast.error(getApiErrorMessage(err, lang));
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {t('categories.title')}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('categories.subtitle')}
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
            {t('categories.addCategory')}
          </Button>
        </div>

        {/* Categories Grid (2 Columns: Expense & Income) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Expense Categories Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <h2 className="text-sm font-bold text-slate-800">
                {t('categories.expenseCategories')}
              </h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {t('categories.countBadge', { count: expenseCategories.length })}
              </span>
            </div>

            <div className="space-y-2.5">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-200" />
                ))
              ) : (
                expenseCategories.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                  />
                ))
              )}
            </div>
          </div>

          {/* Income Categories Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
              <h2 className="text-sm font-bold text-slate-800">
                {t('categories.incomeCategories')}
              </h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {t('categories.countBadge', { count: incomeCategories.length })}
              </span>
            </div>

            <div className="space-y-2.5">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-200" />
                ))
              ) : (
                incomeCategories.map((cat) => (
                  <CategoryRow
                    key={cat.id}
                    category={cat}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Add/Edit Category Modal */}
        <CategoryFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={selectedCategory}
          isLoading={createMutation.isPending || updateMutation.isPending}
          serverError={modalError}
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={Boolean(categoryToDelete)}
          onClose={() => setCategoryToDelete(null)}
          onConfirm={handleConfirmDelete}
          title={t('categories.deleteTitle')}
          message={t('categories.deleteConfirm')}
          confirmLabel={t('common.delete')}
          cancelLabel={t('common.cancel')}
          variant="danger"
          isLoading={isDeleting}
        />

        {/* 409 Conflict Dialog: Cannot delete category with transactions */}
        <CannotDeleteDialog
          isOpen={Boolean(cannotDeleteCat)}
          onClose={() => setCannotDeleteCat(null)}
          category={cannotDeleteCat}
        />
      </div>
  );
}
