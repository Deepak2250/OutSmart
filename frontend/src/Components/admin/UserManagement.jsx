
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../Components/ui/pagination';
import { Search, Filter, UserX, Mail, Shield, Edit, Trash } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul@email.com',
      plan: 'Pro',
      status: 'Active',
      lastLogin: '2024-01-08',
      analyses: 45,
      joinDate: '2023-12-01'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya@email.com',
      plan: 'Basic',
      status: 'Active',
      lastLogin: '2024-01-07',
      analyses: 23,
      joinDate: '2024-01-15'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit@email.com',
      plan: 'Free',
      status: 'Suspended',
      lastLogin: '2024-01-05',
      analyses: 1,
      joinDate: '2024-01-20'
    },
    {
      id: 4,
      name: 'Sneha Singh',
      email: 'sneha@email.com',
      plan: 'Basic',
      status: 'Active',
      lastLogin: '2024-01-08',
      analyses: 15,
      joinDate: '2024-01-10'
    },
    {
      id: 5,
      name: 'Vikash Gupta',
      email: 'vikash@email.com',
      plan: 'Pro',
      status: 'Active',
      lastLogin: '2024-01-06',
      analyses: 32,
      joinDate: '2023-11-28'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'Pro':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Pro</Badge>;
      case 'Basic':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Basic</Badge>;
      case 'Free':
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card className="theme-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 theme-text opacity-50" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border theme-border rounded-lg theme-surface theme-text focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-4 py-2 border theme-border rounded-lg theme-surface theme-text focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
              </select>
              <Button variant="outline" className="theme-button">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold theme-text">2,847</div>
              <p className="text-sm theme-text opacity-60">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2,698</div>
              <p className="text-sm theme-text opacity-60">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">149</div>
              <p className="text-sm theme-text opacity-60">Suspended</p>
            </div>
          </CardContent>
        </Card>
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">567</div>
              <p className="text-sm theme-text opacity-60">New This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">User Management</CardTitle>
          <p className="text-sm theme-text opacity-60">Manage user accounts, plans, and permissions</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="theme-text">User</TableHead>
                <TableHead className="theme-text">Plan</TableHead>
                <TableHead className="theme-text">Status</TableHead>
                <TableHead className="theme-text">Analyses</TableHead>
                <TableHead className="theme-text">Last Login</TableHead>
                <TableHead className="theme-text">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium theme-text">{user.name}</p>
                        <p className="text-sm theme-text opacity-60">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <span className="font-medium theme-text">{user.analyses}</span>
                  </TableCell>
                  <TableCell>
                    <span className="theme-text">{user.lastLogin}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <UserX className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              <Mail className="h-4 w-4 mr-2" />
              Send Bulk Email
            </Button>
            <Button variant="outline" className="theme-button">
              <Shield className="h-4 w-4 mr-2" />
              Export User Data
            </Button>
            <Button variant="outline" className="theme-button">
              <UserX className="h-4 w-4 mr-2" />
              Bulk Suspend
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
