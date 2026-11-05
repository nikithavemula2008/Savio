/**
 * ============================================================================
 * SAVIO CAMPUS OS — USER CREDENTIALS & DEMO ACCOUNTS DATABASE (users.js)
 * ============================================================================
 *
 * ⚠️ SECURITY NOTICE:
 * This is a FRONT-END-ONLY authentication system implemented for demonstration
 * purposes on static hosting environments like GitHub Pages.
 *
 * In a static front-end bundle, all client-side code and precomputed SHA-256
 * hashes are accessible in the browser. Anyone inspecting network/source code
 * can see the user records. Do NOT use this for sensitive production data.
 *
 * ----------------------------------------------------------------------------
 * 🚀 HOW TO MIGRATE TO PRODUCTION-GRADE AUTHENTICATION:
 * ----------------------------------------------------------------------------
 * 1. Firebase Authentication:
 *    - Install: `npm install firebase`
 *    - Initialize Firebase app with your config (`apiKey`, `authDomain`, etc.).
 *    - Replace client hashing with `signInWithEmailAndPassword(auth, email, pass)`.
 *    - Store custom claims or user roles in Firestore database (e.g. `/users/{uid}`).
 *    - Listen to session changes with `onAuthStateChanged(auth, user => ...)`.
 *
 * 2. Supabase Auth:
 *    - Install: `npm install @supabase/supabase-js`
 *    - Initialize Supabase client: `createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`
 *    - Authenticate via: `supabase.auth.signInWithPassword({ email, password })`.
 *    - Enable Row Level Security (RLS) on PostgreSQL tables with JWT role checks:
 *      `auth.jwt() ->> 'role' = 'staff'`.
 * ============================================================================
 */

/**
 * Helper to compute SHA-256 hash using the native browser Web Crypto API.
 * @param {string} plainText
 * @returns {Promise<string>} Hexadecimal SHA-256 hash string
 */
export async function hashPassword(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Demo Pre-computed SHA-256 Hashes:
 * - "password123": "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"
 * - "admin123":    "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"
 */

export const users = [
  // --------------------------------------------------------------------------
  // STUDENT DEMO ACCOUNTS (Password: password123)
  // --------------------------------------------------------------------------
  {
    id: 'STU001',
    username: 'student1',
    studentId: '22BCE1048',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    role: 'student',
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', // password123
    plainPasswordHint: 'password123',
    department: 'Computer Science & Engineering',
    academicYear: 'Year 3 (Junior)',
    hostelBlock: 'Hostel Block B',
    roomNumber: 'Room 314',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
    savioPoints: 420,
    bio: 'Junior CSE student passionate about distributed systems & open source.',
  },
  {
    id: 'STU002',
    username: 'student2',
    studentId: '23BCS1012',
    name: 'Priya Iyer',
    email: 'priya.iyer@campus.edu',
    role: 'student',
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', // password123
    plainPasswordHint: 'password123',
    department: 'Computer Science & AI',
    academicYear: 'Year 4 (Senior)',
    hostelBlock: 'Hostel Block A',
    roomNumber: 'Room 204',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
    savioPoints: 580,
    bio: 'Final year AI researcher, active note contributor & peer tutor.',
  },
  {
    id: 'STU003',
    username: 'student3',
    studentId: '22ECE1084',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@campus.edu',
    role: 'student',
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', // password123
    plainPasswordHint: 'password123',
    department: 'Electronics & Communication',
    academicYear: 'Year 3 (Junior)',
    hostelBlock: 'Hostel Block C',
    roomNumber: 'Room 118',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
    savioPoints: 310,
    bio: 'Hardware tinkerer, robotics lead & frequent shuttle rider.',
  },

  // --------------------------------------------------------------------------
  // STAFF DEMO ACCOUNTS (Password: admin123)
  // --------------------------------------------------------------------------
  {
    id: 'STAFF01',
    username: 'staff1',
    staffId: 'STF-901',
    name: 'Dr. Rajesh Raman',
    email: 'rajesh.raman@campus.edu',
    role: 'staff',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // admin123
    plainPasswordHint: 'admin123',
    department: 'Campus Operations & Dining Services',
    designation: 'Chief Dining & Facilities Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
    permissions: ['mess_menu_edit', 'laundry_manage', 'marketplace_moderate', 'transit_post'],
    bio: 'Lead coordinator for student welfare, campus dining hygiene, and facility uptime.',
  },
  {
    id: 'STAFF02',
    username: 'staff2',
    staffId: 'STF-902',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi.s@campus.edu',
    role: 'staff',
    passwordHash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', // admin123
    plainPasswordHint: 'admin123',
    department: 'Campus Transit & Hostel Logistics',
    designation: 'Senior Mobility & Hostel Supervisor',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
    permissions: ['mess_menu_edit', 'laundry_manage', 'marketplace_moderate', 'transit_post'],
    bio: 'Manages electric shuttle route schedules, fleet tracking, and hostel asset moderation.',
  },
];

/**
 * Find user by ID, username, or campus ID (case-insensitive)
 * @param {string} identifier
 * @returns {typeof users[0] | undefined}
 */
export function findUserByIdentifier(identifier) {
  if (!identifier) return undefined;
  const clean = identifier.trim().toLowerCase();
  return users.find(u =>
    u.id.toLowerCase() === clean ||
    u.username.toLowerCase() === clean ||
    (u.studentId && u.studentId.toLowerCase() === clean) ||
    (u.staffId && u.staffId.toLowerCase() === clean) ||
    u.email.toLowerCase() === clean
  );
}

