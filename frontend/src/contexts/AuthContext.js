import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  LOADING: 'LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOADING:
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: AUTH_ACTIONS.LOADING, payload: true });
        
        // Check authentication status using cookies
        const authResult = await authAPI.checkAuth();
        
        if (authResult.isAuthenticated) {
          dispatch({ 
            type: AUTH_ACTIONS.LOGIN_SUCCESS, 
            payload: authResult.user 
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
        }
      } catch (error) {
        // User is not authenticated or cookies are invalid
        console.log('Auth check failed:', error.message);
        dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []); // Empty dependency array - run only once

  const checkAuthStatus = async () => {
    try {
      const authResult = await authAPI.checkAuth();
      
      if (authResult.isAuthenticated) {
        dispatch({ 
          type: AUTH_ACTIONS.LOGIN_SUCCESS, 
          payload: authResult.user 
        });
        return authResult;
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        return { isAuthenticated: false, user: null };
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { isAuthenticated: false, user: null };
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      const response = await authAPI.login(credentials);
      
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: response.user 
      });
      
      toast.success('Login successful!');
      return response;
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.SET_ERROR, 
        payload: error.message || 'Login failed' 
      });
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      const response = await authAPI.register(userData);
      
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: response.user 
      });
      
      toast.success('Registration successful!');
      return response;
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.SET_ERROR, 
        payload: error.message || 'Registration failed' 
      });
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      toast.success('Logged out successfully');
    } catch (error) {
      // Even if logout fails on server, clear local state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      console.error('Logout error:', error);
    }
  };
  const forgotPassword = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: true });
      const response = await authAPI.forgotPassword(email);
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      toast.success(response.message);
      return response;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      toast.error(error.message || 'Failed to send OTP');
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: true });
      const response = await authAPI.verifyOTP(email, otp);
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      toast.success(response.message);
      return response;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      toast.error(error.message || 'OTP verification failed');
      throw error;
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: true });
      const response = await authAPI.resetPassword(email, otp, newPassword);
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      toast.success(response.message);
      return response;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOADING, payload: false });
      toast.error(error.message || 'Password reset failed');
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };
  const value = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    clearError,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
