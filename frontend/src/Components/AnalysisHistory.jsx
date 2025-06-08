import React from 'react';
import { FileText, Calendar, TrendingUp, Download, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../Components/ui/card';
import { Button } from '../Components/ui/button';

const AnalysisHistory = ({ limit, detailed = false }) => {
  const analyses = [
    {
      id: 1,
      fileName: 'Resume_v3.pdf',
      date: '2024-01-15',
      score: 85,
      role: 'Senior Software Engineer',
      status: 'completed',
      improvements: ['Added technical skills', 'Improved project descriptions', 'Enhanced education section']
    },
    {
      id: 2,
      fileName: 'Resume_v2.pdf',
      date: '2024-01-10',
      score: 73,
      role: 'Software Engineer',
      status: 'completed',
      improvements: ['Strengthened experience section', 'Added certifications']
    },
    {
      id: 3,
      fileName: 'Resume_v1.pdf',
      date: '2024-01-05',
      score: 68,
      role: 'Software Engineer',
      status: 'completed',
      improvements: ['Basic formatting improvements', 'Added contact information']
    },
    {
      id: 4,
      fileName: 'Initial_Resume.pdf',
      date: '2024-01-01',
      score: 52,
      role: 'Junior Developer',
      status: 'completed',
      improvements: ['Complete resume restructure needed']
    }
  ];

  const displayedAnalyses = limit ? analyses.slice(0, limit) : analyses;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="theme-card border theme-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 theme-text">
          <FileText className="w-5 h-5" />
          <span>Analysis History</span>
          {!detailed && limit && (
            <span className="text-sm font-normal opacity-60">
              ({displayedAnalyses.length} of {analyses.length})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedAnalyses.map((analysis) => (
          <div
            key={analysis.id}
            className="p-4 rounded-lg theme-surface border theme-border hover:shadow-md transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="theme-text font-semibold">{analysis.fileName}</h4>
                  <span className={`text-lg font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}%
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm theme-text opacity-70">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{analysis.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{analysis.role}</span>
                  </div>
                </div>
                {detailed && (
                  <div className="mt-3">
                    <p className="text-sm theme-text opacity-60 mb-2">Key Improvements:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.improvements.map((improvement, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full"
                        >
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="theme-button">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="theme-button">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}

        {!detailed && limit && analyses.length > limit && (
          <Button variant="outline" className="w-full theme-button">
            View All Analyses ({analyses.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
