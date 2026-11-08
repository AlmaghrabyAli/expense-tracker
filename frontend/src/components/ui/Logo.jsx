import React, { useId } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Expense Tracker Official Brand Logo
 * 
 * Original geometric mark combining a ledger/bar-chart 'E' glyph with an energetic coin dot,
 * rendered within a precision squircle emblem filled with the signature brand gradient.
 * 
 * Props:
 * - variant: 'mark' | 'horizontal' | 'stacked' (default: 'horizontal')
 * - size: 'sm' | 'md' | 'lg' | number (default: 'md')
 * - tone: 'color' | 'light' | 'dark' (default: 'color')
 * - className: additional string for the root container
 */
export function Logo({
  variant = 'horizontal',
  size = 'md',
  tone = 'color',
  className = '',
  ...props
}) {
  const { t, i18n } = useTranslation();
  const rawId = useId();
  // Sanitize id for SVG url references (remove colons from React useId)
  const gradId = `et-logo-grad-${rawId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
  const highlightId = `et-logo-hl-${rawId.replace(/[^a-zA-Z0-9-_]/g, '')}`;

  const isArabic = i18n.language === 'ar';

  // Dimension presets
  const sizeMap = {
    sm: { mark: 28, text: 'text-sm', sub: 'text-[10px]', gap: 'gap-2' },
    md: { mark: 36, text: 'text-base', sub: 'text-xs', gap: 'gap-2.5' },
    lg: { mark: 44, text: 'text-xl', sub: 'text-xs', gap: 'gap-3' },
  };

  const currentSize = typeof size === 'number' 
    ? { mark: size, text: size > 40 ? 'text-xl' : size > 30 ? 'text-base' : 'text-sm', sub: 'text-xs', gap: 'gap-2.5' }
    : (sizeMap[size] || sizeMap.md);

  const markOnly = variant === 'mark';

  // Tone styling for wordmark
  const textColorClasses = {
    color: 'text-slate-900',
    light: 'text-white',
    dark: 'text-slate-950',
  }[tone] || 'text-slate-900';

  const accentColorClasses = {
    color: 'text-[#047857]',
    light: 'text-emerald-200',
    dark: 'text-emerald-600',
  }[tone] || 'text-[#047857]';

  // Tone styling for SVG Mark
  const isLight = tone === 'light';

  return (
    <div
      role="img"
      aria-label={t('app.name')}
      className={`inline-flex items-center ${variant === 'stacked' ? 'flex-col text-center' : 'flex-row'} ${currentSize.gap} select-none ${className}`}
      {...props}
    >
      {/* SVG Symbol Mark */}
      <svg
        width={currentSize.mark}
        height={currentSize.mark}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={!markOnly}
        className="shrink-0 transition-transform duration-200"
      >
        <defs>
          {/* Signature 135deg Brand Gradient */}
          <linearGradient id={gradId} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="48%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          {/* Top highlight shine */}
          <linearGradient id={highlightId} x1="24" y1="2" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Squircle base emblem */}
        {isLight ? (
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12.5"
            fill="rgba(255, 255, 255, 0.18)"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.2"
          />
        ) : (
          <>
            <rect
              x="2"
              y="2"
              width="44"
              height="44"
              rx="12.5"
              fill={`url(#${gradId})`}
            />
            {/* Soft inner rim highlight */}
            <rect
              x="2.5"
              y="2.5"
              width="43"
              height="43"
              rx="12"
              fill="none"
              stroke={`url(#${highlightId})`}
              strokeWidth="1"
            />
          </>
        )}

        {/* Geometric 'E' Glyph + Coin Accent (Pure crisp white) */}
        {/* Vertical Spine */}
        <rect x="13" y="13" width="4.5" height="22" rx="2.25" fill="#FFFFFF" />

        {/* Top Ledger Bar */}
        <rect x="13" y="13" width="16" height="4.5" rx="2.25" fill="#FFFFFF" />

        {/* Middle Ledger Bar */}
        <rect x="13" y="21.75" width="11" height="4.5" rx="2.25" fill="#FFFFFF" />

        {/* Bottom Ledger / Foundation Bar (growing upward/broad base) */}
        <rect x="13" y="30.5" width="19" height="4.5" rx="2.25" fill="#FFFFFF" />

        {/* Coin Dot Accent (Energy & Financial Growth) */}
        <circle cx="34.5" cy="15.25" r="3.25" fill="#FFFFFF" />
      </svg>

      {/* HTML Wordmark (Mirrors correctly in RTL, respects active locale) */}
      {!markOnly && (
        <div className={`flex flex-col leading-none ${variant === 'stacked' ? 'items-center mt-1' : ''}`}>
          {isArabic ? (
            <span
              className={`${currentSize.text} font-bold tracking-normal ${textColorClasses}`}
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              متابع المصاريف
            </span>
          ) : (
            <span className={`${currentSize.text} tracking-tight ${textColorClasses}`} style={{ fontFamily: 'var(--font-latin)' }}>
              <span className="font-semibold">Expense </span>
              <span className={`font-normal ${accentColorClasses}`}>Tracker</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Logo;

