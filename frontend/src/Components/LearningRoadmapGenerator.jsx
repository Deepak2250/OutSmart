import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from './ui/button';
import {Badge} from './ui/badge';
import { Progress } from './ui/progess';
import { Calendar, Clock, BookOpen, ExternalLink, Download } from 'lucide-react';

const LearningRoadmapGenerator = ({ roadmaps, weeklyPlan }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [showWeeklyPlan, setShowWeeklyPlan] = useState(false);

  const generateWeeklyPlan = () => {
    setShowWeeklyPlan(true);
    console.log('Generating weekly plan...');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-2 border-gray-100 shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl font-bold text-black flex items-center">
          <BookOpen className="w-5 h-5 mr-3" />
          Learning Roadmap Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Button 
            onClick={generateWeeklyPlan}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold rounded-xl"
          >
            <Calendar className="w-5 h-5 mr-3" />
            Auto-Generate Weekly Study Plan
          </Button>
        </div>

        {showWeeklyPlan && weeklyPlan && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Your 12-Week Study Plan
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyPlan.map((week, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold">Week {week.week}</h4>
                    <Badge variant="outline">{week.hours}h</Badge>
                  </div>
                  <div className="space-y-2">
                    {week.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-sm font-medium text-blue-800">
                        {skill}
                      </div>
                    ))}
                    {week.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="text-xs text-gray-600">
                        • {task}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-8">
          {roadmaps.map((roadmap, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">{roadmap.skill}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {roadmap.estimatedDuration}
                    </span>
                    <Badge className={getPriorityColor(roadmap.priority)}>
                      {roadmap.priority} Priority
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-black mb-3">Recommended Resources</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {roadmap.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-black">{resource.name}</h5>
                        <Badge variant={resource.cost === 'Free' ? 'default' : 'secondary'}>
                          {resource.cost}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">{resource.provider}</span> • {resource.duration} • {resource.difficulty}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(resource.url, '_blank')}
                        className="w-full"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-black mb-3">Practice Projects</h4>
                  <ul className="space-y-2">
                    {roadmap.projects.map((project, projectIndex) => (
                      <li key={projectIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-black mb-3">Learning Milestones</h4>
                  <ul className="space-y-2">
                    {roadmap.milestones.map((milestone, milestoneIndex) => (
                      <li key={milestoneIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <h3 className="text-lg font-semibold text-black mb-4">Export Your Learning Plan</h3>
          <div className="space-x-4">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningRoadmapGenerator;
