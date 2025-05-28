
import React from 'react';
import { 
  User, 
  Search, 
  Award, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Bell,
  GraduationCap
} from 'lucide-react';

export const getNavItems = (userRole: string) => {
  switch (userRole) {
    case 'student':
      return [
        { id: 'student-dashboard', label: 'Dashboard', icon: User },
        { id: 'browse-items', label: 'Browse Items', icon: Search },
        { id: 'ai-recommendations', label: 'AI Recommendations', icon: Award },
        { id: 'ai-object-recognition', label: 'AI Scanner', icon: Package },
        { id: 'my-rentals', label: 'My Rentals', icon: Package },
        { id: 'chat', label: 'Messages', icon: MessageSquare },
        { id: 'leaderboard', label: 'Leaderboard', icon: Award }
      ];
    case 'vendor':
      return [
        { id: 'vendor-dashboard', label: 'Dashboard', icon: TrendingUp },
        { id: 'my-listings', label: 'My Listings', icon: Package },
        { id: 'ai-object-recognition', label: 'AI Verify Items', icon: Package },
        { id: 'orders', label: 'Orders', icon: Bell },
        { id: 'analytics', label: 'Analytics', icon: Award }
      ];
    case 'admin':
      return [
        { id: 'admin-dashboard', label: 'Dashboard', icon: TrendingUp },
        { id: 'manage-colleges', label: 'Colleges', icon: GraduationCap },
        { id: 'approve-listings', label: 'Approvals', icon: Package },
        { id: 'analytics', label: 'Analytics', icon: Award }
      ];
    default:
      return [];
  }
};
