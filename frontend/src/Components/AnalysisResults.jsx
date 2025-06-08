import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from './ui/button';
import { FileText, Download, BookOpen, ExternalLink } from 'lucide-react';

const AnalysisResults = ({ isVisible }) => {
  const [showPdfOption, setShowPdfOption] = useState(false);

  if (!isVisible) return null;

  const mockAnalysis = {
    currentSkills: ['JavaScript', 'React', 'HTML/CSS', 'Git'],
    missingSkills: ['Node.js', 'TypeScript', 'AWS', 'Docker', 'Testing Frameworks'],
    skillGaps: [
      {
        skill: 'Backend Development',
        importance: 'High',
        description: 'Knowledge of Node.js and Express.js is crucial for full-stack development'
      },
      {
        skill: 'Cloud Technologies',
        importance: 'Medium',
        description: 'AWS or Azure experience is highly valued in modern development roles'
      },
      {
        skill: 'Testing',
        importance: 'High',
        description: 'Unit and integration testing skills are essential for quality code'
      }
    ],
    learningPaths: [
      {
        skill: 'Node.js',
        freeResources: [
          { name: 'Node.js Official Docs', url: '#' },
          { name: 'freeCodeCamp Node.js Course', url: '#' }
        ],
        paidResources: [
          { name: 'Complete Node.js Developer Course (Udemy)', url: '#' },
          { name: 'Node.js Path (Pluralsight)', url: '#' }
        ]
      },
      {
        skill: 'AWS',
        freeResources: [
          { name: 'AWS Free Tier', url: '#' },
          { name: 'AWS Training and Certification', url: '#' }
        ],
        paidResources: [
          { name: 'AWS Certified Developer Course', url: '#' },
          { name: 'A Cloud Guru AWS Courses', url: '#' }
        ]
      }
    ]
  };

  const handleGeneratePdf = () => {
    setShowPdfOption(true);
    // Implement your PDF generation logic here
    setTimeout(() => {
      setShowPdfOption(false);
      alert('PDF report has been generated and downloaded!');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 mt-12">
      {/* Analysis Overview */}
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-2xl font-bold text-black flex items-center">
            <FileText className="w-6 h-6 mr-3" />
            Resume Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4">✅ Current Skills Identified</h3>
              <div className="space-y-2">
                {mockAnalysis.currentSkills.map((skill, index) => (
                  <div key={index} className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                    <span className="text-green-800 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4">❌ Missing Skills</h3>
              <div className="space-y-2">
                {mockAnalysis.missingSkills.map((skill, index) => (
                  <div key={index} className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                    <span className="text-red-800 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Gaps Analysis */}
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-black">Detailed Skill Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {mockAnalysis.skillGaps.map((gap, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-black">{gap.skill}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    gap.importance === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {gap.importance} Priority
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">{gap.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <Card className="border-2 border-gray-100 shadow-lg">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-black flex items-center">
            <BookOpen className="w-5 h-5 mr-3" />
            Recommended Learning Paths
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            {mockAnalysis.learningPaths.map((path, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-black mb-6">{path.skill}</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-3 flex items-center">🆓 Free Resources</h5>
                    <div className="space-y-2">
                      {path.freeResources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {resource.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-3 flex items-center">💰 Premium Resources</h5>
                    <div className="space-y-2">
                      {path.paidResources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {resource.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PDF Generation */}
      <Card className="border-2 border-black shadow-lg">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold text-black mb-4">Export & Continue</h3>
          <p className="text-gray-600 mb-6">
            Generate a comprehensive PDF report with all your analysis results and learning recommendations, or analyze another resume.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleGeneratePdf}
              disabled={showPdfOption}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              {showPdfOption ? (
                <>
                  <div className="animate-spin w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-3" />
                  Generate PDF Report
                </>
              )}
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              <FileText className="w-5 h-5 mr-3" />
              Analyze Another Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
