
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminListingsPageProps {
  user: any;
}

const AdminListingsPage: React.FC<AdminListingsPageProps> = ({ user }) => {
  const listings = [
    { id: 1, title: 'MacBook Pro 13"', vendor: 'Priya Sharma', price: '₹800/day', status: 'pending', college: 'BITS Pilani' },
    { id: 2, title: 'Study Table', vendor: 'Rahul Kumar', price: '₹50/day', status: 'approved', college: 'IIT Delhi' },
    { id: 3, title: 'Engineering Books', vendor: 'Amit Patel', price: '₹30/day', status: 'rejected', college: 'NIT Surat' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Listings Management</h1>
        <p className="text-gray-600">Review and approve platform listings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>All Listings</span>
          </CardTitle>
          <CardDescription>Review listings for approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{listing.title}</p>
                    <p className="text-sm text-gray-600">by {listing.vendor} • {listing.college}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-900">{listing.price}</span>
                  <Badge variant={listing.status === 'approved' ? 'default' : 
                                listing.status === 'pending' ? 'secondary' : 'destructive'}>
                    {listing.status}
                  </Badge>
                  {listing.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminListingsPage;
