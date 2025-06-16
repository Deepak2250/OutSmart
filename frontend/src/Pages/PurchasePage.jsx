import React, { useState } from 'react';
import { Check, Star, Upload, Crown, Zap, Shield, BarChart2, Rocket } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Badge } from '../Components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useToast } from '../hooks/use-toast';
import { getToken } from '../utils/Auth';
import { getApiUrl } from '../config';
import { API_ENDPOINTS } from '../config';
import ActionDialog from '../Components/ActionDialog';

const PricingSection = () => {
  const navigate = useNavigate();
  const { user , isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('purchase'); // 'purchase' | 'cancel' | 'delete'
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = [
    {
      name: "FREE TIER",
      price: "₹0",
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      period: "forever",
      description: "Perfect for trying our AI analysis",
      features: [
        "1 comprehensive resume analysis",
        "Basic skill gap identification",
        "ATS compatibility check",
        "Instant formatting feedback",
        "Community support"
      ],
      buttonText: "Analyze My Resume",
      popular: false,
      className: "theme-border",
      uploadLimit: 1
    },
    {
      name: "BASIC",
      price: "₹100",
      icon: <Upload className="w-5 h-5 text-blue-600" />,
      period: "one-time",
      description: "For serious applicants",
      features: [
        "10 in-depth analyses",
        "Advanced ATS optimization",
        "Interview probability score",
        "Personalized improvement roadmap",
        "Priority processing",
        "PDF report exports"
      ],
      buttonText: "Get Job Ready →",
      popular: true,
      className: "theme-border shadow-xl scale-105",
      uploadLimit: 10,
      ribbon: "MOST POPULAR"
    },
    {
      name: "PRO",
      price: "₹150",
      icon: <Crown className="w-5 h-5 text-purple-600" />,
      period: "one-time",
      description: "Maximum interview potential",
      features: [
        "20 premium analyses",
        "Industry-specific keyword optimization",
        "Competitor benchmarking",
        "Career growth recommendations",
        "Priority email support",
        "Unlimited PDF reports",
        "60-day access"
      ],
      buttonText: "Boost My Career →",
      popular: false,
      className: "theme-border",
      uploadLimit: 20,
      ribbon: "BEST VALUE"
    }
  ];

  const handleDialogConfirm = async (plan) => {
    if(!isAuthenticated){
      toast({
        title: 'Please login to purchase a plan',
        variant: 'destructive',
      });
      return;
    }
    const { remainingChances, active, planType } = user;
  
    // 🟢 FREE TIER Handling
    if (planType === 'FREE TIER') {
      if (remainingChances <= 0) {
        toast({
          title: 'Free plan exhausted. Please upgrade.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Free access granted. Redirecting...',
        variant: 'success',
      });
      navigate('/');
      return;
    }
  
    // 🔴 Prevent multiple paid plans or same plan re-purchase
    if (active && planType !== 'FREE') {
      if (plan.name === planType) {
        toast({
          title: `You already have the ${plan.name} plan active.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: `You already have an active ${planType} plan. Please cancel it before switching.`,
          variant: 'destructive',
        });
      }
      return;
    }
  
    setLoading(true);
    setDialogOpen(true);
  
    try {
      const {token} = getToken();
      const response = await fetch(getApiUrl(API_ENDPOINTS.plan.purchase), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planType: plan.name }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      toast({
        title: `${plan.name} Plan Activated!`,
        variant: 'success',
      });
      navigate('/');
    } catch (error) {
      const errorMsg = error.message;
  
      if (errorMsg.includes('already have an active plan')) {
        toast({
          title: 'You already have an active plan. Please cancel it before purchasing a new one.',
          variant: 'destructive',
        });
      } else if (errorMsg.includes('already have this plan')) {
        toast({
          title: 'This plan is already active.',
          variant: 'destructive',
        });
      } else if (errorMsg.includes('Downgrade') || errorMsg.includes('not allowed')) {
        toast({
          title: 'Downgrade or re-purchase of the same plan is not allowed.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: errorMsg || 'Something went wrong. Try again.',
          variant: 'destructive',
        });
      }
    }
    setLoading(false);
    setDialogOpen(false);
  };
  

  return (
    <><div className="min-h-screen theme-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 theme-text hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl font-bold">OutSmart</span>
          </button>
          <div className="flex items-center space-x-2 text-sm theme-text opacity-80">
            <Shield className="w-4 h-4" />
            <span>Secure Payment</span>
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <Badge className="mb-4 black text-purple-800 dark:bg-purple-900/30 dark:black">
              <Rocket className="w-4 h-4 mr-1" />
              87% GET MORE INTERVIEWS
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black theme-text mb-4 sm:mb-6 tracking-tight heading-primary">
              AI-Powered Resume Analysis <br />That <span className="text-purple-600">Gets Results</span>
            </h1>
            <p className="text-lg sm:text-xl theme-text opacity-70 max-w-3xl mx-auto leading-relaxed text-professional">
              One-time payment for multiple analyses. Optimize for each job application.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl theme-card ${plan.className} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.ribbon && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={`${plan.name === "JOB SEEKER" ? 'bg-blue-600' : 'bg-purple-600'} text-white px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold`}>
                      {plan.ribbon}
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
                    onClick={() => {
                      setDialogAction('purchase');
                      setDialogOpen(true);
                      setSelectedPlan(plan);
                    }}
                    className={`w-full py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'theme-surface theme-text theme-border border-2 hover:bg-purple-600 hover:text-white hover:border-purple-600'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="inline-flex flex-col items-center p-6 sm:p-8 theme-card rounded-xl max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 mb-4">
                <div className="flex items-center text-sm theme-text">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                  <span className="font-medium">7-day money-back guarantee</span>
                </div>
                <div className="flex items-center text-sm theme-text">
                  <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                  <span className="font-medium">Proven to increase interviews</span>
                </div>
              </div>
              <p className="theme-text opacity-70 text-sm sm:text-base max-w-2xl">
                "After using OutSmart, I received 3x more interview calls. The ATS optimization made all the difference!" - Priya K., Marketing Specialist
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <ActionDialog
    open={dialogOpen}
    onOpenChange={setDialogOpen}
    actionType={dialogAction}
    plan={selectedPlan}
    loading={loading}
    onConfirm={handleDialogConfirm} /></>
  );
};

export default PricingSection;