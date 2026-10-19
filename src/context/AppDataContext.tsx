import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  LaundryMachine,
  LaundryBooking,
  AcademicResource,
  TutorProfile,
  ClassifiedItem,
  TransitBus,
  StudentProfile,
  RideHistory,
  NotificationItem,
  MessMeal,
} from '../types';
import { initialMachines, initialBookings } from '../data/mockLaundry';
import { initialAcademicResources, initialTutors, initialClassifieds } from '../data/mockMarketplace';
import { initialBuses, initialRideHistory } from '../data/mockTransit';
import { initialProfile, initialNotifications } from '../data/mockProfile';
import { mockMessSchedule } from '../data/mockMess';
import { useToast } from './ToastContext';

interface AppDataContextType {
  machines: LaundryMachine[];
  bookings: LaundryBooking[];
  resources: AcademicResource[];
  tutors: TutorProfile[];
  classifieds: ClassifiedItem[];
  buses: TransitBus[];
  profile: StudentProfile;
  rideHistory: RideHistory[];
  notifications: NotificationItem[];
  messSchedule: MessMeal[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  reserveLaundrySlot: (machineId: string, slotTime: string, date: string) => boolean;
  cancelLaundryBooking: (bookingId: string) => void;
  verifyLaundryQrDemo: (code: string) => { success: boolean; message: string };
  toggleResourceUpvote: (id: string) => void;
  toggleResourceBookmark: (id: string) => void;
  addClassified: (item: Omit<ClassifiedItem, 'id' | 'datePosted' | 'status' | 'sellerAvatar'> & { isMyListing?: boolean; sellerPhone?: string }) => void;
  updateClassified: (id: string, updated: Partial<ClassifiedItem>) => void;
  deleteClassified: (id: string) => void;
  toggleClassifiedStatus: (id: string) => void;
  bookTutorSession: (tutorId: string, date: string, timeSlot: string, notes: string) => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  rateMessMeal: (mealId: string, rating: number) => void;
  simulateBoardBus: (busId: string) => void;
  resetAllDemoData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Load from localStorage or fall back to mock data
  const [machines, setMachines] = useState<LaundryMachine[]>(() => {
    const saved = localStorage.getItem('savio_machines');
    return saved ? JSON.parse(saved) : initialMachines;
  });

  const [bookings, setBookings] = useState<LaundryBooking[]>(() => {
    const saved = localStorage.getItem('savio_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [resources, setResources] = useState<AcademicResource[]>(() => {
    const saved = localStorage.getItem('savio_resources');
    return saved ? JSON.parse(saved) : initialAcademicResources;
  });

  const [tutors] = useState<TutorProfile[]>(initialTutors);

  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>(() => {
    const saved = localStorage.getItem('savio_classifieds');
    return saved ? JSON.parse(saved) : initialClassifieds;
  });

  const [buses] = useState<TransitBus[]>(initialBuses);

  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('savio_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [rideHistory, setRideHistory] = useState<RideHistory[]>(() => {
    const saved = localStorage.getItem('savio_ride_history');
    return saved ? JSON.parse(saved) : initialRideHistory;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('savio_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [messSchedule, setMessSchedule] = useState<MessMeal[]>(() => {
    const saved = localStorage.getItem('savio_mess');
    return saved ? JSON.parse(saved) : mockMessSchedule;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('savio_machines', JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem('savio_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('savio_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('savio_classifieds', JSON.stringify(classifieds));
  }, [classifieds]);

  useEffect(() => {
    localStorage.setItem('savio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('savio_ride_history', JSON.stringify(rideHistory));
  }, [rideHistory]);

  useEffect(() => {
    localStorage.setItem('savio_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('savio_mess', JSON.stringify(messSchedule));
  }, [messSchedule]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#4F46F5', '#059669', '#8B5CF6', '#F59E0B'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // 1. SMART LAUNDRY: Reserve a 45-minute slot
  const reserveLaundrySlot = (machineId: string, slotTime: string, date: string): boolean => {
    const machine = machines.find(m => m.id === machineId);
    if (!machine) {
      showToast('Machine not found', 'error');
      return false;
    }

    const newBooking: LaundryBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      machineId: machine.id,
      machineName: machine.name,
      machineType: machine.type,
      location: machine.location,
      slotTime,
      date,
      status: 'confirmed',
      qrCode: `SAVIO-${machine.id}-${Date.now().toString().slice(-4)}`,
      createdAt: 'Just now',
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update machine status if reserved for current time
    setMachines(prev =>
      prev.map(m =>
        m.id === machineId
          ? {
              ...m,
              status: 'in_use',
              remainingMinutes: 45,
              currentCycle: m.type === 'washer' ? 'Standard 40°C Wash' : 'Warm Air Dry',
            }
          : m
      )
    );

    // Award Savio Points
    setProfile(prev => ({
      ...prev,
      savioPoints: prev.savioPoints + 20,
      laundrySessions: prev.laundrySessions + 1,
    }));

    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Slot Reserved Successfully',
      message: `Reserved ${machine.name} for ${slotTime} on ${date}. +20 Savio Points earned!`,
      time: 'Just now',
      read: false,
      type: 'laundry',
    };
    setNotifications(prev => [newNotif, ...prev]);

    triggerCelebration();
    showToast(`Reserved ${machine.name} (${slotTime})! +20 Points!`, 'success');
    return true;
  };

  // Cancel Booking Flow
  const cancelLaundryBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    // Free the machine
    setMachines(prev =>
      prev.map(m =>
        m.id === booking.machineId
          ? { ...m, status: 'free', remainingMinutes: undefined, currentCycle: undefined }
          : m
      )
    );

    showToast(`Reservation ${bookingId} cancelled. Machine is now free.`, 'info');
  };

  // QR Code Scanner Demo
  const verifyLaundryQrDemo = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const matchedMachine = machines.find(m =>
      trimmed.includes(m.id) || m.id === trimmed
    );

    if (matchedMachine) {
      // Toggle cycle start or verify slot
      setMachines(prev =>
        prev.map(m =>
          m.id === matchedMachine.id
            ? { ...m, status: 'in_use', remainingMinutes: 40, currentCycle: 'Eco Cycle Started via QR' }
            : m
        )
      );

      setProfile(prev => ({ ...prev, savioPoints: prev.savioPoints + 15 }));
      triggerCelebration();
      showToast(`Scanned ${matchedMachine.name}! Cycle initiated (+15 pts)`, 'success');
      return { success: true, message: `Successfully verified and unlocked ${matchedMachine.name}!` };
    } else {
      showToast('Unrecognized Savio QR code. Try sample: WM-01 or WM-04', 'error');
      return { success: false, message: 'Invalid or expired QR tag.' };
    }
  };

  // 2. MARKETPLACE: Upvoting and Bookmarking
  const toggleResourceUpvote = (id: string) => {
    setResources(prev =>
      prev.map(r => {
        if (r.id === id) {
          const isUpvoted = !r.isUpvoted;
          const upvotes = isUpvoted ? r.upvotes + 1 : r.upvotes - 1;
          showToast(isUpvoted ? 'Upvoted resource!' : 'Removed upvote', 'info');
          return { ...r, isUpvoted, upvotes };
        }
        return r;
      })
    );
  };

  const toggleResourceBookmark = (id: string) => {
    setResources(prev =>
      prev.map(r => {
        if (r.id === id) {
          const isBookmarked = !r.isBookmarked;
          showToast(isBookmarked ? 'Saved to bookmarks' : 'Removed from bookmarks', 'info');
          return { ...r, isBookmarked };
        }
        return r;
      })
    );
  };

  const addClassified = (item: Omit<ClassifiedItem, 'id' | 'datePosted' | 'status' | 'sellerAvatar'> & { isMyListing?: boolean; sellerPhone?: string }) => {
    const newItem: ClassifiedItem = {
      ...item,
      id: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      datePosted: 'Just now',
      status: 'available',
      sellerAvatar: profile.avatarUrl,
      sellerName: item.sellerName || profile.name,
      sellerRoom: item.sellerRoom || `${profile.hostelBlock}, ${profile.roomNumber}`,
      sellerPhone: item.sellerPhone || '+91 98765 43210',
      isMyListing: true,
    };

    setClassifieds(prev => [newItem, ...prev]);
    setProfile(prev => ({ ...prev, savioPoints: prev.savioPoints + 25 }));

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Item Listed on Campus Marketplace',
      message: `Your product "${item.title}" (₹${item.price.toLocaleString()}) is now live! +25 Savio Points earned.`,
      time: 'Just now',
      read: false,
      type: 'marketplace',
    };
    setNotifications(prev => [newNotif, ...prev]);

    triggerCelebration();
    showToast('Product listed successfully! +25 Savio Points', 'success');
  };

  const updateClassified = (id: string, updated: Partial<ClassifiedItem>) => {
    setClassifieds(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('Listing updated successfully!', 'success');
  };

  const deleteClassified = (id: string) => {
    setClassifieds(prev => prev.filter(c => c.id !== id));
    showToast('Listing removed from marketplace', 'info');
  };

  const toggleClassifiedStatus = (id: string) => {
    setClassifieds(prev =>
      prev.map(c => {
        if (c.id === id) {
          const newStatus = c.status === 'available' ? 'sold' : 'available';
          showToast(newStatus === 'sold' ? `"${c.title}" marked as Sold! 🎉` : `"${c.title}" marked as Available!`, 'success');
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
  };

  const bookTutorSession = (tutorId: string, date: string, timeSlot: string, notes: string) => {
    const tutor = tutors.find(t => t.id === tutorId);
    if (!tutor) return;

    if (profile.savioPoints < tutor.ratePerHourCredits) {
      showToast(`Insufficient Savio Credits! You need ${tutor.ratePerHourCredits} credits.`, 'error');
      return;
    }

    setProfile(prev => ({
      ...prev,
      savioPoints: prev.savioPoints - tutor.ratePerHourCredits,
    }));

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Tutor Session Booked',
      message: `Confirmed session with ${tutor.name} (${tutor.subjects[0]}) on ${date} at ${timeSlot}.`,
      time: 'Just now',
      read: false,
      type: 'marketplace',
    };
    setNotifications(prev => [newNotif, ...prev]);

    triggerCelebration();
    showToast(`Session booked with ${tutor.name}! ${tutor.ratePerHourCredits} credits used.`, 'success');
  };

  // 3. PROFILE UPDATE
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    showToast('Profile updated successfully!', 'success');
  };

  // 4. MESS RATING
  const rateMessMeal = (mealId: string, rating: number) => {
    setMessSchedule(prev =>
      prev.map(m => {
        if (m.id === mealId) {
          const newVotes = m.totalVotes + 1;
          const newRating = Number(((m.rating * m.totalVotes + rating) / newVotes).toFixed(1));
          return { ...m, rating: newRating, totalVotes: newVotes };
        }
        return m;
      })
    );
    showToast(`Feedback recorded for ${mealId}! Thank you.`, 'success');
  };

  // 5. TRANSIT: Simulate Boarding
  const simulateBoardBus = (busId: string) => {
    const bus = buses.find(b => b.id === busId);
    if (!bus) return;

    const newRide: RideHistory = {
      id: `RD-${Math.floor(1000 + Math.random() * 9000)}`,
      routeName: bus.routeName,
      fromStop: bus.nextStop,
      toStop: bus.destination,
      date: 'Today, Just now',
      pointsEarned: 15,
      durationMinutes: 8,
    };

    setRideHistory(prev => [newRide, ...prev]);
    setProfile(prev => ({
      ...prev,
      savioPoints: prev.savioPoints + 15,
      completedRides: prev.completedRides + 1,
    }));

    triggerCelebration();
    showToast(`Boarded ${bus.busNumber}! +15 Rider Points earned!`, 'success');
  };

  const resetAllDemoData = () => {
    localStorage.clear();
    setMachines(initialMachines);
    setBookings(initialBookings);
    setResources(initialAcademicResources);
    setClassifieds(initialClassifieds);
    setProfile(initialProfile);
    setRideHistory(initialRideHistory);
    setNotifications(initialNotifications);
    setMessSchedule(mockMessSchedule);
    showToast('Demo data reset to factory state', 'info');
  };

  return (
    <AppDataContext.Provider
      value={{
        machines,
        bookings,
        resources,
        tutors,
        classifieds,
        buses,
        profile,
        rideHistory,
        notifications,
        messSchedule,
        markNotificationRead,
        markAllNotificationsRead,
        reserveLaundrySlot,
        cancelLaundryBooking,
        verifyLaundryQrDemo,
        toggleResourceUpvote,
        toggleResourceBookmark,
        addClassified,
        updateClassified,
        deleteClassified,
        toggleClassifiedStatus,
        bookTutorSession,
        updateProfile,
        rateMessMeal,
        simulateBoardBus,
        resetAllDemoData,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
