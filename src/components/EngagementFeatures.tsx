
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Award, 
  Zap, 
  Heart,
  Star,
  Target,
  Gift,
  Rocket,
  Brain,
  Fire
} from 'lucide-react';
import { mockStats, mockTrendingCategories } from '@/services/mockData';

interface EngagementFeaturesProps {
  onNavigate: (view: string) => void;
}

const EngagementFeatures = ({ onNavigate }: EngagementFeaturesProps) => {
  const [liveStats, setLiveStats] = useState(mockStats);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    // Simulate live stats updates
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeRentals: prev.activeRentals + Math.floor(Math.random() * 3),
        aiRecommendations: prev.aiRecommendations + Math.floor(Math.random() * 5)
      }));
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const engagementCards = [
    {
      title: '🔥 Trending Now',
      description: 'Hottest items on campus this week',
      value: mockTrendingCategories.length,
      icon: Fire,
      color: 'from-red-500 to-orange-500',
      action: () => onNavigate('browse-items')
    },
    {
      title: '🤖 AI Recommendations',
      description: 'Smart suggestions just for you',
      value: '94%',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      action: () => onNavigate('ai-recommendations')
    },
    {
      title: '⚡ Live Campus Activity',
      description: 'Real-time rental transactions',
      value: liveStats.activeRentals,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      action: () => onNavigate('campus-pulse'),
      live: true
    },
    {
      title: '🎯 Your Squad',
      description: 'Connect with campus community',
      value: '1.2k',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      action: () => onNavigate('squad-up')
    }
  ];

  const achievements = [
    { title: 'Early Adopter', emoji: '🚀', description: 'Joined in beta phase' },
    { title: 'Eco Warrior', emoji: '🌱', description: 'Saved 50kg CO2' },
    { title: 'Trust Builder', emoji: '⭐', description: '5-star rating streak' },
    { title: 'Campus Hero', emoji: '🏆', description: 'Top 10 contributor' }
  ];

  return (
    <div className="space-y-6">
      {/* Live Engagement Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {engagementCards.map((card, index) => (
          <Card 
            key={index}
            className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={card.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                {card.live && (
                  <Badge className={`bg-red-100 text-red-800 animate-pulse ${pulseAnimation ? 'scale-110' : ''} transition-transform`}>
                    LIVE
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{card.description}</p>
              <p className="text-lg font-bold text-gray-900">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trending Categories Showcase */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span>🔥 What's Hot on Campus</span>
          </CardTitle>
          <CardDescription>Live trending categories with AI insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {mockTrendingCategories.map((category, index) => (
              <div key={index} className="text-center p-3 bg-white/80 rounded-lg hover:bg-white transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{category.emoji}</div>
                <h4 className="font-semibold text-sm">{category.name}</h4>
                <p className="text-xs text-gray-600">{category.count} items</p>
                <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                  {category.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Showcase */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span>🏆 Your Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-4 bg-white/80 rounded-lg">
                <div className="text-3xl mb-2">{achievement.emoji}</div>
                <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Center */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-green-500" />
            <span>🚀 Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center space-y-1"
              onClick={() => onNavigate('ai-recommendations')}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">AI Picks</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center space-y-1"
              onClick={() => onNavigate('payment')}
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Payments</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex flex-col items-center space-y-1"
              onClick={() => onNavigate('sustainability')}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs">Go Green</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementFeatures;
