import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://certichain-backend-73wy.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('certichain_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('certichain_token');
      localStorage.removeItem('certichain_institution');
      window.location.href = '/institution/login';
    }
    return Promise.reject(error);
  }
);

export default api;
