import axios from 'axios';

// Create axios instance with default config
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle authentication errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Only redirect on 401 if we're not on login/register pages and not checking auth
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = ['/login', '/register', '/forgot-password'].includes(currentPath);
      const isCheckingAuth = error.config?.url?.includes('/auth/me');
      
      // Don't redirect if we're already on auth pages or just checking auth status
      if (!isAuthPage && !isCheckingAuth) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      // Don't store anything in localStorage - cookies handle authentication
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      // Don't store anything in localStorage - cookies handle authentication
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get current user (checks if user is authenticated via cookies)
  getMe: async () => {
    try {
      const response = await API.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user data' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await API.post('/auth/logout');
      // Cookies are cleared by the server
      return response.data;
    } catch (error) {
      // Even if logout fails on server, we should still redirect
      throw error.response?.data || { message: 'Logout failed' };
    }
  },
  // Forgot password - Send OTP
  forgotPassword: async (email) => {
    try {
      const response = await API.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send OTP' };
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await API.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'OTP verification failed' };
    }
  },

  // Reset password with OTP
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await API.post('/auth/reset-password', { email, otp, newPassword });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  },

  // Google login URL
  getGoogleLoginUrl: () => {
    return `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`;
  },

  // Check if user is authenticated by making a request to /me endpoint
  checkAuth: async () => {
    try {
      const response = await API.get('/auth/me');
      return {
        isAuthenticated: true,
        user: response.data.user,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }  },
};

export default API;


