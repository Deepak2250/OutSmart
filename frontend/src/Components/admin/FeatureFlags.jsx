
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
import { Button } from '../../Components/ui/button';
import { Badge } from '../../Components/ui/badge';
import { Switch } from '../../Components/ui/switch';
import { Flag, Users, Settings, Plus } from 'lucide-react';

const FeatureFlags = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: 'Advanced AI Analysis',
      description: 'Enable advanced AI-powered resume analysis with industry insights',
      enabled: true,
      plans: ['Pro'],
      users: 212,
      category: 'AI Features'
    },
    {
      id: 2,
      name: 'PDF Export',
      description: 'Allow users to export their analysis results as PDF',
      enabled: true,
      plans: ['Basic', 'Pro'],
      users: 957,
      category: 'Export Features'
    },
    {
      id: 3,
      name: 'Career Roadmap',
      description: 'Generate personalized career development roadmaps',
      enabled: false,
      plans: ['Pro'],
      users: 0,
      category: 'Career Tools'
    },
    {
      id: 4,
      name: 'Interview Preparation',
      description: 'Mock interview questions based on resume analysis',
      enabled: true,
      plans: ['Basic', 'Pro'],
      users: 834,
      category: 'Interview Tools'
    },
    {
      id: 5,
      name: 'Industry Benchmarking',
      description: 'Compare resume against industry standards',
      enabled: false,
      plans: ['Pro'],
      users: 0,
      category: 'Analysis Features'
    }
  ]);

  const toggleFeature = (id) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ));
  };

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-6">
      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flag className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Total Features</p>
                <p className="text-2xl font-bold theme-text">{features.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Active Features</p>
                <p className="text-2xl font-bold theme-text">{features.filter(f => f.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Users Affected</p>
                <p className="text-2xl font-bold theme-text">{features.reduce((acc, f) => acc + f.users, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flag className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm theme-text opacity-60">Categories</p>
                <p className="text-2xl font-bold theme-text">{categories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Feature */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold theme-text">Feature Management</h3>
          <p className="theme-text opacity-60">Control feature availability across different plans</p>
        </div>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Feature Flag
        </Button>
      </div>

      {/* Features by Category */}
      {categories.map(category => (
        <Card key={category} className="theme-card">
          <CardHeader>
            <CardTitle className="theme-text">{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.filter(f => f.category === category).map(feature => (
                <div key={feature.id} className="flex items-center justify-between p-4 theme-surface rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium theme-text">{feature.name}</h4>
                      <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                        {feature.enabled ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm theme-text opacity-60 mb-2">{feature.description}</p>
                    <div className="flex items-center space-x-4 text-sm theme-text opacity-70">
                      <span>Plans: {feature.plans.join(', ')}</span>
                      <span>•</span>
                      <span>{feature.users} users affected</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={feature.enabled}
                      onCheckedChange={() => toggleFeature(feature.id)}
                    />
                    <Button variant="outline" size="sm" className="theme-button">
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Feature Usage Analytics */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="theme-text">Feature Usage Analytics</CardTitle>
          <p className="text-sm theme-text opacity-60">Most popular features by user engagement</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features
              .filter(f => f.enabled)
              .sort((a, b) => b.users - a.users)
              .map((feature, index) => (
                <div key={feature.id} className="flex items-center justify-between p-3 theme-surface rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium theme-text">{feature.name}</p>
                      <p className="text-sm theme-text opacity-60">{feature.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold theme-text">{feature.users} users</p>
                    <p className="text-sm theme-text opacity-60">
                      {((feature.users / 2847) * 100).toFixed(1)}% adoption
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureFlags;
