
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Search, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Gamepad2, 
  Laptop,
  Camera,
  Headphones,
  Award,
  Package,
  Heart,
  Plus,
  Users,
  DollarSign,
  Eye,
  Bell,
  Sparkles
} from 'lucide-react';
import { getUserByRole, mockItems, getAIRecommendedItems, getTrendingItems } from '@/services/mockData';
import EngagementFeatures from './EngagementFeatures';
import AnnouncementPopup from './AnnouncementPopup';

const StudentDashboard = ({ user, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [abdulRehanUser, setAbdulRehanUser] = useState(null);

  useEffect(() => {
    // Set Abdul Rehan as the current user
    const currentUser = getUserByRole('student');
    setAbdulRehanUser(currentUser);
    
    // Show announcement popup after 2 seconds
    const timer = setTimeout(() => {
      setShowAnnouncement(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const currentUser = abdulRehanUser || user;

  const studentStats = [
    { label: 'Items Rented', value: '18', icon: Package, color: 'text-blue-600', trend: '+5 this month' },
    { label: 'Money Saved', value: '₹12,850', icon: DollarSign, color: 'text-green-600', trend: 'vs buying' },
    { label: 'Trust Score', value: currentUser?.trustScore || '950', icon: Star, color: 'text-yellow-600', trend: '+125 points' },
    { label: 'Community Rank', value: '#23', icon: Award, color: 'text-purple-600', trend: '+24 positions' }
  ];

  const quickActions = [
    { label: 'Browse Items', icon: Search, action: () => onNavigate('browse-items'), color: 'bg-blue-500' },
    { label: '🤖 AI Recommendations', icon: Award, action: () => onNavigate('ai-recommendations'), color: 'bg-purple-500' },
    { label: 'Scan Item', icon: Camera, action: () => onNavigate('ai-object-recognition'), color: 'bg-green-500' },
    { label: 'My Rentals', icon: Package, action: () => onNavigate('my-rentals'), color: 'bg-orange-500' },
    { label: 'Messages', icon: MessageSquare, action: () => onNavigate('chat'), color: 'bg-red-500' },
    { label: 'Liked Items', icon: Heart, action: () => onNavigate('liked-items'), color: 'bg-pink-500' }
  ];

  // Enhanced demo actions with Abdul's personalized content
  const demoActions = [
    { 
      label: '💳 Try Payment System', 
      icon: DollarSign, 
      action: () => onNavigate('payment'), 
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      description: 'Experience our upcoming smart payment gateway'
    }
  ];

  // Get AI recommended and trending items for Abdul
  const aiRecommendedItems = getAIRecommendedItems().slice(0, 3);
  const trendingItems = getTrendingItems().slice(0, 3);

  const recentActivity = [
    { action: 'Rented', item: '🤖 AI-Powered Gaming Laptop', from: 'Abdul Rehan (Vendor)', amount: '₹1,200/day', time: '2 hours ago', status: 'active', ai: true },
    { action: 'Returned', item: '📚 Complete Engineering Books Set', to: 'Campus Library', amount: '₹150/week', time: '1 day ago', status: 'completed', trending: true },
    { action: 'AI Suggested', item: '🌊 Smart Air Cooler', owner: 'Local Campus Vendor', time: '3 hours ago', status: 'saved', ai: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Announcement Popup */}
      {showAnnouncement && (
        <AnnouncementPopup onClose={() => setShowAnnouncement(false)} />
      )}

      {/* Enhanced Welcome Header for Abdul Rehan */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <span>Welcome back, {currentUser?.name || 'Abdul Rehan'}!</span>
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </h1>
            <p className="text-gray-600 mt-2">
              🎓 {currentUser?.college || 'IIT Delhi'} • Level {currentUser?.level || '8'} Student • 
              <span className="text-green-600 font-semibold"> Trust Score: {currentUser?.trustScore || '950'}</span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setShowAnnouncement(true)}>
              <Bell className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Announcements</span>
              <Badge className="ml-2 bg-red-500 text-white">New!</Badge>
            </Button>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
              Level {currentUser?.level || '8'} Student
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              {currentUser?.points || '2450'} Points
            </Badge>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {currentUser?.avatar || 'AR'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {studentStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-blue-600 font-medium">{stat.trend}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Demo Payment System Section */}
      <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>💳 Smart Payment System - Coming Soon!</span>
          </CardTitle>
          <CardDescription>
            Experience our revolutionary payment gateway with AI-powered fee optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-900">🚀 What's Coming:</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• ⚡ Instant UPI & wallet payments</li>
                <li>• 🤖 AI-optimized transaction fees (3-5%)</li>
                <li>• 🔒 Military-grade escrow security</li>
                <li>• 🎁 Campus credits & loyalty rewards</li>
                <li>• 📱 One-tap payment experience</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              {demoActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`${action.color} hover:scale-105 transition-transform text-white`}
                  size="lg"
                >
                  <action.icon className="w-5 h-5 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Features Component */}
      <div className="mb-8">
        <EngagementFeatures onNavigate={onNavigate} />
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-500" />
            <span>🚀 Quick Actions</span>
          </CardTitle>
          <CardDescription>Get started with popular campus rental activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform"
                onClick={action.action}
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Activity with AI/Trending Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>📊 Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest rental activities with smart insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.status === 'active' ? 'bg-blue-100 text-blue-600' :
                      activity.status === 'completed' ? 'bg-green-100 text-green-600' :
                      'bg-pink-100 text-pink-600'
                    }`}>
                      {activity.status === 'active' ? <Package className="w-5 h-5" /> :
                       activity.status === 'completed' ? <Award className="w-5 h-5" /> :
                       <Heart className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">
                          <span className="text-blue-600">{activity.action}</span> {activity.item}
                        </p>
                        {activity.ai && <Badge className="bg-purple-100 text-purple-800 text-xs">🤖 AI</Badge>}
                        {activity.trending && <Badge className="bg-orange-100 text-orange-800 text-xs">🔥 Trending</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">
                        {activity.from ? `from ${activity.from}` : 
                         activity.to ? `to ${activity.to}` : 
                         `by ${activity.owner}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && <p className="font-semibold text-gray-900">{activity.amount}</p>}
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommended Items Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>🤖 AI Picks for You</span>
            </CardTitle>
            <CardDescription>Personalized recommendations powered by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiRecommendedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <Badge className="bg-purple-100 text-purple-800 text-xs">🤖 AI Pick</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{item.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{item.price}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500">{item.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate('ai-recommendations')}
            >
              View All AI Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
