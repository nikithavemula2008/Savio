import React, { useState } from 'react';
import {
  Utensils,
  Star,
  Flame,
  Clock,
  Sparkles,
  ThumbsUp,
  ShieldCheck,
  PlusCircle,
  Trash2,
  Edit3,
  X,
  Check,
} from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { MessMeal, MessItem } from '../../types';

export const MessMenuCard: React.FC = () => {
  const { messSchedule, rateMessMeal, updateMessMeal, addMessItem, removeMessItem } = useAppData();
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role === 'staff';

  const [activeMealId, setActiveMealId] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('lunch');
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  // Staff Editing States
  const [isStaffEditorOpen, setIsStaffEditorOpen] = useState(false);
  const [editSpecial, setEditSpecial] = useState('');
  const [editTiming, setEditTiming] = useState('');
  const [newDishName, setNewDishName] = useState('');
  const [newDishDiet, setNewDishDiet] = useState<'veg' | 'non-veg' | 'vegan'>('veg');
  const [newDishCalories, setNewDishCalories] = useState('200');
  const [newDishHighlight, setNewDishHighlight] = useState(false);

  const activeMeal = messSchedule.find(m => m.id === activeMealId) || messSchedule[0];

  const handleOpenEditor = () => {
    setEditSpecial(activeMeal.specialItem || '');
    setEditTiming(activeMeal.timing);
    setIsStaffEditorOpen(!isStaffEditorOpen);
  };

  const handleSaveMealMeta = (e: React.FormEvent) => {
    e.preventDefault();
    updateMessMeal(activeMeal.id, {
      specialItem: editSpecial,
      timing: editTiming,
    });
  };

  const handleAddNewDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    const newItem: MessItem = {
      name: newDishName.trim(),
      diet: newDishDiet,
      calories: Number(newDishCalories) || undefined,
      highlight: newDishHighlight,
    };

    addMessItem(activeMeal.id, newItem);
    setNewDishName('');
    setNewDishCalories('200');
    setNewDishHighlight(false);
  };

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

        {/* Meal Navigation Pills & Staff Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {isStaff && (
            <button
              type="button"
              onClick={handleOpenEditor}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isStaffEditorOpen
                  ? 'bg-[#4F46F5] text-white border-[#4F46F5]'
                  : 'bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5] dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isStaffEditorOpen ? 'Close Menu Editor' : 'Staff: Edit Menu'}</span>
            </button>
          )}

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
      </div>

      {/* STAFF ONLY: Inline Menu Editor Panel */}
      {isStaff && isStaffEditorOpen && (
        <div className="mb-5 p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 animate-in fade-in zoom-in-95 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-100 dark:border-indigo-900/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4F46F5]" />
              <span className="text-xs font-black uppercase tracking-wider text-indigo-900 dark:text-indigo-200">
                Staff Dining Administration — Editing {activeMeal.name}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              Changes sync live to students
            </span>
          </div>

          {/* Quick Edit: Chef Special & Timing */}
          <form onSubmit={handleSaveMealMeta} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Chef's Special Dish
              </label>
              <input
                type="text"
                value={editSpecial}
                onChange={e => setEditSpecial(e.target.value)}
                placeholder="e.g. Royal Paneer Butter Masala"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Serving Hours
              </label>
              <input
                type="text"
                value={editTiming}
                onChange={e => setEditTiming(e.target.value)}
                placeholder="e.g. 12:15 PM – 02:45 PM"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-3 bg-[#4F46F5] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Save Timing & Special
              </button>
            </div>
          </form>

          {/* Add New Dish Item */}
          <form onSubmit={handleAddNewDish} className="pt-2 border-t border-indigo-100 dark:border-indigo-900/60">
            <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              Add New Dish to {activeMeal.name}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <input
                type="text"
                required
                value={newDishName}
                onChange={e => setNewDishName(e.target.value)}
                placeholder="Dish name (e.g. Garlic Naan)"
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white sm:col-span-2"
              />

              <select
                value={newDishDiet}
                onChange={e => setNewDishDiet(e.target.value as any)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
              >
                <option value="veg">Vegetarian (Veg)</option>
                <option value="vegan">Vegan</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>

              <button
                type="submit"
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Dish</span>
              </button>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newDishHighlight}
                  onChange={e => setNewDishHighlight(e.target.checked)}
                  className="rounded text-[#4F46F5] focus:ring-[#4F46F5]"
                />
                <span>Highlight with Chef flame icon</span>
              </label>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Calories:</span>
                <input
                  type="number"
                  value={newDishCalories}
                  onChange={e => setNewDishCalories(e.target.value)}
                  className="w-16 px-2 py-0.5 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
                <span>kcal</span>
              </div>
            </div>
          </form>
        </div>
      )}

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

            <div className="flex items-center gap-1.5 shrink-0">
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

              {isStaff && (
                <button
                  type="button"
                  onClick={() => removeMessItem(activeMeal.id, idx)}
                  className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title={`Staff: Remove "${item.name}"`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
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
