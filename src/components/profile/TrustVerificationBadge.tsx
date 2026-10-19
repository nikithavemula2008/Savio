import React from 'react';
import { ShieldCheck, Award, CheckCircle2, QrCode, Lock } from 'lucide-react';
import { StudentProfile } from '../../types';

interface TrustVerificationBadgeProps {
  profile: StudentProfile;
}

export const TrustVerificationBadge: React.FC<TrustVerificationBadgeProps> = ({ profile }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-500/30">
      {/* Decorative background glow & circuit accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: Avatar, Name, Verification info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-400/40 shadow-xl"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-indigo-950 shadow-md">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {profile.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>

            <p className="text-xs text-indigo-200 mt-1">
              {profile.department} • {profile.academicYear}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-indigo-300 font-mono">
              <span>ID: {profile.studentId}</span>
              <span>•</span>
              <span>{profile.hostelBlock}, {profile.roomNumber}</span>
            </div>
          </div>
        </div>

        {/* Right: Savio Trust Digital Seal */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                Institutional ID Link
              </div>
              <div className="text-xs font-bold text-white font-mono">
                SHA-256: 4F92...B81A
              </div>
            </div>
          </div>

          <div className="text-[11px] text-indigo-300 sm:mt-2 text-right">
            <span>Verified via Campus Portal SSO</span>
          </div>
        </div>
      </div>
    </div>
  );
};
