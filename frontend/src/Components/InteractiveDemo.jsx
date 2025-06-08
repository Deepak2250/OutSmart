import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, TrendingUp, Zap, Eye, Target } from 'lucide-react';

const InteractiveDemo = () => {
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    let timer;

    const runSteps = () => {
      setIsAnimating(true);
      setTimeout(() => {
        setStep((prevStep) => {
          if (prevStep === 1) {
            setTimeout(() => setShowResponse(true), 1000);
            return 2;
          } else if (prevStep === 2) {
            return 3;
          } else {
            setShowResponse(false);
            return 1;
          }
        });
        setIsAnimating(false);
        timer = setTimeout(runSteps, 4000);
      }, 800);
    };

    timer = setTimeout(runSteps, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border-4 border-gray-700">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="ml-4 text-gray-400 text-sm font-mono">outsmart.ai - AI Career Analysis</div>
        </div>

        <div className="bg-white rounded-lg p-6 min-h-[400px] relative overflow-hidden">
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h3>
                <p className="text-gray-600">Let our AI analyze your professional profile</p>
              </div>

              <div className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center bg-white">
                <Upload className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-bounce" />
                <p className="text-lg font-semibold text-gray-700 mb-2">Drop your resume here</p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX supported</p>
                <div className="mt-6">
                  <div className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Choose File
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Analysis in Progress</h3>
                <p className="text-gray-600">Processing resume_john_doe.pdf</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  <span className="text-green-800 font-medium">Resume parsed successfully</span>
                </div>

                <div className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                  <span className="text-blue-800 font-medium">Analyzing skills and experience...</span>
                </div>

                <div className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <Zap className="w-6 h-6 text-purple-600 mr-3 animate-pulse" />
                  <span className="text-purple-800 font-medium">Generating career insights...</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Analysis Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 h-3 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
                <p className="text-gray-600">Here's your personalized career report</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm opacity-90">Match Score</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm opacity-90">Skill Gaps</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="font-medium">Frontend Developer Roles</span>
                  </div>
                  <span className="text-green-600 font-semibold">85% Match</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium">Skill Development Plan</span>
                  </div>
                  <span className="text-blue-600 font-semibold">8 weeks</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 text-orange-600 mr-3" />
                    <span className="font-medium">Interview Readiness</span>
                  </div>
                  <span className="text-orange-600 font-semibold">Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;

