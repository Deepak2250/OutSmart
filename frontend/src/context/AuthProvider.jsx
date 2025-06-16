import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenExpired, clearToken } from '../utils/Auth';
import { toast } from "sonner";
import { getApiUrl, API_ENDPOINTS, DEFAULT_HEADERS } from '../config';
import { jwtDecode } from "jwt-decode";



// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component will wrap around your app and provide auth-related data
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [role, setRole] = useState([]);
  const {token} = getToken();

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
    setRole(null);
    setUser(null);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    navigate("/");
    toast.success("Logged out successfully");
  };

  const fetchUserProfile = async (jwtToken) => {
    try {
      const response = await fetch(getApiUrl(API_ENDPOINTS.user.profile), {
        method: 'GET',
        headers: {
          ...DEFAULT_HEADERS,
          'Authorization': `Bearer ${jwtToken}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401 || response.status === 403) {
          throw new Error(errorData.message || 'Authentication failed. Please login again.');
        }
        throw new Error(errorData.message || 'Failed to fetch user profile');
      }

      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error(error.message);
      if (error.message.includes('authentication') || error.message.includes('failed')) {
        logout();
      }
      return false;
    }
  };

  // Initial auth check and interval setup
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("Checking auth status...");
      
      if (token && !isTokenExpired()) {
        const decoded = jwtDecode(token);
        setRole(prev => (prev !== decoded.roles ? decoded.roles : prev)); // ✅ only if changed
        if (!isAuthenticated || !user) {
          console.log("Token valid, fetching profile...");
          await fetchUserProfile(token);
        }
      } else {
        if (isAuthenticated) {
          console.log("Token expired or invalid");
          toast.error("Session expired. Please login again.");
          logout();
        }
      }
      setIsLoading(false);
    };

    // Run initial check immediately
    checkAuthStatus();

    // Set up interval to check token expiration every minute
    const id = setInterval(checkAuthStatus, 60000);
    setIntervalId(id);
    
    return () => {
      console.log("Cleaning up interval");
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated]); // Add isAuthenticated as dependency

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        fetchUserProfile,
        role
      }}
    >
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