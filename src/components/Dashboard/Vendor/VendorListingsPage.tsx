
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Calendar,
  DollarSign,
  Star
} from 'lucide-react';

interface VendorListingsPageProps {
  user: any;
}

const VendorListingsPage: React.FC<VendorListingsPageProps> = ({ user }) => {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'MacBook Pro M2 13"',
      category: 'Electronics',
      price: '₹800/day',
      status: 'active',
      totalRentals: 23,
      rating: 4.8,
      earnings: '₹18,400',
      nextBooking: '2024-01-25',
      image: '/placeholder.svg',
      instantBook: true
    },
    {
      id: 2,
      title: 'Canon EOS R5 Camera',
      category: 'Electronics',
      price: '₹1200/day',
      status: 'active',
      totalRentals: 45,
      rating: 4.9,
      earnings: '₹54,000',
      nextBooking: 'Available',
      image: '/placeholder.svg',
      instantBook: false
    },
    {
      id: 3,
      title: 'Gaming Chair RGB',
      category: 'Furniture',
      price: '₹200/day',
      status: 'inactive',
      totalRentals: 12,
      rating: 4.7,
      earnings: '₹2,400',
      nextBooking: 'Maintenance',
      image: '/placeholder.svg',
      instantBook: true
    }
  ]);

  const toggleListingStatus = (id: number) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, status: listing.status === 'active' ? 'inactive' : 'active' }
        : listing
    ));
  };

  const toggleInstantBook = (id: number) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, instantBook: !listing.instantBook }
        : listing
    ));
  };

  const totalEarnings = listings.reduce((sum, listing) => 
    sum + parseInt(listing.earnings.replace(/[₹,]/g, '')), 0
  );

  const activeListings = listings.filter(listing => listing.status === 'active').length;
  const totalRentals = listings.reduce((sum, listing) => sum + listing.totalRentals, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600">Manage your rental items and track performance</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
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
                <p className="text-sm text-green-600">Active Listings</p>
                <p className="text-2xl font-bold text-green-800">{activeListings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-200 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Rentals</p>
                <p className="text-2xl font-bold text-blue-800">{totalRentals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-200 rounded-lg">
                <DollarSign className="w-5 h-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Total Earnings</p>
                <p className="text-2xl font-bold text-yellow-800">₹{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-200 rounded-lg">
                <Star className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Avg Rating</p>
                <p className="text-2xl font-bold text-purple-800">4.8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                {/* Image */}
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge variant="outline">{listing.category}</Badge>
                        <Badge 
                          className={listing.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                        >
                          {listing.status}
                        </Badge>
                        {listing.instantBook && (
                          <Badge className="bg-blue-100 text-blue-700">Instant Book</Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Price/day</p>
                      <p className="font-semibold text-green-600">{listing.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Rentals</p>
                      <p className="font-semibold">{listing.totalRentals}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{listing.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="font-semibold text-green-600">{listing.earnings}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Active</span>
                        <Switch 
                          checked={listing.status === 'active'} 
                          onCheckedChange={() => toggleListingStatus(listing.id)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Instant Book</span>
                        <Switch 
                          checked={listing.instantBook} 
                          onCheckedChange={() => toggleInstantBook(listing.id)}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Next Booking</p>
                      <p className="font-medium">{listing.nextBooking}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorListingsPage;
