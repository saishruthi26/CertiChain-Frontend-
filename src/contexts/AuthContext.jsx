import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [institution, setInstitution] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('certichain_token');
      if (token) {
        try {
          // Validate token with backend
          const response = await api.get('/auth/me');
          setInstitution(response.data.data);
        } catch (error) {
          // Token invalid or expired — clear storage
          localStorage.removeItem('certichain_token');
          localStorage.removeItem('certichain_institution');
          setInstitution(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, institutionData) => {
    localStorage.setItem('certichain_token', token);
    localStorage.setItem('certichain_institution', JSON.stringify(institutionData));
    setInstitution(institutionData);
  };

  const logout = () => {
    localStorage.removeItem('certichain_token');
    localStorage.removeItem('certichain_institution');
    setInstitution(null);
    window.location.href = '/institution/login';
  };

  return (
    <AuthContext.Provider value={{
      institution,
      isLoading,
      isAuthenticated: !!institution,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
