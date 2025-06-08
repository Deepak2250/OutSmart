import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { 
  Zap, 
  Mail, 
  Twitter, 
  Linkedin, 
  Github, 
  ArrowRight,
  Heart,
  MapPin,
  Phone
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter. You'll receive career insights weekly.",
      });
      setEmail('');
      setIsSubscribing(false);
    }, 1500);
  };

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API Documentation', href: '#' },
      { name: 'Integrations', href: '#' }
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    Resources: [
      { name: 'Blog', href: '#' },
      { name: 'Career Guides', href: '#' },
      { name: 'Success Stories', href: '#' },
      { name: 'Help Center', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Data Processing', href: '#' }
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Ahead of Your Career
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get weekly insights on job market trends, salary data, and career advancement tips 
              delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
              />
              <Button 
                type="submit"
                disabled={isSubscribing}
                className="bg-white text-black hover:bg-gray-100 font-semibold px-8 transition-all duration-300 hover:scale-105"
              >
                {isSubscribing ? (
                  <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full"></div>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
            
            <p className="text-sm text-gray-400 mt-4">
              Join 25,000+ professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold tracking-tight">OutSmart</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering professionals worldwide with AI-driven career insights and personalized 
              growth strategies. Transform your career trajectory today.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[ 
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Mail, href: '#', label: 'Email' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div key={category} className="animate-fade-in" style={{ animationDelay: `${0.2 + categoryIndex * 0.1}s` }}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-300">San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-300">hello@outsmart.ai</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center mb-4 md:mb-0 animate-fade-in" style={{ animationDelay: "1s" }}>
              <span>© 2024 OutSmart. All rights reserved.</span>
            </div>
            <div className="flex items-center animate-fade-in" style={{ animationDelay: "1.1s" }}>
              <span className="mr-2">Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1" />
              <span>by the OutSmart team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
