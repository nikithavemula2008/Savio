import React from 'react';
import { Sparkles, Trophy, Award, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const RiderRewardsCard: React.FC = () => {
  const { profile, rideHistory } = useAppData();

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Rider Rewards Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 text-white shadow-lg shadow-indigo-500/15">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <div className="text-xs font-semibold text-indigo-100 uppercase tracking-wider flex items-center gap-1.5">
              <span>Savio Eco-Mobility Tier</span>
              <span className="bg-emerald-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                Green Rider
              </span>
            </div>
            <div className="text-2xl font-black mt-0.5">
              {profile.savioPoints}{' '}
              <span className="text-sm font-medium text-indigo-200">Points Earned</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
          <Award className="w-4 h-4 text-emerald-300 shrink-0" />
          <div>
            <div className="font-bold">{profile.completedRides} Campus Rides</div>
            <div className="text-[11px] text-indigo-100">Saved ~34 kg CO₂ footprint</div>
          </div>
        </div>
      </div>

      {/* Recent Ride History Table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" /> Recent Campus Rides
          </h4>
          <span className="text-xs text-slate-400">Automated trip logs</span>
        </div>

        {rideHistory.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No transit rides recorded yet. Board a shuttle to start earning!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {rideHistory.map(ride => (
              <div
                key={ride.id}
                className="py-3 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{ride.fromStop}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span>{ride.toStop}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {ride.routeName} • {ride.date}
                  </div>
                </div>

                <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-200/60 dark:border-emerald-800/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{ride.pointsEarned} pts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
