import React from 'react';
import Button from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  subtitle,
  actionLabel,
  onAction,
  actionVariant = 'primary',
  className = '',
}) {
  const desc = subtitle || description;
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-2xs ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#047857] flex items-center justify-center mb-4 shadow-2xs">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
      {desc && (
        <p className="text-sm text-slate-500 max-w-sm mt-1.5 leading-relaxed">
          {desc}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant={actionVariant} size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
