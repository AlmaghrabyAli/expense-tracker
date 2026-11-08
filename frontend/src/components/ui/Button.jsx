import React from 'react';
import { Spinner } from './Spinner';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false,
  loading = false,
  icon: Icon,
  iconPosition = 'start',
  className = '',
  onClick,
  ...props
}) {
  const baseClasses =
    'relative inline-flex items-center justify-center font-semibold rounded-xl whitespace-nowrap transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 select-none';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#047857] to-[#0F766E] hover:from-[#065F46] hover:to-[#115E59] text-white shadow-sm shadow-[#047857]/20 hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-[#047857] active:translate-y-0',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:border-slate-300 focus-visible:ring-slate-400',
    destructive:
      'bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-sm shadow-[#E11D48]/20 focus-visible:ring-[#E11D48]',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus-visible:ring-slate-300',
    link:
      'bg-transparent text-[#047857] hover:underline p-0 h-auto font-medium focus-visible:ring-offset-0',
    glass:
      'bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 shadow-xs focus-visible:ring-white/50',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[48px]',
  };

  const isBusy = Boolean(isLoading || loading);
  const isDisabled = disabled || isBusy;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${
        variant !== 'link' ? sizeClasses[size] || sizeClasses.md : ''
      } ${className}`}
      {...props}
    >
      {isBusy ? (
        <>
          <Spinner size={size === 'sm' ? 'sm' : 'sm'} className="shrink-0" />
          <span className="whitespace-nowrap">{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'start' && (
            <Icon className="w-4 h-4 shrink-0 rtl:rotate-180-when-directional" />
          )}
          <span className="whitespace-nowrap">{children}</span>
          {Icon && iconPosition === 'end' && (
            <Icon className="w-4 h-4 shrink-0 rtl:rotate-180-when-directional" />
          )}
        </>
      )}
    </button>
  );
}

export default Button;
