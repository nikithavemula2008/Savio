import React from 'react';
import { Bus, Clock, Users, ArrowRight, Sparkles, Gauge } from 'lucide-react';
import { TransitBus } from '../../types';
import { StatusBadge } from '../common/Badge';
import { useAppData } from '../../context/AppDataContext';

interface BusCardProps {
  bus: TransitBus;
  isSelected: boolean;
  onSelect: () => void;
}

export const BusCard: React.FC<BusCardProps> = ({ bus, isSelected, onSelect }) => {
  const { simulateBoardBus } = useAppData();

  return (
    <div
      onClick={onSelect}
      className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer relative ${
        isSelected
          ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-[#4F46F5] ring-2 ring-indigo-500/30 shadow-md'
          : 'bg-white dark:bg-[#111827] border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
      }`}
    >
      {/* Route Badge & Shuttle ID */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-8 rounded-full"
            style={{ backgroundColor: bus.routeColor }}
          />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {bus.routeName}
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {bus.busNumber}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <StatusBadge variant={bus.crowdLevel}>
            Crowd: {bus.crowdLevel}
          </StatusBadge>
          <span className="text-[11px] text-slate-400 font-mono">
            {bus.speedKmh} km/h
          </span>
        </div>
      </div>

      {/* Destination & Next Stop */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span className="text-slate-500 dark:text-slate-400">Next Stop:</span>
          <span className="font-bold text-slate-900 dark:text-white text-right">
            {bus.nextStop}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Destination:</span>
          <span className="font-medium text-slate-700 dark:text-slate-300 text-right">
            {bus.destination}
          </span>
        </div>
      </div>

      {/* ETA and Boarding button */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Arriving in:</span>
          <span className="text-sm font-extrabold text-[#4F46F5] dark:text-indigo-400">
            {bus.etaMinutes} min
          </span>
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            simulateBoardBus(bus.id);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-indigo-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulate Ride (+15 pts)</span>
        </button>
      </div>
    </div>
  );
};
