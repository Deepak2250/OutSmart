import React from 'react';
import { Zap } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 theme-bg z-50 flex items-center justify-center animate-loading-screen">
      <div className="text-center px-4">
        {/* Animated Logo */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 logo-color rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" />

          {/* Pulsing Dots */}
          <div className="absolute -top-2 -right-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full animate-ping" />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl sm:text-3xl font-bold theme-text mb-4 animate-pulse heading-secondary">
          OutSmart
        </h2>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-6">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${dot * 0.2}s` }}
            />
          ))}
        </div>

        <p className="theme-text opacity-70 text-base sm:text-lg text-professional max-w-sm mx-auto">
          Initializing AI Career Intelligence Platform...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
