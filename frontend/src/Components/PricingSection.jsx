import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Check, Star, Upload, Crown, Zap } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "FREE",
      price: "₹0",
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      period: "forever",
      description: "Perfect for trying out",
      features: [
        "1 resume analysis",
        "Basic skill gap identification",
        "15 predefined job roles",
        "Community support"
      ],
      buttonText: "Start Free",
      popular: false,
      className: "theme-border",
      uploadLimit: 1
    },
    {
      name: "BASIC",
      price: "₹100",
      icon: <Upload className="w-5 h-5 text-blue-600" />,
      period: "one-time",
      description: "For active job seekers",
      features: [
        "10 resume analyses",
        "Advanced skill gap analysis",
        "30 predefined job roles",
        "Email support",
        "Priority processing"
      ],
      buttonText: "Choose Basic",
      popular: true,
      className: "theme-border shadow-xl scale-105",
      uploadLimit: 10
    },
    {
      name: "PRO",
      price: "₹150",
      icon: <Crown className="w-5 h-5 text-purple-600" />,
      period: "one-time",
      description: "For serious career growth",
      features: [
        "20 resume analyses",
        "Premium skill insights",
        "All job roles",
        "Priority support",
        "Advanced analytics",
        "Personalized feedback"
      ],
      buttonText: "Choose Pro",
      popular: false,
      className: "theme-border",
      uploadLimit: 20
    }
  ];

  const handlePlanSelection = (plan) => {
    console.log(`Selected plan: ${plan.name}`);
    // Add your plan selection logic here
  };

  return (
    <section className="py-16 sm:py-24 theme-surface">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black theme-text mb-4 sm:mb-6 tracking-tight heading-primary">
            Choose Your Plan
          </h2>
          <p className="text-lg sm:text-xl theme-text opacity-70 max-w-3xl mx-auto leading-relaxed text-professional">
            Start with our free tier or upgrade for more analyses. Pay once, use anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl theme-card ${plan.className} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6 sm:pb-8">
                <div className="flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold theme-text mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-black theme-text">{plan.price}</span>
                  <span className="theme-text opacity-60 ml-2 text-sm sm:text-base">/{plan.period}</span>
                </div>
                <p className="theme-text opacity-70 text-sm sm:text-base">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="theme-text opacity-80 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelection(plan)}
                  className={`w-full py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base ${
                    plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'theme-surface theme-text theme-border border-2 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center text-xs sm:text-sm theme-text opacity-60">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-2" />
              One-time payment
            </div>
            <div className="flex items-center text-xs sm:text-sm theme-text opacity-60">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-2" />
              Use anytime
            </div>
            <div className="flex items-center text-xs sm:text-sm theme-text opacity-60">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-2" />
              Secure payment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;