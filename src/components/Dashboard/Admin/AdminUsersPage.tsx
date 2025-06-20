
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminUsersPageProps {
  user: any;
}

const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ user }) => {
  const users = [
    { id: 1, name: 'Rahul Kumar', email: 'rahul@iit.ac.in', role: 'student', status: 'active', college: 'IIT Delhi' },
    { id: 2, name: 'Priya Sharma', email: 'priya@bits.ac.in', role: 'vendor', status: 'active', college: 'BITS Pilani' },
    { id: 3, name: 'Amit Patel', email: 'amit@nit.ac.in', role: 'student', status: 'suspended', college: 'NIT Surat' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600">Manage platform users and their permissions</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>All Users</span>
          </CardTitle>
          <CardDescription>View and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email} • {user.college}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={user.role === 'vendor' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                    {user.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <UserCheck className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserX className="w-4 h-4" />
                    </Button>
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

export default AdminUsersPage;
