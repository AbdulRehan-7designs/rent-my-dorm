
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, DollarSign, Shield } from 'lucide-react';

interface AdminSettingsPageProps {
  user: any;
}

const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ user }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-600">Configure platform-wide settings and policies</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Fee Structure</span>
            </CardTitle>
            <CardDescription>Platform commission and fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Commission</span>
                <span className="font-semibold">3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Processing</span>
                <span className="font-semibold">2.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dispute Resolution</span>
                <span className="font-semibold">₹50</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security Settings</span>
            </CardTitle>
            <CardDescription>Platform security configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Two-Factor Auth</span>
                <span className="font-semibold text-green-600">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">KYC Verification</span>
                <span className="font-semibold text-green-600">Required</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Auto-moderation</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
