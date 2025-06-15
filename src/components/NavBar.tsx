
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
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
  X,
  Search,
  MessageSquare,
  Star,
  Clock,
  Package,
  Wallet,
  HelpCircle,
  Shield,
  Plus,
  Filter,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Basic navigation for all users (guests and authenticated)
const PUBLIC_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, auth: 'all', category: 'main' },
  { href: '/browse', label: 'Browse Items', icon: ShoppingCart, auth: 'all', category: 'main' },
  { href: '/help', label: 'Help & Support', icon: HelpCircle, auth: 'all', category: 'support' },
  { href: '/safety', label: 'Safety Center', icon: Shield, auth: 'all', category: 'support' },
];

// Navigation items for authenticated users
const AUTHENTICATED_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, auth: 'auth', category: 'main', roles: ['student', 'vendor', 'admin'] },
];

// Role-specific navigation items
const STUDENT_NAV_ITEMS = [
  { href: '/community-wishlist', label: 'Wishlist', icon: Heart, auth: 'auth', category: 'community', roles: ['student'] },
  { href: '/squad-up', label: 'Squad Up', icon: Users, auth: 'auth', category: 'community', roles: ['student'] },
  { href: '/campus-pulse', label: 'Campus Pulse', icon: TrendingUp, auth: 'auth', category: 'community', roles: ['student'] },
  { href: '/messages', label: 'Messages', icon: MessageSquare, auth: 'auth', category: 'community', roles: ['student', 'vendor'] },
  { href: '/my-rentals', label: 'My Rentals', icon: Clock, auth: 'auth', category: 'rentals', roles: ['student'] },
  { href: '/favorites', label: 'Favorites', icon: Star, auth: 'auth', category: 'rentals', roles: ['student'] },
  { href: '/campus-credits', label: 'Campus Credits', icon: Award, auth: 'auth', category: 'rewards', roles: ['student'] },
  { href: '/wallet', label: 'Wallet', icon: Wallet, auth: 'auth', category: 'rewards', roles: ['student', 'vendor'] },
  { href: '/sustainability', label: 'Green Impact', icon: Leaf, auth: 'auth', category: 'rewards', roles: ['student'] },
];

const VENDOR_NAV_ITEMS = [
  { href: '/my-listings', label: 'My Listings', icon: Package, auth: 'auth', category: 'business', roles: ['vendor'] },
  { href: '/orders', label: 'Orders', icon: ShoppingCart, auth: 'auth', category: 'business', roles: ['vendor'] },
  { href: '/analytics', label: 'Analytics', icon: TrendingUp, auth: 'auth', category: 'business', roles: ['vendor'] },
  { href: '/messages', label: 'Messages', icon: MessageSquare, auth: 'auth', category: 'business', roles: ['vendor'] },
];

const ADMIN_NAV_ITEMS = [
  { href: '/admin-dashboard', label: 'Admin Panel', icon: LayoutDashboard, auth: 'auth', category: 'admin', roles: ['admin'] },
  { href: '/user-management', label: 'Users', icon: Users, auth: 'auth', category: 'admin', roles: ['admin'] },
  { href: '/content-moderation', label: 'Moderation', icon: Shield, auth: 'auth', category: 'admin', roles: ['admin'] },
];

