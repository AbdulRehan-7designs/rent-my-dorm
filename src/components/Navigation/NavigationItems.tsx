
import {
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  TrendingUp,
  Award,
  Leaf,
  Heart
} from "lucide-react";

export type SidebarNavItem = {
  title: string;
  href: string;
  icon: any;
  label?: string;
  description?: string;
};

const navigationItems: SidebarNavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Go to the home page",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "View your dashboard",
  },
  {
    title: "Browse Items",
    href: "/browse",
    icon: ShoppingCart,
    description: "Browse all listed items",
  },
  {
    title: 'Community',
    href: '/community-wishlist',
    icon: Heart,
    description: 'Request items from community'
  },
  {
    title: 'Squad Up',
    href: '/squad-up',
    icon: Users,
    description: 'Group rentals with friends'
  },
  {
    title: 'Campus Pulse',
    href: '/campus-pulse',
    icon: TrendingUp,
    description: 'Your personalized feed'
  },
  {
    title: 'Campus Credits',
    href: '/campus-credits',
    icon: Award,
    description: 'Loyalty rewards program'
  },
  {
    title: 'Sustainability',
    href: '/sustainability',
    icon: Leaf,
    description: 'Your environmental impact'
  }
];

export const getNavItems = (userRole?: string) => {
  return navigationItems;
};

export default navigationItems;
