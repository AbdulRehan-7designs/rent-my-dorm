
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Brain, TrendingUp, Star, Clock, MapPin, ArrowLeft, Sparkles, Target, Zap, Filter } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AIRecommendations = ({ onBack, user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock AI recommendations data
  const mockRecommendations = [
    {
      id: 1,
      title: 'MacBook Pro 13" M1',
      description: 'Perfect for your Computer Science coursework',
      price: 1800,
      aiReason: 'Based on your CS major and previous laptop searches',
      confidence: 95,
      category: 'electronics',
      owner: 'Arjun Sharma',
      college: 'IIT Delhi',
      rating: 4.9,
      image: '/placeholder.svg',
      trending: true,
      matchScore: 'Excellent Match'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms Book Set',
      description: 'Complete collection for competitive programming',
      price: 600,
      aiReason: 'Your recent search for programming books',
      confidence: 88,
      category: 'books',
      owner: 'Priya Singh',
      college: 'NIT Trichy',
      rating: 4.7,
      image: '/placeholder.svg',
      seasonal: true,
      matchScore: 'Great Match'
    },
    {
      id: 3,
      title: 'Study Desk with LED Light',
      description: 'Ergonomic design perfect for long study sessions',
      price: 1200,
      aiReason: 'Students in your hostel often rent furniture',
      confidence: 92,
      category: 'furniture',
      owner: 'Rahul Patel',
      college: 'BITS Pilani',
      rating: 4.8,
      image: '/placeholder.svg',
      popular: true,
      matchScore: 'Perfect Match'
    }
  ];

  useEffect(() => {
    // Simulate AI processing
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
      toast({
        title: "AI Recommendations Ready! 🎯",
        description: "Personalized suggestions based on your preferences",
      });
    }, 2000);
  }, []);

  const categories = [
    { id: 'all', name: 'All Recommendations' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'books', name: 'Books' },
    { id: 'furniture', name: 'Furniture' }
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(item => item.category === selectedCategory);

  const getMatchColor = (score) => {
    switch (score) {
      case 'Perfect Match': return 'bg-green-100 text-green-800';
      case 'Excellent Match': return 'bg-blue-100 text-blue-800';
      case 'Great Match': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-purple-600" />
              AI Smart Recommendations
            </h1>
            <p className="text-gray-600 mt-2">Personalized suggestions powered by machine learning</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* AI Insights Panel */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Target className="w-5 h-5 mr-2" />
            Your AI Profile Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">CS Student</div>
              <div className="text-sm text-gray-600">Detected Interest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3rd Year</div>
              <div className="text-sm text-gray-600">Academic Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">₹2000</div>
              <div className="text-sm text-gray-600">Avg. Budget</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? 
              "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
          >
            <Filter className="w-4 h-4 mr-2" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 mx-auto text-purple-600 animate-pulse mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI is analyzing your preferences...</h3>
          <p className="text-gray-600">This may take a few seconds</p>
        </div>
      )}

      {/* Recommendations Grid */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-purple-200">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {item.trending && (
                    <Badge className="bg-red-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {item.seasonal && (
                    <Badge className="bg-orange-500 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      Seasonal
                    </Badge>
                  )}
                  {item.popular && (
                    <Badge className="bg-green-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Match Score */}
                <div className="absolute top-3 right-3">
                  <Badge className={getMatchColor(item.matchScore)}>
                    {item.matchScore}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₹{item.price}</div>
                    <div className="text-sm text-gray-500">per month</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                {/* AI Reason */}
                <div className="bg-purple-50 rounded-lg p-3 mb-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Zap className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm font-semibold text-purple-800">AI Insight</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {item.confidence}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-700">{item.aiReason}</p>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="w-8 h-8 mr-3">
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {item.owner.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{item.owner}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.college}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Contact Owner
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
