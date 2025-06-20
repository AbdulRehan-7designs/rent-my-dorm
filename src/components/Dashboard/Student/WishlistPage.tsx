
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WishlistPageProps {
  user: any;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ user }) => {
  const wishlistItems = [
    { id: 1, item: 'Gaming Laptop', requestedBy: 12, priority: 'high' },
    { id: 2, item: 'Projector', requestedBy: 8, priority: 'medium' },
    { id: 3, item: 'External Monitor', requestedBy: 15, priority: 'high' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Wishlist</h1>
          <p className="text-gray-600">Items students want to rent</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-blue-500">
          <Plus className="w-4 h-4 mr-2" />
          Add Request
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Most Requested Items</span>
          </CardTitle>
          <CardDescription>Items in high demand by students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.item}</p>
                    <p className="text-sm text-gray-600">{item.requestedBy} students interested</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Heart className="w-4 h-4 mr-1" />
                    Want This
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistPage;
