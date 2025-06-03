
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Package, Heart, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { profile, user } = useAuth();

  const quickActions = [
    {
      title: "List New Item",
      description: "Start earning by listing items for rent",
      icon: PlusCircle,
      href: "/list-item",
      color: "bg-blue-500"
    },
    {
      title: "Browse Items",
      description: "Find items you need on campus",
      icon: Package,
      href: "/browse",
      color: "bg-green-500"
    },
    {
      title: "My Wishlist",
      description: "Items you've saved for later",
      icon: Heart,
      href: "/wishlist",
      color: "bg-pink-500"
    },
    {
      title: "Messages",
      description: "Chat with other users",
      icon: MessageSquare,
      href: "/messages",
      color: "bg-purple-500"
    }
  ];

  const stats = [
    { label: "Active Rentals", value: "0", icon: Calendar },
    { label: "Total Earnings", value: "₹0", icon: TrendingUp },
    { label: "Items Listed", value: "0", icon: Package },
    { label: "Karma Score", value: profile?.karma_score || 100, icon: TrendingUp }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.full_name || user?.email}!
        </h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {profile?.role?.charAt(0).toUpperCase() + profile?.role?.slice(1)}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Trust Level: {profile?.trust_level}
          </Badge>
          {profile?.campus_verified && (
            <Badge className="text-sm bg-green-500">
              Campus Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white mr-3`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold group-hover:text-indigo-600 transition-colors">
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Rentals</CardTitle>
            <CardDescription>Your latest rental activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent rental activity</p>
              <Button className="mt-4" asChild>
                <Link to="/browse">Start Browsing Items</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>Items you've listed for rent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No items listed yet</p>
              <Button className="mt-4" asChild>
                <Link to="/list-item">List Your First Item</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
