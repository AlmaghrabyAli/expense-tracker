import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SegmentedControl from '../ui/SegmentedControl';
import ColorPicker from '../ui/ColorPicker';
import { DEFAULT_PRESET_COLORS } from '../../utils/constants';

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  serverError = '',
}) {
  const { t } = useTranslation();
  const isEdit = Boolean(initialData?.id);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      type: 'Expense',
      color: DEFAULT_PRESET_COLORS[0],
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name || '',
          type: initialData.type || 'Expense',
          color: initialData.color || DEFAULT_PRESET_COLORS[0],
        });
      } else {
        reset({
          name: '',
          type: 'Expense',
          color: DEFAULT_PRESET_COLORS[0],
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const onFormSubmit = (data) => {
    const trimmedName = (data.name || '').trim();
    if (!trimmedName) {
      setError('name', {
        type: 'manual',
        message: t('validation.required'),
      });
      return;
    }
    if (trimmedName.length > 50) {
      setError('name', {
        type: 'manual',
        message: t('validation.maxLength', { max: 50 }),
      });
      return;
    }

    const color = (data.color || '').trim();
    if (!color || !/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setError('color', {
        type: 'manual',
        message: t('validation.invalidColor'),
      });
      return;
    }

    if (isEdit) {
      // Contract: PUT /api/categories/{id} payload is { name, color }
      onSubmit({
        name: trimmedName,
        color,
      });
    } else {
      // Contract: POST /api/categories payload is { name, type, color }
      onSubmit({
        name: trimmedName,
        type: data.type,
        color,
      });
    }
  };

  const typeOptions = [
    { value: 'Expense', label: t('common.expense') },
    { value: 'Income', label: t('common.income') },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? t('categories.editCategory') : t('categories.addCategory')}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {serverError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
            {serverError}
          </div>
        )}

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('categories.nameLabel')} *
          </label>
          <Input
            placeholder={t('categories.namePlaceholder')}
            maxLength={50}
            error={errors.name?.message}
            {...register('name', {
              required: t('validation.required'),
              maxLength: {
                value: 50,
                message: t('validation.maxLength', { max: 50 }),
              },
            })}
          />
        </div>

        {/* Classification Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('categories.typeLabel')}
          </label>
          {isEdit ? (
            <div className="space-y-1">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                {initialData?.type === 'Income' ? t('common.income') : t('common.expense')}
              </div>
              <p className="text-[11px] text-slate-400">
                {t('categories.typeLockedHint')}
              </p>
            </div>
          ) : (
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <SegmentedControl
                  options={typeOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          )}
        </div>

        {/* Color Picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">
            {t('categories.colorLabel')}
          </label>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Actions: balanced equal-height pair */}
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
            {isEdit ? t('common.save') : t('categories.save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
