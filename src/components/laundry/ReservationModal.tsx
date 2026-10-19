import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, Check, Info } from 'lucide-react';
import { Modal } from '../common/Modal';
import { LaundryMachine } from '../../types';
import { availableTimeSlots } from '../../data/mockLaundry';
import { useAppData } from '../../context/AppDataContext';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  machine: LaundryMachine | null;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  machine,
}) => {
  const { reserveLaundrySlot } = useAppData();
  const [selectedSlot, setSelectedSlot] = useState(availableTimeSlots[2]);
  const [selectedDate, setSelectedDate] = useState<'Today' | 'Tomorrow'>('Today');

  if (!machine) return null;

  const handleReserve = () => {
    const success = reserveLaundrySlot(machine.id, selectedSlot, selectedDate);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Reserve ${machine.name}`}
      description="Select a 45-minute guaranteed cycle slot. Your spot is locked for 10 minutes past start time."
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        {/* Machine Summary Pill */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60">
          <div>
            <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {machine.id} • {machine.location}
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
              {machine.type === 'washer' ? 'Front-Load Washing Machine' : 'Turbo Heat Dryer'}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Capacity:
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {machine.capacityKg} kg load
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" /> Select Date
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Today', 'Tomorrow'] as const).map(date => (
              <button
                key={date}
                type="button"
                onClick={() => setSelectedDate(date)}
                className={`py-2.5 px-4 rounded-xl text-sm font-bold border transition-all text-center ${
                  selectedDate === date
                    ? 'bg-[#4F46F5] text-white border-[#4F46F5] shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {date} ({date === 'Today' ? 'Oct 11' : 'Oct 12'})
              </button>
            ))}
          </div>
        </div>

        {/* 45-Minute Slot Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-500" /> Select 45-Minute Slot
            </label>
            <span className="text-[11px] text-slate-400">Guaranteed reservation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
            {availableTimeSlots.map(slot => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all relative ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                  }`}
                >
                  <div className="truncate">{slot}</div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 absolute right-2 top-2.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Points Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Rider & Laundry Rewards:</strong> You will earn{' '}
            <strong>+20 Savio Points</strong> upon successful cycle completion.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReserve}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#4F46F5] hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Reservation</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
