
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  Clock,
  Zap,
  Users
} from 'lucide-react';

const BrowseItemsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  
  const categories = [
    'All Categories',
    'Electronics',
    'Books',
    'Furniture',
    'Sports',
    'Musical Instruments',
    'Vehicles'
  ];

  const items = [
    {
      id: 1,
      title: 'MacBook Pro M2 13"',
      description: 'Perfect for coding and design work. Includes charger and case.',
      price: '₹800/day',
      originalPrice: '₹1000/day',
      owner: 'Rahul Kumar',
      college: 'IIT Delhi',
      rating: 4.8,
      reviews: 23,
      distance: '0.5 km',
      image: '/placeholder.svg',
      available: true,
      instantBook: true,
      verified: true,
      category: 'Electronics'
    },
    {
      id: 2,
      title: 'Canon EOS R5 Camera',
      description: 'Professional camera with multiple lenses for events and photography.',
      price: '₹1200/day',
      owner: 'Photography Club',
      college: 'BITS Pilani',
      rating: 4.9,
      reviews: 45,
      distance: '1.2 km',
      image: '/placeholder.svg',
      available: true,
      squadAvailable: true,
      category: 'Electronics'
    },
    {
      id: 3,
      title: 'Gaming Chair RGB',
      description: 'Comfortable ergonomic chair with RGB lighting for gaming setup.',
      price: '₹200/day',
      owner: 'Gamer Hub',
      college: 'NIT Trichy',
      rating: 4.7,
      reviews: 12,
      distance: '2.1 km',
      image: '/placeholder.svg',
      available: false,
      nextAvailable: '2 days',
      category: 'Furniture'
    },
    {
      id: 4,
      title: 'Engineering Textbook Set',
      description: 'Complete set of 4th semester mechanical engineering books.',
      price: '₹50/day',
      owner: 'Priya Sharma',
      college: 'VIT Vellore',
      rating: 4.6,
      reviews: 8,
      distance: '0.8 km',
      image: '/placeholder.svg',
      available: true,
      category: 'Books'
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Items</h1>
        <p className="text-gray-600">Discover and rent items from fellow students and local businesses</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-100">₹0 - ₹100</SelectItem>
                <SelectItem value="100-500">₹100 - ₹500</SelectItem>
                <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                <SelectItem value="1000+">₹1000+</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredItems.length} items {searchQuery && `for "${searchQuery}"`}
        </p>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                {item.verified && (
                  <Badge className="bg-green-100 text-green-700">Verified</Badge>
                )}
                {item.instantBook && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <Zap className="w-3 h-3 mr-1" />
                    Instant
                  </Badge>
                )}
                {item.squadAvailable && (
                  <Badge className="bg-purple-100 text-purple-700">
                    <Users className="w-3 h-3 mr-1" />
                    Squad
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-3 right-3 bg-white/80 hover:bg-white"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {item.owner.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{item.owner}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{item.college}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{item.distance}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through mr-2">
                      {item.originalPrice}
                    </span>
                  )}
                  <span className="font-bold text-green-600">{item.price}</span>
                </div>
                
                {item.available ? (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Rent Now
                  </Button>
                ) : (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Available in</p>
                    <p className="text-sm font-medium text-orange-600">{item.nextAvailable}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Load More Items
        </Button>
      </div>
    </div>
  );
};

export default BrowseItemsPage;
