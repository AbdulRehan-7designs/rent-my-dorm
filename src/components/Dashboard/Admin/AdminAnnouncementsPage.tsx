
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AdminAnnouncementsPageProps {
  user: any;
}

const AdminAnnouncementsPage: React.FC<AdminAnnouncementsPageProps> = ({ user }) => {
  const announcements = [
    { id: 1, title: 'Platform Maintenance', content: 'Scheduled maintenance on Sunday', date: '2024-01-15', status: 'active' },
    { id: 2, title: 'New Features Released', content: 'Check out our latest updates', date: '2024-01-10', status: 'active' },
    { id: 3, title: 'Holiday Hours', content: 'Updated operating hours', date: '2024-01-05', status: 'expired' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600">Manage platform-wide communications</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>All Announcements</span>
          </CardTitle>
          <CardDescription>Broadcast messages to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-gray-600 mb-2">{announcement.content}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    announcement.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.status}
                  </span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
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

export default AdminAnnouncementsPage;
