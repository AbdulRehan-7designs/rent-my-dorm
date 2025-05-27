
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
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Star
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const VendorOrdersPage = ({ onBack }) => {
  const [pendingOrders, setPendingOrders] = useState([
    {
      id: 1,
      item: 'MacBook Pro 13"',
      customer: 'Rahul Kumar',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      amount: 4000,
      deposit: 2000,
      status: 'pending',
      customerRating: 4.8,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      item: 'Gaming Chair RGB',
      customer: 'Priya Sharma',
      startDate: '2024-01-22',
      endDate: '2024-01-24',
      amount: 400,
      deposit: 500,
      status: 'pending',
      customerRating: 4.9,
      image: '/placeholder.svg'
    }
  ]);

  const [activeOrders] = useState([
    {
      id: 3,
      item: 'DSLR Camera',
      customer: 'Amit Patel',
      startDate: '2024-01-18',
      endDate: '2024-01-25',
      amount: 3500,
      deposit: 1500,
      status: 'active',
      customerRating: 4.7,
      daysLeft: 3,
      image: '/placeholder.svg'
    }
  ]);

  const [completedOrders] = useState([
    {
      id: 4,
      item: 'Study Table',
      customer: 'Sneha Singh',
      startDate: '2024-01-10',
      endDate: '2024-01-15',
      amount: 1000,
      deposit: 800,
      status: 'completed',
      customerRating: 5.0,
      vendorRating: 4.8,
      review: 'Great table, very sturdy!',
      image: '/placeholder.svg'
    }
  ]);

  const handleApproveOrder = (orderId) => {
    setPendingOrders(prev => prev.filter(order => order.id !== orderId));
    toast({
      title: "Order Approved! ✅",
      description: "The customer has been notified",
    });
  };

  const handleRejectOrder = (orderId) => {
    setPendingOrders(prev => prev.filter(order => order.id !== orderId));
    toast({
      title: "Order Rejected",
      description: "The customer has been notified with reason",
      variant: "destructive"
    });
  };

  const OrderCard = ({ order, type }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={order.image} 
            alt={order.item}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{order.item}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      {order.customer.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{order.customer}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{order.customerRating}</span>
                  </div>
                </div>
              </div>
              <Badge 
                className={
                  order.status === 'pending' ? 'bg-yellow-500' :
                  order.status === 'active' ? 'bg-green-500' :
                  'bg-blue-500'
                }
              >
                {order.status === 'pending' ? 'Pending' : 
                 order.status === 'active' ? 'Active' : 'Completed'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Start: {new Date(order.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>End: {new Date(order.endDate).toLocaleDateString()}</span>
                </div>
                {type === 'active' && order.daysLeft && (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span>{order.daysLeft} days left</span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Rental: ₹{order.amount}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Deposit: ₹{order.deposit}</span>
                </div>
              </div>
            </div>

            {type === 'completed' && order.review && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm italic">"{order.review}"</p>
                {order.vendorRating && (
                  <div className="flex items-center space-x-1 mt-2">
                    <span className="text-xs text-gray-600">Your rating:</span>
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs">{order.vendorRating}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
              </div>

              {type === 'pending' && (
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleRejectOrder(order.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApproveOrder(order.id)}
                  >
                    Approve
                  </Button>
                </div>
              )}
            </div>
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
        <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-3xl font-bold text-green-600">{activeOrders.length}</p>
              </div>
              <Package className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                <p className="text-3xl font-bold text-blue-600">{completedOrders.length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Pending ({pendingOrders.length})</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Active ({activeOrders.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Completed ({completedOrders.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <div className="space-y-6">
            {pendingOrders.map((order) => (
              <OrderCard key={order.id} order={order} type="pending" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} type="active" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-6">
            {completedOrders.map((order) => (
              <OrderCard key={order.id} order={order} type="completed" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorOrdersPage;
