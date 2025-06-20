
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

interface VendorCalendarPageProps {
  user: any;
}

const VendorCalendarPage: React.FC<VendorCalendarPageProps> = ({ user }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Availability Calendar</h1>
        <p className="text-gray-600">Manage your item availability</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Calendar View</span>
          </CardTitle>
          <CardDescription>Block dates when items are not available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            Calendar component coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorCalendarPage;
