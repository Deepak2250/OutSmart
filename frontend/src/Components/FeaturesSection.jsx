import React from 'react';
import { Card, CardContent } from "../Components/ui/card";
import { Badge } from './ui/badge';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  FileText, 
  Award, 
  Users, 
  Zap, 
  BarChart3,
  Calendar,
  Download,
  MessageCircle,
  Shield
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Resume Analysis",
      description: "Advanced machine learning algorithms analyze your resume against industry standards and current job market trends.",
      badge: "Core Feature"
    },
    {
      icon: Target,
      title: "Skill Gap Identification",
      description: "Identify missing skills and competencies that could significantly boost your job prospects.",
      badge: "Smart Analysis"
    },
    {
      icon: Award,
      title: "Interview Readiness Score",
      description: "Get a comprehensive score based on your skills, experience, and certifications for any role.",
      badge: "Pro Feature"
    },
    {
      icon: Users,
      title: "Reverse Job Suggestions",
      description: "Discover roles you're already 80%+ qualified for that you might not have considered.",
      badge: "Smart Matching"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Track your skill development, upload certificates, and monitor your career advancement.",
      badge: "Growth Tool"
    },
    {
      icon: BarChart3,
      title: "Learning Roadmap Generator",
      description: "Get personalized learning paths with free and paid resources for each missing skill.",
      badge: "AI Powered"
    }
  ];

  const getBadgeColor = (badge) => {
    const colors = {
      'Core Feature': 'bg-purple-100 text-purple-800',
      'Smart Analysis': 'bg-blue-100 text-blue-800',
      'Pro Feature': 'bg-indigo-100 text-indigo-800',
      'Smart Matching': 'bg-green-100 text-green-800',
      'Growth Tool': 'bg-orange-100 text-orange-800',
      'AI Powered': 'bg-red-100 text-red-800'
    };
    return colors[badge] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-24 theme-surface relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="bg-purple-100 text-purple-800 mb-6 px-4 py-2 border-none">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black theme-text mb-8 tracking-tight heading-primary">
            Enterprise-Grade Career 
            <span className="block gradient-text heading-primary">
              Intelligence Suite
            </span>
          </h2>
          <p className="text-xl theme-text/70 max-w-4xl mx-auto leading-relaxed text-professional">
            Our comprehensive AI platform delivers deep insights, personalized recommendations, 
            and actionable strategies to accelerate your professional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLeftSlide = index % 2 === 0;
            return (
              <Card 
                key={feature.title}
                className={`theme-border border-2 hover:theme-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group glass-effect ${
                  isLeftSlide ? 'animate-slide-loop-left' : 'animate-slide-loop-right'
                }`}
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge className={`text-xs px-2 py-1 ${getBadgeColor(feature.badge)}`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold theme-text mb-4 group-hover:theme-text/80 transition-colors heading-secondary">
                    {feature.title}
                  </h3>
                  <p className="theme-text/70 leading-relaxed text-professional">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <p className="text-lg theme-text/70 mb-8 text-professional">
            Join thousands of professionals who have transformed their careers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm theme-text">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Updated weekly with latest trends
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              99.9% uptime guaranteed
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Enterprise security certified
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-slide-loop-left"></div>
      <div className="absolute bottom-20 right-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-slide-loop-right"></div>
    </section>
  );
};

export default FeaturesSection;
