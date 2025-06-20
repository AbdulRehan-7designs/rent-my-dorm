
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface VendorOrdersPageProps {
  user: any;
}

const VendorOrdersPage: React.FC<VendorOrdersPageProps> = ({ user }) => {
  const orders = [
    { id: 1, item: 'MacBook Pro 13"', customer: 'Rahul Kumar', amount: '₹1,500', status: 'active' },
    { id: 2, item: 'Study Table', customer: 'Priya Sharma', amount: '₹800', status: 'completed' },
    { id: 3, item: 'Engineering Books', customer: 'Amit Patel', amount: '₹300', status: 'pending' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage your rental orders</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Recent Orders</span>
          </CardTitle>
          <CardDescription>Track your latest rental orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.item}</p>
                    <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <Badge variant={order.status === 'active' ? 'default' : 
                                order.status === 'completed' ? 'secondary' : 'destructive'}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorOrdersPage;
