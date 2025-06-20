
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  Users,
  Heart,
  MessageSquare,
  Clock,
  MapPin,
  Star,
  Share2
} from 'lucide-react';

const StudentHomePage = () => {
  const trendingItems = [
    {
      id: 1,
      title: 'MacBook Pro M2 13"',
      price: '₹800/day',
      owner: 'Rahul Kumar',
      college: 'IIT Delhi',
      rating: 4.8,
      distance: '0.5 km',
      image: '/placeholder.svg',
      trending: true
    },
    {
      id: 2,
      title: 'Gaming Chair RGB',
      price: '₹200/day',
      owner: 'Priya Sharma',
      college: 'BITS Pilani',
      rating: 4.9,
      distance: '1.2 km',
      image: '/placeholder.svg',
      likes: 23
    },
    {
      id: 3,
      title: 'Canon EOS R5',
      price: '₹1200/day',
      owner: 'Tech Rentals',
      college: 'NIT Trichy',
      rating: 4.7,
      distance: '2.1 km',
      image: '/placeholder.svg',
      verified: true
    }
  ];

  const campusAnnouncements = [
    {
      id: 1,
      title: 'New Electronics Category Added!',
      content: 'Now rent latest gadgets from verified vendors.',
      time: '2 hours ago',
      type: 'update'
    },
    {
      id: 2,
      title: 'Campus Cleanup Drive',
      content: 'Join us for a sustainable campus initiative this weekend.',
      time: '5 hours ago',
      type: 'event'
    }
  ];

  const squadRequests = [
    {
      id: 1,
      item: 'Projector for Presentation',
      members: 3,
      needed: 2,
      saving: '₹150 per person'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back! 🎓
            </h1>
            <p className="text-gray-600">
              Discover trending items on your campus and connect with fellow students.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            <Heart className="w-4 h-4 mr-2" />
            Request Item
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-200 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-600">Active Rentals</p>
                <p className="text-2xl font-bold text-green-800">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-200 rounded-lg">
                <Users className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Squad Points</p>
                <p className="text-2xl font-bold text-blue-800">1,250</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-200 rounded-lg">
                <Heart className="w-5 h-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Wishlist Items</p>
                <p className="text-2xl font-bold text-yellow-800">7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-200 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Messages</p>
                <p className="text-2xl font-bold text-purple-800">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Trending on Campus</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        {item.trending && (
                          <Badge className="bg-red-100 text-red-700">Trending</Badge>
                        )}
                        {item.verified && (
                          <Badge className="bg-green-100 text-green-700">Verified</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {item.owner.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{item.owner}</span>
                      </div>
                      <span>•</span>
                      <span>{item.college}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <span className="font-bold text-green-600">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Squad Up */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Squad Up</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {squadRequests.map((squad) => (
                <div key={squad.id} className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-2">{squad.item}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{squad.members}/{squad.members + squad.needed} members</p>
                    <p className="text-green-600 font-medium">Save {squad.saving}</p>
                  </div>
                  <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                    Join Squad
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <span>Campus Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campusAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-medium text-gray-900 mb-1">{announcement.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{announcement.time}</span>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
