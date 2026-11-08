import React from 'react';

export function Skeleton({ className = '', variant = 'rect' }) {
  const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-xl';

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-slate-200/80 ${variantClass} ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-40 h-8" />
      </div>
      <Skeleton className="w-full h-2 rounded-full mt-2" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden animate-pulse">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-24 h-8 rounded-full" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
            <Skeleton className="w-24 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;

