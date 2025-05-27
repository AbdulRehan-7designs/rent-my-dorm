
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Heart, 
  Share2, 
  Eye,
  Book,
  Zap,
  Settings,
  Gift,
  TrendingUp,
  Package,
  ArrowLeft
} from 'lucide-react';

const ItemListing = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package },
    { id: 'books', name: 'Books & Study', icon: Book },
    { id: 'electronics', name: 'Electronics', icon: Zap },
    { id: 'furniture', name: 'Furniture', icon: Settings },
    { id: 'kitchenware', name: 'Kitchen Items', icon: Gift },
    { id: 'sports', name: 'Sports & Fitness', icon: TrendingUp }
  ];

  const sampleItems = [
    {
      id: 1,
      title: 'MacBook Pro 13" 2021',
      description: 'Perfect for coding and assignments. Well maintained with original charger.',
      price: 1500,
      originalPrice: 2000,
      category: 'electronics',
      owner: 'Rahul Kumar',
      college: 'IIT Delhi',
      rating: 4.8,
      reviews: 15,
      available: true,
      image: '/placeholder.svg',
      tags: ['Programming', 'Design', 'Study'],
      timePosted: '2 hours ago',
      verified: true
    },
    {
      id: 2,
      title: 'Engineering Mathematics Textbook',
      description: 'Complete set of engineering maths books. All solved examples included.',
      price: 300,
      originalPrice: 800,
      category: 'books',
      owner: 'Priya Sharma',
      college: 'NIT Trichy',
      rating: 4.6,
      reviews: 8,
      available: true,
      image: '/placeholder.svg',
      tags: ['Mathematics', 'Engineering', 'Semester'],
      timePosted: '5 hours ago',
      verified: true
    },
    {
      id: 3,
      title: 'Study Table with Drawer',
      description: 'Comfortable study table perfect for hostel rooms. Easy to assemble.',
      price: 800,
      originalPrice: 1200,
      category: 'furniture',
      owner: 'Amit Patel',
      college: 'BITS Pilani',
      rating: 4.7,
      reviews: 12,
      available: true,
      image: '/placeholder.svg',
      tags: ['Study', 'Furniture', 'Hostel'],
      timePosted: '1 day ago',
      verified: true
    }
  ];

  const filteredItems = sampleItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
        </div>
        <p className="text-gray-600">Discover amazing items available for rent in your campus community</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for items, categories, or owners..."
              className="pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                <Package className="w-16 h-16 text-gray-400" />
              </div>
              {item.verified && (
                <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                  Verified
                </Badge>
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="w-8 h-8 p-0 bg-white">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-orange-600">₹{item.price}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    {item.owner.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{item.owner}</span>
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-sm text-gray-500">{item.college}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{item.timePosted}</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  Rent Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default ItemListing;
