
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Calendar,
  User,
  Star,
  MessageSquare,
  RefreshCw
} from 'lucide-react';

const MyRentalsPage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('active');

  const activeRentals = [
    {
      id: 1,
      item: 'MacBook Pro 13"',
      owner: 'Rahul Sharma',
      rentedOn: '2024-01-15',
      dueDate: '2024-01-22',
      amount: '₹500/day',
      status: 'active',
      image: '/placeholder.svg',
      rating: 4.8
    },
    {
      id: 2,
      item: 'Engineering Mathematics Textbook',
      owner: 'Priya Singh',
      rentedOn: '2024-01-10',
      dueDate: '2024-01-25',
      amount: '₹50/day',
      status: 'active',
      image: '/placeholder.svg',
      rating: 4.9
    }
  ];

  const pastRentals = [
    {
      id: 3,
      item: 'Study Table',
      owner: 'Amit Kumar',
      rentedOn: '2023-12-20',
      returnedOn: '2024-01-05',
      amount: '₹100/day',
      status: 'returned',
      image: '/placeholder.svg',
      rating: 4.7
    },
    {
      id: 4,
      item: 'Gaming Chair',
      owner: 'Sneha Patel',
      rentedOn: '2023-11-15',
      returnedOn: '2023-12-01',
      amount: '₹150/day',
      status: 'returned',
      image: '/placeholder.svg',
      rating: 5.0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'returned':
        return <CheckCircle className="w-4 h-4" />;
      case 'overdue':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const RentalCard = ({ rental, isActive = false }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{rental.item}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{rental.owner}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{rental.rating}</span>
                </div>
              </div>
              <p className="text-orange-600 font-semibold mt-1">{rental.amount}</p>
            </div>
          </div>
          <Badge className={getStatusColor(rental.status)}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(rental.status)}
              <span className="capitalize">{rental.status}</span>
            </div>
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500">Rented On</p>
            <p className="font-medium">{new Date(rental.rentedOn).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-500">
              {isActive ? 'Due Date' : 'Returned On'}
            </p>
            <p className="font-medium">
              {isActive 
                ? new Date(rental.dueDate).toLocaleDateString()
                : new Date(rental.returnedOn).toLocaleDateString()
              }
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message Owner
          </Button>
          {isActive && (
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Extend Rental
            </Button>
          )}
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
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{activeRentals.length}</p>
            <p className="text-gray-600">Active Rentals</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{pastRentals.length}</p>
            <p className="text-gray-600">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-gray-600">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Rentals List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Rentals</TabsTrigger>
          <TabsTrigger value="history">Rental History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="space-y-4">
            {activeRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} isActive={true} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {pastRentals.map((rental) => (
              <RentalCard key={rental.id} rental={rental} isActive={false} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyRentalsPage;
