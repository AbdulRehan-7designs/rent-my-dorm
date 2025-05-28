
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Upload, 
  Camera, 
  Plus,
  X,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Sparkles
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AddItemPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    priceType: 'day',
    location: '',
    availability: '',
    condition: '',
    deposit: ''
  });
  const [images, setImages] = useState([]);
  const [aiDetection, setAiDetection] = useState(null);

  const categories = [
    'Electronics', 'Books', 'Furniture', 'Gaming', 'Vehicles', 'Sports', 'Musical Instruments', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, { 
            id: Date.now() + Math.random(), 
            src: e.target.result as string, 
            file 
          }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleAIDetection = () => {
    // Simulate AI detection
    setTimeout(() => {
      setAiDetection({
        item: 'MacBook Pro 13-inch',
        confidence: 95,
        category: 'Electronics',
        suggestedPrice: '₹800/day',
        condition: 'Excellent'
      });
      toast({
        title: "AI Detection Complete! 🤖",
        description: "Item details have been auto-filled based on image analysis",
      });
    }, 2000);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Listing Created! 🎉",
      description: "Your item is now available for rent",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Item Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., MacBook Pro 13-inch 2023"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item, its condition, and any included accessories..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Pricing & Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Rental Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="800"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="priceType">Per</Label>
                  <Select value={formData.priceType} onValueChange={(value) => handleInputChange('priceType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hour">Hour</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="deposit">Security Deposit (Optional)</Label>
                <Input
                  id="deposit"
                  type="number"
                  placeholder="2000"
                  value={formData.deposit}
                  onChange={(e) => handleInputChange('deposit', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Location & Availability</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., IIT Delhi Campus, Hostel Block A"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="availability">Available From</Label>
                <Input
                  id="availability"
                  type="date"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Images & AI */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Photos</TabsTrigger>
                  <TabsTrigger value="camera">Take Photo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Drag & drop images or click to upload</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                      Choose Files
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="camera" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Take a photo of your item</p>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative">
                      <img src={img.src} alt="Upload" className="w-full h-32 object-cover rounded-lg" />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 w-6 h-6"
                        onClick={() => removeImage(img.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Detection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>AI Item Detection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!aiDetection ? (
                <div className="text-center space-y-4">
                  <p className="text-gray-600">Let AI analyze your item and auto-fill details</p>
                  <Button onClick={handleAIDetection} className="bg-gradient-to-r from-purple-500 to-blue-500">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Detected Item:</span>
                    <span>{aiDetection.item}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Confidence:</span>
                    <span>{aiDetection.confidence}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Suggested Price:</span>
                    <span>{aiDetection.suggestedPrice}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      handleInputChange('title', aiDetection.item);
                      handleInputChange('category', aiDetection.category.toLowerCase());
                      handleInputChange('price', '800');
                    }}
                  >
                    Apply AI Suggestions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            size="lg"
          >
            <Package className="w-4 h-4 mr-2" />
            Create Listing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
