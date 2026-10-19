import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AppDataProvider } from './context/AppDataContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { DashboardPage } from './pages/DashboardPage';
import { LaundryPage } from './pages/LaundryPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { TransitPage } from './pages/TransitPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppDataProvider>
          <HashRouter>
            <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-slate-100 transition-colors">
              {/* Header */}
              <Header />

              {/* Main Workspace: Sidebar + Content */}
              <div className="flex-1 flex max-w-7xl w-full mx-auto">
                <Sidebar />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-full overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/laundry" element={<LaundryPage />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/transit" element={<TransitPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>

              {/* Mobile Bottom Navigation */}
              <BottomNav />
            </div>
          </HashRouter>
        </AppDataProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
