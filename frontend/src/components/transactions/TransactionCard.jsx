import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2 } from 'lucide-react';
import { formatMoney, formatDate } from '../../utils/format';
import { getCategoryDisplayName, getCategoryInitial } from '../../utils/categoryName';
import Badge from '../ui/Badge';

export default function TransactionCard({
  transaction,
  onEdit,
  onDelete,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const isIncome = transaction.type === 'Income';
  const catName = getCategoryDisplayName(transaction.categoryName, lang);
  const initial = getCategoryInitial(transaction.categoryName, lang);
  const color = transaction.categoryColor || '#10B981';

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm"
            style={{
              backgroundColor: `${color}20`,
              color: color,
              border: `1.5px solid ${color}40`,
            }}
          >
            {initial}
          </div>

          <div className="min-w-0">
            <h4 className="truncate text-sm font-semibold text-slate-900">
              {transaction.note || catName}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{catName}</span>
              <span>•</span>
              <span>{formatDate(transaction.date, lang)}</span>
            </div>
          </div>
        </div>

        <div className="text-end shrink-0">
          <div
            className="text-sm font-bold"
            style={{
              color: isIncome ? '#047857' : '#E11D48',
            }}
          >
            {isIncome ? '+' : '-'} {formatMoney(transaction.amount, lang)}
          </div>
          <div className="mt-0.5">
            <Badge variant={isIncome ? 'income' : 'expense'} size="sm">
              {isIncome ? t('common.income') : t('common.expense')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2.5">
        <button
          type="button"
          onClick={() => onEdit(transaction)}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition whitespace-nowrap shrink-0"
          aria-label={`${t('common.edit')} transaction`}
        >
          <Pencil className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">{t('common.edit')}</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(transaction)}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition whitespace-nowrap shrink-0"
          aria-label={`${t('common.delete')} transaction`}
        >
          <Trash2 className="h-3.5 w-3.5 shrink-0" />
          <span className="whitespace-nowrap">{t('common.delete')}</span>
        </button>
      </div>
    </div>
  );
}
