import React from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Pencil, Trash2 } from 'lucide-react';
import { getCategoryDisplayName, getCategoryInitial } from '../../utils/categoryName';
import Badge from '../ui/Badge';

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const displayName = getCategoryDisplayName(category, lang);
  const initial = getCategoryInitial(category, lang);
  const color = category.color || '#10B981';
  const isDefault = Boolean(category.isDefault);

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3 min-w-0">
        {/* Color circle with initial */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm"
          style={{
            backgroundColor: `${color}20`,
            color: color,
            border: `1.5px solid ${color}40`,
          }}
        >
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {displayName}
          </p>
          <div className="flex items-center gap-2 pt-0.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              {color}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {isDefault ? (
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
            <Lock className="h-3 w-3 text-slate-400" />
            <span>{t('categories.defaultBadge')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Badge variant="neutral" size="sm">
              {t('categories.customBadge')}
            </Badge>
            <button
              type="button"
              onClick={() => onEdit(category)}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              aria-label={`${t('common.edit')} ${displayName}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(category)}
              className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
              aria-label={`${t('common.delete')} ${displayName}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
