import React, { useState } from 'react';
import {
  Bus,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Navigation,
  AlertTriangle,
  Users,
  Send,
  Radio,
  Sliders,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { CampusMap } from '../components/transit/CampusMap';
import { BusCard } from '../components/transit/BusCard';
import { RiderRewardsCard } from '../components/transit/RiderRewardsCard';
import { TransitBus, CrowdState } from '../types';

export const TransitPage: React.FC = () => {
  const { buses, updateBusStatus, postTransitAlert } = useAppData();
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role === 'staff';

  const [selectedBusId, setSelectedBusId] = useState<string | null>(buses[0]?.id || null);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);

  const selectedBus = buses.find(b => b.id === selectedBusId) || buses[0];

  const handleSendAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertMessage.trim()) return;
    postTransitAlert(alertTitle.trim(), alertMessage.trim());
    setAlertTitle('');
    setAlertMessage('');
  };

  const handleUpdateCrowd = (busId: string, crowd: CrowdState) => {
    updateBusStatus(busId, { crowdLevel: crowd });
  };

  const handleAdjustEta = (busId: string, delta: number) => {
    const bus = buses.find(b => b.id === busId);
    if (!bus) return;
    const newEta = Math.max(1, bus.etaMinutes + delta);
    updateBusStatus(busId, { etaMinutes: newEta });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600">
              <Bus className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Zero-Emission Campus Mobility
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Campus Transit & Shuttles
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time electric shuttle tracking, crowd congestion states, and rider carbon credits.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-xs font-bold text-emerald-700 dark:text-emerald-300 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>4 Shuttles Operating Normally</span>
        </div>
      </div>

      {/* STAFF ONLY: Transit Dispatch & Broadcast Center */}
      {isStaff && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-indigo-50/70 to-slate-50 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <span>Staff Transit Dispatch Console</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Live Control</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Broadcast delay bulletins to student alert bars and adjust shuttle telemetry.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDispatchOpen(!isDispatchOpen)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isDispatchOpen ? 'Close Dispatch' : 'Post Transit Bulletin'}</span>
            </button>
          </div>

          {/* Quick Shuttle Live Telemetry Tweak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {buses.map(bus => (
              <div
                key={bus.id}
                className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">{bus.busNumber.split(' ')[0]}</span>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{bus.etaMinutes}m ETA</span>
                </div>

                <div className="flex items-center justify-between gap-1 pt-1">
                  <span className="text-[10px] text-slate-400 font-semibold">ETA:</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustEta(bus.id, -1)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-bold hover:bg-slate-200"
                    >
                      -1m
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustEta(bus.id, 1)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-bold hover:bg-slate-200"
                    >
                      +1m
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] text-slate-400 font-semibold">Crowd:</span>
                  <div className="flex items-center gap-1">
                    {(['Low', 'Medium', 'Packed'] as const).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleUpdateCrowd(bus.id, c)}
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                          bus.crowdLevel === c
                            ? 'bg-[#4F46F5] text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Broadcast Form (Collapsible) */}
          {isDispatchOpen && (
            <form onSubmit={handleSendAlert} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in">
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Broadcast Instant Transit Bulletin to Campus App
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Alert title (e.g. Route 2 Weather Slowdown)"
                  value={alertTitle}
                  onChange={e => setAlertTitle(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
                <input
                  type="text"
                  required
                  placeholder="Detail message for student alerts popover..."
                  value={alertMessage}
                  onChange={e => setAlertMessage(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 sm:col-span-2"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Bulletin to Students</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Interactive Map Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#4F46F5]" />
            <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Live University Geo-Telemetry
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Click any shuttle or stop for details
          </span>
        </div>

        {/* Leaflet Map */}
        <CampusMap
          selectedBusId={selectedBusId}
          onSelectBus={bus => setSelectedBusId(bus.id)}
        />
      </div>

      {/* Shuttles Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bus className="w-4 h-4 text-emerald-600" /> Active Campus Shuttles
          </h3>
          <span className="text-xs text-slate-400">Select to highlight on map</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buses.map(bus => (
            <BusCard
              key={bus.id}
              bus={bus}
              isSelected={selectedBusId === bus.id}
              onSelect={() => setSelectedBusId(bus.id)}
            />
          ))}
        </div>
      </div>

      {/* Rider Rewards and History */}
      <RiderRewardsCard />
    </div>
  );
};
