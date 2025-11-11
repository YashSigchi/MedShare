import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Medicine API
export const medicineAPI = {
  upload: (formData: FormData) =>
    api.post('/medicines/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getMyUploads: () => api.get('/medicines/myuploads'),
  getPending: () => api.get('/medicines/pending'),
  approve: (id: string, data: { status: string; verificationNotes?: string }) =>
    api.patch(`/medicines/${id}/approve`, data),
  getMarketplace: (params?: { search?: string; expiryBefore?: string; condition?: string }) =>
    api.get('/medicines/marketplace', { params }),
};

// Verify API
export const verifyAPI = {
  getPending: () => api.get('/verify/pending'),
  verify: (id: string, data: { status: string; verificationNotes?: string }) =>
    api.patch(`/verify/${id}`, data),
};

// Marketplace API
export const marketplaceAPI = {
  getAll: (params?: { search?: string; expiryBefore?: string; condition?: string }) =>
    api.get('/marketplace', { params }),
  request: (id: string) => api.post(`/marketplace/request/${id}`),
};

// Notification API
export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

// AI API
export const aiAPI = {
  validateExpiry: (formData: FormData) =>
    api.post('/ai/validate-expiry', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Get base URL for serving static files (images)
export const getImageUrl = (path: string) => {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  const baseURL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  return `${baseURL}${path}`;
};

export default api;

