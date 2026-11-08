import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react';
import { formatMoney, formatDate } from '../../utils/format';
import { getCategoryDisplayName, getCategoryInitial } from '../../utils/categoryName';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

export default function TransactionsTable({
  transactions = [],
  sortBy = 'date',
  sortOrder = 'desc',
  onSort,
  onEdit,
  onDelete,
  isLoading = false,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const renderSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="h-3 w-3 text-slate-400 opacity-60" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="h-3 w-3 text-emerald-700" />
    ) : (
      <ArrowDown className="h-3 w-3 text-emerald-700" />
    );
  };

  const handleSortClick = (field) => {
    if (sortBy === field) {
      onSort?.(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort?.(field, 'desc');
    }
  };

  if (!isLoading && (!transactions || transactions.length === 0)) {
    return (
      <EmptyState
        title={t('transactions.emptyFilterTitle')}
        subtitle={t('transactions.emptyFilterSubtitle')}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-xs text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
            <tr>
              <th scope="col" className="py-3.5 ps-4 pe-3 text-start">
                <button
                  type="button"
                  onClick={() => handleSortClick('date')}
                  className="inline-flex items-center gap-1 font-semibold hover:text-slate-900 transition whitespace-nowrap shrink-0"
                >
                  <span className="whitespace-nowrap">{t('transactions.date')}</span>
                  {renderSortIcon('date')}
                </button>
              </th>
              <th scope="col" className="py-3.5 px-3 text-start">
                {t('transactions.category')}
              </th>
              <th scope="col" className="py-3.5 px-3 text-start">
                {t('transactions.note')}
              </th>
              <th scope="col" className="py-3.5 px-3 text-start">
                {t('transactions.type')}
              </th>
              <th scope="col" className="py-3.5 px-3 text-end">
                <button
                  type="button"
                  onClick={() => handleSortClick('amount')}
                  className="inline-flex items-center gap-1 font-semibold hover:text-slate-900 transition whitespace-nowrap shrink-0"
                >
                  <span className="whitespace-nowrap">{t('transactions.amount')}</span>
                  {renderSortIcon('amount')}
                </button>
              </th>
              <th scope="col" className="py-3.5 ps-3 pe-4 text-end">
                {t('transactions.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 ps-4 pe-3">
                      <div className="h-4 w-20 rounded bg-slate-200" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-slate-200" />
                        <div className="h-4 w-24 rounded bg-slate-200" />
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 w-32 rounded bg-slate-100" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-5 w-16 rounded-full bg-slate-200" />
                    </td>
                    <td className="py-4 px-3 text-end">
                      <div className="ms-auto h-4 w-20 rounded bg-slate-200" />
                    </td>
                    <td className="py-4 ps-3 pe-4 text-end">
                      <div className="ms-auto h-7 w-14 rounded bg-slate-200" />
                    </td>
                  </tr>
                ))
              : transactions.map((tx) => {
                  const isIncome = tx.type === 'Income';
                  const catName = getCategoryDisplayName(tx.categoryName, lang);
                  const initial = getCategoryInitial(tx.categoryName, lang);
                  const color = tx.categoryColor || '#10B981';

                  return (
                    <tr
                      key={tx.id}
                      className="transition-colors hover:bg-slate-50/60"
                    >
                      <td className="whitespace-nowrap py-3.5 ps-4 pe-3 font-medium text-slate-800">
                        {formatDate(tx.date, lang)}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor: `${color}20`,
                              color: color,
                              border: `1px solid ${color}40`,
                            }}
                          >
                            {initial}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {catName}
                          </span>
                        </div>
                      </td>
                      <td className="max-w-[220px] truncate py-3.5 px-3 text-slate-600">
                        {tx.note || '—'}
                      </td>
                      <td className="py-3.5 px-3">
                        <Badge variant={isIncome ? 'income' : 'expense'}>
                          {isIncome ? t('common.income') : t('common.expense')}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap py-3.5 px-3 text-end font-bold">
                        <span
                          style={{
                            color: isIncome ? '#047857' : '#E11D48',
                          }}
                        >
                          {isIncome ? '+' : '-'} {formatMoney(tx.amount, lang)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-3.5 ps-3 pe-4 text-end">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onEdit(tx)}
                            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                            aria-label={`${t('common.edit')} transaction`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete(tx)}
                            className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
                            aria-label={`${t('common.delete')} transaction`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
