
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, Star, Users } from 'lucide-react';

interface VendorOverviewPageProps {
  user: any;
}

const VendorOverviewPage: React.FC<VendorOverviewPageProps> = ({ user }) => {
  const stats = [
    { label: 'Total Listings', value: '24', icon: Package, color: 'text-blue-600' },
    { label: 'Revenue', value: '₹15,680', icon: DollarSign, color: 'text-green-600' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'text-yellow-600' },
    { label: 'Customers', value: '156', icon: Users, color: 'text-purple-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Overview</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
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
    </div>
  );
};

export default VendorOverviewPage;
