const ENV = import.meta.env.VITE_ENV || 'development';

const configs = {
  development: {
    apiUrl: 'http://localhost:8080',
    googleClientId: '816584322810-trqogmgnpdabc5ctevfr0mtjj3ps5odc.apps.googleusercontent.com',
    googleRedirectUri: 'http://localhost:5173/google/callback',

    githubClientId: 'Ov23ctewJObTVHnZKcNh',
    githubRedirectUri: 'http://localhost:5173/github/callback',
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL,
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    googleRedirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,

    githubClientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    githubRedirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
  }
};

export const config = configs[ENV];

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    googleCallback: '/auth/google/callback',
    githubCallback: '/auth/github/callback',
    logout: '/auth/logout'
  },
  user: {
    profile: '/api/user/profile',
    updateProfile: '/api/user/profile/update',
    requestOTP: '/api/auth/request-otp',
    verifyOTP: '/api/auth/verify-otp',
    preferences: '/api/user/preferences'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => `${config.apiUrl}${endpoint}`;

// Auth related configurations
export const AUTH_CONFIG = {
  tokenKey: 'jwt_token',
  tokenExpiryKey: 'jwt_expiry',
  cookieMaxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// Request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};
