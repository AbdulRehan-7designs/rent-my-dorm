
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import BasicInfoForm from './AddItem/BasicInfoForm';
import PricingForm from './AddItem/PricingForm';
import LocationForm from './AddItem/LocationForm';
import ImageUpload from './AddItem/ImageUpload';
import AIDetection from './AddItem/AIDetection';

interface Image {
  id: number;
  src: string;
  file: File;
}

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
  const [images, setImages] = useState<Image[]>([]);
  const [aiDetection, setAiDetection] = useState(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleAIDetection = () => {
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

  const handleApplySuggestions = () => {
    if (aiDetection) {
      handleInputChange('title', aiDetection.item);
      handleInputChange('category', aiDetection.category.toLowerCase());
      handleInputChange('price', '800');
    }
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
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <BasicInfoForm formData={formData} onInputChange={handleInputChange} />
          <PricingForm formData={formData} onInputChange={handleInputChange} />
          <LocationForm formData={formData} onInputChange={handleInputChange} />
        </div>

        <div className="space-y-6">
          <ImageUpload 
            images={images} 
            onImageUpload={handleImageUpload} 
            onRemoveImage={removeImage} 
          />
          <AIDetection 
            aiDetection={aiDetection} 
            onAIDetection={handleAIDetection} 
            onApplySuggestions={handleApplySuggestions} 
          />
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
