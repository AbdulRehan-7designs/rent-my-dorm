
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Package, 
  Users, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  MessageSquare,
  Shield
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AdminApprovalsPage = ({ onBack }) => {
  const [pendingListings, setPendingListings] = useState([
    {
      id: 1,
      title: 'MacBook Pro 13" 2023',
      vendor: 'Rahul Kumar',
      college: 'IIT Delhi',
      price: '₹800/day',
      category: 'Electronics',
      submittedDate: '2024-01-20',
      priority: 'high',
      images: ['/placeholder.svg'],
      description: 'Latest MacBook Pro for coding and design work'
    },
    {
      id: 2,
      title: 'Gaming Chair RGB',
      vendor: 'Priya Sharma',
      college: 'NIT Trichy',
      price: '₹200/day',
      category: 'Furniture',
      submittedDate: '2024-01-19',
      priority: 'medium',
      images: ['/placeholder.svg'],
      description: 'Comfortable gaming chair with RGB lighting'
    }
  ]);

  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 1,
      name: 'TechRentals Co.',
      contact: 'contact@techrentals.com',
      college: 'BITS Pilani',
      documents: ['license.pdf', 'id_proof.pdf'],
      submittedDate: '2024-01-18',
      businessType: 'Electronics Rental',
      priority: 'medium'
    }
  ]);

  const [reportedItems, setReportedItems] = useState([
    {
      id: 1,
      title: 'Broken Gaming Console',
      reportedBy: 'Amit Patel',
      vendor: 'GameHub',
      reason: 'Item damaged',
      severity: 'high',
      submittedDate: '2024-01-21',
      description: 'Console was damaged when received'
    }
  ]);

  const handleApproveListing = (listingId) => {
    setPendingListings(prev => prev.filter(listing => listing.id !== listingId));
    toast({
      title: "Listing Approved! ✅",
      description: "The listing is now live on the platform",
    });
  };

  const handleRejectListing = (listingId) => {
    setPendingListings(prev => prev.filter(listing => listing.id !== listingId));
    toast({
      title: "Listing Rejected",
      description: "Vendor has been notified with feedback",
      variant: "destructive"
    });
  };

  const handleApproveVendor = (vendorId) => {
    setPendingVendors(prev => prev.filter(vendor => vendor.id !== vendorId));
    toast({
      title: "Vendor Approved! ✅",
      description: "Vendor account has been activated",
    });
  };

  const handleRejectVendor = (vendorId) => {
    setPendingVendors(prev => prev.filter(vendor => vendor.id !== vendorId));
    toast({
      title: "Vendor Rejected",
      description: "Application has been rejected with reason",
      variant: "destructive"
    });
  };

  const handleResolveReport = (reportId) => {
    setReportedItems(prev => prev.filter(report => report.id !== reportId));
    toast({
      title: "Report Resolved ✅",
      description: "Issue has been resolved and parties notified",
    });
  };

  const ListingCard = ({ listing }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{listing.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      {listing.vendor.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{listing.vendor}</span>
                  <span className="text-sm text-gray-500">• {listing.college}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge 
                  className={
                    listing.priority === 'high' ? 'bg-red-500' :
                    listing.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }
                >
                  {listing.priority} priority
                </Badge>
                <span className="text-lg font-bold text-orange-600">{listing.price}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{listing.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Category: {listing.category}</span>
                <span>Submitted: {new Date(listing.submittedDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-3 h-3 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Contact
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleRejectListing(listing.id)}
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Reject
                </Button>
                <Button 
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApproveListing(listing.id)}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const VendorCard = ({ vendor }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{vendor.name}</h3>
            <p className="text-sm text-gray-600">{vendor.contact}</p>
            <p className="text-sm text-gray-600">{vendor.college} • {vendor.businessType}</p>
          </div>
          <Badge 
            className={
              vendor.priority === 'high' ? 'bg-red-500' :
              vendor.priority === 'medium' ? 'bg-yellow-500' :
              'bg-blue-500'
            }
          >
            {vendor.priority} priority
          </Badge>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Documents:</p>
          <div className="flex space-x-2">
            {vendor.documents.map((doc, index) => (
              <Badge key={index} variant="outline">{doc}</Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Submitted: {new Date(vendor.submittedDate).toLocaleDateString()}
          </span>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Eye className="w-3 h-3 mr-1" />
              Review Docs
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
              onClick={() => handleRejectVendor(vendor.id)}
            >
              <XCircle className="w-3 h-3 mr-1" />
              Reject
            </Button>
            <Button 
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleApproveVendor(vendor.id)}
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Approve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ReportCard = ({ report }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold">{report.title}</h3>
            <p className="text-sm text-gray-600">Reported by: {report.reportedBy}</p>
            <p className="text-sm text-gray-600">Vendor: {report.vendor}</p>
          </div>
          <Badge 
            className={
              report.severity === 'high' ? 'bg-red-500' :
              report.severity === 'medium' ? 'bg-yellow-500' :
              'bg-blue-500'
            }
          >
            {report.severity} severity
          </Badge>
        </div>

        <p className="text-sm text-gray-600 mb-4">{report.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Reason: {report.reason}</span>
            <span>Reported: {new Date(report.submittedDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <MessageSquare className="w-3 h-3 mr-1" />
              Contact
            </Button>
            <Button 
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleResolveReport(report.id)}
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Resolve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Approvals & Reviews</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Listings</p>
                <p className="text-3xl font-bold text-orange-600">{pendingListings.length}</p>
              </div>
              <Package className="w-12 h-12 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vendor Applications</p>
                <p className="text-3xl font-bold text-blue-600">{pendingVendors.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports</p>
                <p className="text-3xl font-bold text-red-600">{reportedItems.length}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listings" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Listings ({pendingListings.length})</span>
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Vendors ({pendingVendors.length})</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Reports ({reportedItems.length})</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings" className="mt-6">
          <div className="space-y-6">
            {pendingListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="mt-6">
          <div className="space-y-6">
            {pendingVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <div className="space-y-6">
            {reportedItems.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminApprovalsPage;
