
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Filter, MapPin, Calendar, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type RentalItem = Tables<'rental_items'> & {
  profiles: { full_name: string; karma_score: number } | null;
};

const BrowseItemsPage = () => {
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('created_at');
  
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = [
    'textbooks', 'reference_books', 'competitive_exam_prep', 'laptops_notebooks',
    'gaming_consoles_accessories', 'room_coolers_fans', 'ethnic_wear_festive',
    'sports_equipment_indoor', 'musical_instruments', 'electronics'
  ];

  useEffect(() => {
    fetchItems();
  }, [selectedCategory, sortBy]);

  const fetchItems = async () => {
    setLoading(true);
    
    let query = supabase
      .from('rental_items')
      .select(`
        *,
        profiles!rental_items_lister_id_fkey (
          full_name,
          karma_score
        )
      `)
      .eq('is_active', true)
      .eq('is_available', true);

    if (selectedCategory !== 'all') {
      // Cast to the proper type for the database query
      query = query.eq('category', selectedCategory as any);
    }

    query = query.order(sortBy, { ascending: sortBy === 'price_per_day' });

    const { data, error } = await query;

    if (error) {
      toast({
        title: "Error fetching items",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setItems(data || []);
    }
    
    setLoading(false);
  };

  const handleAddToWishlist = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to wishlist",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('wishlist')
      .insert({
        user_id: user.id,
        item_id: itemId
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already in wishlist",
          description: "This item is already in your wishlist"
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist"
      });
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const pricePerDay = parseFloat(item.price_per_day.toString());
    const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
    const matchesPrice = pricePerDay >= minPrice && pricePerDay <= maxPrice;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Items</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Input
                placeholder="Min ₹"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
              <Input
                placeholder="Max ₹"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest First</SelectItem>
                <SelectItem value="price_per_day">Price: Low to High</SelectItem>
                <SelectItem value="view_count">Most Popular</SelectItem>
                <SelectItem value="rental_count">Most Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                {item.image_urls && item.image_urls.length > 0 ? (
                  <img
                    src={item.image_urls[0]}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleAddToWishlist(item.id)}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                
                {item.booking_type === 'instant' && (
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    Instant Book
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate">{item.title}</h3>
                  <Badge variant="outline">
                    {item.condition.replace('_', ' ')}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {item.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  {item.profiles && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">
                        {item.profiles.karma_score || 100} karma
                      </span>
                    </div>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {item.category.replace(/_/g, ' ')}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{item.price_per_day}
                    </span>
                    <span className="text-gray-500 text-sm">/day</span>
                  </div>
                  
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
          <p className="text-gray-400">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseItemsPage;
