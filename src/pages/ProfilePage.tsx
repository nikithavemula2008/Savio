import React, { useState } from 'react';
import {
  User,
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  Edit3,
  Moon,
  Sun,
  Bell,
  CheckCircle2,
  Clock,
  Shirt,
  Bus,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useTheme } from '../context/ThemeContext';
import { TrustVerificationBadge } from '../components/profile/TrustVerificationBadge';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { useToast } from '../context/ToastContext';

export const ProfilePage: React.FC = () => {
  const { profile, bookings, rideHistory, classifieds } = useAppData();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () => {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    showToast(next ? 'Campus push notifications enabled' : 'Notifications muted', 'info');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-[#4F46F5]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Identity & Peer Trust
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Profile & Trust
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Verified campus identity, peer reputation ratings, and Savio reward tokens.
          </p>
        </div>

        {/* Edit Profile CTA */}
        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold text-xs hover:border-[#4F46F5] dark:hover:border-indigo-500 shadow-sm transition-all self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-[#4F46F5]" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Institutional Verification Badge */}
      <TrustVerificationBadge profile={profile} />

      {/* Reputation and Points Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Peer Reputation */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Peer Trust Score
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
              <span>{profile.reputationRating}</span>
              <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {profile.reviewsCount} verified student ratings
            </div>
          </div>
        </div>

        {/* Savio Points */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46F5] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Savio Balance
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {profile.savioPoints} Points
            </div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
              Redeemable for tutor sessions
            </div>
          </div>
        </div>

        {/* Activity Summary */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Campus Engagement
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {profile.completedRides + profile.laundrySessions} Acts
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {profile.notesShared} note archives contributed
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Booking History & Account Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unified Booking History (2 Cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Active & Recent Activity
              </h3>
              <p className="text-xs text-slate-500">
                Audited timeline across Laundry, Transit, and Marketplace
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Synced
            </span>
          </div>

          <div className="space-y-3">
            {/* Laundry Booking item */}
            {bookings.slice(0, 2).map(b => (
              <div
                key={b.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46F5] flex items-center justify-center shrink-0">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      Laundry: {b.machineName} ({b.machineId})
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {b.slotTime} • {b.date}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {b.status}
                </span>
              </div>
            ))}

            {/* Transit Ride item */}
            {rideHistory.slice(0, 2).map(r => (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      Transit: {r.fromStop} → {r.toStop}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {r.routeName} • {r.date}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  +{r.pointsEarned} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences & Settings (1 Col) */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              App Preferences
            </h3>
            <p className="text-xs text-slate-500">
              Customize theme & alert behaviors
            </p>
          </div>

          {/* Theme setting */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Appearance
                </div>
                <div className="text-[11px] text-slate-500">
                  Currently {theme === 'dark' ? 'Dark' : 'Light'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white shadow-sm"
            >
              Toggle
            </button>
          </div>

          {/* Notifications setting */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Push Notifications
                </div>
                <div className="text-[11px] text-slate-500">
                  {notificationsEnabled ? 'Active for slots' : 'Muted'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleNotifications}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notificationsEnabled ? 'bg-[#4F46F5]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white block shadow-sm transform transition-transform ${
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Student ID security note */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
            <strong>Campus Trust Protocol:</strong> Your profile is verified against university directory record <code>{profile.studentId}</code>. Trades and ratings contribute to your campus reputation score.
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};
