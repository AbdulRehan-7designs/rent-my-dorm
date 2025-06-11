
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Share2, 
  Filter,
  Users,
  Calendar,
  Star,
  Bell,
  BookOpen,
  Camera,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface PulseFeedItem {
  id: string;
  content_type: 'new_listing' | 'trending_item' | 'request' | 'announcement' | 'recommendation';
  title: string;
  description: string;
  image_url?: string;
  priority: number;
  is_viewed: boolean;
  created_at: string;
  user?: {
    full_name: string;
  };
  item?: {
    price_per_day: number;
    category: string;
  };
}

const CampusPulsePage = () => {
  const { profile } = useAuth();
  const [filter, setFilter] = useState<'all' | 'listings' | 'requests' | 'announcements'>('all');

  // Mock feed data
  const mockFeedItems: PulseFeedItem[] = [
    {
      id: '1',
      content_type: 'new_listing',
      title: 'New MacBook Pro 16" Available for Rent',
      description: 'Perfect for video editing and development work. Includes charger and protective case.',
      image_url: '/placeholder.svg',
      priority: 3,
      is_viewed: false,
      created_at: '2024-01-15T10:30:00Z',
      user: { full_name: 'Priya Singh' },
      item: { price_per_day: 800, category: 'electronics' }
    },
    {
      id: '2',
      content_type: 'trending_item',
      title: 'Gaming Setup in High Demand',
      description: 'RTX 4080 Gaming PC is trending! 5 students are looking for similar setups.',
      image_url: '/placeholder.svg',
      priority: 2,
      is_viewed: true,
      created_at: '2024-01-15T09:15:00Z',
      item: { price_per_day: 1200, category: 'gaming' }
    },
    {
      id: '3',
      content_type: 'request',
      title: 'Looking for GATE Preparation Books',
      description: 'Need comprehensive GATE books for Computer Science. Willing to pay ₹50/day.',
      priority: 1,
      is_viewed: false,
      created_at: '2024-01-15T08:45:00Z',
      user: { full_name: 'Rahul Kumar' }
    },
    {
      id: '4',
      content_type: 'announcement',
      title: 'New Safety Guidelines Released',
      description: 'Updated community guidelines for safe rentals. Please review the new policies.',
      priority: 3,
      is_viewed: false,
      created_at: '2024-01-14T16:20:00Z'
    },
    {
      id: '5',
      content_type: 'recommendation',
      title: 'Recommended: Professional Camera',
      description: 'Based on your photography interest, check out this Canon DSLR available nearby.',
      image_url: '/placeholder.svg',
      priority: 2,
      is_viewed: true,
      created_at: '2024-01-14T14:10:00Z',
      item: { price_per_day: 600, category: 'cameras' }
    }
  ];

  const filteredItems = mockFeedItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'listings') return item.content_type === 'new_listing';
    if (filter === 'requests') return item.content_type === 'request';
    if (filter === 'announcements') return item.content_type === 'announcement';
    return true;
  });

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'new_listing':
        return <BookOpen className="w-4 h-4" />;
      case 'trending_item':
        return <TrendingUp className="w-4 h-4" />;
      case 'request':
        return <MessageCircle className="w-4 h-4" />;
      case 'announcement':
        return <Bell className="w-4 h-4" />;
      case 'recommendation':
        return <Star className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'new_listing':
        return 'bg-blue-100 text-blue-600';
      case 'trending_item':
        return 'bg-green-100 text-green-600';
      case 'request':
        return 'bg-purple-100 text-purple-600';
      case 'announcement':
        return 'bg-orange-100 text-orange-600';
      case 'recommendation':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const campusCredits = profile?.karma_score || 250;
  const successfulRentals = profile?.karma_score ? Math.floor(profile.karma_score / 10) : 8;
  const trustScore = profile?.karma_score || 85;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campus Pulse</h1>
          <p className="text-gray-600">Your personalized campus activity feed</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded-md px-3 py-2"
          >
            <option value="all">All Updates</option>
            <option value="listings">New Listings</option>
            <option value="requests">Requests</option>
            <option value="announcements">Announcements</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Feed Items */}
        <div className="lg:col-span-3 space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`hover:shadow-md transition-shadow ${!item.is_viewed ? 'border-l-4 border-l-blue-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getContentTypeColor(item.content_type)}`}>
                    {getContentTypeIcon(item.content_type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {item.content_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    {item.user && (
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {item.user.full_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-500">{item.user.full_name}</span>
                      </div>
                    )}
                    
                    {item.item && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 capitalize">{item.item.category}</span>
                          <span className="font-semibold text-green-600">₹{item.item.price_per_day}/day</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">Like</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Comment</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          <span className="text-sm">Share</span>
                        </Button>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Campus Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Campus Credits</span>
                <span className="font-semibold text-blue-600">{campusCredits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Successful Rentals</span>
                <span className="font-semibold text-green-600">{successfulRentals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trust Score</span>
                <span className="font-semibold text-purple-600">{trustScore}/100</span>
              </div>
            </CardContent>
          </Card>

          {/* Trending Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Textbooks</span>
                </div>
                <Badge variant="secondary">+15%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Gaming</span>
                </div>
                <Badge variant="secondary">+12%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Photography</span>
                </div>
                <Badge variant="secondary">+8%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Find Study Buddies
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Campus Events
              </Button>
              <Button className="w-full" variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Set Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampusPulsePage;
