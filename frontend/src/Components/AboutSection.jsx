import React from 'react';
import { Card, CardContent } from '../Components/ui/card';
import { Badge } from '../Components/ui/badge';
import { Users, Target, Award, Lightbulb, Heart, Globe } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { number: "100K+", label: "Professionals Empowered", icon: Users },
    { number: "99%", label: "Success Rate", icon: Target },
    { number: "500+", label: "Enterprise Clients", icon: Award },
    { number: "2M+", label: "Resumes Analyzed", icon: Globe }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation Leadership",
      description:
        "We leverage cutting-edge AI and machine learning to provide insights that traditional career services simply cannot match.",
    },
    {
      icon: Heart,
      title: "Human-Centered Design",
      description:
        "Every feature is designed with one goal: accelerating professional growth and unlocking human potential.",
    },
    {
      icon: Target,
      title: "Results-Driven Impact",
      description:
        "We measure success by yours - helping professionals land better roles, faster promotions, and higher compensation.",
    },
  ];

  return (
    <section className="py-24 theme-surface relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="theme-primary mb-6 px-4 py-2 border-none">
            About OutSmart
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black theme-text mb-8 tracking-tight heading-primary">
            Pioneering the Future of
            <span className="block gradient-text heading-primary">
              Career Intelligence
            </span>
          </h2>
          <p className="text-xl theme-text/70 max-w-4xl mx-auto leading-relaxed text-professional">
            Founded by industry veterans and AI researchers, OutSmart represents
            the convergence of advanced technology and deep career expertise,
            creating unprecedented opportunities for professional advancement.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 theme-primary rounded-2xl flex items-center justify-center shadow-lg animate-glow">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black theme-text mb-2 heading-secondary">
                  {stat.number}
                </div>
                <div className="theme-text font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Our Story */}
        <div
          className="max-w-4xl mx-auto mb-20 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Card className="theme-border border-2 shadow-lg glass-effect">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold theme-text mb-6 heading-secondary">
                Our Mission
              </h3>
              <div className="space-y-6 text-lg theme-text/70 leading-relaxed text-professional">
                <p>
                  In an era where career trajectories evolve at unprecedented
                  speed, traditional guidance methods have become obsolete.
                  OutSmart emerged from recognizing this critical gap - the need
                  for intelligent, data-driven career intelligence that adapts
                  to individual strengths and market dynamics.
                </p>
                <p>
                  Our founding team, comprising former executives from Google,
                  Microsoft, and Meta, alongside leading career strategists and
                  AI researchers, built OutSmart to democratize access to
                  enterprise-level career intelligence.
                </p>
                <p>
                  Today, OutSmart powers career advancement for over 100,000
                  professionals across 60+ countries, helping them secure roles
                  at top-tier companies and achieve unprecedented career growth.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                className="theme-border border-2 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in glass-effect"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 theme-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold theme-text mb-4 heading-secondary">
                    {value.title}
                  </h4>
                  <p className="theme-text/70 leading-relaxed text-professional">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Add floating orbs */}
      <div className="absolute top-20 left-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-slide-loop-left"></div>
      <div className="absolute bottom-20 right-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-slide-loop-right"></div>
    </section>
  );
};

export default AboutSection;
