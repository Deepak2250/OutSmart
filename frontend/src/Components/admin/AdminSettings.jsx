import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Switch } from '../../Components/ui/switch';
import { Shield, Users, Key, Bell, Download, AlertTriangle } from 'lucide-react';

const AdminSettings = () => {
  const adminUsers = [
    { name: 'Admin User', email: 'admin@outsmart.com', role: 'Super Admin', lastLogin: '2024-01-08 09:15' },
    { name: 'Support Lead', email: 'support@outsmart.com', role: 'Support Admin', lastLogin: '2024-01-07 16:30' },
    { name: 'Analytics Manager', email: 'analytics@outsmart.com', role: 'Analytics Admin', lastLogin: '2024-01-06 11:45' }
  ];

  const auditLogs = [
    { action: 'User Suspended', admin: 'Admin User', target: 'user@example.com', timestamp: '2024-01-08 10:30' },
    { action: 'Plan Updated', admin: 'Support Lead', target: 'Basic Plan', timestamp: '2024-01-08 09:15' },
    { action: 'Feature Toggled', admin: 'Admin User', target: 'Advanced AI Analysis', timestamp: '2024-01-07 14:20' },
    { action: 'Bulk Email Sent', admin: 'Support Lead', target: '1,234 users', timestamp: '2024-01-07 11:05' }
  ];

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Admin Users</p>
                <p className="text-2xl font-bold theme-text">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm theme-text opacity-60">2FA Enabled</p>
                <p className="text-2xl font-bold theme-text">100%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Security Alerts</p>
                <p className="text-2xl font-bold theme-text">0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Audit Logs</p>
                <p className="text-2xl font-bold theme-text">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Users Management */}
      <Card className="theme-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="theme-text">Admin Users</CardTitle>
              <p className="text-sm theme-text opacity-60">Manage administrator accounts and permissions</p>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Add Admin User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.map((admin, index) => (
              <div key={index} className="flex items-center justify-between p-4 theme-surface rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium theme-text">{admin.name}</p>
                    <p className="text-sm theme-text opacity-60">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge variant={admin.role === 'Super Admin' ? 'default' : 'secondary'}>
                      {admin.role}
                    </Badge>
                    <p className="text-sm theme-text opacity-60 mt-1">Last: {admin.lastLogin}</p>
                  </div>
                  <Button variant="outline" size="sm" className="theme-button">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Security Settings</CardTitle>
          <p className="text-sm theme-text opacity-60">Configure security and access controls</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                title: 'Require 2FA for all admins',
                desc: 'Force two-factor authentication for admin accounts',
                checked: true
              },
              {
                title: 'Session timeout',
                desc: 'Auto-logout after 2 hours of inactivity',
                checked: true
              },
              {
                title: 'IP whitelist',
                desc: 'Restrict admin access to specific IP addresses',
                checked: false
              },
              {
                title: 'Audit logging',
                desc: 'Log all admin actions for security monitoring',
                checked: true
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="font-medium theme-text">{item.title}</p>
                  <p className="text-sm theme-text opacity-60">{item.desc}</p>
                </div>
                <Switch defaultChecked={item.checked} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card className="theme-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="theme-text">Recent Audit Logs</CardTitle>
              <p className="text-sm theme-text opacity-60">Track admin actions and system changes</p>
            </div>
            <Button variant="outline" className="theme-button">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 theme-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <div>
                    <p className="font-medium theme-text">{log.action}</p>
                    <p className="text-sm theme-text opacity-60">by {log.admin} • Target: {log.target}</p>
                  </div>
                </div>
                <span className="text-sm theme-text opacity-60">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Database', status: 'Healthy', color: 'green-500' },
              { label: 'API Services', status: 'Operational', color: 'green-500' },
              { label: 'Storage', status: '87% Used', color: 'yellow-500' }
            ].map((sys, i) => (
              <div key={i} className="text-center p-4 theme-surface rounded-lg">
                <div className={`w-3 h-3 bg-${sys.color} rounded-full mx-auto mb-2`}></div>
                <p className="font-medium theme-text">{sys.label}</p>
                <p className="text-sm theme-text opacity-60">{sys.status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="theme-card border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="theme-text flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            Danger Zone
          </CardTitle>
          <p className="text-sm theme-text opacity-60">Irreversible and destructive actions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
              <div>
                <p className="font-medium theme-text">Reset all user data</p>
                <p className="text-sm theme-text opacity-60">This will permanently delete all user accounts and data</p>
              </div>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                Reset System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;