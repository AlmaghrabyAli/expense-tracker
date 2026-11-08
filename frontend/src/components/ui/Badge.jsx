import React from 'react';

export function Badge({ children, variant = 'neutral', size = 'sm', className = '' }) {
  const variantClasses = {
    income: 'bg-emerald-50 text-[#047857] border border-emerald-200/60',
    expense: 'bg-rose-50 text-[#E11D48] border border-rose-200/60',
    default: 'bg-slate-100 text-slate-600 border border-slate-200/80',
    custom: 'bg-emerald-50 text-[#047857] border border-emerald-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
  };

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5 font-bold',
    sm: 'text-xs px-2.5 py-0.5 font-semibold',
    md: 'text-sm px-3 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full leading-none whitespace-nowrap select-none ${
        variantClasses[variant] || variantClasses.neutral
      } ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
