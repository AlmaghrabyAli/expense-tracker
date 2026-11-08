import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(function Select(
  {
    id,
    label,
    hint,
    error,
    options = [],
    required = false,
    className = '',
    containerClassName = '',
    disabled = false,
    children,
    ...props
  },
  ref
) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const errorId = selectId ? `${selectId}-error` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-700">
          {label}
          {required && <span className="text-[#E11D48] ms-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full py-2.5 ps-3.5 pe-10 text-sm text-slate-900 bg-white rounded-xl border appearance-none transition-all duration-150 outline-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed ${
            error
              ? 'border-[#E11D48] bg-rose-50/20 focus:ring-2 focus:ring-[#E11D48]/20 focus:border-[#E11D48]'
              : 'border-slate-200 focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15'
          } ${className}`}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          )}
        </select>

        <div className="absolute end-3 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-[#E11D48] font-medium flex items-center gap-1 mt-0.5">
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-slate-400 mt-0.5">{hint}</p>
      ) : null}
    </div>
  );
});

export default Select;
