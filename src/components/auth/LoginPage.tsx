import React, { useState } from 'react';
import {
  Zap,
  GraduationCap,
  ShieldAlert,
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import { users } from '../../data/users';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [role, setRole] = useState<UserRole>('student');
  const [identifier, setIdentifier] = useState('student1');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await login(identifier, password, role);
      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setErrorMessage(null);
    if (newRole === 'student') {
      setIdentifier('student1');
      setPassword('password123');
    } else {
      setIdentifier('staff1');
      setPassword('admin123');
    }
  };

  const fillQuickDemo = (demoId: string, demoRole: UserRole, demoPass: string) => {
    setRole(demoRole);
    setIdentifier(demoId);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-slate-100 transition-colors relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#4F46F5]/15 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4F46F5] to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                SAVIO
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300">
                Portal
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Your Campus. Simplified.
            </p>
          </div>
        </div>

        {/* Theme Switcher Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-all shadow-sm"
          aria-label="Toggle color theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </header>

      {/* Main Login Workspace */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-8 transition-all">
            {/* Header info */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/40 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Single Sign-On Authentication</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome to SAVIO
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select your role and sign in with your campus credentials.
              </p>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-2 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  role === 'student'
                    ? 'bg-white dark:bg-[#1A2234] text-[#4F46F5] dark:text-indigo-400 shadow-md shadow-indigo-500/10'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className={`w-4 h-4 ${role === 'student' ? 'text-[#4F46F5]' : 'text-slate-400'}`} />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('staff')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                  role === 'staff'
                    ? 'bg-white dark:bg-[#1A2234] text-[#4F46F5] dark:text-indigo-400 shadow-md shadow-indigo-500/10'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${role === 'staff' ? 'text-[#4F46F5]' : 'text-slate-400'}`} />
                <span>Staff & Admin</span>
              </button>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in zoom-in-95"
              >
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="leading-snug">{errorMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ID Input */}
              <div>
                <label
                  htmlFor="campus-id"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  {role === 'student' ? 'Student ID or Username' : 'Staff ID or Username'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="campus-id"
                    type="text"
                    required
                    value={identifier}
                    onChange={e => {
                      setIdentifier(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder={role === 'student' ? 'e.g. student1 or 22BCE1048' : 'e.g. staff1 or STF-901'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46F5] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Input with Show/Hide toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="campus-password"
                    className="block text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] font-semibold text-[#4F46F5] dark:text-indigo-400 hover:underline flex items-center gap-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="campus-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46F5] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#4F46F5] hover:bg-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 group"
              >
                {isSubmitting ? (
                  <span>Verifying credentials...</span>
                ) : (
                  <>
                    <span>Sign in as {role === 'student' ? 'Student' : 'Staff'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Helper */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Quick Demo Access (Click to autofill)
                </span>
              </div>

              <div className="space-y-2">
                {/* Students demo pills */}
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                    Student Accounts (Pass: <code className="text-indigo-500">password123</code>):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {users
                      .filter(u => u.role === 'student')
                      .map(u => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => fillQuickDemo(u.username, 'student', 'password123')}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 transition-all flex items-center gap-1.5"
                          title={`Log in as ${u.name} (${u.username})`}
                        >
                          <img src={u.avatarUrl} alt={u.name} className="w-3.5 h-3.5 rounded-full object-cover" />
                          <span>{u.name.split(' ')[0]}</span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Staff demo pills */}
                <div className="pt-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                    Staff Accounts (Pass: <code className="text-indigo-500">admin123</code>):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {users
                      .filter(u => u.role === 'staff')
                      .map(u => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => fillQuickDemo(u.username, 'staff', 'admin123')}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50 transition-all flex items-center gap-1.5"
                          title={`Log in as ${u.name} (${u.username})`}
                        >
                          <img src={u.avatarUrl} alt={u.name} className="w-3.5 h-3.5 rounded-full object-cover" />
                          <span>{u.name.split(' ')[0]} (Staff)</span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="text-center mt-5 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Web Crypto SHA-256 Verified Session
            </span>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              SAVIO Platform • Hosted on GitHub Pages
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] text-slate-400 relative z-10">
        SAVIO &copy; 2026. All campus utility modules protected.
      </footer>
    </div>
  );
};

