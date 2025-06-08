
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Plus, Edit, Trash, Users, CreditCard, TrendingUp } from 'lucide-react';

const PlanManagement = () => {
  const plans = [
    {
      id: 1,
      name: 'Free Trial',
      price: 0,
      currency: '₹',
      period: 'forever',
      analyses: 1,
      users: 1890,
      revenue: 0,
      features: [
        'Basic skill gap identification',
        'Resume score analysis',
        'Simple improvement suggestions',
        'Community support'
      ],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Basic Plan',
      price: 100,
      currency: '₹',
      period: 'one-time',
      analyses: 10,
      users: 745,
      revenue: 74500,
      features: [
        'Everything in Free Trial',
        'Detailed skill gap analysis',
        'Interview readiness score',
        'Personalized improvement tips',
        'PDF export of results',
        'Email support',
        '30-day access'
      ],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Pro Plan',
      price: 200,
      currency: '₹',
      period: 'one-time',
      analyses: 20,
      users: 212,
      revenue: 42400,
      features: [
        'Everything in Basic Plan',
        'Advanced AI recommendations',
        'Industry-specific insights',
        'Career roadmap generation',
        'Priority support',
        'Unlimited PDF exports',
        '60-day access',
        'Early access to new features'
      ],
      status: 'Active'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Total Plans</p>
                <p className="text-2xl font-bold theme-text">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Total Subscribers</p>
                <p className="text-2xl font-bold theme-text">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Monthly Revenue</p>
                <p className="text-2xl font-bold theme-text">₹1,16,900</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Conversion Rate</p>
                <p className="text-2xl font-bold theme-text">34%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Plan Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold theme-text">Subscription Plans</h3>
          <p className="theme-text opacity-60">Manage your pricing plans and features</p>
        </div>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="theme-card relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl theme-text">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold theme-text">
                      {plan.currency}{plan.price}
                    </span>
                    <span className="theme-text opacity-60 ml-2">/{plan.period}</span>
                  </div>
                </div>
                {getStatusBadge(plan.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Plan Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 theme-surface rounded-lg">
                  <p className="text-sm theme-text opacity-60">Analyses</p>
                  <p className="text-xl font-bold theme-text">{plan.analyses}</p>
                </div>
                <div className="text-center p-3 theme-surface rounded-lg">
                  <p className="text-sm theme-text opacity-60">Users</p>
                  <p className="text-xl font-bold theme-text">{plan.users}</p>
                </div>
              </div>

              {/* Revenue */}
              <div className="text-center p-3 theme-surface rounded-lg">
                <p className="text-sm theme-text opacity-60">Total Revenue</p>
                <p className="text-xl font-bold text-green-600">₹{plan.revenue.toLocaleString()}</p>
              </div>

              {/* Features */}
              <div>
                <p className="font-medium theme-text mb-3">Features:</p>
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start text-sm theme-text opacity-80">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-sm theme-text opacity-60">
                      +{plan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 theme-button">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 theme-button text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan Analytics */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Plan Performance</CardTitle>
          <p className="text-sm theme-text opacity-60">Revenue and user distribution across plans</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 theme-surface rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {plan.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium theme-text">{plan.name}</p>
                    <p className="text-sm theme-text opacity-60">{plan.users} users • {plan.analyses} analyses each</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold theme-text">₹{plan.revenue.toLocaleString()}</p>
                  <p className="text-sm theme-text opacity-60">
                    {((plan.users / plans.reduce((acc, p) => acc + p.users, 0)) * 100).toFixed(1)}% of users
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="theme-button">
              Assign Plans to Users
            </Button>
            <Button variant="outline" className="theme-button">
              Bulk Price Update
            </Button>
            <Button variant="outline" className="theme-button">
              Export Plan Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanManagement;
