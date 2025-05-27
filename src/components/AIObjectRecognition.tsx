
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Scan, 
  CheckCircle,
  AlertCircle,
  Zap,
  Brain,
  Eye,
  Sparkles
} from 'lucide-react';

const AIObjectRecognition = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult({
            item: 'MacBook Pro 13" 2023',
            confidence: 94.5,
            category: 'Electronics - Laptop',
            estimatedValue: '₹80,000 - ₹1,20,000',
            rentalSuggestion: '₹800 - ₹1,200/day',
            features: [
              'Apple M2 Chip detected',
              'Retina Display identified',
              'Excellent condition (95%)',
              'All ports functional',
              'No visible damage'
            ],
            similarListings: 12,
            demandLevel: 'High'
          });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-500" />
            <span>AI Object Recognition</span>
          </h1>
          <p className="text-gray-600 mt-2">Upload or capture an image to identify and analyze items instantly</p>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <span>Smart Item Detection</span>
          </CardTitle>
          <CardDescription>
            Our AI can identify items, estimate values, and suggest optimal rental prices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 border-dashed border-2 hover:border-blue-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-blue-500" />
              <span className="font-medium">Upload Image</span>
              <span className="text-sm text-gray-500">JPG, PNG, or HEIC</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 border-dashed border-2 hover:border-green-500 transition-colors"
            >
              <Camera className="w-8 h-8 text-green-500" />
              <span className="font-medium">Take Photo</span>
              <span className="text-sm text-gray-500">Use device camera</span>
            </Button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Image Preview and Scan */}
      {selectedImage && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedImage} 
                  alt="Uploaded item"
                  className="w-full h-64 object-cover rounded-lg border"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-xl font-semibold">Ready for AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced computer vision will analyze your item and provide detailed insights.
                </p>
                <Button 
                  onClick={simulateAIScan}
                  disabled={isScanning}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Scan className="w-4 h-4 mr-2" />
                  {isScanning ? 'Analyzing...' : 'Start AI Analysis'}
                </Button>
              </div>
            </div>

            {/* Scanning Progress */}
            {isScanning && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">AI Processing</span>
                  <span className="text-sm text-gray-500">{scanProgress}%</span>
                </div>
                <Progress value={scanProgress} className="mb-4" />
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 animate-pulse text-purple-500" />
                  <span>
                    {scanProgress < 30 ? 'Detecting object boundaries...' :
                     scanProgress < 60 ? 'Analyzing features and condition...' :
                     scanProgress < 90 ? 'Comparing with database...' :
                     'Generating insights...'}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Scan Results */}
      {scanResult && (
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span>Analysis Complete!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">{scanResult.item}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence:</span>
                    <Badge className="bg-green-500">{scanResult.confidence}%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{scanResult.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Value:</span>
                    <span className="font-medium text-green-600">{scanResult.estimatedValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rental Price:</span>
                    <span className="font-medium text-orange-600">{scanResult.rentalSuggestion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Demand Level:</span>
                    <Badge variant={scanResult.demandLevel === 'High' ? 'default' : 'secondary'}>
                      {scanResult.demandLevel}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">AI Detected Features:</h4>
                <ul className="space-y-2">
                  {scanResult.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Found {scanResult.similarListings} similar items in your area
                  </p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    View Similar Items
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Create Listing
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Features Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>AI Capabilities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold mb-2">Object Detection</h4>
              <p className="text-sm text-gray-600">
                Identifies items with 95%+ accuracy using computer vision
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-semibold mb-2">Smart Pricing</h4>
              <p className="text-sm text-gray-600">
                AI-powered rental price suggestions based on market data
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-semibold mb-2">Condition Analysis</h4>
              <p className="text-sm text-gray-600">
                Automatically assesses item condition and authenticity
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIObjectRecognition;
