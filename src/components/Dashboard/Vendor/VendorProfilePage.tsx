
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface VendorProfilePageProps {
  user: any;
}

const VendorProfilePage: React.FC<VendorProfilePageProps> = ({ user }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Profile</h1>
        <p className="text-gray-600">Manage your vendor information</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>Your vendor account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span>{user?.email || 'vendor@example.com'}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>{user?.college || 'College Campus'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProfilePage;
