import { StudentProfile, NotificationItem } from '../types';

export const initialProfile: StudentProfile = [
  {
    id: 'STU-2026-0914',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    studentId: '22BCE1048',
    department: 'Computer Science & Engineering',
    academicYear: 'Year 3 (Junior)',
    hostelBlock: 'Hostel Block B',
    roomNumber: 'Room 314',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    isVerified: true,
    reputationRating: 4.9,
    reviewsCount: 34,
    savioPoints: 420,
    completedRides: 48,
    laundrySessions: 22,
    notesShared: 6,
    bio: 'Junior CSE student passionate about distributed systems & open source. Campus cycling enthusiast and active note contributor on Savio.',
  },
][0];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    title: 'Laundry Cycle Reminder',
    message: 'Your slot for Washer 01 starts in 30 minutes (05:00 PM). Have your clothes sorted!',
    time: '25m ago',
    read: false,
    type: 'laundry',
  },
  {
    id: 'NOTIF-02',
    title: 'Rider Reward Credited',
    message: '+15 Savio Points credited for taking Blue Line Shuttle #01 today.',
    time: '2h ago',
    read: false,
    type: 'transit',
  },
  {
    id: 'NOTIF-03',
    title: 'Academic Bank Upvote',
    message: 'Your notes for Computer Networks just hit 140+ upvotes! Keep sharing.',
    time: '1d ago',
    read: true,
    type: 'marketplace',
  },
  {
    id: 'NOTIF-04',
    title: 'Mess Special Tonight',
    message: 'Special dinner served tonight at Central Mess: Warm Gulab Jamun & Malai Kofta!',
    time: '3h ago',
    read: true,
    type: 'rewards',
  },
];
