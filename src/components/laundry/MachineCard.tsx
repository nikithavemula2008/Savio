import React from 'react';
import { Clock, QrCode, Sparkles, MapPin, Gauge, ShieldCheck } from 'lucide-react';
import { LaundryMachine } from '../../types';
import { StatusBadge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';

interface MachineCardProps {
  machine: LaundryMachine;
  onSelect: (machine: LaundryMachine) => void;
  onScanQR: () => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({
  machine,
  onSelect,
  onScanQR,
}) => {
  const { currentUser } = useAuth();
  const { updateMachineStatus } = useAppData();
  const isStaff = currentUser?.role === 'staff';

  const isFree = machine.status === 'free';
  const isInUse = machine.status === 'in_use';
  const isComplete = machine.status === 'cycle_complete';

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between group">
      <div>
        {/* Header: ID, Type & Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                {machine.id}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {machine.type === 'washer' ? 'Washer' : 'Dryer'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {machine.name}
            </p>
          </div>
          <StatusBadge variant={machine.status} />
        </div>

        {/* Machine Visual Illustration with Animated Drum */}
        <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-center relative overflow-hidden">
          {/* Machine Outer Box */}
          <div className="w-24 h-28 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-inner flex flex-col items-center justify-between p-2 relative">
            {/* Top control dash */}
            <div className="w-full flex items-center justify-between px-1">
              <div className="flex gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isFree ? 'bg-emerald-500' : isInUse ? 'bg-amber-500 animate-ping' : 'bg-blue-500'}`} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <span className="text-[8px] font-mono font-bold text-slate-400">
                {machine.id}
              </span>
            </div>

            {/* Center Drum Glass */}
            <div className="w-16 h-16 rounded-full border-4 border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-100 dark:bg-slate-700/80 relative shadow-inner overflow-hidden">
              {/* Spinning drum water/lines animation */}
              {isInUse ? (
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-500 animate-spin-slow flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-amber-400/30" />
                </div>
              ) : isComplete ? (
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full border border-emerald-400/30 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20" />
                </div>
              )}
            </div>

            {/* Bottom detergent drawer / handle */}
            <div className="w-10 h-1 bg-slate-200 dark:bg-slate-600 rounded-full" />
          </div>
        </div>

        {/* Status Details / Remaining Time */}
        <div className="space-y-2 mb-4">
          {isInUse && (
            <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" /> In Cycle
                </span>
                <span>{machine.remainingMinutes}m remaining</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(10, 100 - ((machine.remainingMinutes || 10) / 45) * 100)}%` }}
                />
              </div>
              {machine.currentCycle && (
                <div className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-1.5 truncate">
                  {machine.currentCycle}
                </div>
              )}
            </div>
          )}

          {isFree && (
            <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>Ready for Next Load</span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Available</span>
              </div>
              <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">
                Next slot bookable immediately
              </div>
            </div>
          )}

          {isComplete && (
            <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40">
              <div className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center justify-between">
                <span>Cycle Finished</span>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">Ready to Unload</span>
              </div>
              <div className="text-[11px] text-blue-700/80 dark:text-blue-400/80 mt-0.5">
                Awaiting student clothes pickup
              </div>
            </div>
          )}

          {/* Location & Specs */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{machine.location}</span>
            </span>
            <span className="flex items-center gap-1 shrink-0 font-medium">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              {machine.capacityKg} kg
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => onSelect(machine)}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            isFree
              ? 'bg-[#4F46F5] hover:bg-indigo-600 text-white shadow-indigo-500/20'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
          }`}
        >
          <span>{isFree ? 'Reserve Slot' : 'Book Upcoming Slot'}</span>
        </button>

        <button
          type="button"
          onClick={onScanQR}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
          title="Scan QR at physical machine"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* STAFF ONLY: Machine Status Override Controls */}
      {isStaff && (
        <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-950/80 bg-indigo-50/60 dark:bg-indigo-950/30 -mx-5 -mb-5 p-3 rounded-b-2xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#4F46F5] dark:text-indigo-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Staff Override
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              {isInUse ? `${machine.remainingMinutes}m left` : isFree ? 'Available' : 'Finished'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => updateMachineStatus(machine.id, 'free')}
              className={`py-1 text-[10px] font-bold rounded-lg border transition-all ${
                isFree
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
              }`}
            >
              Set Free
            </button>
            <button
              type="button"
              onClick={() => updateMachineStatus(machine.id, 'in_use', 45)}
              className={`py-1 text-[10px] font-bold rounded-lg border transition-all ${
                isInUse
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50'
              }`}
            >
              In Use (45m)
            </button>
            <button
              type="button"
              onClick={() => updateMachineStatus(machine.id, 'cycle_complete')}
              className={`py-1 text-[10px] font-bold rounded-lg border transition-all ${
                isComplete
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-50'
              }`}
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
