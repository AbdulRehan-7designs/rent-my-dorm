
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Plus, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AdminCollegesPageProps {
  user: any;
}

const AdminCollegesPage: React.FC<AdminCollegesPageProps> = ({ user }) => {
  const colleges = [
    { id: 1, name: 'IIT Delhi', location: 'New Delhi', users: 2847, listings: 1234, status: 'active' },
    { id: 2, name: 'BITS Pilani', location: 'Rajasthan', users: 1923, listings: 856, status: 'active' },
    { id: 3, name: 'NIT Surat', location: 'Gujarat', users: 1456, listings: 674, status: 'active' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Management</h1>
          <p className="text-gray-600">Manage participating educational institutions</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Plus className="w-4 h-4 mr-2" />
          Add College
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>Registered Colleges</span>
          </CardTitle>
          <CardDescription>Educational institutions on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {colleges.map((college) => (
              <div key={college.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{college.name}</p>
                    <p className="text-sm text-gray-600">{college.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{college.users}</p>
                    <p className="text-xs text-gray-500">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900">{college.listings}</p>
                    <p className="text-xs text-gray-500">Listings</p>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCollegesPage;
