import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { getCategoryDisplayName } from '../../utils/categoryName';

export default function FilterBar({
  filters,
  onChange,
  categories = [],
  onClear,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const typeOptions = [
    { value: '', label: t('transactions.allTypes') },
    { value: 'Expense', label: t('common.expense') },
    { value: 'Income', label: t('common.income') },
  ];

  const hasActiveFilters = Boolean(
    filters.type ||
      filters.categoryId ||
      filters.fromDate ||
      filters.toDate ||
      filters.search
  );

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-col gap-3">
        {/* Top bar: Search input + Mobile toggle + Clear filters */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.search || ''}
              onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
              placeholder={t('transactions.searchPlaceholder')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 ps-9 pe-3 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileExpanded((v) => !v)}
            className="md:hidden flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0"
            aria-expanded={mobileExpanded}
          >
            <Filter className="h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t('transactions.filters')}</span>
            {hasActiveFilters && (
              <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="hidden sm:inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition whitespace-nowrap shrink-0"
            >
              <X className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">{t('transactions.clearFilters')}</span>
            </button>
          )}
        </div>

        {/* Filter controls: Grid on desktop, collapsible on mobile */}
        <div
          className={`${
            mobileExpanded ? 'flex' : 'hidden'
          } md:flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100`}
        >
          {/* Type Selector */}
          <div className="flex items-center rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...filters, type: opt.value, page: 1 })}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition ${
                  filters.type === opt.value
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="min-w-[140px] flex-1 sm:flex-initial">
            <select
              value={filters.categoryId || ''}
              onChange={(e) =>
                onChange({ ...filters, categoryId: e.target.value ? Number(e.target.value) : '', page: 1 })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">{t('transactions.allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {getCategoryDisplayName(cat.name, lang)} ({cat.type === 'Income' ? t('common.income') : t('common.expense')})
                </option>
              ))}
            </select>
          </div>

          {/* Date from */}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>{t('presets.from')}:</span>
            <input
              type="date"
              value={filters.fromDate || ''}
              onChange={(e) => onChange({ ...filters, fromDate: e.target.value, page: 1 })}
              className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Date to */}
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>{t('presets.to')}:</span>
            <input
              type="date"
              value={filters.toDate || ''}
              onChange={(e) => onChange({ ...filters, toDate: e.target.value, page: 1 })}
              className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Mobile clear button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="sm:hidden inline-flex items-center gap-1 text-xs font-semibold text-rose-600 whitespace-nowrap shrink-0"
            >
              <X className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">{t('transactions.clearFilters')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
