import React, { useState, useEffect } from 'react';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import { SpiderSenseProvider } from './context/SpiderSenseContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'login' | 'admin'

  useEffect(() => {
    // Support URL query / path checking for /admin
    if (window.location.pathname === '/admin') {
      setCurrentView(isAuthenticated ? 'admin' : 'login');
    } else if (!isAuthenticated && currentView === 'admin') {
      setCurrentView('home');
    }
  }, [isAuthenticated, currentView]);

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setCurrentView('admin');
    } else {
      setCurrentView('login');
    }
  };

  return (
    <>
      {currentView === 'home' && (
        <HomePage onOpenAdmin={handleOpenAdmin} />
      )}
      
      {currentView === 'login' && (
        <AdminLoginPage
          onBackToHome={() => setCurrentView('home')}
          onSuccess={() => setCurrentView('admin')}
        />
      )}

      {currentView === 'admin' && (
        <AdminDashboardPage onBackToHome={() => setCurrentView('home')} />
      )}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PortfolioDataProvider>
        <SpiderSenseProvider>
          <AppContent />
        </SpiderSenseProvider>
      </PortfolioDataProvider>
    </AuthProvider>
  );
}
