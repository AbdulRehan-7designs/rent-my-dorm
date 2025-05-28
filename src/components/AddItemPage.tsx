
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
    // Reset AI detection if images are removed
    if (images.length <= 1) {
      setAiDetection(null);
    }
  };

  const analyzeImagesWithAI = async () => {
    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image for AI analysis",
        variant: "destructive"
      });
      return;
    }

    // More realistic analysis based on common rental items
    const itemAnalysis = [
      {
        keywords: ['laptop', 'computer', 'macbook'],
        analysis: {
          item: 'MacBook Pro 13-inch',
          confidence: Math.floor(Math.random() * 10) + 85,
          category: 'electronics',
          suggestedPrice: '₹800',
          condition: 'Good',
          marketDemand: 'High' as const,
          features: [
            'Apple M2 chip detected',
            'Retina display quality',
            'Good physical condition',
            'No visible damage'
          ]
        }
      },
      {
        keywords: ['book', 'textbook'],
        analysis: {
          item: 'Academic Textbook',
          confidence: Math.floor(Math.random() * 8) + 90,
          category: 'books',
          suggestedPrice: '₹50',
          condition: 'Good',
          marketDemand: 'Medium' as const,
          features: [
            'Text clearly readable',
            'Pages in good condition',
            'No major damage',
            'Standard textbook format'
          ]
        }
      },
      {
        keywords: ['phone', 'mobile', 'smartphone'],
        analysis: {
          item: 'Smartphone',
          confidence: Math.floor(Math.random() * 12) + 82,
          category: 'electronics',
          suggestedPrice: '₹300',
          condition: 'Good',
          marketDemand: 'High' as const,
          features: [
            'Screen in good condition',
            'No visible cracks',
            'Functional buttons',
            'Standard smartphone'
          ]
        }
      },
      {
        keywords: ['camera', 'dslr'],
        analysis: {
          item: 'Digital Camera',
          confidence: Math.floor(Math.random() * 8) + 87,
          category: 'electronics',
          suggestedPrice: '₹600',
          condition: 'Excellent',
          marketDemand: 'Medium' as const,
          features: [
            'High resolution sensor',
            'Lens in good condition',
            'All controls functional',
            'Professional quality'
          ]
        }
      }
    ];

    toast({
      title: "Analyzing Images...",
      description: "AI is processing your images",
    });

    // Simulate AI processing time
    setTimeout(() => {
      // Select a random analysis for demo purposes
      const randomAnalysis = itemAnalysis[Math.floor(Math.random() * itemAnalysis.length)];
      
      setAiDetection(randomAnalysis.analysis);
      
      toast({
        title: "AI Analysis Complete! 🤖",
        description: `Detected: ${randomAnalysis.analysis.item} with ${randomAnalysis.analysis.confidence}% confidence`,
      });
    }, 2000);
  };

  const handleApplySuggestions = () => {
    if (aiDetection) {
      handleInputChange('title', aiDetection.item);
      handleInputChange('category', aiDetection.category);
      handleInputChange('price', aiDetection.suggestedPrice.replace('₹', ''));
      handleInputChange('condition', aiDetection.condition.toLowerCase());
      
      toast({
        title: "Suggestions Applied! ✨",
        description: "AI suggestions have been applied to your form",
      });
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

    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image of your item",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Listing Created! 🎉",
      description: "Your item is now available for rent",
    });
    
    // Reset form
    setFormData({
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
    setImages([]);
    setAiDetection(null);
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
            onAIDetection={analyzeImagesWithAI} 
            onApplySuggestions={handleApplySuggestions} 
            images={images}
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
