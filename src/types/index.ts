export type MachineStatus = 'free' | 'in_use' | 'cycle_complete';
export type MachineType = 'washer' | 'dryer';

export interface LaundryMachine {
  id: string;
  name: string;
  type: MachineType;
  location: string;
  floor: string;
  status: MachineStatus;
  remainingMinutes?: number;
  capacityKg: number;
  currentCycle?: string;
  lastMaintained?: string;
}

export interface LaundryBooking {
  id: string;
  machineId: string;
  machineName: string;
  machineType: MachineType;
  location: string;
  slotTime: string;
  date: string;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  qrCode: string;
  createdAt: string;
}

export interface MessItem {
  name: string;
  diet: 'veg' | 'non-veg' | 'vegan';
  calories?: number;
  highlight?: boolean;
}

export interface MessMeal {
  id: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  name: string;
  timing: string;
  items: MessItem[];
  specialItem?: string;
  rating: number;
  totalVotes: number;
}

export interface TransitStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface TransitRoute {
  id: string;
  name: string;
  code: string;
  color: string;
  frequencyMinutes: number;
  stops: string[];
  path: [number, number][];
}

export type CrowdState = 'Low' | 'Medium' | 'Packed';

export interface TransitBus {
  id: string;
  busNumber: string;
  routeId: string;
  routeName: string;
  routeColor: string;
  destination: string;
  nextStop: string;
  etaMinutes: number;
  crowdLevel: CrowdState;
  driverName: string;
  currentLocation: [number, number];
  speedKmh: number;
}

export interface RideHistory {
  id: string;
  routeName: string;
  fromStop: string;
  toStop: string;
  date: string;
  pointsEarned: number;
  durationMinutes: number;
}

export interface AcademicResource {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  department: string;
  semester: string;
  category: 'Lecture Notes' | 'Previous Exam' | 'Cheat Sheet' | 'Lab Manual';
  contributor: string;
  contributorYear: string;
  contributorAvatar: string;
  upvotes: number;
  isUpvoted?: boolean;
  isBookmarked?: boolean;
  fileType: string;
  fileSize: string;
  downloads: number;
  uploadDate: string;
  description: string;
}

export interface TutorProfile {
  id: string;
  name: string;
  avatar: string;
  department: string;
  year: string;
  subjects: string[];
  rating: number;
  reviewsCount: number;
  ratePerHourCredits: number;
  format: 'Online' | 'In-Person' | 'Hybrid';
  availability: string;
  verified: boolean;
  bio: string;
}

export interface ClassifiedItem {
  id: string;
  title: string;
  category: 'Electronics' | 'Books' | 'Sports' | 'Handmade Products' | 'Skin Care' | 'Snacks' | 'Other';
  price: number;
  condition: 'Like New' | 'Gently Used' | 'Well Used';
  sellerName: string;
  sellerRoom: string;
  sellerAvatar: string;
  sellerPhone?: string;
  description: string;
  imageUrl: string;
  datePosted: string;
  status: 'available' | 'sold';
  isMyListing?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  academicYear: string;
  hostelBlock: string;
  roomNumber: string;
  avatarUrl: string;
  isVerified: boolean;
  reputationRating: number;
  reviewsCount: number;
  savioPoints: number;
  completedRides: number;
  laundrySessions: number;
  notesShared: number;
  bio: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'laundry' | 'transit' | 'marketplace' | 'rewards';
}
