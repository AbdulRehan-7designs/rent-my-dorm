
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Home,
  ShoppingCart,
  LayoutDashboard,
  Heart,
  Users,
  TrendingUp,
  Award,
  Leaf,
  User,
  Settings,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Navigation items for all users
const ALL_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, showFor: 'all' },
  { href: '/browse', label: 'Browse', icon: ShoppingCart, showFor: 'all' },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, showFor: 'auth' },
  { href: '/community-wishlist', label: 'Community Wishlist', icon: Heart, showFor: 'auth' },
  { href: '/squad-up', label: 'Squad Up', icon: Users, showFor: 'auth' },
  { href: '/campus-pulse', label: 'Campus Pulse', icon: TrendingUp, showFor: 'auth' },
  { href: '/campus-credits', label: 'Campus Credits', icon: Award, showFor: 'auth' },
  { href: '/sustainability', label: 'Sustainability', icon: Leaf, showFor: 'auth' }
];

const PROFILE_NAV_ITEMS = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const isActive = (location, path) => {
  if (path === '/' && location.pathname === '/') return true;
  if (path !== '/' && location.pathname.startsWith(path)) return true;
  return false;
};

const NavBar = () => {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3); // Mock notification count
  const [mobileMenu, setMobileMenu] = useState(false);

  // Filter navigation items based on auth
  const visibleNavItems = ALL_NAV_ITEMS.filter((item) =>
    item.showFor === 'all' || (user && item.showFor === 'auth')
  );

  // Always show profile/settings for authed users
  const visibleProfileItems = user ? PROFILE_NAV_ITEMS : [];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenu(false);
  };

  // Close mobile menu on nav
  const handleNavClick = () => setMobileMenu(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">RentMyDorm</span>
          </Link>

          {/* Desktop navigation (large screens) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      isActive(location, item.href)
                        ? 'bg-gradient-to-tr from-blue-100 to-purple-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
              {visibleProfileItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    ${
                      isActive(location, item.href)
                        ? 'bg-gradient-to-tr from-blue-100 to-purple-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  <item.icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop user actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>
                {/* User Avatar/Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {profile?.full_name || 'User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {PROFILE_NAV_ITEMS.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link to={item.href}>
                          <item.icon className="w-4 h-4 mr-2" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenu((v) => !v)}
              className="focus:ring focus:ring-blue-200"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
        {/* Mobile Drawer */}
        {mobileMenu && (
          <div className="md:hidden absolute left-0 top-16 w-full bg-white border-b z-40 shadow-lg animate-fade-in">
            <div className="flex flex-col px-4 py-4 gap-2">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-2 py-3 rounded-md text-base font-medium transition-all duration-200
                    ${
                      isActive(location, item.href)
                        ? 'bg-gradient-to-tr from-blue-100 to-purple-100 text-blue-700 shadow'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }
                  `}
                  onClick={handleNavClick}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {visibleProfileItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-2 py-3 rounded-md text-base font-medium transition-all duration-200
                    ${
                      isActive(location, item.href)
                        ? 'bg-gradient-to-tr from-blue-100 to-purple-100 text-blue-700 shadow'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }
                  `}
                  onClick={handleNavClick}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {/* Mobile user actions */}
              {user ? (
                <Button
                  variant="outline"
                  className="mt-2 flex items-center gap-2 w-full text-red-600 hover:bg-red-100"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </Button>
              ) : (
                <>
                  <Link to="/auth" onClick={handleNavClick}>
                    <Button variant="ghost" className="w-full text-gray-600 hover:text-blue-600 mb-2">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={handleNavClick}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

