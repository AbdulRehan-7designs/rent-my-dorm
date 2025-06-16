
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, BarChart3, Settings, Bell, GraduationCap, Store, Users } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (view: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const quickActions = [
    { label: 'Approve Listings', icon: CheckCircle, action: () => onNavigate('admin-approvals'), color: 'bg-green-500', count: 15 },
    { label: 'Review Reports', icon: AlertTriangle, action: () => onNavigate('admin-approvals'), color: 'bg-red-500', count: 3 },
    { label: 'College Management', icon: GraduationCap, action: () => onNavigate('college-management'), color: 'bg-blue-500', count: null },
    { label: 'Vendor Applications', icon: Store, action: () => onNavigate('vendor-applications'), color: 'bg-purple-500', count: 8 },
    { label: 'College Analytics', icon: BarChart3, action: () => onNavigate('vendor-analytics'), color: 'bg-indigo-500', count: null },
    { label: 'System Settings', icon: Settings, action: () => onNavigate('settings'), color: 'bg-gray-500', count: null },
    { label: 'Announcements', icon: Bell, action: () => onNavigate('admin-announcements'), color: 'bg-orange-500', count: null },
    { label: 'User Management', icon: Users, action: () => onNavigate('browse-items'), color: 'bg-teal-500', count: null }
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-500" />
          <span>Admin Actions</span>
        </CardTitle>
        <CardDescription>Quick access to important administrative functions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform relative"
              onClick={action.action}
            >
              {action.count && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {action.count}
                </Badge>
              )}
              <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
