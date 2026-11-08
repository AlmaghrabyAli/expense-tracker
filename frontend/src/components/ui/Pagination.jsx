import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Pagination({
  page = 1,
  currentPage,
  totalPages = 1,
  totalCount = 0,
  totalItems,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  className = '',
}) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const activePage = currentPage || page;
  const count = totalItems !== undefined ? totalItems : totalCount;

  if (count === 0) return null;

  const startItem = (activePage - 1) * pageSize + 1;
  const endItem = Math.min(activePage * pageSize, count);

  // Generate page numbers window (max 5 visible)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, activePage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 select-none ${className}`}>
      {/* Items count summary */}
      <div className="text-xs text-slate-500 font-medium">
        {t('transactions.showing', { start: startItem, end: endItem, total: count })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Page size select */}
        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>{t('transactions.rowsPerPage')}</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              aria-label={t('transactions.rowsPerPage')}
              className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold cursor-pointer outline-none focus:border-[#10B981]"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}

        {/* Page navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={activePage <= 1}
            onClick={() => onPageChange(activePage - 1)}
            aria-label={t('transactions.prev')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <PrevIcon className="w-4 h-4" />
          </button>

          {pages.map((p) => {
            const isActive = p === activePage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#047857] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            type="button"
            disabled={activePage >= totalPages}
            onClick={() => onPageChange(activePage + 1)}
            aria-label={t('transactions.next')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
