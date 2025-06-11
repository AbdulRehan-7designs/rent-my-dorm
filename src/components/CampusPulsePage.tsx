import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Megaphone, 
  Heart, 
  Users, 
  Sparkles, 
  Clock,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PulseFeedItem {
  id: string;
  content_type: string;
  title: string;
  description: string;
  image_url?: string;
  priority: number;
  is_viewed: boolean;
  created_at: string;
  content_id?: string;
}

const CampusPulsePage = () => {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');

  // Fetch campus pulse feed
  const { data: feedItems = [], isLoading } = useQuery({
    queryKey: ['campus-pulse-feed', user?.id, activeTab],
    queryFn: async () => {
      let query = supabase
        .from('campus_pulse_feed')
        .select('*')
        .eq('user_id', user?.id)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (activeTab !== 'all') {
        query = query.eq('content_type', activeTab);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PulseFeedItem[];
    },
    enabled: !!user?.id
  });

  // Mark as viewed mutation
  const markViewedMutation = useMutation({
    mutationFn: async (feedItemId: string) => {
      const { error } = await supabase
        .from('campus_pulse_feed')
        .update({ is_viewed: true })
        .eq('id', feedItemId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campus-pulse-feed'] });
    }
  });

  const handleMarkViewed = (feedItemId: string) => {
    markViewedMutation.mutate(feedItemId);
  };

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case 'new_listing':
        return <Sparkles className="w-5 h-5 text-blue-500" />;
      case 'trending_item':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'request':
        return <Heart className="w-5 h-5 text-pink-500" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5 text-purple-500" />;
      case 'recommendation':
        return <Star className="w-5 h-5 text-yellow-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority >= 3) return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
    if (priority >= 2) return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
    return <Badge className="bg-gray-100 text-gray-800">Normal</Badge>;
  };

  const mockTrendingData = [
    { item: 'Gaming Laptops', requests: 24, trend: '+15%' },
    { item: 'Study Tables', requests: 18, trend: '+8%' },
    { item: 'Coolers', requests: 32, trend: '+25%' },
    { item: 'Textbooks', requests: 16, trend: '+5%' }
  ];

  const mockRecommendations = [
    {
      title: 'Semester End Study Items',
      description: 'Based on your CS course, you might need these study aids',
      items: ['Programming Books', 'Laptop Stand', 'Study Lamp']
    },
    {
      title: 'Weather Alert',
      description: 'Summer is coming! Consider these cooling items',
      items: ['Room Coolers', 'Fans', 'Mattress Cooling Pads']
    }
  ];

  if (isLoading) {
    return <div className="p-6 text-center">Loading your campus pulse...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Campus Pulse</h1>
        <p className="text-gray-600">Stay connected with your campus rental community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{profile?.campus_credits || 100}</p>
            <p className="text-sm opacity-90">Campus Credits</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{profile?.successful_rentals || 0}</p>
            <p className="text-sm opacity-90">Successful Rentals</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{profile?.trust_score || 0}</p>
            <p className="text-sm opacity-90">Trust Score</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">{feedItems.filter(item => !item.is_viewed).length}</p>
            <p className="text-sm opacity-90">New Updates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="new_listing">New Items</TabsTrigger>
          <TabsTrigger value="trending_item">Trending</TabsTrigger>
          <TabsTrigger value="request">Requests</TabsTrigger>
          <TabsTrigger value="announcement">News</TabsTrigger>
          <TabsTrigger value="recommendation">For You</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {feedItems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Sparkles className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Your pulse is quiet</h3>
                  <p className="text-gray-500">Start interacting with the community to see updates here!</p>
                </CardContent>
              </Card>
            ) : (
              feedItems.map((item) => (
                <Card key={item.id} className={`hover:shadow-md transition-shadow ${!item.is_viewed ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {getContentIcon(item.content_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            {getPriorityBadge(item.priority)}
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt=""
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                        )}
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">
                            {item.content_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          {!item.is_viewed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkViewed(item.id)}
                              className="text-blue-600"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending_item" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Items on Campus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrendingData.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{trend.item}</h4>
                      <p className="text-sm text-gray-600">{trend.requests} requests this week</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{trend.trend}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendation" className="space-y-4">
          {mockRecommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  {rec.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{rec.description}</p>
                <div className="flex flex-wrap gap-2">
                  {rec.items.map((item, itemIndex) => (
                    <Badge key={itemIndex} variant="outline">{item}</Badge>
                  ))}
                </div>
                <Button className="mt-4 w-full" variant="outline">
                  Explore Recommendations
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  );
};

export default CampusPulsePage;
