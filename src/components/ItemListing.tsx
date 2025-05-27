
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock,
  Heart,
  Package,
  Laptop,
  Book,
  Car,
  Home,
  Gamepad2
} from 'lucide-react';

const ItemListing = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items', icon: Package, color: 'bg-blue-500' },
    { id: 'electronics', name: 'Electronics', icon: Laptop, color: 'bg-purple-500' },
    { id: 'books', name: 'Books', icon: Book, color: 'bg-green-500' },
    { id: 'vehicles', name: 'Vehicles', icon: Car, color: 'bg-red-500' },
    { id: 'furniture', name: 'Furniture', icon: Home, color: 'bg-yellow-500' },
    { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'bg-pink-500' }
  ];

  const items = [
    {
      id: 1,
      title: 'MacBook Pro 13" 2023',
      description: 'Perfect for coding and design work',
      price: '₹800/day',
      rating: 4.8,
      reviews: 24,
      location: 'IIT Delhi',
      owner: 'Rahul Kumar',
      category: 'electronics',
      image: '/placeholder.svg',
      availability: 'Available'
    },
    {
      id: 2,
      title: 'Engineering Mathematics Books Set',
      description: 'Complete set for all semesters',
      price: '₹50/week',
      rating: 4.6,
      reviews: 12,
      location: 'NIT Trichy',
      owner: 'Priya Sharma',
      category: 'books',
      image: '/placeholder.svg',
      availability: 'Available'
    },
    {
      id: 3,
      title: 'Gaming Chair - RGB',
      description: 'Comfortable chair with RGB lighting',
      price: '₹200/day',
      rating: 4.9,
      reviews: 8,
      location: 'BITS Pilani',
      owner: 'Amit Patel',
      category: 'furniture',
      image: '/placeholder.svg',
      availability: 'Rented'
    },
    {
      id: 4,
      title: 'PS5 Console + Games',
      description: 'Latest games included',
      price: '₹500/day',
      rating: 5.0,
      reviews: 15,
      location: 'VIT Vellore',
      owner: 'Sneha Singh',
      category: 'gaming',
      image: '/placeholder.svg',
      availability: 'Available'
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for items..."
              className="pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`flex items-center space-x-2 ${
                selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                  : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={`w-5 h-5 rounded ${category.color} flex items-center justify-center`}>
                <category.icon className="w-3 h-3 text-white" />
              </div>
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Badge 
                className={`absolute top-2 left-2 ${
                  item.availability === 'Available' 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}
              >
                {item.availability}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-orange-600">{item.price}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500">({item.reviews})</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>2h ago</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                      {item.owner.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{item.owner}</span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ItemListing;
