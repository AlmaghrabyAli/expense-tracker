import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import SegmentedControl from '../ui/SegmentedControl';
import { formatLocalDate } from '../../utils/dates';
import { normalizeArabicDigits } from '../../utils/format';
import { getCategoryDisplayName } from '../../utils/categoryName';

export default function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  categories = [],
  isLoading = false,
  serverError = '',
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const isEdit = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 'Expense',
      categoryId: '',
      amount: '',
      date: formatLocalDate(new Date()),
      note: '',
    },
  });

  const selectedType = watch('type');
  const noteValue = watch('note') || '';

  // Filter categories by selected transaction type
  const availableCategories = React.useMemo(() => {
    return categories.filter((c) => c.type === selectedType);
  }, [categories, selectedType]);

  // Reset or populate form on open / initialData change
  useEffect(() => {
    if (isOpen) {
      if (isEdit) {
        // Edit mode: reset with all fields atomically to clear stale errors
        const editType = initialData.type || 'Expense';
        reset({
          type: editType,
          categoryId: String(initialData.categoryId || ''),
          amount: String(initialData.amount || ''),
          date: initialData.date ? initialData.date.slice(0, 10) : formatLocalDate(new Date()),
          note: initialData.note || '',
        });
      } else {
        // Add mode: preselect first category of the given type
        const defaultType = initialData?.type || 'Expense';
        const matching = categories.filter((c) => c.type === defaultType);
        reset({
          type: defaultType,
          categoryId: matching.length > 0 ? String(matching[0].id) : '',
          amount: '',
          date: formatLocalDate(new Date()),
          note: '',
        });
      }
    }
  }, [isOpen, initialData, isEdit, categories, reset]);

  // When type changes, ensure categoryId belongs to that type
  const handleTypeChange = (newType) => {
    setValue('type', newType);
    const matching = categories.filter((c) => c.type === newType);
    const currentCatId = Number(watch('categoryId'));
    const isStillValid = matching.some((c) => c.id === currentCatId);
    if (!isStillValid) {
      setValue('categoryId', matching.length > 0 ? String(matching[0].id) : '');
    }
  };

  const onFormSubmit = (data) => {
    const rawAmount = normalizeArabicDigits(String(data.amount || '')).trim();

    if (!rawAmount) {
      setError('amount', {
        type: 'manual',
        message: t('validation.required'),
      });
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(rawAmount)) {
      setError('amount', {
        type: 'manual',
        message: t('validation.amountDecimals'),
      });
      return;
    }

    const parsedAmount = parseFloat(rawAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('amount', {
        type: 'manual',
        message: t('validation.amountPositive'),
      });
      return;
    }

    if (parsedAmount > 999999999.99) {
      setError('amount', {
        type: 'manual',
        message: t('validation.amountMax'),
      });
      return;
    }

    if (!data.categoryId) {
      setError('categoryId', {
        type: 'manual',
        message: t('validation.categoryRequired'),
      });
      return;
    }

    if (!data.date) {
      setError('date', {
        type: 'manual',
        message: t('validation.required'),
      });
      return;
    }

    const trimmedNote = (data.note || '').trim();
    if (trimmedNote.length > 250) {
      setError('note', {
        type: 'manual',
        message: t('validation.maxLength', { max: 250 }),
      });
      return;
    }

    onSubmit({
      type: data.type,
      categoryId: Number(data.categoryId),
      amount: Math.round(parsedAmount * 100) / 100,
      date: data.date,
      note: trimmedNote || null,
    });
  };

  const typeOptions = [
    { value: 'Expense', label: t('common.expense') },
    { value: 'Income', label: t('common.income') },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? t('transactions.editTransaction') : t('transactions.newTransaction')}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {serverError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
            {serverError}
          </div>
        )}

        {/* Type Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('transactions.type')}
          </label>
          <SegmentedControl
            options={typeOptions}
            value={selectedType}
            onChange={handleTypeChange}
          />
        </div>

        {/* Category Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('transactions.category')} *
          </label>
          <Select
            {...register('categoryId', {
              required: t('validation.categoryRequired'),
            })}
            error={errors.categoryId?.message}
          >
            <option value="">{t('transactions.selectCategory')}</option>
            {availableCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {getCategoryDisplayName(cat, lang)}
              </option>
            ))}
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('transactions.amount')} *
          </label>
          <Input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            prefix={lang === 'ar' ? 'ج.م' : 'EGP'}
            error={errors.amount?.message}
            {...register('amount', {
              required: t('validation.required'),
            })}
          />
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('transactions.date')} *
          </label>
          <Input
            type="date"
            error={errors.date?.message}
            {...register('date', {
              required: t('validation.required'),
            })}
          />
        </div>

        {/* Note */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <label htmlFor="tx-note">{t('transactions.note')}</label>
            <span
              className={`text-[11px] font-normal ${
                noteValue.length > 250 ? 'text-rose-600 font-bold' : 'text-slate-400'
              }`}
            >
              {noteValue.length} / 250
            </span>
          </div>
          <textarea
            id="tx-note"
            rows={2}
            maxLength={250}
            placeholder={t('transactions.notePlaceholder')}
            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            {...register('note', {
              maxLength: {
                value: 250,
                message: t('validation.maxLength', { max: 250 }),
              },
            })}
          />
          {errors.note && (
            <p className="text-xs text-rose-600">{errors.note.message}</p>
          )}
        </div>

        {/* Action Buttons: balanced equal-height pair */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="sm:min-w-[100px] justify-center"
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isLoading}
            className="sm:min-w-[100px] justify-center"
          >
            {isEdit ? t('common.save') : t('transactions.saveBtn')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
