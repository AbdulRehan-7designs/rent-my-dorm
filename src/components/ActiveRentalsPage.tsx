
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  Phone
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ActiveRentalsPage = ({ onBack }) => {
  const [activeRentals] = useState([
    {
      id: 1,
      title: 'MacBook Pro 13"',
      renter: 'Priya Sharma',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      dailyRate: 800,
      totalAmount: 4000,
      status: 'active',
      daysLeft: 2,
      image: '/placeholder.svg',
      location: 'IIT Delhi'
    },
    {
      id: 2,
      title: 'Canon DSLR Camera',
      renter: 'Amit Patel',
      startDate: '2024-01-18',
      endDate: '2024-01-25',
      dailyRate: 500,
      totalAmount: 3500,
      status: 'active',
      daysLeft: 5,
      image: '/placeholder.svg',
      location: 'NIT Trichy'
    }
  ]);

  const [completedRentals] = useState([
    {
      id: 3,
      title: 'Gaming Chair RGB',
      renter: 'Rahul Kumar',
      startDate: '2024-01-10',
      endDate: '2024-01-14',
      dailyRate: 200,
      totalAmount: 800,
      status: 'completed',
      rating: 5,
      review: 'Great chair, very comfortable!',
      image: '/placeholder.svg',
      location: 'BITS Pilani'
    }
  ]);

  const handleContact = (renterName) => {
    toast({
      title: "Opening chat...",
      description: `Starting conversation with ${renterName}`,
    });
  };

  const handleExtendRental = (id) => {
    toast({
      title: "Extension request sent! 📋",
      description: "The renter will be notified about the extension option",
    });
  };

  const RentalCard = ({ rental, type }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={rental.image} 
            alt={rental.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{rental.title}</h3>
              <Badge 
                className={
                  rental.status === 'active' ? 'bg-green-500' :
                  rental.status === 'completed' ? 'bg-blue-500' :
                  'bg-yellow-500'
                }
              >
                {rental.status === 'active' ? 'Active' : 
                 rental.status === 'completed' ? 'Completed' : 'Pending'}
              </Badge>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                  {rental.renter.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{rental.renter}</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{rental.location}</span>
              </div>
              {type === 'active' && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{rental.daysLeft} days remaining</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-lg font-bold text-orange-600">₹{rental.totalAmount}</p>
                <p className="text-sm text-gray-500">₹{rental.dailyRate}/day</p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleContact(rental.renter)}
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Contact
                </Button>
                {type === 'active' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleExtendRental(rental.id)}
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    Extend
                  </Button>
                )}
                {type === 'completed' && rental.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{rental.rating}</span>
                  </div>
                )}
              </div>
            </div>

            {type === 'completed' && rental.review && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm italic">"{rental.review}"</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                <p className="text-3xl font-bold text-green-600">{activeRentals.length}</p>
              </div>
              <Package className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-3xl font-bold text-orange-600">₹12,300</p>
              </div>
              <CheckCircle className="w-12 h-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-yellow-600">4.8</p>
              </div>
              <Star className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Active Rentals ({activeRentals.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Completed ({completedRentals.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="space-y-6">
            {activeRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} type="active" />
            ))}
          </div>
          {activeRentals.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No active rentals</h3>
              <p className="text-gray-600">Your active rentals will appear here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-6">
            {completedRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} type="completed" />
            ))}
          </div>
          {completedRentals.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No completed rentals</h3>
              <p className="text-gray-600">Your rental history will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActiveRentalsPage;
