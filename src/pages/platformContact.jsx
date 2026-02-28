import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta?.env?.VITE_API_BASE_URL || 'https://reservation-xynh.onrender.com',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token') || localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const PlatformContext = createContext({
  platformContact: 'AI Reservation & CRM System',
  setPlatformContact: () => {},
});

export const PlatformProvider = ({ children }) => {
  const [platformContact, setPlatformContact] = useState('AI Reservation & CRM System');

  useEffect(() => {
    const fetchPlatformContact = async () => {
      try {
        const res = await api.get('/api/v1/admin/platform-contact');
        const name =
          res.data?.platform_contact ??
          res.data?.platform_email ??
          res.data?.platform_address ??
          res.data?.data?.platform_contact;
        if (name) setPlatformContact(name);
      } catch {
        // Silently fall back to default if fetch fails
      }
    };
    fetchPlatformContact();
  }, []);

  return (
    <PlatformContext.Provider value={{ platformContact, setPlatformContact }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);

export default PlatformContext;