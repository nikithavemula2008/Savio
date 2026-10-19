import React, { useState } from 'react';
import { Star, ShieldCheck, Calendar, Clock, Video, Users, Check, Sparkles } from 'lucide-react';
import { TutorProfile } from '../../types';
import { useAppData } from '../../context/AppDataContext';
import { Modal } from '../common/Modal';

export const P2PTutoringTab: React.FC = () => {
  const { tutors, bookTutorSession, profile } = useAppData();
  const [selectedTutor, setSelectedTutor] = useState<TutorProfile | null>(null);
  const [bookingDate, setBookingDate] = useState('Tomorrow');
  const [bookingSlot, setBookingSlot] = useState('06:00 PM - 07:00 PM');
  const [notes, setNotes] = useState('');

  const handleConfirmBooking = () => {
    if (!selectedTutor) return;
    bookTutorSession(selectedTutor.id, bookingDate, bookingSlot, notes);
    setSelectedTutor(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900 border border-purple-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Peer-to-Peer Learning Network
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
            Learn from Seniors who mastered your exact courses
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Spend Savio Points to book 1-on-1 exam prep, concept reviews, and lab problem solving.
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <div className="text-xs">
            <div className="text-slate-400">Available Credits</div>
            <div className="font-extrabold text-slate-900 dark:text-white">
              {profile.savioPoints} Credits
            </div>
          </div>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tutors.map(tutor => (
          <div
            key={tutor.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Tutor Avatar & Header */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="relative">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/30 shadow-sm"
                  />
                  {tutor.verified && (
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4F46F5] text-white rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900"
                      title="Peer Verified Tutor"
                    >
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {tutor.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{tutor.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({tutor.reviewsCount})
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {tutor.department}
                  </div>
                  <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                    {tutor.year}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-3 leading-relaxed">
                {tutor.bio}
              </p>

              {/* Subjects Tags */}
              <div className="mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Subjects Taught
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Format & Availability */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1 mb-4">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Video className="w-3.5 h-3.5" /> Format:
                  </span>
                  <span className="font-semibold">{tutor.format}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" /> Schedule:
                  </span>
                  <span className="font-medium truncate max-w-[140px] text-right">
                    {tutor.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Action and Pricing */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block -mb-0.5">Rate</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {tutor.ratePerHourCredits}{' '}
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    pts/hr
                  </span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTutor(tutor)}
                className="px-4 py-2 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-indigo-500/20"
              >
                Book Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Session Modal */}
      <Modal
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
        title={selectedTutor ? `Book 1-on-1 with ${selectedTutor.name}` : ''}
        description="Reserve a focused mentoring session. Credits will be escrowed until the session completes."
        maxWidth="max-w-md"
      >
        {selectedTutor && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/60 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {selectedTutor.subjects[0]} Coaching
                </div>
                <div className="text-purple-700 dark:text-purple-300">
                  {selectedTutor.format} Session
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">Session Fee</span>
                <div className="font-extrabold text-sm text-purple-600 dark:text-purple-400">
                  {selectedTutor.ratePerHourCredits} Credits
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                Select Day:
              </label>
              <select
                value={bookingDate}
                onChange={e => setBookingDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="Tomorrow">Tomorrow (Oct 12)</option>
                <option value="Thursday">Thursday (Oct 14)</option>
                <option value="Saturday">Saturday (Oct 16)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                Preferred Time Slot:
              </label>
              <select
                value={bookingSlot}
                onChange={e => setBookingSlot(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              >
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                Topics / Questions to focus on:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. End-sem DP graph questions, Dijkstra algorithm proofs..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedTutor(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-5 py-2.5 bg-[#4F46F5] hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20"
              >
                Confirm & Escrow Credits
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
