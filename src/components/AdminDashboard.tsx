import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Package, 
  TrendingUp, 
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Settings,
  Bell
} from 'lucide-react';

const AdminDashboard = ({ user, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const adminStats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'text-blue-600', trend: '+156 this month' },
    { label: 'Active Listings', value: '1,234', icon: Package, color: 'text-green-600', trend: '+89 pending' },
    { label: 'Partner Colleges', value: '12', icon: GraduationCap, color: 'text-purple-600', trend: '+2 new' },
    { label: 'Trust Score', value: '94%', icon: Shield, color: 'text-orange-600', trend: '+2% this week' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'listing', title: 'MacBook Pro 13" Rental', college: 'IIT Delhi', submittedBy: 'Rahul Kumar', time: '2 hours ago', priority: 'high' },
    { id: 2, type: 'vendor', title: 'New Vendor Registration', college: 'NIT Trichy', submittedBy: 'TechRentals Co.', time: '4 hours ago', priority: 'medium' },
    { id: 3, type: 'event', title: 'Campus Tech Fair Event', college: 'BITS Pilani', submittedBy: 'Student Union', time: '1 day ago', priority: 'low' }
  ];

  const quickActions = [
    { label: 'Approve Listings', icon: CheckCircle, action: () => onNavigate('admin-approvals'), color: 'bg-green-500', count: 15 },
    { label: 'Review Reports', icon: AlertTriangle, action: () => onNavigate('admin-approvals'), color: 'bg-red-500', count: 3 },
    { label: 'College Analytics', icon: BarChart3, action: () => onNavigate('vendor-analytics'), color: 'bg-blue-500', count: null },
    { label: 'System Settings', icon: Settings, action: () => onNavigate('settings'), color: 'bg-gray-500', count: null },
    { label: 'Announcements', icon: Bell, action: () => onNavigate('admin-announcements'), color: 'bg-purple-500', count: null },
    { label: 'Manage Colleges', icon: GraduationCap, action: () => onNavigate('browse-items'), color: 'bg-indigo-500', count: null }
  ];

  const recentActivity = [
    { action: 'Approved', item: 'Engineering Books Set listing', college: 'IIT Bombay', time: '30 min ago', type: 'success' },
    { action: 'Rejected', item: 'Unauthorized vendor application', college: 'VIT Vellore', time: '1 hour ago', type: 'error' },
    { action: 'Updated', item: 'Campus community guidelines', college: 'All Colleges', time: '2 hours ago', type: 'info' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Control Center 🛡️
            </h1>
            <p className="text-gray-600 mt-2">Manage colleges, approve listings, and oversee the RentMyDorm ecosystem</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2">
              Super Admin
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications (7)
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
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

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span>Admin Actions</span>
          </CardTitle>
          <CardDescription>Quick access to important administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform relative"
                onClick={action.action}
              >
                {action.count && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {action.count}
                  </Badge>
                )}
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
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span>Pending Approvals</span>
            </CardTitle>
            <CardDescription>Items waiting for your review and approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.priority === 'high' ? 'bg-red-100 text-red-600' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {item.type === 'listing' ? <Package className="w-5 h-5" /> :
                       item.type === 'vendor' ? <Users className="w-5 h-5" /> :
                       <Bell className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.college} • {item.submittedBy}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest administrative actions and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    activity.type === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                     activity.type === 'error' ? <XCircle className="w-5 h-5" /> :
                     <Settings className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      <span className={`${
                        activity.type === 'success' ? 'text-green-600' :
                        activity.type === 'error' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {activity.action}
                      </span> {activity.item}
                    </p>
                    <p className="text-sm text-gray-600">{activity.college}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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

export default AdminDashboard;
