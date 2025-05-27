
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Megaphone,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AdminAnnouncementsPage = ({ onBack }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New AI Features Available!',
      content: 'We\'ve added AI-powered item recognition and smart recommendations. Check them out in your dashboard!',
      type: 'info',
      target: 'all',
      isActive: true,
      createdDate: '2024-01-20',
      expiryDate: '2024-02-20',
      views: 1250
    },
    {
      id: 2,
      title: 'Maintenance Scheduled',
      content: 'Platform maintenance scheduled for this weekend. Services may be temporarily unavailable.',
      type: 'warning',
      target: 'all',
      isActive: true,
      createdDate: '2024-01-19',
      expiryDate: '2024-01-26',
      views: 890
    },
    {
      id: 3,
      title: 'New College Added',
      content: 'Welcome to students from VIT Chennai! Start exploring rental opportunities in your campus.',
      type: 'success',
      target: 'students',
      isActive: true,
      createdDate: '2024-01-18',
      expiryDate: '2024-02-18',
      views: 456
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info',
    target: 'all',
    expiryDate: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAnnouncement = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      ...formData,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      views: 0
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    setFormData({
      title: '',
      content: '',
      type: 'info',
      target: 'all',
      expiryDate: ''
    });
    setShowCreateForm(false);

    toast({
      title: "Announcement Created! 📢",
      description: "Your announcement is now live",
    });
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been removed",
    });
  };

  const toggleAnnouncementStatus = (id) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
    ));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'warning': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Announcements</p>
                <p className="text-3xl font-bold text-blue-600">{announcements.length}</p>
              </div>
              <Megaphone className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Announcements</p>
                <p className="text-3xl font-bold text-green-600">{announcements.filter(a => a.isActive).length}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-purple-600">{announcements.reduce((sum, a) => sum + a.views, 0)}</p>
              </div>
              <Eye className="w-12 h-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Megaphone className="w-5 h-5" />
              <span>Create New Announcement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your announcement content here..."
                rows={4}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="target">Target Audience</Label>
                <Select value={formData.target} onValueChange={(value) => handleInputChange('target', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="vendors">Vendors Only</SelectItem>
                    <SelectItem value="admins">Admins Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              />
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleCreateAnnouncement}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Megaphone className="w-4 h-4 mr-2" />
                Publish Announcement
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <Badge className={getTypeColor(announcement.type)}>
                      {getTypeIcon(announcement.type)}
                      <span className="ml-1 capitalize">{announcement.type}</span>
                    </Badge>
                    <Badge variant={announcement.isActive ? "default" : "secondary"}>
                      {announcement.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{announcement.content}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>Target: {announcement.target}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {new Date(announcement.createdDate).toLocaleDateString()}</span>
                    </div>
                    {announcement.expiryDate && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{announcement.views} views</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleAnnouncementStatus(announcement.id)}
                  >
                    {announcement.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements yet</h3>
          <p className="text-gray-600 mb-4">Create your first announcement to communicate with users</p>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Announcement
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncementsPage;
