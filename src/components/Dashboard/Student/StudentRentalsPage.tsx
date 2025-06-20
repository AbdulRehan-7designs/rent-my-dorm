
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface StudentRentalsPageProps {
  user: any;
}

const StudentRentalsPage: React.FC<StudentRentalsPageProps> = ({ user }) => {
  const rentals = [
    { id: 1, item: 'MacBook Pro 13"', vendor: 'Tech Store', startDate: '2024-01-15', endDate: '2024-01-22', status: 'active', amount: '₹5,600' },
    { id: 2, item: 'Study Table', vendor: 'Furniture Hub', startDate: '2024-01-10', endDate: '2024-02-10', status: 'active', amount: '₹1,500' },
    { id: 3, item: 'Camera', vendor: 'Photo Pro', startDate: '2024-01-05', endDate: '2024-01-12', status: 'completed', amount: '₹2,100' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>
        <p className="text-gray-600">Track your current and past rentals</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>All Rentals</span>
          </CardTitle>
          <CardDescription>Your rental history and active rentals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rentals.map((rental) => (
              <div key={rental.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    rental.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{rental.item}</p>
                    <p className="text-sm text-gray-600">from {rental.vendor}</p>
                    <p className="text-xs text-gray-500">{rental.startDate} - {rental.endDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{rental.amount}</p>
                  <Badge variant={rental.status === 'active' ? 'default' : 'secondary'}>
                    {rental.status}
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

export default StudentRentalsPage;
