import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from '../ui/LanguageSwitch';
import { Logo } from '../ui/Logo';

/**
 * Premium single-column public shell for Login, Register and 404 pages.
 * Features an atmospheric CSS/SVG mesh glow, masked grid pattern,
 * floating decorative glass finance elements (mirroring in RTL),
 * and a single top header row (Logo at start, Language switcher at end).
 */
export function PublicLayout({ children }) {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-dvh w-full flex flex-col justify-between overflow-x-hidden bg-[#F8FAFC] selection:bg-[#D1FAE5] selection:text-[#047857]">
      {/* 1. Atmospheric Ambient Glow Mesh */}
      <div
        className="pointer-events-none absolute -top-32 -start-32 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-emerald-300/25 to-teal-200/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -end-32 h-[480px] w-[480px] rounded-full bg-gradient-to-bl from-indigo-300/20 to-teal-200/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 start-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-teal-200/25 to-emerald-200/20 blur-3xl"
        aria-hidden="true"
      />

      {/* 2. Faint Dot Grid Pattern with Center-Biased Radial Fade Mask */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-45 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_20%,transparent_100%)]"
        aria-hidden="true"
      >
        <svg className="h-full w-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="et-auth-grid-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.25" fill="#64748B" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#et-auth-grid-dots)" />
        </svg>
      </div>

      {/* 3. Decorative Floating Glass Elements (RTL mirrored with logical properties, hidden/reduced on mobile) */}
      {/* Floating Element A: Mini Donut Chart (Desktop only, top-start) */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:flex items-center gap-3 absolute top-28 start-8 xl:start-20 z-0 p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-lg shadow-slate-900/5 animate-float-slow select-none"
      >
        <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3.5" />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#059669"
            strokeWidth="3.5"
            strokeDasharray="55 100"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#0D9488"
            strokeWidth="3.5"
            strokeDasharray="22 100"
            strokeDashoffset="-55"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="3.5"
            strokeDasharray="12 100"
            strokeDashoffset="-77"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col text-[11px] font-semibold text-slate-700 leading-tight">
          <span>Income / Expense</span>
          <span className="text-[10px] text-emerald-700 font-bold">Balanced</span>
        </div>
      </div>

      {/* Floating Element B: Category Chips (Desktop & Tablet, bottom-start) */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:flex flex-col gap-1.5 absolute bottom-24 start-6 xl:start-20 z-0 p-3 rounded-2xl bg-white/65 backdrop-blur-md border border-white/80 shadow-lg shadow-slate-900/5 animate-float-reverse select-none"
      >
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 px-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>Salary</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 px-1">
          <span className="w-2 h-2 rounded-full bg-[#F43F5E]" />
          <span>Food</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 px-1">
          <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
          <span>Transport</span>
        </div>
      </div>

      {/* Floating Element C: Sparkline / Bar Chart (Desktop only, top-end) */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:flex items-end gap-1.5 absolute top-32 end-8 xl:end-20 z-0 p-3.5 h-16 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-lg shadow-slate-900/5 animate-float-reverse select-none"
      >
        <div className="w-2 h-5 rounded-full bg-emerald-300" />
        <div className="w-2 h-7 rounded-full bg-emerald-400" />
        <div className="w-2 h-4 rounded-full bg-teal-400" />
        <div className="w-2 h-9 rounded-full bg-gradient-to-t from-teal-500 to-[#047857]" />
      </div>

      {/* Floating Element D: Coin Disc (All viewports, bottom-end) */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex items-center justify-center absolute bottom-12 end-5 sm:bottom-20 sm:end-12 xl:end-24 z-0 w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 text-white font-extrabold text-[11px] shadow-lg shadow-emerald-900/15 ring-2 ring-white/80 animate-float-slow select-none opacity-80 sm:opacity-100"
      >
        <span>EGP</span>
      </div>

      {/* Top Header Row: Logo at start, Language Switcher at end */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between shrink-0">
        <Logo variant="horizontal" size="md" />
        <LanguageSwitch />
      </header>

      {/* Center Main Stage (Single-Column Glass Card) */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center px-4 py-4 sm:py-8 my-auto">
        {children}
      </main>

      {/* Minimal Public Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-400 select-none shrink-0">
        © 2026 Expense Tracker
      </footer>
    </div>
  );
}

export default PublicLayout;
