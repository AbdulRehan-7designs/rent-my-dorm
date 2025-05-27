
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Store, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Users,
  Plus,
  BarChart3,
  ShoppingCart,
  Award
} from 'lucide-react';

const VendorDashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const vendorStats = [
    { label: 'Total Listings', value: '24', icon: Package, color: 'text-blue-600', trend: '+12%' },
    { label: 'Revenue (₹)', value: '₹15,680', icon: DollarSign, color: 'text-green-600', trend: '+28%' },
    { label: 'Active Orders', value: '8', icon: ShoppingCart, color: 'text-purple-600', trend: '+5%' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'text-yellow-600', trend: '+0.2' }
  ];

  const recentOrders = [
    { id: 1, item: 'MacBook Pro 13"', customer: 'Rahul Kumar', amount: '₹1,500', status: 'active', date: '2 hours ago' },
    { id: 2, item: 'Study Table', customer: 'Priya Sharma', amount: '₹800', status: 'completed', date: '1 day ago' },
    { id: 3, item: 'Engineering Books Set', customer: 'Amit Patel', amount: '₹300', status: 'pending', date: '3 hours ago' }
  ];

  const quickActions = [
    { label: 'Add New Item', icon: Plus, action: () => {}, color: 'bg-green-500' },
    { label: 'View Analytics', icon: BarChart3, action: () => {}, color: 'bg-blue-500' },
    { label: 'Manage Orders', icon: ShoppingCart, action: () => {}, color: 'bg-purple-500' },
    { label: 'Customer Reviews', icon: Star, action: () => {}, color: 'bg-yellow-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Vendor Dashboard 🏪
            </h1>
            <p className="text-gray-600 mt-2">Manage your listings and grow your campus business</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              Verified Vendor
            </Badge>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
              Trust Score: {user?.points || '850'}
            </Badge>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {vendorStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.trend}</p>
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
            <Store className="w-5 h-5 text-green-500" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>Manage your vendor activities efficiently</CardDescription>
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

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-green-500" />
            <span>Recent Orders</span>
          </CardTitle>
          <CardDescription>Track your latest rental orders and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    order.status === 'active' ? 'bg-blue-100 text-blue-600' :
                    order.status === 'completed' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.item}</p>
                    <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                  <Badge variant={order.status === 'active' ? 'default' : 
                                order.status === 'completed' ? 'secondary' : 'destructive'}>
                    {order.status}
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

export default VendorDashboard;
