import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, isTokenExpired } from '../utils/Auth';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const validateAndFetch = async () => {
      try {
        // 1. Check token validity first
        const { token } = getToken();
        
        if (!token || isTokenExpired()) {
          logout();
          navigate('/', { state: { error: 'Session expired. Please login again.' } });
          return;
        }

        // 2. Fetch profile data
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }

        });
        console.log('Profile data fetched:', response.data);
        
        
        setProfile(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate('/', { state: { error: 'Session expired. Please login again.' } });
        } else {
          setError(err.response?.data?.message || 'Failed to fetch profile');
        }
      } finally {
        setLoading(false);
      }
    };

    validateAndFetch();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center border border-gray-200">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
          {/* Profile Header */}
          <div className="bg-black p-6 text-white">
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-gray-300">Manage your account information</p>
          </div>
          
          {/* Profile Content */}
          <div className="p-6 divide-y divide-gray-200">
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <span className="w-32 text-gray-600">Full Name:</span>
                  <span className="font-medium">{profile?.name || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-32 text-gray-600">Email:</span>
                  <span className="font-medium">{profile?.email}</span>
                </div>
              </div>
            </div>
            
            {/* Account Actions */}
            <div className="py-4">
              <h2 className="text-xl font-semibold text-gray-900">Account Actions</h2>
              <div className="mt-4 space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate('/change-password')}
                  className="bg-white text-black px-6 py-2 rounded-md border border-black hover:bg-gray-100 transition-colors duration-200"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;