// Account navigation for authenticated users
const ACCOUNT_NAV_ITEMS = [
  { href: '/profile', label: 'Profile', icon: User, auth: 'auth', category: 'account', roles: ['student', 'vendor', 'admin'] },
  { href: '/settings', label: 'Settings', icon: Settings, auth: 'auth', category: 'account', roles: ['student', 'vendor', 'admin'] },
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
  const [notifications] = useState(7);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get user role from profile
  const userRole = profile?.role || 'student';

  // Combine navigation items based on authentication and role
  const getNavigationItems = () => {
    let allItems = [...PUBLIC_NAV_ITEMS];
    
    if (user) {
      // Add basic authenticated items
      allItems = [...allItems, ...AUTHENTICATED_NAV_ITEMS];
      
      // Add role-specific items
      if (userRole === 'student') {
        allItems = [...allItems, ...STUDENT_NAV_ITEMS];
      } else if (userRole === 'vendor') {
        allItems = [...allItems, ...VENDOR_NAV_ITEMS];
      } else if (userRole === 'admin') {
        allItems = [...allItems, ...ADMIN_NAV_ITEMS];
      }
      
      // Add account items for all authenticated users
      allItems = [...allItems, ...ACCOUNT_NAV_ITEMS];
    }
    
    return allItems.filter(item => {
      if (item.auth === 'all') return true;
      if (item.auth === 'auth' && user) {
        return !item.roles || item.roles.includes(userRole);
      }
      return false;
    });
  };

  const visibleNavItems = getNavigationItems();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMobileMenu(false);
  };

  const handleNavClick = () => setMobileMenu(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const getNavItemsByCategory = (category) => {
    return visibleNavItems.filter(item => item.category === category);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-lg backdrop-blur transition-all duration-200">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center gap-3 mr-6 hover:opacity-90 transition-opacity group">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg border border-orange-200/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">RentMyDorm</span>
                <div className="text-xs text-gray-500 -mt-1">Campus Marketplace</div>
              </div>
            </Link>

            {/* Desktop Navigation - Main Items */}
            <div className="hidden lg:flex items-center gap-1">
              {getNavItemsByCategory('main').map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(location, item.href)
                      ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                      : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-20 h-10 text-sm border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg bg-gray-50/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="absolute right-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-3 h-8"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  {/* Add Item Button for students and vendors */}
                  {(userRole === 'student' || userRole === 'vendor') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                      onClick={() => navigate('/add-item')}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      List Item
                    </Button>
                  )}

                  {/* Notification bell */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative hover:bg-orange-100 transition-colors" 
                    aria-label="Notifications"
                    onClick={() => navigate('/notifications')}
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                        {notifications > 9 ? '9+' : notifications}
                      </Badge>
                    )}
                  </Button>

                  {/* Messages for students and vendors */}
                  {(userRole === 'student' || userRole === 'vendor') && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-purple-100 transition-colors"
                      onClick={() => navigate('/messages')}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  )}

                  {/* User Avatar */}
                  <div className="relative group">
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0"
                      onClick={() => navigate('/profile')}
                      title="Profile"
                    >
                      <Avatar className="h-10 w-10 border-2 border-orange-200 group-hover:border-orange-400 transition-colors">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold">
                          {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </div>

                  {/* Sign Out */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-semibold">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white font-bold transition-all duration-300 px-6">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile search and menu */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/search')}
                className="hover:bg-orange-100"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={mobileMenu ? "Close menu" : "Open menu"}
                onClick={() => setMobileMenu((v) => !v)}
                className="focus:ring focus:ring-pink-200"
              >
                {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenu && (
            <div className="lg:hidden absolute left-0 top-16 w-full bg-white/98 border-b z-40 shadow-xl animate-fade-in backdrop-blur-sm">
              <div className="flex flex-col px-5 py-6 gap-6 max-h-[80vh] overflow-y-auto">
                
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search items..."
                    className="w-full pl-11 h-12 border-2 border-gray-200 focus:border-orange-400 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                {/* Quick Actions for authenticated users */}
                {user && (userRole === 'student' || userRole === 'vendor') && (
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    onClick={() => { navigate('/add-item'); handleNavClick(); }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    List Item
                  </Button>
                )}

                {/* Navigation Categories */}
                {user ? (
                  <>
                    {/* Main Navigation */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Main</h3>
                      <div className="space-y-1">
                        {getNavItemsByCategory('main').map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                              isActive(location, item.href)
                                ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                            }`}
                            onClick={handleNavClick}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Role-specific sections */}
                    {userRole === 'student' && (
                      <>
                        {/* Community */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Community</h3>
                          <div className="space-y-1">
                            {getNavItemsByCategory('community').map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                                  isActive(location, item.href)
                                    ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                                }`}
                                onClick={handleNavClick}
                              >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Rentals */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">My Rentals</h3>
                          <div className="space-y-1">
                            {getNavItemsByCategory('rentals').map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                                  isActive(location, item.href)
                                    ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                                }`}
                                onClick={handleNavClick}
                              >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Rewards */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Rewards</h3>
                          <div className="space-y-1">
                            {getNavItemsByCategory('rewards').map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                                  isActive(location, item.href)
                                    ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                                }`}
                                onClick={handleNavClick}
                              >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {userRole === 'vendor' && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Business</h3>
                        <div className="space-y-1">
                          {getNavItemsByCategory('business').map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                                isActive(location, item.href)
                                  ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                              }`}
                              onClick={handleNavClick}
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {userRole === 'admin' && (
                      <div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Administration</h3>
                        <div className="space-y-1">
                          {getNavItemsByCategory('admin').map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                                isActive(location, item.href)
                                  ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                              }`}
                              onClick={handleNavClick}
                            >
                              <item.icon className="w-5 h-5" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Account */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Account</h3>
                      <div className="space-y-1">
                        {getNavItemsByCategory('account').concat(getNavItemsByCategory('support')).map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                              isActive(location, item.href)
                                ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                                : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                            }`}
                            onClick={handleNavClick}
                          >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Guest Navigation */
                  <div className="space-y-1">
                    {getNavItemsByCategory('main').concat(getNavItemsByCategory('support')).map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                          isActive(location, item.href)
                            ? 'bg-gradient-to-r from-orange-100 to-pink-100 text-pink-700 shadow-md'
                            : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                        }`}
                        onClick={handleNavClick}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Mobile user actions */}
                <div className="border-t border-gray-200 pt-6">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                            {profile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">{profile?.full_name || 'User'}</div>
                          <div className="text-sm text-gray-500 capitalize">{userRole}</div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 text-red-600 hover:bg-red-100 border-red-200"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </Button>
                    </div>
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
      </nav>
      
      {/* Custom styles */}
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;
