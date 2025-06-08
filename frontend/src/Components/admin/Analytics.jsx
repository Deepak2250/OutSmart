import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Badge } from '../../Components/ui/badge';
import { Button } from '../../Components/ui/button';
import { Users, FileText, TrendingUp, Download, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const dailyActiveUsers = [
    { date: '2024-01-01', users: 120 },
    { date: '2024-01-02', users: 145 },
    { date: '2024-01-03', users: 167 },
    { date: '2024-01-04', users: 134 },
    { date: '2024-01-05', users: 189 },
    { date: '2024-01-06', users: 203 },
    { date: '2024-01-07', users: 178 },
  ];

  const resumeAnalyses = [
    { month: 'Jan', analyses: 1250 },
    { month: 'Feb', analyses: 1456 },
    { month: 'Mar', analyses: 1789 },
    { month: 'Apr', analyses: 2134 },
    { month: 'May', analyses: 2456 },
    { month: 'Jun', analyses: 2789 },
  ];

  const planDistribution = [
    { name: 'Free', value: 60, color: '#8b5cf6' },
    { name: 'Basic', value: 30, color: '#a855f7' },
    { name: 'Pro', value: 10, color: '#c084fc' },
  ];

  const topUsers = [
    { name: 'Rahul Sharma', email: 'rahul@email.com', analyses: 45, plan: 'Pro' },
    { name: 'Priya Patel', email: 'priya@email.com', analyses: 38, plan: 'Basic' },
    { name: 'Amit Kumar', email: 'amit@email.com', analyses: 32, plan: 'Pro' },
    { name: 'Sneha Singh', email: 'sneha@email.com', analyses: 28, plan: 'Basic' },
    { name: 'Vikash Gupta', email: 'vikash@email.com', analyses: 24, plan: 'Free' },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          title: 'Total Users',
          value: '2,847',
          icon: <Users className="h-4 w-4 text-purple-600" />,
          change: '+12.5%',
          desc: 'from last month'
        }, {
          title: 'Resumes Analyzed',
          value: '12,456',
          icon: <FileText className="h-4 w-4 text-purple-600" />,
          change: '+8.3%',
          desc: 'from last month'
        }, {
          title: 'Monthly Revenue',
          value: '₹4,23,800',
          icon: <TrendingUp className="h-4 w-4 text-purple-600" />,
          change: '+15.2%',
          desc: 'from last month'
        }, {
          title: 'Active Today',
          value: '567',
          icon: <Calendar className="h-4 w-4 text-purple-600" />,
          change: '+5.7%',
          desc: 'from yesterday'
        }].map((card, i) => (
          <Card key={i} className="theme-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium theme-text">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold theme-text">{card.value}</div>
              <p className="text-xs theme-text opacity-60">
                <span className="text-green-600">{card.change}</span> {card.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="theme-card">
          <CardHeader>
            <CardTitle className="theme-text">Daily Active Users</CardTitle>
            <p className="text-sm theme-text opacity-60">User activity over the last 7 days</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyActiveUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardHeader>
            <CardTitle className="theme-text">Resume Analyses</CardTitle>
            <p className="text-sm theme-text opacity-60">Monthly analysis trends</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resumeAnalyses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="analyses" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="theme-card">
          <CardHeader>
            <CardTitle className="theme-text">Plan Distribution</CardTitle>
            <p className="text-sm theme-text opacity-60">User distribution by plan type</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={planDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {planDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {planDistribution.map((plan, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                    <span className="text-sm theme-text">{plan.name}</span>
                  </div>
                  <span className="text-sm font-medium theme-text">{plan.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="theme-text">Most Active Users</CardTitle>
              <p className="text-sm theme-text opacity-60">Users with highest resume analyses</p>
            </div>
            <Button variant="outline" size="sm" className="theme-button">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg theme-surface">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium theme-text">{user.name}</p>
                      <p className="text-sm theme-text opacity-60">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold theme-text">{user.analyses} analyses</p>
                    <Badge variant={
                      user.plan === 'Pro' ? 'default' :
                      user.plan === 'Basic' ? 'secondary' : 'outline'
                    }>
                      {user.plan}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Export Reports</CardTitle>
          <p className="text-sm theme-text opacity-60">Download comprehensive analytics reports</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              User Analytics CSV
            </Button>
            <Button variant="outline" className="theme-button">
              <Download className="h-4 w-4 mr-2" />
              Revenue Report
            </Button>
            <Button variant="outline" className="theme-button">
              <Download className="h-4 w-4 mr-2" />
              Usage Statistics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
