import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  QrCode,
  MapPin,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Shirt,
} from 'lucide-react';
import { LaundryBooking } from '../../types';
import { StatusBadge } from '../common/Badge';
import { useAppData } from '../../context/AppDataContext';
import { Modal } from '../common/Modal';

interface MyBookingsListProps {
  onGoToMachines: () => void;
}

export const MyBookingsList: React.FC<MyBookingsListProps> = ({ onGoToMachines }) => {
  const { bookings, cancelLaundryBooking } = useAppData();
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const handleConfirmCancel = () => {
    if (cancellingBookingId) {
      cancelLaundryBooking(cancellingBookingId);
      setCancellingBookingId(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3">
          <Shirt className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          No laundry reservations yet
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Reserve a 45-minute washing or drying slot to skip hostel laundry queues.
        </p>
        <button
          onClick={onGoToMachines}
          className="mt-4 px-5 py-2.5 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20"
        >
          View Available Machines
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(booking => {
          const isCancelled = booking.status === 'cancelled';
          const isCompleted = booking.status === 'completed';

          return (
            <div
              key={booking.id}
              className={`p-5 rounded-2xl border transition-all ${
                isCancelled
                  ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                  : 'bg-white dark:bg-[#111827] border-slate-200/90 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {booking.machineName}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                      {booking.machineId}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{booking.location}</span>
                  </div>
                </div>
                <StatusBadge variant={booking.status} />
              </div>

              {/* Timing details */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5 mb-3">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> Slot Time:
                  </span>
                  <span>{booking.slotTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Date:
                  </span>
                  <span>{booking.date}</span>
                </div>
              </div>

              {/* QR and actions footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <QrCode className="w-4 h-4 text-slate-400" />
                  <span>{booking.qrCode}</span>
                </div>

                {!isCancelled && !isCompleted && (
                  <button
                    type="button"
                    onClick={() => setCancellingBookingId(booking.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={!!cancellingBookingId}
        onClose={() => setCancellingBookingId(null)}
        title="Cancel Laundry Reservation?"
        description="Are you sure you want to release this slot? Other students waiting in line will be able to book immediately."
        maxWidth="max-w-md"
      >
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setCancellingBookingId(null)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Keep Reservation
          </button>
          <button
            type="button"
            onClick={handleConfirmCancel}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
          >
            Yes, Release Slot
          </button>
        </div>
      </Modal>
    </div>
  );
};
