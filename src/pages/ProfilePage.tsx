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
  ShieldAlert,
  Key,
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { TrustVerificationBadge } from '../components/profile/TrustVerificationBadge';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { useToast } from '../context/ToastContext';

export const ProfilePage: React.FC = () => {
  const { profile, bookings, rideHistory, classifieds } = useAppData();
  const { currentUser } = useAuth();
  const isStaff = currentUser?.role === 'staff';
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
              {isStaff ? 'Staff & Administrator Portal' : 'Identity & Peer Trust'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isStaff ? 'Staff Account & Operations' : 'Student Profile & Trust'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isStaff
              ? 'Authorized campus operator credentials, fleet permissions, and system administration.'
              : 'Verified campus identity, peer reputation ratings, and Savio reward tokens.'}
          </p>
        </div>

        {/* Edit Profile CTA (students only) */}
        {!isStaff && (
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold text-xs hover:border-[#4F46F5] dark:hover:border-indigo-500 shadow-sm transition-all self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4 text-[#4F46F5]" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Staff Identity Card or Student Trust Verification Badge */}
      {isStaff ? (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/60 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-400 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black">{currentUser.name}</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500 text-white">
                    Staff
                  </span>
                </div>
                <p className="text-xs text-indigo-200 mt-0.5">{currentUser.designation}</p>
                <p className="text-xs text-slate-400">{currentUser.department} • {currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-mono">
              <Key className="w-3.5 h-3.5 text-yellow-300" />
              <span>STAFF ID: {currentUser.staffId || currentUser.id}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Granted Administrative Capabilities:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-lg bg-indigo-900/80 border border-indigo-700 text-indigo-200 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Update Mess Dining Menu
              </span>
              <span className="px-3 py-1 rounded-lg bg-indigo-900/80 border border-indigo-700 text-indigo-200 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Manage Laundry Machine Status
              </span>
              <span className="px-3 py-1 rounded-lg bg-indigo-900/80 border border-indigo-700 text-indigo-200 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Post Transit Broadcasts & ETA
              </span>
              <span className="px-3 py-1 rounded-lg bg-indigo-900/80 border border-indigo-700 text-indigo-200 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Moderate Marketplace Listings
              </span>
            </div>
          </div>
        </div>
      ) : (
        <TrustVerificationBadge profile={profile} />
      )}

      {/* Reputation and Points Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Peer Reputation / System Clearance */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            {isStaff ? <ShieldAlert className="w-6 h-6 text-[#4F46F5]" /> : <Star className="w-6 h-6 fill-current" />}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isStaff ? 'Authorization Level' : 'Peer Trust Score'}
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
              <span>{isStaff ? 'Level 4 Staff' : profile.reputationRating}</span>
              {!isStaff && <span className="text-xs text-slate-400 font-normal">/ 5.0</span>}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {isStaff ? 'Institutional System Clearance' : `${profile.reviewsCount} verified student ratings`}
            </div>
          </div>
        </div>

        {/* Savio Points / Operations Scope */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F46F5] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {isStaff ? 'Managed Domains' : 'Savio Balance'}
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {isStaff ? '4 Utility Services' : `${profile.savioPoints} Points`}
            </div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
              {isStaff ? 'Dining • Laundry • Transit • Trades' : 'Redeemable for tutor sessions'}
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
              {isStaff ? 'System Status' : 'Campus Engagement'}
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {isStaff ? 'Live & Synced' : `${profile.completedRides + profile.laundrySessions} Acts`}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {isStaff ? 'All microservices operational' : `${profile.notesShared} note archives contributed`}
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

          {/* Identity security note */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
            {isStaff ? (
              <span>
                <strong>Campus Operations Protocol:</strong> Authenticated under staff credential <code>{currentUser.staffId || currentUser.id}</code>. Fleet, dining, and moderation updates are actively synchronized across student endpoints.
              </span>
            ) : (
              <span>
                <strong>Campus Trust Protocol:</strong> Your profile is verified against university directory record <code>{profile.studentId}</code>. Trades and ratings contribute to your campus reputation score.
              </span>
            )}
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
