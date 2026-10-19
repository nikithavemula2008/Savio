import React, { useState } from 'react';
import {
  Shirt,
  Wind,
  CalendarCheck,
  QrCode,
  Sparkles,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { MachineCard } from '../components/laundry/MachineCard';
import { ReservationModal } from '../components/laundry/ReservationModal';
import { MyBookingsList } from '../components/laundry/MyBookingsList';
import { QRScannerModal } from '../components/common/QRScannerModal';
import { LaundryMachine } from '../types';

export const LaundryPage: React.FC = () => {
  const { machines, bookings } = useAppData();
  const [activeTab, setActiveTab] = useState<'washers' | 'dryers' | 'bookings'>('washers');
  const [statusFilter, setStatusFilter] = useState<'all' | 'free' | 'in_use' | 'cycle_complete'>('all');
  const [selectedMachine, setSelectedMachine] = useState<LaundryMachine | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const washers = machines.filter(m => m.type === 'washer');
  const dryers = machines.filter(m => m.type === 'dryer');

  const currentMachines = activeTab === 'washers' ? washers : dryers;
  const filteredMachines = currentMachines.filter(m =>
    statusFilter === 'all' ? true : m.status === statusFilter
  );

  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5]">
              <Shirt className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Smart Campus Utility
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Smart Laundry Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time machine availability, 45-minute guaranteed slot reservations, and optical QR unlocking.
          </p>
        </div>

        {/* Scan QR Button */}
        <button
          type="button"
          onClick={() => setIsQrModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#4F46F5] hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all self-start sm:self-auto"
        >
          <QrCode className="w-5 h-5" />
          <span>Scan Machine QR</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('washers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'washers'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shirt className="w-4 h-4 text-indigo-500" />
            <span>Washing Machines ({washers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dryers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'dryers'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wind className="w-4 h-4 text-amber-500" />
            <span>Dryers ({dryers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 relative ${
              activeTab === 'bookings'
                ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-emerald-500" />
            <span>My Bookings</span>
            {activeBookingsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>
        </div>

        {/* Status Filter for machines */}
        {activeTab !== 'bookings' && (
          <div className="flex items-center gap-1 px-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {(['all', 'free', 'in_use', 'cycle_complete'] as const).map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-[#4F46F5] text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {status === 'all'
                  ? 'All'
                  : status === 'free'
                  ? 'Free'
                  : status === 'in_use'
                  ? 'In Use'
                  : 'Complete'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'bookings' ? (
        <MyBookingsList onGoToMachines={() => setActiveTab('washers')} />
      ) : (
        <div>
          {filteredMachines.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
              <Shirt className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                No machines match the filter
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Try switching the status filter back to "All".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredMachines.map(machine => (
                <MachineCard
                  key={machine.id}
                  machine={machine}
                  onSelect={m => setSelectedMachine(m)}
                  onScanQR={() => setIsQrModalOpen(true)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reservation Slot Picker Modal */}
      <ReservationModal
        isOpen={!!selectedMachine}
        onClose={() => setSelectedMachine(null)}
        machine={selectedMachine}
      />

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
};
