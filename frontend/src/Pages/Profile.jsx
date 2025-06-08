import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trophy, Target, TrendingUp, Calendar, FileText, Crown, Edit2, Star, Zap } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../Components/ui/card';
import ThemeSwitcher from '../Components/ThemeSwitcher';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'sonner';
import { getToken, isTokenExpired } from '../utils/Auth';

const MOCK_ANALYSIS_HISTORY = [
  {
    id: 1,
    resumeName: "Software_Engineer_2024.pdf",
    date: "2024-02-15",
    score: 85,
    matchedRole: "Senior Software Engineer",
    status: "Analyzed",
    insights: "Strong technical skills, needs more leadership experience"
  },
  {
    id: 2,
    resumeName: "Frontend_Developer.pdf",
    date: "2024-02-10",
    score: 92,
    matchedRole: "Lead Frontend Developer",
    status: "Analyzed",
    insights: "Excellent frontend expertise, good project examples"
  },
  {
    id: 3,
    resumeName: "Tech_Lead_Resume.pdf",
    date: "2024-02-01",
    score: 78,
    matchedRole: "Technical Team Lead",
    status: "Analyzed",
    insights: "Good technical background, enhance leadership section"
  }
];

const PlanBadge = ({ planType }) => {
  if (!planType) return null;

  const badgeStyles = {
    FREE: {
      container: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
      icon: <Zap className="w-3 h-3" />,
      label: "Free Tier"
    },
    BASIC: {
      container: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      icon: <Trophy className="w-3 h-3" />,
      label: "Basic Plan"
    },
    PRO: {
      container: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      icon: <Crown className="w-3 h-3" />,
      label: "Pro Plan"
    }
  };

  const style = badgeStyles[planType];
  if (!style) return null;

  return (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${style.container}`}>
      {style.icon}
      <span>{style.label}</span>
    </div>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState('');
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    const validateAndFetch = async () => {
      try {
        const { token } = getToken();
        
        if (!token || isTokenExpired()) {
          logout();
          navigate('/', { state: { error: 'Session expired. Please login again.' } });
          return;
        }

        const response = await fetch('http://localhost:8080/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log('Profile data fetched:', data);
        setProfile(data);
        setBio(data.bio || '');
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

  const handleBioSave = async () => {
    try {
      // Add API call to save bio
      toast.success('Profile updated successfully');
      setIsEditingBio(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen theme-bg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen theme-bg">
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
    <div className="min-h-screen theme-bg">
      <header className="theme-surface border-b theme-border sticky top-0 z-40 backdrop-blur-lg bg-opacity-80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 theme-text hover:opacity-80 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="theme-button" onClick={() => navigate('/')}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Resume
              </Button>
              <ThemeSwitcher />
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="theme-button"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header with Extended Info */}
          <div className="mb-8 p-6 theme-surface rounded-xl border theme-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {profile?.name ? profile.name[0].toUpperCase() : 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold theme-text">{profile?.name || 'User'}</h1>
                    {profile?.planType && <PlanBadge planType={profile?.planType} />}
                  </div>
                  <p className="theme-text opacity-60 mt-1">{profile?.email}</p>
                  <div className="mt-2">
                    {isEditingBio ? (
                      <div className="space-y-2">
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full p-2 border theme-border rounded-md theme-surface"
                          rows="3"
                          placeholder="Tell us about yourself..."
                        />
                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={handleBioSave}>Save</Button>
                          <Button variant="outline" onClick={() => setIsEditingBio(false)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2">
                        <p className="theme-text opacity-80 text-sm">
                          {bio || 'Add a bio to tell others about yourself...'}
                        </p>
                        <button
                          onClick={() => setIsEditingBio(true)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/forgot-password')}
                  className="theme-button"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b theme-border">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'history', label: 'Analysis History', icon: FileText }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent theme-text opacity-70 hover:opacity-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Premium Status Card */}
                  {(!profile?.isActive || profile?.planType === 'FREE') && (
                    <Card className="theme-card border theme-border bg-gradient-to-r from-purple-500 to-pink-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">Upgrade Your Plan</h3>
                            <p className="text-white opacity-90">
                              {profile?.planType === 'FREE' 
                                ? 'Upgrade to BASIC or PRO for more resume uploads and features!'
                                : 'Subscribe to start using premium features!'}
                            </p>
                          </div>
                          <Button
                            onClick={() => navigate('/premium')}
                            className="bg-white text-purple-600 hover:bg-gray-100"
                          >
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Upload Limits Card */}
                  <Card className="theme-card border theme-border">
                    <CardHeader>
                      <CardTitle className="theme-text flex items-center space-x-2">
                        <Upload className="w-5 h-5" />
                        <span>Resume Upload Limits</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="theme-text">Uploads Used</span>
                            <span className="theme-text font-medium">
                              {profile?.totalUsed}/{profile?.uploadLimit}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${profile?.uploadLimit ? (profile.totalUsed/profile.uploadLimit) * 100 : 0}%` 
                              }}
                            />
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg theme-surface border theme-border">
                              <p className="text-sm theme-text opacity-60">Total Limit</p>
                              <p className="text-xl font-bold theme-text">{profile?.uploadLimit || 0}</p>
                            </div>
                            <div className="p-3 rounded-lg theme-surface border theme-border">
                              <p className="text-sm theme-text opacity-60">Remaining</p>
                              <p className="text-xl font-bold theme-text">{profile?.remainingChances || 0}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm theme-text opacity-60">
                          {!profile?.isActive 
                            ? 'Subscribe to start uploading resumes!'
                            : profile?.planType === 'FREE'
                            ? 'Upgrade to BASIC or PRO for more uploads!'
                            : profile?.planType === 'BASIC'
                            ? 'Upgrade to PRO for even more uploads!'
                            : 'You have our highest tier plan!'}
                        </p>
                        {profile?.remainingChances === 0 && (
                          <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              You've used all your uploads! Upgrade your plan to continue analyzing resumes.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profile Stats */}
                  <Card className="theme-card border theme-border">
                    <CardHeader>
                      <CardTitle className="theme-text">Profile Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg theme-surface">
                        <p className="text-sm theme-text opacity-60">Total Analyses</p>
                        <p className="text-2xl font-bold theme-text">12</p>
                      </div>
                      <div className="p-4 rounded-lg theme-surface">
                        <p className="text-sm theme-text opacity-60">Average Score</p>
                        <p className="text-2xl font-bold theme-text">85%</p>
                      </div>
                      <div className="p-4 rounded-lg theme-surface">
                        <p className="text-sm theme-text opacity-60">Job Matches</p>
                        <p className="text-2xl font-bold theme-text">24</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="theme-card border theme-border">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 theme-text">
                        <Calendar className="w-5 h-5" />
                        <span>Recent Activity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { action: 'Resume analyzed', time: '2 hours ago', type: 'analysis' },
                        { action: 'Profile updated', time: '1 day ago', type: 'update' },
                        { action: 'Goal achieved', time: '3 days ago', type: 'achievement' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg theme-surface">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === 'analysis'
                                ? 'bg-blue-500'
                                : activity.type === 'update'
                                ? 'bg-green-500'
                                : 'bg-purple-500'
                            }`}
                          />
                          <div className="flex-1">
                            <p className="theme-text font-medium text-sm">{activity.action}</p>
                            <p className="theme-text opacity-60 text-xs">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6">
                {MOCK_ANALYSIS_HISTORY.map((analysis) => (
                  <Card key={analysis.id} className="theme-card border theme-border">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                          <h3 className="font-medium theme-text">{analysis.resumeName}</h3>
                          <p className="text-sm theme-text opacity-60">{analysis.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm">
                            {analysis.status}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{analysis.score}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium theme-text">Matched Role</p>
                          <p className="theme-text opacity-80">{analysis.matchedRole}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium theme-text">Key Insights</p>
                          <p className="theme-text opacity-80">{analysis.insights}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;