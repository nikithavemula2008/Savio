import React, { useState } from 'react';
import { Bus, MapPin, Clock, ShieldCheck, Sparkles, Navigation, AlertTriangle, Users } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { CampusMap } from '../components/transit/CampusMap';
import { BusCard } from '../components/transit/BusCard';
import { RiderRewardsCard } from '../components/transit/RiderRewardsCard';
import { TransitBus } from '../types';

export const TransitPage: React.FC = () => {
  const { buses } = useAppData();
  const [selectedBusId, setSelectedBusId] = useState<string | null>(buses[0]?.id || null);

  const selectedBus = buses.find(b => b.id === selectedBusId) || buses[0];

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
