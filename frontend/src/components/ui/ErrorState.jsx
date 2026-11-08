import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';

export function ErrorState({
  title,
  message,
  onRetry,
  className = '',
}) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-10 bg-white rounded-2xl border border-rose-100 shadow-2xs ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#E11D48] flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 tracking-tight">
        {title || t('states.errorOccurred')}
      </h3>
      {message && (
        <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
          {message}
        </p>
      )}
      {onRetry && (
        <div className="mt-5">
          <Button variant="secondary" size="md" icon={RefreshCw} onClick={onRetry}>
            {t('states.tryAgain')}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;

