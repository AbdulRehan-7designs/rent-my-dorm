
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  type: string;
  time: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
}

const NotificationDropdown = ({ notifications }: NotificationDropdownProps) => {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="w-5 h-5" />
      {notifications.length > 0 && (
        <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
          {notifications.length > 9 ? '9+' : notifications.length}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationDropdown;
