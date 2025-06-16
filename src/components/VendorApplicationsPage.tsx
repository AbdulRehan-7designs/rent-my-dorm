
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Store, 
  CheckCircle, 
  XCircle, 
  Eye,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  User
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VendorApplication {
  id: string;
  business_name: string;
  business_type: string;
  business_description: string;
  contact_email: string;
  contact_phone: string;
  business_address: string;
  status: string;
  applied_at: string;
  review_notes: string;
  applicant_id: string;
  college_id: string;
}

const VendorApplicationsPage = ({ onBack, user }) => {
  const [applications, setApplications] = useState<VendorApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<VendorApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [colleges, setColleges] = useState([]);
  
  const [newApplication, setNewApplication] = useState({
    business_name: '',
    business_type: '',
    business_description: '',
    contact_email: user?.email || '',
    contact_phone: '',
    business_address: '',
    college_id: ''
  });

  useEffect(() => {
    fetchApplications();
    fetchColleges();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .order('applied_at', { ascending: false });
      
      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      toast({
        title: "Error fetching applications",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchColleges = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('id, college_name')
        .eq('is_active', true)
        .order('college_name');
      
      if (error) throw error;
      setColleges(data || []);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const submitApplication = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_applications')
        .insert([{
          ...newApplication,
          applicant_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      setApplications([data, ...applications]);
      setShowApplicationForm(false);
      setNewApplication({
        business_name: '',
        business_type: '',
        business_description: '',
        contact_email: user?.email || '',
        contact_phone: '',
        business_address: '',
        college_id: ''
      });

      toast({
        title: "Application Submitted! 🎉",
        description: "Your vendor application has been submitted for review",
      });
    } catch (error) {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('vendor_applications')
        .update({ 
          status, 
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes
        })
        .eq('id', applicationId);

      if (error) throw error;

      // If approved, update user role to vendor
      if (status === 'approved') {
        const application = applications.find(app => app.id === applicationId);
        if (application) {
          await supabase
            .from('profiles')
            .update({ role: 'vendor' })
            .eq('id', application.applicant_id);
        }
      }

      setApplications(applications.map(app => 
        app.id === applicationId 
          ? { ...app, status, review_notes: reviewNotes }
          : app
      ));

      setSelectedApplication(null);
      setReviewNotes('');

      toast({
        title: status === 'approved' ? "Application Approved ✅" : "Application Rejected ❌",
        description: `Vendor application has been ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error updating application",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.business_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const ApplicationCard = ({ application }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{application.business_name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Store className="w-4 h-4 mr-1" />
                {application.business_type}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(application.applied_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Badge 
                className={
                  application.status === 'approved' ? 'bg-green-500' :
                  application.status === 'rejected' ? 'bg-red-500' :
                  application.status === 'under_review' ? 'bg-blue-500' :
                  'bg-yellow-500'
                }
              >
                {application.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">{application.business_description}</p>

        {/* Contact Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Mail className="w-4 h-4 mr-2" />
            {application.contact_email}
          </div>
          {application.contact_phone && (
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Phone className="w-4 h-4 mr-2" />
              {application.contact_phone}
            </div>
          )}
          {application.business_address && (
            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-2" />
              {application.business_address}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => setSelectedApplication(application)}>
            <Eye className="w-3 h-3 mr-1" />
            Review
          </Button>
          
          {application.status === 'pending' && user?.role === 'admin' && (
            <>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setSelectedApplication(application);
                  setReviewNotes('Application meets all requirements.');
                }}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => {
                  setSelectedApplication(application);
                  setReviewNotes('Application does not meet requirements.');
                }}
              >
                <XCircle className="w-3 h-3 mr-1" />
                Reject
              </Button>
            </>
          )}
        </div>

        {application.review_notes && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Review Notes:</p>
            <p className="text-sm text-gray-600">{application.review_notes}</p>
          </div>
        )}
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
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Applications</h1>
          <p className="text-gray-600 mt-2">Manage vendor applications and approvals</p>
        </div>
        {user?.role !== 'admin' && (
          <Button onClick={() => setShowApplicationForm(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Apply as Vendor
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-blue-600">{applications.length}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <User className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Apply as Vendor</CardTitle>
              <CardDescription>Submit your vendor application to start selling on the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={newApplication.business_name}
                    onChange={(e) => setNewApplication({...newApplication, business_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={newApplication.business_type} onValueChange={(value) => setNewApplication({...newApplication, business_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics Rental">Electronics Rental</SelectItem>
                      <SelectItem value="Books & Stationery">Books & Stationery</SelectItem>
                      <SelectItem value="Furniture Rental">Furniture Rental</SelectItem>
                      <SelectItem value="Sports Equipment">Sports Equipment</SelectItem>
                      <SelectItem value="Clothing & Accessories">Clothing & Accessories</SelectItem>
                      <SelectItem value="General Rental">General Rental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="college">College *</Label>
                <Select value={newApplication.college_id} onValueChange={(value) => setNewApplication({...newApplication, college_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college.id} value={college.id}>
                        {college.college_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Business Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={newApplication.business_description}
                  onChange={(e) => setNewApplication({...newApplication, business_description: e.target.value})}
                  placeholder="Describe your business and what you plan to rent out..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newApplication.contact_email}
                    onChange={(e) => setNewApplication({...newApplication, contact_email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    value={newApplication.contact_phone}
                    onChange={(e) => setNewApplication({...newApplication, contact_phone: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={newApplication.business_address}
                  onChange={(e) => setNewApplication({...newApplication, business_address: e.target.value})}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={submitApplication} className="flex-1">Submit Application</Button>
                <Button variant="outline" onClick={() => setShowApplicationForm(false)} className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Review Modal */}
      {selectedApplication && user?.role === 'admin' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Review Application</CardTitle>
              <CardDescription>{selectedApplication.business_name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="reviewNotes">Review Notes</Label>
                <Textarea
                  id="reviewNotes"
                  rows={4}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add review notes..."
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Approve
                </Button>
                <Button 
                  onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
                >
                  Reject
                </Button>
                <Button variant="outline" onClick={() => setSelectedApplication(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VendorApplicationsPage;
