import React from 'react';
import { Zap } from 'lucide-react';

const LoadingAnimation = ({ 
  message = "Analyzing your resume...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12" role="status" aria-live="polite">
      {/* Animated Logo */}
      <div className="relative mb-6">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-lg animate-pulse`}>
          <Zap className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
        </div>

        {/* Rotating Ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-black rounded-full animate-spin`}></div>

        {/* Pulsing Dots */}
        <div className="absolute -top-2 -right-2">
          <div className="w-3 h-3 bg-black rounded-full animate-ping"></div>
        </div>
        <div className="absolute -bottom-2 -left-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className={`${textSizeClasses[size]} font-semibold text-black mb-2 animate-pulse`}>
        {message}
      </div>

      {/* Progress Dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${dot * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Progress Steps */}
      <div className="mt-6 text-sm text-gray-600 text-center max-w-md">
        <div className="space-y-2">
          <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Parsing resume content...</span>
          </div>
          <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>Analyzing skills and experience...</span>
          </div>
          <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '3s' }}>
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Generating personalized insights...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
