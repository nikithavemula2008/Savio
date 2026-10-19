import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shirt,
  Bus,
  ShoppingBag,
  BookOpen,
  QrCode,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
  Trophy,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { MessMenuCard } from '../components/mess/MessMenuCard';
import { QRScannerModal } from '../components/common/QRScannerModal';
import { ReservationModal } from '../components/laundry/ReservationModal';
import { StatusBadge } from '../components/common/Badge';
import { LaundryMachine } from '../types';

export const DashboardPage: React.FC = () => {
  const { machines, buses, bookings, profile, rideHistory } = useAppData();
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [selectedMachineForBooking, setSelectedMachineForBooking] = useState<LaundryMachine | null>(null);

  const freeWashersCount = machines.filter(m => m.type === 'washer' && m.status === 'free').length;
  const freeDryersCount = machines.filter(m => m.type === 'dryer' && m.status === 'free').length;

  const closestBus = buses.reduce((prev, curr) =>
    curr.etaMinutes < prev.etaMinutes ? curr : prev
  );

  const activeBooking = bookings.find(b => b.status === 'confirmed');

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-700 via-[#4F46F5] to-emerald-600 text-white shadow-xl shadow-indigo-500/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-3 text-white border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Welcome to SAVIO Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Campus Life, <span className="text-emerald-300 underline decoration-wavy decoration-emerald-400">Simplified</span>.
          </h1>

          <p className="text-sm sm:text-base text-indigo-100 mt-2 leading-relaxed">
            Real-time hostel laundry availability, live campus transit routes, mess dining schedules, and peer-to-peer resource exchange in one unified ecosystem.
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 pt-5 border-t border-white/15">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Shirt className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-sm">{freeWashersCount + freeDryersCount} Machines</div>
                <div className="text-indigo-200">Free right now</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bus className="w-4 h-4 text-yellow-300" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-sm">{closestBus.etaMinutes}m Next Shuttle</div>
                <div className="text-indigo-200">{closestBus.routeName.split(' ')[0]}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-sm">{profile.savioPoints} Savio Points</div>
                <div className="text-indigo-200">Rider & Learner Tier</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Laundry QR Scanner */}
        <button
          type="button"
          onClick={() => setIsQrScannerOpen(true)}
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5] flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Quick Scan
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Laundry QR
            </div>
          </div>
        </button>

        {/* Campus Transit */}
        <Link
          to="/transit"
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Live Shuttle
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Campus Transit
            </div>
          </div>
        </Link>

        {/* Academic Notes */}
        <Link
          to="/marketplace"
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-400 dark:hover:border-purple-600 transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Study Notes
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Academic Bank
            </div>
          </div>
        </Link>

        {/* Marketplace */}
        <Link
          to="/marketplace"
          className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all text-left flex flex-col justify-between group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Buy & Sell
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              Marketplace
            </div>
          </div>
        </Link>
      </div>

      {/* Grid: Smart Laundry Status & Transit Mini Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Laundry Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46F5] flex items-center justify-center">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Smart Laundry Live
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Hostel Block B Laundry Facility
                  </p>
                </div>
              </div>

              <Link
                to="/laundry"
                className="text-xs font-bold text-[#4F46F5] dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View all machines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Machines Status Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {machines.slice(0, 4).map(machine => (
                <div
                  key={machine.id}
                  onClick={() => setSelectedMachineForBooking(machine)}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 hover:border-indigo-400 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {machine.id}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        machine.status === 'free'
                          ? 'bg-emerald-500'
                          : machine.status === 'in_use'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {machine.type === 'washer' ? 'Washer' : 'Dryer'}
                  </div>
                  <div className="text-[11px] font-bold mt-1">
                    {machine.status === 'free' ? (
                      <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">
                        {machine.remainingMinutes}m left
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Booking Banner if student has one */}
            {activeBooking ? (
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4F46F5] shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      Your Active Booking: {activeBooking.machineName}
                    </span>
                    <div className="text-indigo-700 dark:text-indigo-300 text-[11px]">
                      {activeBooking.slotTime} ({activeBooking.date})
                    </div>
                  </div>
                </div>
                <Link
                  to="/laundry"
                  className="px-3 py-1.5 bg-[#4F46F5] text-white rounded-xl font-bold text-xs"
                >
                  View Pass
                </Link>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-500 flex items-center justify-between">
                <span>No active laundry reservations today.</span>
                <Link
                  to="/laundry"
                  className="font-bold text-[#4F46F5] hover:underline"
                >
                  Book 45-min slot
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Campus Shuttle Route Mini-Preview (1 Col) */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Shuttle Route Preview
                  </h3>
                  <span className="text-[11px] text-slate-400">North Campus Express</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>

            {/* Illustrated Route Sequence */}
            <div className="space-y-3 relative pl-4 border-l-2 border-indigo-400/40 my-4 text-xs">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900" />
                <div className="font-bold text-slate-900 dark:text-white">
                  Hostel Quad & Dining
                </div>
                <div className="text-[11px] text-slate-400">Current stop</div>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
                <div className="font-bold text-slate-900 dark:text-white">
                  Central Library & Union
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Arriving in {closestBus.etaMinutes} mins
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900" />
                <div className="font-bold text-slate-500 dark:text-slate-400">
                  Tech Tower & CS Labs
                </div>
                <div className="text-[11px] text-slate-400">Final terminal</div>
              </div>
            </div>
          </div>

          <Link
            to="/transit"
            className="w-full py-2.5 bg-slate-100 hover:bg-[#4F46F5] hover:text-white dark:bg-slate-800 dark:hover:bg-[#4F46F5] text-slate-900 dark:text-white rounded-xl text-xs font-bold transition-all text-center block"
          >
            Open Interactive Campus Map
          </Link>
        </div>
      </div>

      {/* Mess Menu Card */}
      <MessMenuCard />

      {/* Modal for Quick Slot Reservation from Dashboard */}
      <ReservationModal
        isOpen={!!selectedMachineForBooking}
        onClose={() => setSelectedMachineForBooking(null)}
        machine={selectedMachineForBooking}
      />

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
      />
    </div>
  );
};
