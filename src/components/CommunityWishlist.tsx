
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  Plus, 
  MessageCircle, 
  Calendar, 
  DollarSign, 
  Filter,
  BookOpen,
  Camera,
  Gamepad2,
  Laptop,
  Users
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ItemRequest {
  id: string;
  requester_id: string;
  item_name: string;
  description?: string;
  category: string;
  max_price_per_day?: number;
  needed_from?: string;
  needed_until?: string;
  is_fulfilled: boolean;
  is_active: boolean;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

const CommunityWishlist = () => {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    category: 'textbooks',
    max_price_per_day: '',
    needed_from: '',
    needed_until: ''
  });

  // Mock data for item requests
  const mockRequests: ItemRequest[] = [
    {
      id: '1',
      requester_id: 'user1',
      item_name: 'Organic Chemistry Textbook',
      description: 'Need Morrison & Boyd for semester exam preparation',
      category: 'textbooks',
      max_price_per_day: 50,
      needed_from: '2024-02-01',
      needed_until: '2024-03-15',
      is_fulfilled: false,
      is_active: true,
      created_at: '2024-01-15T10:30:00Z',
      profiles: { full_name: 'Priya Singh' }
    },
    {
      id: '2',
      requester_id: 'user2',
      item_name: 'Gaming Laptop',
      description: 'RTX 4060 or higher for game development project',
      category: 'electronics',
      max_price_per_day: 800,
      needed_from: '2024-02-10',
      needed_until: '2024-02-25',
      is_fulfilled: false,
      is_active: true,
      created_at: '2024-01-14T15:45:00Z',
      profiles: { full_name: 'Rahul Kumar' }
    },
    {
      id: '3',
      requester_id: 'user3',
      item_name: 'DSLR Camera',
      description: 'For college fest photography, any Canon/Nikon DSLR',
      category: 'cameras',
      max_price_per_day: 600,
      needed_from: '2024-02-20',
      needed_until: '2024-02-22',
      is_fulfilled: false,
      is_active: true,
      created_at: '2024-01-13T09:15:00Z',
      profiles: { full_name: 'Anisha Patel' }
    }
  ];

  const filteredRequests = mockRequests.filter(request => {
    if (selectedCategory === 'all') return true;
    return request.category === selectedCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app would call API
    console.log('Creating item request:', formData);
    setShowCreateForm(false);
    setFormData({
      item_name: '',
      description: '',
      category: 'textbooks',
      max_price_per_day: '',
      needed_from: '',
      needed_until: ''
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'textbooks':
        return <BookOpen className="w-4 h-4" />;
      case 'electronics':
        return <Laptop className="w-4 h-4" />;
      case 'cameras':
        return <Camera className="w-4 h-4" />;
      case 'gaming':
        return <Gamepad2 className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'textbooks':
        return 'bg-blue-100 text-blue-700';
      case 'electronics':
        return 'bg-purple-100 text-purple-700';
      case 'cameras':
        return 'bg-green-100 text-green-700';
      case 'gaming':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Wishlist</h1>
          <p className="text-gray-600">Request items you need from the community</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Request Item
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Requests
        </Button>
        <Button
          variant={selectedCategory === 'textbooks' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('textbooks')}
          className="flex items-center gap-1"
        >
          <BookOpen className="w-3 h-3" />
          Textbooks
        </Button>
        <Button
          variant={selectedCategory === 'electronics' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('electronics')}
          className="flex items-center gap-1"
        >
          <Laptop className="w-3 h-3" />
          Electronics
        </Button>
        <Button
          variant={selectedCategory === 'cameras' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('cameras')}
          className="flex items-center gap-1"
        >
          <Camera className="w-3 h-3" />
          Cameras
        </Button>
      </div>

      {/* Create Request Form */}
      {showCreateForm && (
        <Card className="border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-700">Create New Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <Input
                    value={formData.item_name}
                    onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                    placeholder="e.g., MacBook Pro, Organic Chemistry Book"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="textbooks">Textbooks</option>
                    <option value="electronics">Electronics</option>
                    <option value="cameras">Cameras</option>
                    <option value="gaming">Gaming</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide more details about what you're looking for..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price/Day (₹)
                  </label>
                  <Input
                    type="number"
                    value={formData.max_price_per_day}
                    onChange={(e) => setFormData({ ...formData, max_price_per_day: e.target.value })}
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Needed From
                  </label>
                  <Input
                    type="date"
                    value={formData.needed_from}
                    onChange={(e) => setFormData({ ...formData, needed_from: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Needed Until
                  </label>
                  <Input
                    type="date"
                    value={formData.needed_until}
                    onChange={(e) => setFormData({ ...formData, needed_until: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Create Request
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Requests Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No requests found</h3>
            <p className="text-gray-500">Be the first to create a request in this category!</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{request.item_name}</CardTitle>
                  <Badge className={getCategoryColor(request.category)}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(request.category)}
                      <span className="capitalize">{request.category}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {request.description && (
                  <p className="text-gray-600 text-sm">{request.description}</p>
                )}

                <div className="space-y-2">
                  {request.max_price_per_day && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Max Budget
                      </span>
                      <span className="font-semibold text-green-600">₹{request.max_price_per_day}/day</span>
                    </div>
                  )}

                  {request.needed_from && request.needed_until && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Duration
                      </span>
                      <span>
                        {new Date(request.needed_from).toLocaleDateString()} - {new Date(request.needed_until).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {request.profiles.full_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">Requested by {request.profiles.full_name}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Respond
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  Posted {new Date(request.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityWishlist;
