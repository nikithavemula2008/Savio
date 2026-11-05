import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../types';
import { users, hashPassword, findUserByIdentifier } from '../data/users';

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (id: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchUserDemo: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'savio_session_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Sync to sessionStorage
  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = async (
    idInput: string,
    passwordInput: string,
    expectedRole: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedId = idInput?.trim();
    if (!trimmedId) {
      return { success: false, error: 'Please enter your Campus ID or Username.' };
    }

    if (!passwordInput) {
      return { success: false, error: 'Please enter your password.' };
    }

    // 1. Look up user record
    const userRecord = findUserByIdentifier(trimmedId) as AuthUser | undefined;
    if (!userRecord) {
      return {
        success: false,
        error: `No ${expectedRole} account registered with ID "${trimmedId}". Check demo credentials below.`,
      };
    }

    // 2. Validate role matches the selector
    if (userRecord.role !== expectedRole) {
      return {
        success: false,
        error: `Role mismatch: "${trimmedId}" is registered as a ${userRecord.role.toUpperCase()}, not ${expectedRole.toUpperCase()}. Please switch role tabs.`,
      };
    }

    // 3. Compute SHA-256 hash using Web Crypto API
    try {
      const computedHash = await hashPassword(passwordInput);

      if (computedHash !== userRecord.passwordHash) {
        return {
          success: false,
          error: 'Incorrect password. Please verify and try again.',
        };
      }

      // Safe user object to store in session (strip sensitive password info)
      const safeUser: AuthUser = {
        id: userRecord.id,
        username: userRecord.username,
        studentId: userRecord.studentId,
        staffId: userRecord.staffId,
        name: userRecord.name,
        email: userRecord.email,
        role: userRecord.role,
        department: userRecord.department,
        academicYear: userRecord.academicYear,
        designation: userRecord.designation,
        hostelBlock: userRecord.hostelBlock,
        roomNumber: userRecord.roomNumber,
        avatarUrl: userRecord.avatarUrl,
        savioPoints: userRecord.savioPoints,
        permissions: userRecord.permissions,
        bio: userRecord.bio,
      };

      setCurrentUser(safeUser);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: 'Cryptographic verification failed. Your browser may not support Web Crypto API.',
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setCurrentUser(null);
  };

  const switchUserDemo = (userId: string) => {
    const found = users.find(u => u.id === userId) as AuthUser | undefined;
    if (found) {
      const safeUser: AuthUser = { ...found };
      delete safeUser.passwordHash;
      setCurrentUser(safeUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchUserDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

