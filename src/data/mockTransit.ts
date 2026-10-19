import { TransitRoute, TransitStop, TransitBus, RideHistory } from '../types';

export const campusCenter: [number, number] = [12.9722, 77.5940];

export const campusStops: TransitStop[] = [
  { id: 'ST-01', name: 'Main Campus Gate & Metro', lat: 12.9720, lng: 77.5895 },
  { id: 'ST-02', name: 'Hostel Quad & Dining Hall', lat: 12.9760, lng: 77.5925 },
  { id: 'ST-03', name: 'Computer Science & Tech Tower', lat: 12.9745, lng: 77.5980 },
  { id: 'ST-04', name: 'Central Library & Student Union', lat: 12.9712, lng: 77.5965 },
  { id: 'ST-05', name: 'Sports Arena & Athletic Center', lat: 12.9682, lng: 77.5935 },
  { id: 'ST-06', name: 'Biotech & Innovation Labs', lat: 12.9695, lng: 77.5890 },
];

export const transitRoutes: TransitRoute[] = [
  {
    id: 'RT-BLUE',
    name: 'Blue Line (North Express)',
    code: 'B-10',
    color: '#4F46F5', // Electric Indigo
    frequencyMinutes: 8,
    stops: ['Main Campus Gate & Metro', 'Hostel Quad & Dining Hall', 'Computer Science & Tech Tower'],
    path: [
      [12.9720, 77.5895],
      [12.9740, 77.5905],
      [12.9760, 77.5925],
      [12.9755, 77.5955],
      [12.9745, 77.5980],
    ],
  },
  {
    id: 'RT-EMERALD',
    name: 'Emerald Shuttle (Quad to Lab)',
    code: 'E-04',
    color: '#059669', // Campus Emerald
    frequencyMinutes: 6,
    stops: ['Hostel Quad & Dining Hall', 'Central Library & Student Union', 'Sports Arena & Athletic Center'],
    path: [
      [12.9760, 77.5925],
      [12.9735, 77.5945],
      [12.9712, 77.5965],
      [12.9695, 77.5950],
      [12.9682, 77.5935],
    ],
  },
  {
    id: 'RT-PURPLE',
    name: 'Violet Loop (Campus Ring)',
    code: 'V-08',
    color: '#8B5CF6', // Purple
    frequencyMinutes: 12,
    stops: ['Sports Arena & Athletic Center', 'Biotech & Innovation Labs', 'Main Campus Gate & Metro'],
    path: [
      [12.9682, 77.5935],
      [12.9690, 77.5905],
      [12.9695, 77.5890],
      [12.9710, 77.5892],
      [12.9720, 77.5895],
    ],
  },
];

export const initialBuses: TransitBus[] = [
  {
    id: 'BUS-101',
    busNumber: 'SAVIO-SHUTTLE #01',
    routeId: 'RT-BLUE',
    routeName: 'Blue Line (North Express)',
    routeColor: '#4F46F5',
    destination: 'Computer Science & Tech Tower',
    nextStop: 'Hostel Quad & Dining Hall',
    etaMinutes: 3,
    crowdLevel: 'Medium',
    driverName: 'Ramesh Kumar (Badge #48)',
    currentLocation: [12.9742, 77.5912],
    speedKmh: 24,
  },
  {
    id: 'BUS-102',
    busNumber: 'SAVIO-SHUTTLE #02',
    routeId: 'RT-EMERALD',
    routeName: 'Emerald Shuttle (Quad to Lab)',
    routeColor: '#059669',
    destination: 'Sports Arena & Athletic Center',
    nextStop: 'Central Library & Student Union',
    etaMinutes: 1,
    crowdLevel: 'Low',
    driverName: 'Suresh Patel (Badge #19)',
    currentLocation: [12.9728, 77.5952],
    speedKmh: 28,
  },
  {
    id: 'BUS-103',
    busNumber: 'SAVIO-SHUTTLE #03',
    routeId: 'RT-BLUE',
    routeName: 'Blue Line (North Express)',
    routeColor: '#4F46F5',
    destination: 'Main Campus Gate & Metro',
    nextStop: 'Computer Science & Tech Tower',
    etaMinutes: 7,
    crowdLevel: 'Packed',
    driverName: 'Anil Yadav (Badge #72)',
    currentLocation: [12.9752, 77.5968],
    speedKmh: 18,
  },
  {
    id: 'BUS-104',
    busNumber: 'SAVIO-SHUTTLE #04',
    routeId: 'RT-PURPLE',
    routeName: 'Violet Loop (Campus Ring)',
    routeColor: '#8B5CF6',
    destination: 'Main Campus Gate & Metro',
    nextStop: 'Biotech & Innovation Labs',
    etaMinutes: 5,
    crowdLevel: 'Low',
    driverName: 'Mohan Singh (Badge #33)',
    currentLocation: [12.9688, 77.5915],
    speedKmh: 22,
  },
];

export const initialRideHistory: RideHistory[] = [
  {
    id: 'RD-902',
    routeName: 'Blue Line (North Express)',
    fromStop: 'Hostel Quad',
    toStop: 'Tech Tower',
    date: 'Today, 09:15 AM',
    pointsEarned: 15,
    durationMinutes: 7,
  },
  {
    id: 'RD-891',
    routeName: 'Emerald Shuttle',
    fromStop: 'Central Library',
    toStop: 'Hostel Quad',
    date: 'Yesterday, 07:45 PM',
    pointsEarned: 15,
    durationMinutes: 9,
  },
  {
    id: 'RD-854',
    routeName: 'Violet Loop',
    fromStop: 'Sports Arena',
    toStop: 'Main Campus Gate',
    date: '3 days ago',
    pointsEarned: 20,
    durationMinutes: 12,
  },
];
