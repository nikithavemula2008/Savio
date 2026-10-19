import React, { useState } from 'react';
import { BookOpen, Users, ShoppingBag, Sparkles, PlusCircle } from 'lucide-react';
import { AcademicBankTab } from '../components/marketplace/AcademicBankTab';
import { P2PTutoringTab } from '../components/marketplace/P2PTutoringTab';
import { ClassifiedsTab } from '../components/marketplace/ClassifiedsTab';
import { useAppData } from '../context/AppDataContext';

export const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'academic' | 'tutoring' | 'classifieds'>('academic');
  const { resources, tutors, classifieds } = useAppData();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/70 text-purple-600">
              <ShoppingBag className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Campus Marketplace & Knowledge Base
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Skill & Resource Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Exchange verified course notes, book senior peer tutoring, and buy/sell dorm essentials safely within the student community.
          </p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'academic'
              ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#4F46F5]" />
          <span>Academic Bank ({resources.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tutoring')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'tutoring'
              ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-purple-500" />
          <span>P2P Tutoring ({tutors.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('classifieds')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
            activeTab === 'classifieds'
              ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-amber-500" />
          <span>Student Classifieds ({classifieds.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'academic' && <AcademicBankTab />}
      {activeTab === 'tutoring' && <P2PTutoringTab />}
      {activeTab === 'classifieds' && <ClassifiedsTab />}
    </div>
  );
};
