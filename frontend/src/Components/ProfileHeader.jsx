import React, { useState } from 'react';
import { Edit3, MapPin, Mail, Phone, Star, Download } from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Card, CardContent } from '../Components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../Components/ui/avatar';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className="theme-card border theme-border mb-8 overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-800 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <CardContent className="relative -mt-16 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400" 
                alt="Profile"
              />
              <AvatarFallback className="text-2xl font-bold bg-purple-600 text-white">JD</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold theme-text heading-secondary">Jane Doe</h1>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="theme-text font-medium">4.8</span>
                </div>
              </div>
              <p className="text-xl theme-text opacity-80">Senior Software Engineer</p>
              <div className="flex flex-wrap items-center gap-4 text-sm theme-text opacity-70">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>jane.doe@email.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              <p className="theme-text opacity-80 max-w-2xl leading-relaxed">
                Passionate software engineer with 5+ years of experience building scalable web applications. 
                Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies 
                and solve complex problems.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
              className="theme-button"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
