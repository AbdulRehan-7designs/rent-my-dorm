
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Heart, Calendar, DollarSign, Award, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ItemRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  max_price_per_day: number;
  needed_from: string;
  needed_until: string;
  campus_credits_bounty: number;
  requester_id: string;
  created_at: string;
  profiles: {
    full_name: string;
    campus_credits: number;
  };
}

const CommunityWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    max_price_per_day: '',
    needed_from: '',
    needed_until: '',
    campus_credits_bounty: '0'
  });

  // Fetch item requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['item-requests', searchTerm, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('item_requests')
        .select(`
          *,
          profiles!item_requests_requester_id_fkey (
            full_name,
            campus_credits
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ItemRequest[];
    }
  });

  // Create item request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (requestData: any) => {
      const { error } = await supabase
        .from('item_requests')
        .insert([{ ...requestData, requester_id: user?.id }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['item-requests'] });
      setShowRequestForm(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        max_price_per_day: '',
        needed_from: '',
        needed_until: '',
        campus_credits_bounty: '0'
      });
    }
  });

  const handleSubmitRequest = () => {
    createRequestMutation.mutate({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      max_price_per_day: parseFloat(formData.max_price_per_day),
      needed_from: formData.needed_from,
      needed_until: formData.needed_until,
      campus_credits_bounty: parseInt(formData.campus_credits_bounty)
    });
  };

  const categories = [
    'textbooks', 'laptops_notebooks', 'gaming', 'electronics', 'furniture',
    'kitchen_appliances_mini', 'sports_equipment_outdoor', 'musical_instruments'
  ];

  if (isLoading) {
    return <div className="p-6 text-center">Loading community wishlist...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Wishlist</h1>
          <p className="text-gray-600">Request items you need - fellow students can help!</p>
        </div>
        <Button onClick={() => setShowRequestForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Request Item
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Request New Item
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="What do you need?"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Describe your requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Max price per day (₹)"
                value={formData.max_price_per_day}
                onChange={(e) => setFormData({ ...formData, max_price_per_day: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="date"
                placeholder="Needed from"
                value={formData.needed_from}
                onChange={(e) => setFormData({ ...formData, needed_from: e.target.value })}
              />
              <Input
                type="date"
                placeholder="Needed until"
                value={formData.needed_until}
                onChange={(e) => setFormData({ ...formData, needed_until: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Campus Credits Bounty"
                value={formData.campus_credits_bounty}
                onChange={(e) => setFormData({ ...formData, campus_credits_bounty: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitRequest} disabled={createRequestMutation.isPending}>
                {createRequestMutation.isPending ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button variant="outline" onClick={() => setShowRequestForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Requests List */}
      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No requests yet</h3>
              <p className="text-gray-500">Be the first to request an item!</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>
                    <p className="text-gray-600 mb-3">{request.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">
                        {request.category?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Up to ₹{request.max_price_per_day}/day
                      </Badge>
                      {request.campus_credits_bounty > 0 && (
                        <Badge variant="default" className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {request.campus_credits_bounty} Credits
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(request.needed_from).toLocaleDateString()} - {new Date(request.needed_until).toLocaleDateString()}
                      </span>
                      <span>by {request.profiles?.full_name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      I Can Help
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityWishlist;
