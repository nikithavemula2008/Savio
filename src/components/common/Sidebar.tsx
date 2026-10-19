import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Bus,
  UserCheck,
  Zap,
  Sparkles,
  RotateCcw,
  Clock,
  Compass,
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const Sidebar: React.FC = () => {
  const { machines, buses, resetAllDemoData } = useAppData();

  const freeMachinesCount = machines.filter(m => m.status === 'free').length;
  const closestBus = buses.reduce((prev, curr) =>
    curr.etaMinutes < prev.etaMinutes ? curr : prev
  );

  const navItems = [
    {
      to: '/',
      label: 'Home Dashboard',
      icon: LayoutDashboard,
      badge: 'Hub',
    },
    {
      to: '/laundry',
      label: 'Smart Laundry',
      icon: Shirt,
      badge: `${freeMachinesCount} Free`,
    },
    {
      to: '/marketplace',
      label: 'Marketplace',
      icon: ShoppingBag,
      badge: 'P2P',
    },
    {
      to: '/transit',
      label: 'Campus Transit',
      icon: Bus,
      badge: `${closestBus.etaMinutes}m ETA`,
    },
    {
      to: '/profile',
      label: 'Profile & Trust',
      icon: UserCheck,
      badge: 'Verified',
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#0B0F19]/70 backdrop-blur-md p-4 lg:p-6 shrink-0 min-h-[calc(100vh-5rem)]">
      {/* Brand Tagline in Sidebar */}
      <div className="mb-6 px-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40">
          <Zap className="w-3.5 h-3.5 text-indigo-500" />
          <span>Campus Operating System</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4F46F5] to-indigo-600 text-white shadow-md shadow-indigo-500/20 translate-x-1'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Live Campus Telemetry Widget */}
      <div className="my-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-slate-50 to-emerald-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Campus Live Pulse
            </span>
          </div>
          <span className="text-[10px] text-slate-400">Auto-sync</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Shirt className="w-3.5 h-3.5 text-indigo-500" />
              <span>Smart Laundry</span>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {freeMachinesCount} Available
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Bus className="w-3.5 h-3.5 text-indigo-500" />
              <span>Next Shuttle</span>
            </div>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {closestBus.etaMinutes} min ({closestBus.routeColor === '#4F46F5' ? 'Blue' : 'Emerald'})
            </span>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={resetAllDemoData}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
          title="Reset local storage data back to default demo state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
