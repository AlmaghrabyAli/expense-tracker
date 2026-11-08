import React, { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  {
    id,
    label,
    hint,
    error,
    type = 'text',
    prefix,
    suffix,
    required = false,
    className = '',
    containerClassName = '',
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const hintId = inputId ? `${inputId}-hint` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
            {label}
            {required && <span className="text-[#E11D48] ms-1">*</span>}
          </label>
        </div>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute start-3 flex items-center pointer-events-none text-slate-400 font-semibold text-sm">
            {prefix}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`w-full h-12 px-3.5 text-sm text-slate-900 bg-white rounded-xl border transition-all duration-150 outline-none placeholder:text-slate-400 disabled:bg-slate-100 disabled:cursor-not-allowed ${
            prefix ? 'ps-11' : ''
          } ${suffix ? 'pe-11' : ''} ${
            error
              ? 'border-[#E11D48] bg-rose-50/20 focus:ring-2 focus:ring-[#E11D48]/20 focus:border-[#E11D48]'
              : 'border-slate-200 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20'
          } ${className}`}
          {...props}
        />

        {suffix && (
          <div className="absolute end-2.5 flex items-center">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-[#E11D48] font-medium flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
          </svg>
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[11px] text-slate-400 mt-0.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
