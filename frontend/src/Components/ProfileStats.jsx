import React from 'react';
import { TrendingUp, FileText, Award, Target } from 'lucide-react';
import { Card, CardContent } from '../Components/ui/card';

const ProfileStats = () => {
  const stats = [
    {
      title: 'Resume Score',
      value: '85%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Analyses Done',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      title: 'Skills Improved',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Award,
      color: 'text-purple-500'
    },
    {
      title: 'Goals Achieved',
      value: '4/6',
      change: '+1',
      trend: 'up',
      icon: Target,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="theme-card border theme-border hover:shadow-lg transition-all duration-200 hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="theme-text opacity-60 text-sm font-medium">{stat.title}</p>
                <p className="theme-text text-2xl font-bold mt-1">{stat.value}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className={`w-3 h-3 ${stat.color}`} />
                  <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
                </div>
              </div>
              <div className="p-3 rounded-full theme-surface">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileStats;
