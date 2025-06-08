import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, MapPin, Clock, ExternalLink } from 'lucide-react';

const ReverseJobSuggestions = ({ suggestions }) => {
  return (
    <Card className="border-2 border-gray-100 shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl font-bold text-black flex items-center">
          <CheckCircle className="w-5 h-5 mr-3" />
          You're Already Qualified For These Roles
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Jobs where you meet 80%+ of the requirements
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          {suggestions.map((job, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">{job.title}</h3>
                  <p className="text-gray-600 font-medium">{job.company}</p>
                </div>
                <Badge 
                  variant="default" 
                  className="bg-green-100 text-green-800 text-lg px-3 py-1"
                >
                  {job.matchPercentage}% Match
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {job.experience}
                </div>
              </div>

              <div className="mb-4">
                <span className="font-semibold text-green-700">Salary: </span>
                <span className="text-gray-800">{job.salary}</span>
              </div>

              {job.missingSkills.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Skills to strengthen (optional):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.missingSkills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => window.open(job.jobUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Job Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReverseJobSuggestions;
