
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

// Main navigation entries - showing all items
const MAIN_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, auth: 'all' },
  { href: '/browse', label: 'Browse', icon: ShoppingCart, auth: 'all' },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, auth: 'auth' },
  { href: '/community-wishlist', label: 'Community', icon: Heart, auth: 'auth' },
  { href: '/squad-up', label: 'Squad Up', icon: Users, auth: 'auth' },
  { href: '/campus-pulse', label: 'Campus Pulse', icon: TrendingUp, auth: 'auth' },
  { href: '/campus-credits', label: 'Credits', icon: Award, auth: 'auth' },
  { href: '/sustainability', label: 'Sustainability', icon: Leaf, auth: 'auth' },
  { href: '/profile', label: 'Profile', icon: User, auth: 'auth' },
  { href: '/settings', label: 'Settings', icon: Settings, auth: 'auth' },
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
  const [notifications] = useState(3);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Filter links for visibility
  const visibleMainNav = MAIN_NAV_ITEMS.filter(item =>
    item.auth === 'all' || (user && item.auth === 'auth')
  );

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenu(false);
  };

  const handleNavClick = () => setMobileMenu(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-md backdrop-blur transition-all duration-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2 mr-4 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow border border-blue-200/30">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:block tracking-tight">RentMyDorm</span>
          </Link>

          {/* Desktop Navigation - Show all nav items in a scrollable container */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1 max-w-full overflow-x-auto scrollbar-hide">
              {visibleMainNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-150 whitespace-nowrap
                    ${isActive(location, item.href)
                      ? 'bg-gradient-to-tr from-orange-100 to-pink-100 text-pink-700 shadow'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'}
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            {user ? (
              <>
                {/* Notification bell */}
                <Button variant="ghost" size="icon" className="relative hover:bg-orange-100" aria-label="Notifications">
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                      {notifications}
                    </Badge>
                  )}
                </Button>
                {/* Avatar and sign out button */}
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                  onClick={handleSignOut}
                  title="Sign out"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Sign out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold transition-all duration-150">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger menu (mobile/tablet) */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenu((v) => !v)}
              className="focus:ring focus:ring-pink-200"
            >
              {mobileMenu ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile Drawer - show all main links */}
        {mobileMenu && (
          <div className="lg:hidden absolute left-0 top-16 w-full bg-white/98 border-b z-40 shadow-lg animate-fade-in backdrop-blur-sm">
            <div className="flex flex-col px-5 py-4 gap-1 max-h-96 overflow-y-auto">
              {visibleMainNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-md text-lg font-medium transition-all duration-150
                    ${isActive(location, item.href)
                      ? 'bg-gradient-to-tr from-orange-100 to-pink-100 text-pink-700 shadow'
                      : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'}
                  `}
                  onClick={handleNavClick}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile user actions */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 text-red-600 hover:bg-red-100 border-red-200"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/auth" onClick={handleNavClick}>
                      <Button variant="ghost" className="w-full text-gray-700 hover:text-orange-600 hover:bg-orange-50">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={handleNavClick}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
