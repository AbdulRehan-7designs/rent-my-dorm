
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Sparkles, TrendingUp, Zap, Bell } from 'lucide-react';
import { mockAnnouncements, getRandomAnnouncement, MockAnnouncement } from '@/services/mockData';

interface AnnouncementPopupProps {
  onClose: () => void;
}

const AnnouncementPopup = ({ onClose }: AnnouncementPopupProps) => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<MockAnnouncement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Get a random exciting announcement
    const announcement = getRandomAnnouncement();
    setCurrentAnnouncement(announcement);
    
    // Show popup with animation delay
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!currentAnnouncement) return null;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'celebration':
        return 'from-pink-500 to-purple-500 border-pink-300';
      case 'success':
        return 'from-green-500 to-emerald-500 border-green-300';
      case 'warning':
        return 'from-orange-500 to-red-500 border-orange-300';
      case 'info':
        return 'from-blue-500 to-cyan-500 border-blue-300';
      default:
        return 'from-gray-500 to-gray-600 border-gray-300';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'celebration':
        return <Sparkles className="w-6 h-6" />;
      case 'success':
        return <TrendingUp className="w-6 h-6" />;
      case 'warning':
        return <Zap className="w-6 h-6" />;
      case 'info':
        return <Bell className="w-6 h-6" />;
      default:
        return <Bell className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card 
        className={`w-full max-w-md transform transition-all duration-300 border-2 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${isVisible ? 'animate-fade-in' : ''}`}
      >
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${getTypeStyles(currentAnnouncement.type)} p-6 text-white relative overflow-hidden`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute top-2 right-2 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
            
            {/* Floating animation elements */}
            <div className="absolute -top-4 -right-4 text-6xl opacity-20 animate-bounce">
              {currentAnnouncement.emoji}
            </div>
            
            <div className="flex items-center space-x-3 mb-3">
              {getIcon(currentAnnouncement.type)}
              <h3 className="text-xl font-bold">{currentAnnouncement.title}</h3>
            </div>
            
            {currentAnnouncement.urgent && (
              <Badge className="bg-red-500/90 text-white animate-pulse mb-2">
                🚨 URGENT
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              {currentAnnouncement.message}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {currentAnnouncement.timestamp}
              </span>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleClose}>
                  Maybe Later
                </Button>
                <Button 
                  size="sm"
                  className={`bg-gradient-to-r ${getTypeStyles(currentAnnouncement.type)} text-white hover:opacity-90`}
                >
                  Awesome! 🎉
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementPopup;
