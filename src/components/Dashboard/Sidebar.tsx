
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  ShoppingCart,
  Heart,
  MessageSquare,
  Award,
  User,
  Calendar,
  Package,
  TrendingUp,
  Star,
  Settings,
  Users,
  FileText,
  AlertTriangle,
  Bell,
  Building,
  BarChart,
  Shield
} from 'lucide-react';

interface SidebarProps {
  userRole: 'student' | 'vendor' | 'admin';
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: any;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userRole, 
  activeTab, 
  onTabChange, 
  user, 
  onLogout 
}) => {
  const getNavigationItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { id: 'home', label: 'Home Feed', icon: Home },
          { id: 'browse', label: 'Browse Items', icon: ShoppingCart },
          { id: 'my-rentals', label: 'My Rentals', icon: Package },
          { id: 'wishlist', label: 'Wishlist', icon: Heart },
          { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
          { id: 'credits', label: 'Campus Credits', icon: Award },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      
      case 'vendor':
        return [
          { id: 'listings', label: 'My Listings', icon: Package },
          { id: 'add-item', label: 'Add New Item', icon: ShoppingCart },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'orders', label: 'Orders', icon: FileText, badge: 5 },
          { id: 'revenue', label: 'Revenue', icon: TrendingUp },
          { id: 'reviews', label: 'Reviews', icon: Star },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      
      case 'admin':
        return [
          { id: 'overview', label: 'Overview', icon: BarChart },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'listings', label: 'Listings', icon: Package },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'disputes', label: 'Disputes', icon: AlertTriangle, badge: 2 },
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'colleges', label: 'Colleges', icon: Building },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">RentMyDorm</h1>
            <p className="text-xs text-gray-500 capitalize">{userRole} Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start text-left transition-all duration-200",
              activeTab === item.id 
                ? "bg-gradient-to-r from-green-50 to-blue-50 text-green-700 shadow-sm" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-2 bg-red-100 text-red-700">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
