
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface VendorReviewsPageProps {
  user: any;
}

const VendorReviewsPage: React.FC<VendorReviewsPageProps> = ({ user }) => {
  const reviews = [
    { id: 1, customer: 'Rahul Kumar', rating: 5, comment: 'Great laptop, worked perfectly!', item: 'MacBook Pro' },
    { id: 2, customer: 'Priya Sharma', rating: 4, comment: 'Good condition, fast delivery', item: 'Study Table' },
    { id: 3, customer: 'Amit Patel', rating: 5, comment: 'Excellent books, very helpful', item: 'Engineering Books' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-600">See what customers say about your items</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Recent Reviews</span>
          </CardTitle>
          <CardDescription>Customer feedback and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{review.customer}</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{review.comment}</p>
                <p className="text-xs text-gray-500">Item: {review.item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorReviewsPage;
