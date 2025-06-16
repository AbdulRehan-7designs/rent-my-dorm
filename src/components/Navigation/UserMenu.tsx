
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut } from 'lucide-react';

interface UserMenuProps {
  user: any;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const UserMenu = ({ user, onNavigate, onLogout }: UserMenuProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onNavigate('profile')}
        className="relative"
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onNavigate('settings')}
      >
        <Settings className="w-4 h-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onLogout}
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default UserMenu;
