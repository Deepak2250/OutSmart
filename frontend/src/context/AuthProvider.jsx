import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isTokenExpired, clearToken } from '../utils/Auth';

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component will wrap around your app and provide auth-related data
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const logout = () => {
    clearToken();
    setIsAuthenticated(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    navigate("/");
  };

  // Initial auth check and interval setup
  useEffect(() => {
    const checkAuthStatus = () => {
      console.log("Checking auth status...");
      const tokenData = getToken();
      
      if (tokenData && !isTokenExpired()) {
        if (!isAuthenticated) {
          console.log("User is authenticated");
          setIsAuthenticated(true);
        }
      } else {
        if (isAuthenticated) {
          console.log("User is no longer authenticated");
          logout();
        }
      }
    };

    // Run initial check immediately
    checkAuthStatus();

    // Only set up interval if authenticated
    if (isAuthenticated) {
      console.log("Setting up token check interval");
      const id = setInterval(checkAuthStatus, 10000);
      setIntervalId(id);
      
      return () => {
        console.log("Cleaning up interval");
        clearInterval(id);
      };
    }
  }, [isAuthenticated]); // Add isAuthenticated as dependency

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};