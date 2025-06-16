
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Users, 
  Building, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  MapPin,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface College {
  id: string;
  college_name: string;
  city: string;
  state: string;
  establishment_year: number;
  total_students: number;
  verification_status: string;
  admin_contact_email: string;
  admin_contact_phone: string;
  is_active: boolean;
  created_at: string;
}

interface CollegeStats {
  college_id: string;
  total_active_users: number;
  total_listings: number;
  total_transactions: number;
  monthly_revenue: number;
  average_rating: number;
}

const CollegeManagementPage = ({ onBack }) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [collegeStats, setCollegeStats] = useState<CollegeStats[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCollege, setNewCollege] = useState({
    college_name: '',
    city: '',
    state: 'Telangana',
    establishment_year: new Date().getFullYear(),
    total_students: 0,
    admin_contact_email: '',
    admin_contact_phone: ''
  });

  useEffect(() => {
    fetchColleges();
    fetchCollegeStatistics();
  }, []);

  const fetchColleges = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('college_name');
      
      if (error) throw error;
      setColleges(data || []);
    } catch (error) {
      toast({
        title: "Error fetching colleges",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchCollegeStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('college_statistics')
        .select('*');
      
      if (error) throw error;
      setCollegeStats(data || []);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const addCollege = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .insert([newCollege])
        .select()
        .single();

      if (error) throw error;

      setColleges([...colleges, data]);
      setShowAddForm(false);
      setNewCollege({
        college_name: '',
        city: '',
        state: 'Telangana',
        establishment_year: new Date().getFullYear(),
        total_students: 0,
        admin_contact_email: '',
        admin_contact_phone: ''
      });

      toast({
        title: "College Added Successfully! 🎉",
        description: "New college has been added to the platform",
      });
    } catch (error) {
      toast({
        title: "Error adding college",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateCollegeStatus = async (collegeId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('colleges')
        .update({ is_active: isActive })
        .eq('id', collegeId);

      if (error) throw error;

      setColleges(colleges.map(college => 
        college.id === collegeId ? { ...college, is_active: isActive } : college
      ));

      toast({
        title: isActive ? "College Activated ✅" : "College Deactivated ❌",
        description: `College has been ${isActive ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      toast({
        title: "Error updating college",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateCollegeVerification = async (collegeId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('colleges')
        .update({ verification_status: status })
        .eq('id', collegeId);

      if (error) throw error;

      setColleges(colleges.map(college => 
        college.id === collegeId ? { ...college, verification_status: status } : college
      ));

      toast({
        title: "Verification Status Updated ✅",
        description: `College verification status changed to ${status}`,
      });
    } catch (error) {
      toast({
        title: "Error updating verification",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredColleges = colleges.filter(college =>
    college.college_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    college.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCollegeStats = (collegeId: string) => {
    return collegeStats.find(stat => stat.college_id === collegeId) || {
      total_active_users: 0,
      total_listings: 0,
      total_transactions: 0,
      monthly_revenue: 0,
      average_rating: 0
    };
  };

  const CollegeCard = ({ college }) => {
    const stats = getCollegeStats(college.id);
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{college.college_name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {college.city}, {college.state}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Est. {college.establishment_year}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {college.total_students} students
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <Badge 
                  className={
                    college.verification_status === 'verified' ? 'bg-green-500' :
                    college.verification_status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }
                >
                  {college.verification_status}
                </Badge>
                <Badge variant={college.is_active ? 'default' : 'secondary'}>
                  {college.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.total_active_users}</p>
              <p className="text-xs text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.total_listings}</p>
              <p className="text-xs text-gray-600">Listings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.total_transactions}</p>
              <p className="text-xs text-gray-600">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">₹{stats.monthly_revenue}</p>
              <p className="text-xs text-gray-600">Revenue</p>
            </div>
          </div>

          {/* Contact Info */}
          {(college.admin_contact_email || college.admin_contact_phone) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Contact Information:</p>
              {college.admin_contact_email && (
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {college.admin_contact_email}
                </div>
              )}
              {college.admin_contact_phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {college.admin_contact_phone}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => setSelectedCollege(college)}>
              <Eye className="w-3 h-3 mr-1" />
              View Details
            </Button>
            
            {college.verification_status === 'pending' && (
              <>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => updateCollegeVerification(college.id, 'verified')}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verify
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => updateCollegeVerification(college.id, 'rejected')}
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Reject
                </Button>
              </>
            )}
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateCollegeStatus(college.id, !college.is_active)}
            >
              {college.is_active ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">College Management</h1>
          <p className="text-gray-600 mt-2">Manage colleges, verification, and statistics</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add College
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Colleges</p>
                <p className="text-3xl font-bold text-blue-600">{colleges.length}</p>
              </div>
              <Building className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-3xl font-bold text-green-600">
                  {colleges.filter(c => c.verification_status === 'verified').length}
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
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {colleges.filter(c => c.verification_status === 'pending').length}
                </p>
              </div>
              <Settings className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-purple-600">
                  {colleges.filter(c => c.is_active).length}
                </p>
              </div>
              <GraduationCap className="w-12 h-12 text-purple-600" />
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
                placeholder="Search colleges by name or city..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colleges List */}
      <div className="space-y-6">
        {filteredColleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </div>

      {/* Add College Modal would go here - simplified for this implementation */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add New College</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  value={newCollege.college_name}
                  onChange={(e) => setNewCollege({...newCollege, college_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newCollege.city}
                  onChange={(e) => setNewCollege({...newCollege, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCollege.admin_contact_email}
                  onChange={(e) => setNewCollege({...newCollege, admin_contact_email: e.target.value})}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={addCollege} className="flex-1">Add College</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CollegeManagementPage;
