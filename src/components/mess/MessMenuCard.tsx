import React, { useState } from 'react';
import { Utensils, Star, Flame, Clock, Sparkles, ThumbsUp } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { MessMeal } from '../../types';

export const MessMenuCard: React.FC = () => {
  const { messSchedule, rateMessMeal } = useAppData();
  const [activeMealId, setActiveMealId] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('lunch');
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const activeMeal = messSchedule.find(m => m.id === activeMealId) || messSchedule[0];

  const handleVote = (mealId: string, rating: number) => {
    rateMessMeal(mealId, rating);
    setUserVoted(prev => ({ ...prev, [mealId]: true }));
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Today's Mess Menu
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Central Dining
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live menu updates curated by Campus Dining Committee
            </p>
          </div>
        </div>

        {/* Meal Navigation Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 overflow-x-auto">
          {messSchedule.map(meal => (
            <button
              key={meal.id}
              onClick={() => setActiveMealId(meal.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeMealId === meal.id
                  ? 'bg-white dark:bg-[#111827] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {meal.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Meal Banner & Special Item */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-indigo-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 border border-amber-200/60 dark:border-slate-800 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1">
              <span>Chef's Special</span>
            </div>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white">
              {activeMeal.specialItem || 'Nutritious Campus Selection'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:border-l sm:border-slate-200 dark:sm:border-slate-800 sm:pl-4">
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{activeMeal.timing}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{activeMeal.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">
              ({activeMeal.totalVotes})
            </span>
          </div>
        </div>
      </div>

      {/* Dish Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
        {activeMeal.items.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
              item.highlight
                ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-800/60'
                : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/60'
            }`}
          >
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                {item.name}
                {item.highlight && (
                  <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-current" />
                )}
              </div>
              {item.calories && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  ~{item.calories} kcal
                </div>
              )}
            </div>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${
                item.diet === 'veg'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                  : item.diet === 'vegan'
                  ? 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800'
                  : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
              }`}
            >
              {item.diet === 'veg' ? 'Veg' : item.diet === 'vegan' ? 'Vegan' : 'Non-Veg'}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Student Rating & Feedback Bar */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-300 font-medium">
          How was {activeMeal.name} today?
        </span>

        {userVoted[activeMeal.id] ? (
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" /> Rating recorded!
          </span>
        ) : (
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleVote(activeMeal.id, star)}
                className="p-1 text-slate-300 hover:text-amber-400 dark:text-slate-600 dark:hover:text-amber-400 transition-colors"
                title={`Rate ${star} stars`}
              >
                <Star className="w-4 h-4 fill-current" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
