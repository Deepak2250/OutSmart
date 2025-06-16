import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Zap, TrendingUp, CheckCircle, ArrowRight, Shield, Users, Award, Star, Menu, X } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { useToast } from '../hooks/use-toast';
import JobRoleSelector from '../Components/JobRoleSelector';
import AnalysisResults from '../Components/AnalysisResults';
import InterviewReadinessScore from '../Components/InterviewReadinessScore';
import ReverseJobSuggestions from '../Components/ReverseJobSuggestions';
import LearningRoadmapGenerator from '../Components/LearningRoadmapGenerator';
import FeaturesSection from '../Components/FeaturesSection';
import PricingSection from '../Components/PricingSection';
import AboutSection from '../Components/AboutSection';
import Footer from '../Components/Footer';
import LoadingAnimation from '../Components/LoadingAnimation';
import LoadingScreen from '../Components/LoadingScreen';
import ThemeSwitcher from '../Components/ThemeSwitcher';
import InteractiveDemo from '../Components/InteractiveDemo';
import { useAuth } from '../context/AuthProvider';
import AuthModal from '../Components/AuthModal';
import { useNavigate, useLocation } from 'react-router-dom';


const Home = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if this is the first load or a page refresh
    const hasVisited = sessionStorage.getItem('hasVisited');
    return !hasVisited;
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [currentStep, setCurrentStep] = useState('upload');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();
  const { isAuthenticated, logout, role } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleAuthModal = () => setShowAuthModal(prev => !prev);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show loading screen only on first visit or page refresh
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Clear hasVisited on page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('hasVisited');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Mock data for new features
  const mockInterviewScore = {
    score: 72,
    breakdown: {
      skills: 75,
      experience: 68,
      certifications: 45
    },
    recommendations: [
      "Complete a TypeScript certification course",
      "Build 2-3 Node.js projects to showcase backend skills",
      "Practice system design interviews",
      "Strengthen AWS knowledge with hands-on projects"
    ]
  };

  const mockJobSuggestions = [
    {
      title: "Frontend Developer",
      company: "TechCorp",
      matchPercentage: 85,
      location: "Remote",
      experience: "2-3 years",
      missingSkills: ["TypeScript", "Testing"],
      salary: "$70,000 - $90,000",
      jobUrl: "#"
    },
    {
      title: "React Developer",
      company: "StartupXYZ",
      matchPercentage: 82,
      location: "San Francisco, CA",
      experience: "1-3 years",
      missingSkills: ["Redux", "Node.js"],
      salary: "$80,000 - $100,000",
      jobUrl: "#"
    }
  ];

  const mockProgressData = {
    skills: [
      {
        name: "JavaScript",
        progress: 90,
        certificates: ["JavaScript Fundamentals"],
        lastUpdated: "2 days ago"
      },
      {
        name: "React",
        progress: 75,
        certificates: [],
        lastUpdated: "1 week ago"
      },
      {
        name: "Node.js",
        progress: 30,
        certificates: [],
        lastUpdated: "3 weeks ago"
      }
    ],
    streak: 12,
    milestones: [
      { name: "Complete first React project", completed: true, date: "Jan 15" },
      { name: "Build full-stack application", completed: false },
      { name: "Deploy app to production", completed: false }
    ]
  };

  const mockRoadmaps = [
    {
      skill: "Node.js",
      estimatedDuration: "8-10 weeks",
      priority: "High",
      resources: [
        {
          name: "Node.js Complete Course",
          type: "course",
          duration: "40 hours",
          difficulty: "Beginner",
          cost: "Free",
          url: "#",
          provider: "freeCodeCamp"
        },
        {
          name: "Advanced Node.js",
          type: "course",
          duration: "25 hours",
          difficulty: "Advanced",
          cost: "Paid",
          url: "#",
          provider: "Udemy"
        }
      ],
      projects: [
        "Build a REST API with Express",
        "Create a real-time chat application",
        "Develop a task management system"
      ],
      milestones: [
        "Complete Node.js fundamentals",
        "Build and deploy first API",
        "Master async programming",
        "Implement authentication"
      ]
    }
  ];

  const mockWeeklyPlan = [
    {
      week: 1,
      skills: ["Node.js Basics"],
      hours: 8,
      tasks: ["Setup development environment", "Learn core concepts", "Build simple server"]
    },
    {
      week: 2,
      skills: ["Express.js"],
      hours: 10,
      tasks: ["Express fundamentals", "Routing", "Middleware"]
    },
    {
      week: 3,
      skills: ["Database Integration"],
      hours: 12,
      tasks: ["MongoDB basics", "Mongoose ODM", "CRUD operations"]
    }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login or signup to upload your resume.",
        variant: "destructive",
      });
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setUploadedFile(file);
        toast({
          title: "File uploaded successfully!",
          description: `${file.name} is ready for analysis.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login or signup to upload your resume.",
        variant: "destructive",
      });
      e.target.value = ''; // Clear the file input
      return;
    }

    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully!",
        description: `${file.name} is ready for analysis.`,
      });
    }
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login or signup to upload your resume.",
        variant: "destructive",
      });
      toggleAuthModal(); // Show the auth modal
      return;
    }
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!uploadedFile || !selectedRole) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and select a target role before analyzing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setCurrentStep('analyze');
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
      setCurrentStep('results');
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed. Check the results below.",
      });
    }, 4000);
  };

  const handleNextStep = () => {
    if (currentStep === 'upload' && uploadedFile) {
      setCurrentStep('role');
    } else if (currentStep === 'role' && selectedRole) {
      setCurrentStep('analyze');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="min-h-screen theme-bg overflow-x-hidden">
        {/* Header */}
        <header className="theme-border border-b theme-surface/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 logo-color rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold theme-text tracking-tight heading-secondary">OutSmart</span>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <button onClick={() => scrollToSection('features')} className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-sm lg:text-base">Features</button>
                <button onClick={() => scrollToSection('about')} className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-sm lg:text-base">About</button>
                <button onClick={() => scrollToSection('pricing')} className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-sm lg:text-base">Pricing</button>
                <button onClick={() => navigate('/purchase')} className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-sm lg:text-base">Purchase</button>
                {isAuthenticated && Array.isArray(role) && role.includes('ADMIN')  && (
                  <button onClick={() => navigate('/admin')} className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-sm lg:text-base">Admin</button>
                )}
                <ThemeSwitcher />
                {isAuthenticated ? (
  <Button
    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-4 lg:px-6 py-2 hover:opacity-90 transition-opacity text-sm lg:text-base"
    onClick={() => navigate('/profile')}
  >
    Profile
  </Button>
)  : (
                  <Button
                    onClick={toggleAuthModal}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-4 lg:px-6 py-2 hover:opacity-90 transition-opacity text-sm lg:text-base"
                  >
                    Sign In
                  </Button>
                )}
              </nav>

              {/* Mobile Menu Icon */}
              <div className="md:hidden flex items-center space-x-3">
                <ThemeSwitcher />
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="theme-text p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t theme-border pt-4 animate-slide-down">
                <nav className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      scrollToSection("features");
                      setIsMobileMenuOpen(false);
                    }}
                    className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-base py-2"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("about");
                      setIsMobileMenuOpen(false);
                    }}
                    className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-base py-2"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("pricing");
                      setIsMobileMenuOpen(false);
                    }}
                    className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-base py-2"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => {
                      navigate('/purchase');
                      setIsMobileMenuOpen(false);
                    }}
                    className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-base py-2"
                  >
                    Purchase
                  </button>
                  {isAuthenticated && Array.isArray(role) && role.includes('ADMIN')  && (
                    <button onClick={() => navigate('/admin')} className="theme-text opacity-70 hover:opacity-100 transition-colors font-medium text-base py-2">
                      Admin
                    </button>
                  )}
                  {isAuthenticated ? (
                    <Button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-red-500 text-white font-semibold px-6 py-3 text-base"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        toggleAuthModal();
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-6 py-3 text-base"
                    >
                      Sign In
                    </Button>
                  )}
                </nav>
              </div>
            )}
          </div>
        </header>
        {showAuthModal && <AuthModal toggleForm={toggleAuthModal} />}

        {/* Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden theme-surface border-b theme-border">
          {/* Background orbs - same as platform features */}
          <div className="absolute top-20 left-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-slide-loop-left"></div>
          <div className="absolute bottom-20 right-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-slide-loop-right"></div>

          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6 sm:space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center glass-effect rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 backdrop-blur-sm animate-slide-down">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 theme-text opacity-70" />
                  <span className="text-xs sm:text-sm font-semibold theme-text opacity-80 text-professional">Enterprise-Grade AI Career Intelligence</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black theme-text mb-6 sm:mb-8 leading-[0.9] tracking-tight animate-slide-in-left heading-primary" style={{ animationDelay: '0.2s' }}>
                  Transform Your Career
                  <span className="block gradient-text heading-primary">
                    With AI Precision
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl md:text-2xl theme-text opacity-70 mb-12 sm:mb-16 leading-relaxed font-light animate-slide-in-right text-professional" style={{ animationDelay: '0.4s' }}>
                  Advanced AI algorithms analyze your professional profile, identify growth opportunities, 
                  and deliver data-driven career strategies that accelerate your success.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl">
                    Start AI Analysis
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                  </Button>
                </div>
              </div>

              {/* Right Column - Interactive Demo */}
              <div className="lg:pl-8 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                <InteractiveDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Main Upload Flow - Only show if analysis not complete */}
        {!showAnalysis && (
          <section className="py-16 sm:py-24 theme-surface border-b theme-border relative overflow-hidden">
            <div className="absolute top-20 left-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-slide-loop-left"></div>
            <div className="absolute bottom-20 right-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-slide-loop-right"></div>
            <div className="container mx-auto px-4 sm:px-6">
              {/* Progress Steps */}
              <div className="flex justify-center mb-12 sm:mb-16 animate-slide-up">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className={`flex items-center space-x-1 sm:space-x-2 transition-all duration-300 ${currentStep === 'upload' ? 'theme-text scale-105' : uploadedFile ? 'text-purple-600' : 'theme-text opacity-40'}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs sm:text-base ${uploadedFile ? 'bg-purple-600 text-white' : currentStep === 'upload' ? 'theme-primary' : 'bg-gray-200'}`}>
                      {uploadedFile ? <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5" /> : '1'}
                    </div>
                    <span className="font-medium text-professional text-xs sm:text-base">Upload Resume</span>
                  </div>
                  <div className="w-4 sm:w-8 h-0.5 theme-border bg-current"></div>
                  <div className={`flex items-center space-x-1 sm:space-x-2 transition-all duration-300 ${currentStep === 'role' ? 'theme-text scale-105' : selectedRole ? 'text-purple-600' : 'theme-text opacity-40'}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs sm:text-base ${selectedRole ? 'bg-purple-600 text-white' : currentStep === 'role' ? 'theme-primary' : 'bg-gray-200'}`}>
                      {selectedRole ? <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5" /> : '2'}
                    </div>
                    <span className="font-medium text-professional text-xs sm:text-base">Select Role</span>
                  </div>
                  <div className="w-4 sm:w-8 h-0.5 theme-border bg-current"></div>
                  <div className={`flex items-center space-x-1 sm:space-x-2 transition-all duration-300 ${currentStep === 'analyze' || currentStep === 'results' ? 'theme-text scale-105' : 'theme-text opacity-40'}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs sm:text-base ${currentStep === 'results' ? 'bg-purple-600 text-white' : currentStep === 'analyze' ? 'theme-primary' : 'bg-gray-200'}`}>
                      {currentStep === 'results' ? <CheckCircle className="w-3 h-3 sm:w-5 sm:h-5" /> : '3'}
                    </div>
                    <span className="font-medium text-professional text-xs sm:text-base">Analyze</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Upload Section */}
              {(currentStep === 'upload' || currentStep === 'role' || currentStep === 'analyze') && (
                <div className="max-w-3xl mx-auto mb-16 sm:mb-20 slide-transition animate-slide-up" style={{ animationDelay: '0.8s' }}>
                  <div
                    className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-16 text-center transition-all duration-500 ${
                      isDragOver
                        ? 'border-purple-500 theme-surface scale-[1.02]'
                        : uploadedFile
                        ? 'border-purple-600 bg-purple-600-50/50 shadow-xl shadow-purple-100'
                        : 'theme-border theme-card hover:shadow-xl'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {uploadedFile ? (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-2 sm:mb-3">Resume Uploaded Successfully</h3>
                          <p className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 theme-text">{uploadedFile.name}</p>
                          <p className="text-xs sm:text-sm theme-text opacity-60">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 sm:space-y-8">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto theme-muted rounded-full flex items-center justify-center theme-border border">
                          <Upload className="w-8 h-8 sm:w-12 sm:h-12 theme-text opacity-40" />
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold theme-text mb-3 sm:mb-4">Upload Your Resume</h3>
                          <p className="text-lg sm:text-xl theme-text opacity-70 mb-6 sm:mb-8 leading-relaxed">
                            Drag and drop your resume here, or click to browse your files
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm theme-text opacity-50">
                            <span className="flex items-center">
                              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                              PDF, DOC, DOCX
                            </span>
                            <span className="hidden sm:block">•</span>
                            <span>Maximum 10MB</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!uploadedFile && (
                      <Button
                        onClick={handleUploadClick}
                        className="mt-8 sm:mt-10 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                        Select Resume
                      </Button>
                    )}
                  </div>

                  {uploadedFile && currentStep === 'upload' && (
                    <div className="mt-8 sm:mt-10 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                      <Button
                        onClick={handleNextStep}
                        className="bg-purple-600 text-white hover:bg-purple-700 font-bold px-12 sm:px-16 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl slide-transition"
                      >
                        Continue to Role Selection
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Role Selection */}
              {currentStep === 'role' && (
                <div className="max-w-2xl mx-auto mb-16 sm:mb-20 animate-slide-in-right slide-transition" style={{ animationDelay: '0.2s' }}>
                  <div className="theme-card rounded-3xl shadow-xl theme-border p-8 sm:p-10">
                    <JobRoleSelector
                      selectedRole={selectedRole}
                      onRoleChange={setSelectedRole}
                    />
                    
                    {selectedRole && (
                      <div className="mt-8 sm:mt-10 text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Button
                          onClick={handleNextStep}
                          className="bg-purple-600 text-white hover:bg-purple-700 font-bold px-12 sm:px-16 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl slide-transition"
                        >
                          Continue to Analysis
                          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Analysis */}
              {currentStep === 'analyze' && (
                <div className="max-w-2xl mx-auto mb-16 sm:mb-20 animate-slide-in-left slide-transition" style={{ animationDelay: '0.2s' }}>
                  <div className="theme-card rounded-3xl shadow-xl theme-border p-8 sm:p-10 text-center">
                    {isAnalyzing ? (
                      <LoadingAnimation message="Analyzing your resume with AI..." size="lg" />
                    ) : (
                      <>
                        <h3 className="text-xl sm:text-2xl font-bold theme-text mb-4 sm:mb-6 animate-fade-in">Ready to Analyze</h3>
                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                          <div className="flex justify-between items-center p-3 sm:p-4 theme-muted rounded-lg animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                            <span className="font-medium theme-text opacity-70 text-sm sm:text-base">Resume:</span>
                            <span className="theme-text font-semibold text-sm sm:text-base">{uploadedFile?.name}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 sm:p-4 theme-muted rounded-lg animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                            <span className="font-medium theme-text opacity-70 text-sm sm:text-base">Target Role:</span>
                            <span className="theme-text font-semibold text-sm sm:text-base">{selectedRole}</span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="bg-purple-600 text-white hover:bg-purple-700 font-bold px-12 sm:px-16 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl hover:shadow-3xl slide-transition animate-scale-in"
                          style={{ animationDelay: '0.4s' }}
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="animate-spin w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Analyzing Resume...
                            </>
                          ) : (
                            <>
                              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" />
                              Start Analysis
                              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4" />
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              {!showAnalysis && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto mb-16 sm:mb-20 animate-slide-up" style={{ animationDelay: '1s' }}>
                  {[
                    { icon: Users, number: "50,000+", label: "Active Users" },
                    { icon: Award, number: "98%", label: "Success Rate" },
                    { icon: Star, number: "4.9/5", label: "User Rating" }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className={`flex flex-col items-center p-4 sm:p-6 theme-card rounded-2xl theme-border shadow-sm hover:shadow-md transition-all duration-300 hover-scale slide-transition animate-slide-up`} style={{ animationDelay: `${1.2 + (index * 0.1)}s` }}>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 theme-text opacity-70" />
                        <span className="text-xl sm:text-2xl font-bold theme-text">{stat.number}</span>
                        <span className="text-xs sm:text-sm font-medium theme-text opacity-60">{stat.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Analysis Results */}
        <div className="theme-surface border-b theme-border relative overflow-hidden">
          <div className="absolute top-20 left-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-slide-loop-left"></div>
          <div className="absolute bottom-20 right-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-slide-loop-right"></div>
          <AnalysisResults isVisible={showAnalysis} />
        </div>

        {/* New Features - Show after analysis */}
        {showAnalysis && (
          <div className="theme-surface py-16 border-b theme-border relative overflow-hidden">
            <div className="absolute top-20 left-5 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-slide-loop-left"></div>
            <div className="absolute bottom-20 right-5 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-slide-loop-right"></div>
            <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 px-4 sm:px-6">
              <div className="animate-slide-in-left slide-transition">
                <InterviewReadinessScore 
                  score={mockInterviewScore.score}
                  breakdown={mockInterviewScore.breakdown}
                  recommendations={mockInterviewScore.recommendations}
                />
              </div>

              <div className="animate-slide-in-right slide-transition" style={{ animationDelay: '0.2s' }}>
                <ReverseJobSuggestions suggestions={mockJobSuggestions} />
              </div>

              <div className="animate-slide-in-right slide-transition" style={{ animationDelay: '0.6s' }}>
                <LearningRoadmapGenerator 
                  roadmaps={mockRoadmaps}
                  weeklyPlan={mockWeeklyPlan}
                />
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div id="features" className="slide-transition theme-surface border-b theme-border">
          <FeaturesSection />
        </div>

        {/* About Section */}
        <div id="about" className="slide-transition theme-surface border-b theme-border">
          <AboutSection />
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="slide-transition theme-surface border-b theme-border">
          <PricingSection />
        </div>

        {/* Footer */}
        <div className="slide-transition theme-surface">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;