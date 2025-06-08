import React, { useState } from 'react';
import { 
  Users, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Flag, 
  Mail, 
  Shield,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Badge } from '../Components/ui/badge';
import UserManagement from '../Components/admin/UserManagement';
import PlanManagement from '../Components/admin/PlanManagement';
import Analytics from '../Components/admin/Analytics';
import FeatureFlags from '../Components/admin/FeatureFlags';
import Support from '../Components/admin/Support';
import AdminSettings from '../Components/admin/AdminSettings';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('analytics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'plans', label: 'Plans & Subscriptions', icon: CreditCard },
    { id: 'features', label: 'Feature Flags', icon: Flag },
    { id: 'support', label: 'Support', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'plans':
        return <PlanManagement />;
      case 'analytics':
        return <Analytics />;
      case 'features':
        return <FeatureFlags />;
      case 'support':
        return <Support />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="min-h-screen theme-bg flex">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 theme-surface border-r theme-border flex flex-col`}>
        <div className="p-4 border-b theme-border">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 logo-color rounded-lg flex items-center justify-center text-white font-bold">O</div>
                <div>
                  <h1 className="font-bold theme-text">Outsmart Admin</h1>
                  <p className="text-xs theme-text opacity-60">Dashboard</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="theme-text"
            >
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-purple-600 text-white'
                    : 'theme-text hover:bg-purple-100 dark:hover:bg-purple-900/30'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t theme-border">
          <Button
            variant="ghost"
            className="w-full flex items-center space-x-3 px-3 py-2 theme-text hover:bg-red-100 dark:hover:bg-red-900/30"
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="theme-surface border-b theme-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold theme-text capitalize">
                {activeSection === 'users' ? 'User Management' :
                 activeSection === 'plans' ? 'Plans & Subscriptions' :
                 activeSection === 'analytics' ? 'Analytics Dashboard' :
                 activeSection === 'features' ? 'Feature Flags' :
                 activeSection === 'support' ? 'Support Center' :
                 'Admin Settings'}
              </h2>
              <p className="theme-text opacity-60">
                {activeSection === 'users' ? 'Manage user accounts and permissions' :
                 activeSection === 'plans' ? 'Manage subscription plans and billing' :
                 activeSection === 'analytics' ? 'Monitor platform metrics and usage' :
                 activeSection === 'features' ? 'Control feature availability' :
                 activeSection === 'support' ? 'Handle customer support requests' :
                 'Configure admin settings and security'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="theme-text">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="theme-text">
                <Search className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">A</div>
                <div className="text-sm">
                  <p className="font-medium theme-text">Admin User</p>
                  <p className="theme-text opacity-60">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
