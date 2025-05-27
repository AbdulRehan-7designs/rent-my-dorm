
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Brain, 
  Star, 
  TrendingUp, 
  Target,
  Zap,
  Heart,
  MapPin,
  Clock,
  Filter,
  Sparkles,
  ThumbsUp,
  Eye
} from 'lucide-react';

const AIRecommendations = ({ onBack, user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Recommendations', icon: Sparkles },
    { id: 'trending', name: 'Trending Now', icon: TrendingUp },
    { id: 'nearby', name: 'Near You', icon: MapPin },
    { id: 'budget', name: 'Budget Friendly', icon: Target }
  ];

  const aiRecommendations = [
    {
      id: 1,
      title: 'Gaming Laptop - ASUS ROG',
      description: 'Perfect for your Computer Science projects',
      price: '₹1,200/day',
      rating: 4.9,
      reviews: 18,
      location: 'IIT Delhi - 0.5km away',
      owner: 'Arjun Singh',
      reason: 'Recommended because you frequently rent tech items and have upcoming project deadlines',
      confidence: 92,
      category: 'electronics',
      image: '/placeholder.svg',
      aiInsights: [
        'High demand in your area',
        'Perfect for gaming and coding',
        '95% positive reviews'
      ]
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms Books',
      description: 'Complete set with practice problems',
      price: '₹80/week',
      rating: 4.7,
      reviews: 25,
      location: 'Your College Library',
      owner: 'Priya Sharma',
      reason: 'Based on your Computer Science branch and exam schedule',
      confidence: 88,
      category: 'books',
      image: '/placeholder.svg',
      aiInsights: [
        'Exam season approaching',
        'High rating from CS students',
        'Recently updated edition'
      ]
    },
    {
      id: 3,
      title: 'Professional Camera Kit',
      description: 'DSLR with multiple lenses for events',
      price: '₹800/day',
      rating: 4.8,
      reviews: 12,
      location: 'VIT Vellore - 2km away',
      owner: 'Rahul Gupta',
      reason: 'You showed interest in photography equipment last month',
      confidence: 76,
      category: 'electronics',
      image: '/placeholder.svg',
      aiInsights: [
        'Cultural fest season',
        'Professional quality',
        'Includes editing software'
      ]
    },
    {
      id: 4,
      title: 'Ergonomic Study Chair',
      description: 'Comfortable chair for long study sessions',
      price: '₹150/day',
      rating: 4.6,
      reviews: 31,
      location: 'NIT Trichy - 1km away',
      owner: 'Sneha Patel',
      reason: 'AI detected you spend 8+ hours studying daily',
      confidence: 85,
      category: 'furniture',
      image: '/placeholder.svg',
      aiInsights: [
        'Reduces back strain',
        'Popular among students',
        'Easy pickup/delivery'
      ]
    }
  ];

  useEffect(() => {
    // Simulate AI processing
    setIsLoading(true);
    setTimeout(() => {
      setRecommendations(aiRecommendations);
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredRecommendations = recommendations.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'trending') return item.confidence > 85;
    if (selectedFilter === 'nearby') return item.location.includes('0.5km') || item.location.includes('1km');
    if (selectedFilter === 'budget') return parseInt(item.price.replace('₹', '')) < 500;
    return true;
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">AI Recommendations</h1>
        </div>
        
        <div className="text-center py-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <Brain className="w-20 h-20 text-purple-500 animate-pulse" />
            <div className="absolute inset-0 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is analyzing your preferences...</h3>
          <p className="text-gray-600">Finding the perfect items just for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-500" />
            <span>AI Smart Recommendations</span>
          </h1>
          <p className="text-gray-600 mt-2">Personalized suggestions powered by machine learning</p>
        </div>
      </div>

      {/* AI Insights Summary */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <Sparkles className="w-5 h-5" />
            <span>Your AI Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">92%</div>
              <div className="text-sm text-gray-600">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">Tech Enthusiast</div>
              <div className="text-sm text-gray-600">Primary Interest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">₹800</div>
              <div className="text-sm text-gray-600">Avg Budget</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            className={`flex items-center space-x-2 ${
              selectedFilter === filter.id 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                : ''
            }`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            <filter.icon className="w-4 h-4" />
            <span>{filter.name}</span>
          </Button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      {item.confidence}% match
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-orange-600">{item.price}</span>
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
                      <span>Available now</span>
                    </div>
                  </div>

                  {/* AI Reason */}
                  <div className="bg-purple-50 rounded-lg p-3 mb-4">
                    <div className="flex items-start space-x-2">
                      <Brain className="w-4 h-4 text-purple-500 mt-0.5" />
                      <p className="text-sm text-purple-800">
                        <span className="font-medium">AI Insight: </span>
                        {item.reason}
                      </p>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Why this is perfect for you:</h4>
                    <div className="space-y-1">
                      {item.aiInsights.map((insight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Owner and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                          {item.owner.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{item.owner}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Learning Notice */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="font-semibold text-blue-900">AI is learning from your preferences</h3>
              <p className="text-sm text-blue-700">
                The more you interact with items, the better our recommendations become. 
                Your privacy is protected - we only use anonymous usage patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
