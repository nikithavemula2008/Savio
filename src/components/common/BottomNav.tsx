import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shirt, ShoppingBag, Bus, UserCheck } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const BottomNav: React.FC = () => {
  const { machines, buses } = useAppData();
  const freeMachinesCount = machines.filter(m => m.status === 'free').length;

  const tabs = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/laundry', label: 'Laundry', icon: Shirt, badge: freeMachinesCount > 0 ? freeMachinesCount : undefined },
    { to: '/marketplace', label: 'Market', icon: ShoppingBag },
    { to: '/transit', label: 'Transit', icon: Bus },
    { to: '/profile', label: 'Profile', icon: UserCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800/90 px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-2xl relative transition-all duration-200 ${
                  isActive
                    ? 'text-[#4F46F5] dark:text-indigo-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                    {tab.badge && (
                      <span className="absolute -top-1 -right-2 bg-emerald-500 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] mt-1 tracking-tight">
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4F46F5] dark:bg-indigo-400 mt-0.5" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
