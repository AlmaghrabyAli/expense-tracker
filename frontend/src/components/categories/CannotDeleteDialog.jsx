import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ExternalLink } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function CannotDeleteDialog({
  isOpen,
  onClose,
  category = null,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewTransactions = () => {
    onClose();
    if (category?.id) {
      navigate(`/transactions?categoryId=${category.id}`);
    } else {
      navigate('/transactions');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('categories.cannotDeleteTitle')}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            {t('categories.cannotDeleteDesc')}
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto sm:min-w-[110px] justify-center"
          >
            {t('categories.understood')}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            icon={ExternalLink}
            iconPosition="end"
            onClick={handleViewTransactions}
            className="w-full sm:w-auto sm:min-w-[150px] justify-center"
          >
            {t('categories.viewTransactions')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
