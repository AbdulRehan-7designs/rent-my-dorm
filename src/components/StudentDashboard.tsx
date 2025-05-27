
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
  Eye
} from 'lucide-react';

const StudentDashboard = ({ user, onLogout }) => {
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

  const quickActions = [
    { label: 'Browse Items', icon: Search, action: () => {}, color: 'bg-blue-500' },
    { label: 'Add Item', icon: Plus, action: () => {}, color: 'bg-green-500' },
    { label: 'Messages', icon: MessageSquare, action: () => {}, color: 'bg-purple-500' },
    { label: 'My Wishlist', icon: Heart, action: () => {}, color: 'bg-red-500' }
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
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
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
          <CardDescription>Get started with these popular actions</CardDescription>
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
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
