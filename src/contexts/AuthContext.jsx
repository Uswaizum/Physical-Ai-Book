import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        authenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    authenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
  });

  // Check for existing token on app start
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user_data');

    if (token) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user: user ? JSON.parse(user) : null
        }
      });
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('auth_token', state.token);
      if (state.user) {
        localStorage.setItem('user_data', JSON.stringify(state.user));
      }
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }, [state.token, state.user]);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: data.token,
            user: { id: data.user_id, email }
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: data.detail || 'Login failed'
        });
        return { success: false, error: data.detail || 'Login failed' };
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Network error'
      });
      return { success: false, error: error.message || 'Network error' };
    }
  };

  const signup = async (email, password, name, backgroundInfo) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          background_info: backgroundInfo
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            token: data.token,
            user: { id: data.user_id, email, name }
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: data.detail || 'Signup failed'
        });
        return { success: false, error: data.detail || 'Signup failed' };
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message || 'Network error'
      });
      return { success: false, error: error.message || 'Network error' };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};