import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../Components/ui/table';
import { Search, Filter, Mail, User, Clock, AlertCircle } from 'lucide-react';

const Support = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    {
      id: 1,
      subject: 'Unable to upload resume',
      user: 'Rahul Sharma',
      email: 'rahul@email.com',
      priority: 'High',
      status: 'Open',
      created: '2024-01-08 10:30',
      category: 'Technical',
      message: 'I am trying to upload my resume but getting an error message. The file is in PDF format and under 5MB.'
    },
    {
      id: 2,
      subject: 'Payment not reflected',
      user: 'Priya Patel',
      email: 'priya@email.com',
      priority: 'Medium',
      status: 'In Progress',
      created: '2024-01-07 14:15',
      category: 'Billing',
      message: 'I made a payment for the Basic plan but my account still shows Free plan. Payment ID: #TXN123456'
    },
    {
      id: 3,
      subject: 'Analysis results not showing',
      user: 'Amit Kumar',
      email: 'amit@email.com',
      priority: 'Low',
      status: 'Resolved',
      created: '2024-01-06 09:45',
      category: 'Technical',
      message: 'After uploading resume, the analysis is stuck at loading. Been waiting for 30 minutes.'
    }
  ];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">High</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Open</Badge>;
      case 'In Progress':
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">In Progress</Badge>;
      case 'Resolved':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Open Tickets</p>
                <p className="text-2xl font-bold theme-text">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm theme-text opacity-60">In Progress</p>
                <p className="text-2xl font-bold theme-text">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm theme-text opacity-60">High Priority</p>
                <p className="text-2xl font-bold theme-text">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Avg Response Time</p>
                <p className="text-2xl font-bold theme-text">2.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <Card className="theme-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="theme-text">Support Tickets</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="theme-button">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="theme-button">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="theme-text">Subject</TableHead>
                  <TableHead className="theme-text">User</TableHead>
                  <TableHead className="theme-text">Priority</TableHead>
                  <TableHead className="theme-text">Status</TableHead>
                  <TableHead className="theme-text">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className={`cursor-pointer ${selectedTicket === ticket.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium theme-text">{ticket.subject}</p>
                        <p className="text-sm theme-text opacity-60">{ticket.category}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="theme-text">{ticket.user}</p>
                        <p className="text-sm theme-text opacity-60">{ticket.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                    <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm theme-text">{ticket.created}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Ticket Details */}
        <Card className="theme-card">
          <CardHeader>
            <CardTitle className="theme-text">
              {selectedTicket ? 'Ticket Details' : 'Select a Ticket'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-4">
                {(() => {
                  const ticket = tickets.find(t => t.id === selectedTicket);
                  if (!ticket) return null;

                  return (
                    <>
                      <div>
                        <h4 className="font-medium theme-text mb-2">{ticket.subject}</h4>
                        <div className="flex gap-2 mb-4">
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>

                      <div className="p-3 theme-surface rounded-lg">
                        <p className="text-sm theme-text opacity-60 mb-2">From: {ticket.user}</p>
                        <p className="text-sm theme-text opacity-60 mb-2">{ticket.email}</p>
                        <p className="text-sm theme-text opacity-60 mb-3">{ticket.created}</p>
                        <p className="theme-text">{ticket.message}</p>
                      </div>

                      <div className="space-y-2">
                        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                          Reply to Ticket
                        </Button>
                        <Button variant="outline" className="w-full theme-button">
                          Impersonate User
                        </Button>
                        <Button variant="outline" className="w-full theme-button">
                          Change Status
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <p className="theme-text opacity-60 text-center py-8">
                Select a ticket from the list to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Create New Ticket
            </Button>
            <Button variant="outline" className="theme-button">
              Export Tickets
            </Button>
            <Button variant="outline" className="theme-button">
              Bulk Update Status
            </Button>
            <Button variant="outline" className="theme-button">
              Send Announcements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
