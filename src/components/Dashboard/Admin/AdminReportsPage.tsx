
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, TrendingUp } from 'lucide-react';

interface AdminReportsPageProps {
  user: any;
}

const AdminReportsPage: React.FC<AdminReportsPageProps> = ({ user }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Platform insights and performance metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>Usage Statistics</span>
            </CardTitle>
            <CardDescription>Platform activity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Users</span>
                <span className="font-semibold">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Listings</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Rentals</span>
                <span className="font-semibold">5,678</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Revenue Analytics</span>
            </CardTitle>
            <CardDescription>Financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              Revenue chart coming soon...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReportsPage;
