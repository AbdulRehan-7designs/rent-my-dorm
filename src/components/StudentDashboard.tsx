
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Book, 
  Package, 
  MessageSquare, 
  Star, 
  TrendingUp, 
  Award, 
  Plus,
  Search,
  Filter,
  Heart,
  Eye,
  Brain,
  Camera,
  Users,
  Trophy
} from 'lucide-react';

const StudentDashboard = ({ user, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const stats = [
    { label: 'Items Rented', value: '12', icon: Package, color: 'text-blue-600' },
    { label: 'Items Lent', value: '8', icon: Book, color: 'text-green-600' },
    { label: 'Active Chats', value: '5', icon: MessageSquare, color: 'text-purple-600' },
    { label: 'Total Points', value: user?.points || '850', icon: Star, color: 'text-yellow-600' }
  ];

  const recentActivity = [
    { id: 1, type: 'rental', item: 'MacBook Pro 13"', action: 'Rented from Rahul', time: '2 hours ago', status: 'active' },
    { id: 2, type: 'lend', item: 'Engineering Mathematics', action: 'Lent to Priya', time: '1 day ago', status: 'returned' },
    { id: 3, type: 'chat', item: 'Study Table', action: 'New message from Amit', time: '3 hours ago', status: 'unread' }
  ];

  // Updated quickActions with proper navigation using the prop
  const quickActions = [
    { 
      label: 'Browse Items', 
      icon: Search, 
      action: () => onNavigate('browse-items'), 
      color: 'bg-blue-500' 
    },
    { 
      label: 'AI Recognition', 
      icon: Camera, 
      action: () => onNavigate('ai-object-recognition'), 
      color: 'bg-purple-500' 
    },
    { 
      label: 'AI Recommendations', 
      icon: Brain, 
      action: () => onNavigate('ai-recommendations'), 
      color: 'bg-green-500' 
    },
    { 
      label: 'Messages', 
      icon: MessageSquare, 
      action: () => onNavigate('chat'), 
      color: 'bg-orange-500' 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 mt-2">Ready to rent, lend, or connect with your campus community?</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              Level {user?.level} Student
            </Badge>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow transform hover:scale-105 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color} transition-colors hover:bg-gray-200`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Get started with these popular AI-powered features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center space-y-3 hover:scale-105 transition-all duration-300 hover:shadow-lg group"
                onClick={action.action}
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-center">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Features Highlight */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Brain className="w-5 h-5" />
            <span>AI-Powered Features</span>
          </CardTitle>
          <CardDescription className="text-purple-600">Experience the future of campus sharing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="text-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer transform hover:scale-105 duration-300"
              onClick={() => onNavigate('ai-object-recognition')}
            >
              <Camera className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Object Recognition</h4>
              <p className="text-sm text-gray-600">Upload photos for instant item identification</p>
            </div>
            <div 
              className="text-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer transform hover:scale-105 duration-300"
              onClick={() => onNavigate('ai-recommendations')}
            >
              <Brain className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Smart Recommendations</h4>
              <p className="text-sm text-gray-600">AI suggests items based on your needs</p>
            </div>
            <div 
              className="text-center p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-colors cursor-pointer transform hover:scale-105 duration-300"
              onClick={() => onNavigate('chat')}
            >
              <MessageSquare className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Smart Chat</h4>
              <p className="text-sm text-gray-600">AI-enhanced communication tools</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-orange-500" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Your latest rentals, lending, and messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'rental' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'lend' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'rental' ? <Package className="w-5 h-5" /> :
                     activity.type === 'lend' ? <Book className="w-5 h-5" /> :
                     <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.item}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <Badge variant={activity.status === 'active' ? 'default' : 
                                activity.status === 'returned' ? 'secondary' : 'destructive'}>
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
