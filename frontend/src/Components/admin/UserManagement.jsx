import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../Components/ui/pagination';
import { Search, Filter, UserX, Mail, Shield, Edit, Trash, Key, ShieldCheck, ShieldOff, Star, X, Check, RotateCw, User } from 'lucide-react';
import { getApiUrl, config , API_ENDPOINTS } from '../../config';
import secureAxios from '../../config/secureaxios';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../Components/ui/dialog';
import { Label } from '../../Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Components/ui/select';
import { encryptData } from '../../utils/CryptoJS';
import { Textarea } from '../ui/textarea';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
const [selectedRole, setSelectedRole] = useState('');
const [reason, setReason] = useState('');
const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await secureAxios.get(`${getApiUrl(API_ENDPOINTS.admin.users)}?page=${currentPage - 1}&size=10`);
      const pageData = response?.data?.data;
      setUsers(pageData?.content || []);
      setTotalPages(pageData?.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch users:', error?.message || error);
      setUsers([]);
      setTotalPages(1);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="text-green-500 theme-border theme-surface">Active</Badge>;
      case 'Suspended':
        return <Badge className="text-red-500 theme-border theme-surface">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan?.toUpperCase()) {
      case 'PRO':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Pro</Badge>;
      case 'BASIC':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Basic</Badge>;
      case 'FREE':
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  const handleUserAction = async (endpoint, payload = {}) => {
    try {
      const encryptedEmail = encryptData(editingUser.email);
      
      const response = await secureAxios.post(
        `${getApiUrl(API_ENDPOINTS.admin.users)}/${endpoint}`,
        {
          encryptedEmail,
          ...payload
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
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
                <TableHead className="theme-text theme-border">Last Login</TableHead>
                <TableHead className="theme-text">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 theme-text">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-medium theme-text">{user.name}</p>
                          <p className="text-sm theme-text opacity-60">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(user.planType ? user.planType : 'N/A')}</TableCell>
                    <TableCell>{getStatusBadge(user.suspended ? 'Suspended' : 'Active')}</TableCell>
                    <TableCell>
                      <span className="font-medium theme-text">{user.totalUsed}</span>
                    </TableCell>
                    <TableCell>
                      <span className="theme-text">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : '—'}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 cursor-pointer"
                                onClick={() => {
                                  setEditingUser(user);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit User</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send Email</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                <UserX className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Suspend User</TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 cursor-pointer">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete User</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)} />
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

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={(open) => {
  if (!open) {
    setError(null);
    setSuccess(null);
    setSelectedPlan('');
    setSelectedRole('');
    setReason('');
  }
  setIsEditModalOpen(open);
}}>
  <DialogContent className="sm:max-w-[600px] w-[95vw] bg-white border border-black max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-black flex items-center gap-2">
        <User className="h-5 w-5" />
        Manage User: {editingUser?.name || editingUser?.email}
      </DialogTitle>
    </DialogHeader>

    {/* Success Message */}
    {success && (
      <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-md flex items-center mb-4">
        <Check className="h-4 w-4 mr-2" />
        {success}
      </div>
    )}

    {/* Error Message */}
    {error && (
      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center mb-4">
        <X className="h-4 w-4 mr-2" />
        {error}
      </div>
    )}

    <div className="grid gap-4 py-4">
      {/* Reason Input */}
      <div className="space-y-2">
        <Label className="text-black font-medium">Reason for Action*</Label>
        <Textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setError(null);
            setSuccess(null);
          }}
          placeholder="Enter reason for this action (required)"
          className="w-full border border-black text-black bg-white"
          required
        />
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-black font-medium">Email</Label>
          <div className="px-3 py-2 bg-white rounded-md border border-black text-black">
            {editingUser?.email || ''}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-black font-medium">Status</Label>
          <div className="px-3 py-2 rounded-md border border-black text-black bg-white">
            {editingUser?.suspended ? 'Suspended' : 'Active'}
          </div>
        </div>
      </div>

      {/* Plan Management */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <Label className="text-black font-medium text-lg">Plan Management</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-black font-medium">Current Plan</Label>
            <div className="px-3 py-2 bg-white rounded-md border border-black text-black">
              {editingUser?.planType || 'None'}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-black font-medium">Assign New Plan</Label>
            <div className="flex gap-2">
              <Select
                value={selectedPlan}
                onValueChange={(value) => setSelectedPlan(value)}
              >
                <SelectTrigger className="flex-1 bg-white border border-black text-black">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-black">
                  <SelectItem value="FREE">Free</SelectItem>
                  <SelectItem value="BASIC">Basic</SelectItem>
                  <SelectItem value="PRO">Pro</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={async () => {
                  if (!reason) {
                    setError("Reason is required");
                    return;
                  }
                  try {
                    await handleUserAction('plans/assign', { 
                      planType: selectedPlan,
                      reason 
                    });
                    setSuccess(`${selectedPlan} plan assigned successfully`);
                    setSelectedPlan('');
                    setReason('');
                    fetchUsers();
                  } catch (err) {
                    setError(err.message);
                  }
                }}
                disabled={!selectedPlan || !reason}
                className="bg-black text-white hover:bg-gray-800"
              >
                Assign
              </Button>
            </div>
          </div>
        </div>
        <Button
          onClick={async () => {
            if (!reason) {
              setError("Reason is required");
              return;
            }
            try {
              await handleUserAction('plans/revoke', {
                planType: editingUser.planType,
                reason
              });
              setSuccess(`Plan removed successfully`);
              setReason('');
              fetchUsers();
            } catch (err) {
              setError(err.message);
            }
          }}
          disabled={!editingUser?.planType || !reason}
          variant="outline"
          className="w-full border border-black text-black hover:bg-gray-100"
        >
          Remove Current Plan
        </Button>
      </div>

      {/* Role Management */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <Label className="text-black font-medium text-lg">Role Management</Label>
        
        {/* Current Roles */}
        <div className="space-y-2">
          <Label className="text-black font-medium">Current Roles</Label>
          <div className="flex flex-wrap gap-2">
            {editingUser?.roles?.length > 0 ? (
              editingUser.roles.map((role, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-black">
                  <span className="text-black">{role.replace('ROLE_', '')}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                    onClick={async () => {
                      if (!reason) {
                        setError("Reason is required");
                        return;
                      }
                      try {
                        await handleUserAction('remove-role', { 
                          role: role,
                          reason 
                        });
                        setSuccess(`${role.replace('ROLE_', '')} role removed successfully`);
                        setReason('');
                        fetchUsers();
                      } catch (err) {
                        setError(err.message);
                      }
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500">No roles assigned</div>
            )}
          </div>
        </div>

        {/* Assign New Role */}
        <div className="space-y-2">
          <Label className="text-black font-medium">Assign New Role</Label>
          <div className="flex gap-2">
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value)}
            >
              <SelectTrigger className="flex-1 bg-white border border-black text-black">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-black">
                {['ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_USER']
                  .filter(role => !editingUser?.roles?.includes(role))
                  .map(role => (
                    <SelectItem key={role} value={role}>
                      {role.replace('ROLE_', '')}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button
              onClick={async () => {
                if (!reason) {
                  setError("Reason is required");
                  return;
                }
                try {
                  await handleUserAction('assign-role', { 
                    role: selectedRole,
                    reason 
                  });
                  setSuccess(`${selectedRole.replace('ROLE_', '')} role assigned successfully`);
                  setSelectedRole('');
                  setReason('');
                  fetchUsers();
                } catch (err) {
                  setError(err.message);
                }
              }}
              disabled={!selectedRole || !reason}
              className="bg-black text-white hover:bg-gray-800"
            >
              Assign
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <Label className="text-black font-medium text-lg">Quick Actions</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            onClick={async () => {
              if (!reason) {
                setError("Reason is required");
                return;
              }
              try {
                await handleUserAction('reset-password', { reason });
                setSuccess("Password reset initiated successfully");
                setReason('');
              } catch (err) {
                setError(err.message);
              }
            }}
            disabled={!reason}
            variant="outline"
            className="border border-black text-black hover:bg-gray-100"
          >
            <Key className="h-4 w-4 mr-2" />
            Reset Password
          </Button>
          <Button
            onClick={async () => {
              if (!reason) {
                setError("Reason is required");
                return;
              }
              try {
                await handleUserAction(
                  editingUser?.suspended ? 'unsuspend' : 'suspend', 
                  { reason }
                );
                setSuccess(`User ${editingUser?.suspended ? 'unsuspended' : 'suspended'} successfully`);
                setReason('');
                fetchUsers();
              } catch (err) {
                setError(err.message);
              }
            }}
            disabled={!reason}
            variant="outline"
            className="border border-black text-black hover:bg-gray-100"
          >
            {editingUser?.suspended ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Unsuspend
              </>
            ) : (
              <>
                <X className="h-4 w-4 mr-2" />
                Suspend
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
};

export default UserManagement;