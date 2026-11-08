import React from 'react';

export function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className = '',
}) {
  const sizeClasses = {
    sm: 'p-0.5 text-xs',
    md: 'p-1 text-xs',
    lg: 'p-1 text-sm',
  };

  const itemPadding = {
    sm: 'py-1 px-2.5',
    md: 'py-1.5 px-3.5',
    lg: 'py-2 px-4',
  };

  return (
    <div
      role="tablist"
      className={`inline-flex items-center bg-slate-100/90 border border-slate-200/70 rounded-full select-none ${
        sizeClasses[size] || sizeClasses.md
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={`${itemPadding[size] || itemPadding.md} ${
              fullWidth ? 'flex-1' : ''
            } rounded-full font-semibold transition-all duration-150 cursor-pointer text-center whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${
              isSelected
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
