import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Progress } from './ui/progess';
import { Badge } from './ui/badge';
import { Star, TrendingUp, Award } from 'lucide-react';

const InterviewReadinessScore = ({ score, breakdown, recommendations }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <Card className="border-2 border-gray-100 shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl font-bold text-black flex items-center">
          <Award className="w-5 h-5 mr-3" />
          Interview Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className={`text-6xl font-black mb-4 ${getScoreColor(score)}`}>
            {score}%
          </div>
          <Badge
            variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}
            className="text-lg px-4 py-2"
          >
            {getScoreLabel(score)}
          </Badge>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Skills Match</span>
              <span className="font-semibold">{breakdown.skills}%</span>
            </div>
            <Progress value={breakdown.skills} className="h-3" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Experience Level</span>
              <span className="font-semibold">{breakdown.experience}%</span>
            </div>
            <Progress value={breakdown.experience} className="h-3" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">Certifications</span>
              <span className="font-semibold">{breakdown.certifications}%</span>
            </div>
            <Progress value={breakdown.certifications} className="h-3" />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-black mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Recommendations to Improve
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewReadinessScore;
