import React from 'react';
import { MachineStatus, CrowdState } from '../../types';

interface BadgeProps {
  variant: MachineStatus | CrowdState | 'verified' | 'category' | 'confirmed' | 'cancelled' | 'active' | 'completed';
  children?: React.ReactNode;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ variant, children, className = '' }) => {
  let styles = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  switch (variant) {
    case 'free':
      styles = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60';
      break;
    case 'in_use':
      styles = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60';
      break;
    case 'cycle_complete':
      styles = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60';
      break;
    case 'Low':
      styles = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60';
      break;
    case 'Medium':
      styles = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60';
      break;
    case 'Packed':
      styles = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60';
      break;
    case 'verified':
      styles = 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/60';
      break;
    case 'confirmed':
    case 'active':
    case 'completed':
      styles = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60';
      break;
    case 'cancelled':
      styles = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60';
      break;
  }

  const label = children || (
    variant === 'free' ? 'Free / Available' :
    variant === 'in_use' ? 'In Use' :
    variant === 'cycle_complete' ? 'Cycle Complete' :
    variant
  );

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
};
