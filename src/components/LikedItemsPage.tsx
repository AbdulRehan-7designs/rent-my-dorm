
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  MapPin, 
  Clock,
  Bookmark,
  Trash2,
  MessageSquare
} from 'lucide-react';

const LikedItemsPage = ({ onBack }) => {
  const [likedItems, setLikedItems] = useState([
    {
      id: 1,
      title: 'MacBook Pro 13"',
      price: '₹800/day',
      rating: 4.8,
      reviews: 24,
      location: 'IIT Delhi',
      owner: 'Rahul Kumar',
      image: '/placeholder.svg',
      saved: true
    },
    {
      id: 2,
      title: 'Gaming Chair RGB',
      price: '₹200/day',
      rating: 4.9,
      reviews: 12,
      location: 'NIT Trichy',
      owner: 'Priya Sharma',
      image: '/placeholder.svg',
      saved: true
    }
  ]);

  const [savedItems, setSavedItems] = useState([
    {
      id: 3,
      title: 'Canon DSLR Camera',
      price: '₹500/day',
      rating: 4.7,
      reviews: 18,
      location: 'BITS Pilani',
      owner: 'Amit Patel',
      image: '/placeholder.svg',
      saved: true
    }
  ]);

  const removeLikedItem = (id) => {
    setLikedItems(prev => prev.filter(item => item.id !== id));
  };

  const removeSavedItem = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const ItemCard = ({ item, onRemove, type }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
            onClick={() => onRemove(item.id)}
          >
            {type === 'liked' ? <Heart className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4 fill-current" />}
          </Button>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        
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
            <span>Available</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                {item.owner.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{item.owner}</span>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="w-3 h-3 mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline" onClick={() => onRemove(item.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
      </div>

      <Tabs defaultValue="liked" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="liked" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Liked Items ({likedItems.length})</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4" />
            <span>Saved Items ({savedItems.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="liked" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onRemove={removeLikedItem}
                type="liked"
              />
            ))}
          </div>
          {likedItems.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No liked items yet</h3>
              <p className="text-gray-600">Start exploring and like items you're interested in!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onRemove={removeSavedItem}
                type="saved"
              />
            ))}
          </div>
          {savedItems.length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved items yet</h3>
              <p className="text-gray-600">Save items you want to rent later!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LikedItemsPage;
