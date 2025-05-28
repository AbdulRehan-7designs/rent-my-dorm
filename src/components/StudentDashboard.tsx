
import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';

const StudentDashboard = ({ user, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const studentStats = [
    { label: 'Items Rented', value: '12', icon: Package, color: 'text-blue-600', trend: '+3 this month' },
    { label: 'Money Saved', value: '₹8,500', icon: DollarSign, color: 'text-green-600', trend: 'vs buying' },
    { label: 'Trust Score', value: '850', icon: Star, color: 'text-yellow-600', trend: '+50 points' },
    { label: 'Community Rank', value: '#47', icon: Award, color: 'text-purple-600', trend: '+12 positions' }
  ];

  const quickActions = [
    { label: 'Browse Items', icon: Search, action: () => onNavigate('browse-items'), color: 'bg-blue-500' },
    { label: 'AI Recommendations', icon: Award, action: () => onNavigate('ai-recommendations'), color: 'bg-purple-500' },
    { label: 'Scan Item', icon: Camera, action: () => onNavigate('ai-object-recognition'), color: 'bg-green-500' },
    { label: 'My Rentals', icon: Package, action: () => onNavigate('my-rentals'), color: 'bg-orange-500' },
    { label: 'Messages', icon: MessageSquare, action: () => onNavigate('chat'), color: 'bg-red-500' },
    { label: 'Liked Items', icon: Heart, action: () => onNavigate('liked-items'), color: 'bg-pink-500' }
  ];

  // Add demo fee system action
  const demoActions = [
    { 
      label: 'Try Fee Calculator', 
      icon: DollarSign, 
      action: () => onNavigate('demo-rental-confirmation'), 
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      description: 'Demo the transaction fee system with loyalty discounts'
    }
  ];

  const recentActivity = [
    { action: 'Rented', item: 'MacBook Pro 13"', from: 'TechRentals Co.', amount: '₹1,500/day', time: '2 hours ago', status: 'active' },
    { action: 'Returned', item: 'Canon DSLR Camera', to: 'PhotoGear Hub', amount: '₹800/day', time: '1 day ago', status: 'completed' },
    { action: 'Liked', item: 'Gaming Console PS5', owner: 'GameZone Rentals', time: '3 hours ago', status: 'saved' }
  ];

  const trendingCategories = [
    { name: 'Electronics', count: '234 items', icon: Laptop, trend: '+12%' },
    { name: 'Photography', count: '89 items', icon: Camera, trend: '+8%' },
    { name: 'Gaming', count: '156 items', icon: Gamepad2, trend: '+15%' },
    { name: 'Audio', count: '67 items', icon: Headphones, trend: '+5%' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || 'Student'}! 🎓
            </h1>
            <p className="text-gray-600 mt-2">Ready to discover and rent amazing items from your campus community?</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
              Level {user?.level || '5'} Student
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              {user?.points || '850'} Points
            </Badge>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Demo Fee System Section */}
      <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>🚀 New: Smart Fee System</span>
          </CardTitle>
          <CardDescription>
            Experience our intelligent transaction fee system with loyalty rewards and transparent pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-emerald-900">Features:</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• 5% commission on rentals (3% for loyal users)</li>
                <li>• Minimum ₹10, Maximum ₹100 per transaction</li>
                <li>• Secure escrow until rental completion</li>
                <li>• Transparent fee breakdown</li>
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

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-500" />
            <span>Quick Actions</span>
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
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest rental activities and interactions</CardDescription>
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
                      <p className="font-medium text-gray-900">
                        <span className="text-blue-600">{activity.action}</span> {activity.item}
                      </p>
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

        {/* Trending Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Trending in Your Campus</span>
            </CardTitle>
            <CardDescription>Popular rental categories this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-600">{category.count}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      {category.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
