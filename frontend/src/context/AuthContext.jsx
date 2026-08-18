import React, { createContext, useContext, useState, useEffect } from 'react';
import API, { loginAdminApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sakala_admin_token') || null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const res = await API.get('/auth/me');
        if (res.data?.success) {
          setAdmin(res.data.admin);
        } else {
          logout();
        }
      } catch (err) {
        // If offline or invalid token, keep fallback admin state if token exists
        setAdmin({ username: 'Admin', role: 'admin' });
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    const data = await loginAdminApi({ username, password });
    if (data.success && data.token) {
      localStorage.setItem('sakala_admin_token', data.token);
      setToken(data.token);
      setAdmin(data.admin);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('sakala_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, authLoading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
