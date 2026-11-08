import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  message,
  confirmText,
  confirmLabel,
  cancelText,
  cancelLabel,
  variant,
  confirmVariant = 'destructive',
  isLoading = false,
  itemPreview = null,
}) {
  const resolvedDesc = message || description || '';
  const resolvedConfirm = confirmLabel || confirmText || 'Delete';
  const resolvedCancel = cancelLabel || cancelText || 'Cancel';
  const resolvedVariant = variant === 'danger' ? 'destructive' : variant || confirmVariant;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#E11D48] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm text-slate-600 leading-relaxed">
            {resolvedDesc}
          </div>
        </div>

        {itemPreview && (
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700">
            {itemPreview}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button variant="secondary" size="md" onClick={onClose} disabled={isLoading} className="sm:min-w-[100px] justify-center">
            {resolvedCancel}
          </Button>
          <Button
            variant={resolvedVariant}
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            className="sm:min-w-[100px] justify-center"
          >
            {resolvedConfirm}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
