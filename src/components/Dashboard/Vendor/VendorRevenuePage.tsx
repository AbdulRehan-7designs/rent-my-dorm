
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp } from 'lucide-react';

interface VendorRevenuePageProps {
  user: any;
}

const VendorRevenuePage: React.FC<VendorRevenuePageProps> = ({ user }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
        <p className="text-gray-600">Track your earnings and performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Total Revenue</span>
            </CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹15,680</div>
            <p className="text-sm text-gray-500 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              +28% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
            <CardDescription>Monthly performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              Chart component coming soon...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorRevenuePage;
