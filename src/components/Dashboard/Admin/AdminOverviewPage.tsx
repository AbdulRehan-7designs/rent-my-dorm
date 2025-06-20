
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Shield,
  Building,
  Award
} from 'lucide-react';

interface AdminOverviewPageProps {
  user: any;
}

const AdminOverviewPage: React.FC<AdminOverviewPageProps> = ({ user }) => {
  const statsData = [
    { name: 'Total Users', value: 12543, icon: Users, color: 'blue', change: '+12%' },
    { name: 'Active Listings', value: 3247, icon: Package, color: 'green', change: '+8%' },
    { name: 'Total Revenue', value: '₹8.2L', icon: DollarSign, color: 'yellow', change: '+15%' },
    { name: 'Pending Disputes', value: 23, icon: AlertTriangle, color: 'red', change: '-5%' }
  ];

  const campusData = [
    { name: 'IIT Delhi', users: 2340, listings: 890, revenue: 156000 },
    { name: 'BITS Pilani', users: 1890, listings: 720, revenue: 134000 },
    { name: 'NIT Trichy', users: 1560, listings: 560, revenue: 98000 },
    { name: 'VIT Vellore', users: 1340, listings: 480, revenue: 87000 },
    { name: 'IIIT Hyderabad', users: 980, listings: 340, revenue: 65000 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#3B82F6' },
    { name: 'Books', value: 25, color: '#10B981' },
    { name: 'Furniture', value: 15, color: '#F59E0B' },
    { name: 'Sports', value: 10, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' }
  ];

  const monthlyData = [
    { month: 'Jan', users: 800, listings: 300, revenue: 45000 },
    { month: 'Feb', users: 950, listings: 380, revenue: 52000 },
    { month: 'Mar', users: 1100, listings: 450, revenue: 61000 },
    { month: 'Apr', users: 1200, listings: 520, revenue: 68000 },
    { month: 'May', users: 1400, listings: 600, revenue: 75000 },
    { month: 'Jun', users: 1600, listings: 680, revenue: 82000 }
  ];

  const recentActivities = [
    { action: 'New college registered', detail: 'IIIT Bangalore joined the platform', time: '2 hours ago', type: 'college' },
    { action: 'Dispute resolved', detail: 'MacBook rental issue between two students', time: '4 hours ago', type: 'dispute' },
    { action: 'Large listing approved', detail: 'Photography studio equipment set', time: '6 hours ago', type: 'listing' },
    { action: 'Suspicious activity detected', detail: 'Multiple fake accounts from same IP', time: '8 hours ago', type: 'security' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600">Monitor platform performance and manage operations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Award className="w-4 h-4 mr-2" />
            Send Announcement
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campus Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-blue-600" />
              <span>Top Performing Campuses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-green-600" />
              <span>Listing Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Growth Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span>Platform Growth</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="listings" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'college' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'dispute' ? 'bg-red-100 text-red-600' :
                    activity.type === 'listing' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {activity.type === 'college' ? <Building className="w-4 h-4" /> :
                     activity.type === 'dispute' ? <AlertTriangle className="w-4 h-4" /> :
                     activity.type === 'listing' ? <Package className="w-4 h-4" /> :
                     <Shield className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span>System Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Server Performance</span>
                <span>98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Database Health</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>API Response Time</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>User Satisfaction</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
