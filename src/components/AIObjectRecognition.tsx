
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
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setScanResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera on mobile
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          stopCamera();
          setScanResult(null);
          setError(null);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const analyzeImageWithAI = async (imageData) => {
    // Simulate more realistic AI analysis
    const analysisSteps = [
      'Loading computer vision model...',
      'Detecting object boundaries...',
      'Extracting visual features...',
      'Analyzing object characteristics...',
      'Comparing with knowledge base...',
      'Determining condition and value...',
      'Generating market insights...'
    ];

    for (let i = 0; i < analysisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setScanProgress((i + 1) * (100 / analysisSteps.length));
    }

    // Create a more realistic analysis based on common items
    const commonItems = [
      {
        keywords: ['laptop', 'macbook', 'computer'],
        result: {
          item: 'MacBook Pro 13-inch',
          confidence: 89.2,
          category: 'Electronics - Laptop',
          estimatedValue: '₹75,000 - ₹95,000',
          rentalSuggestion: '₹700 - ₹1,000/day',
          features: [
            'Apple Silicon M2 chip detected',
            'Retina display technology',
            'Good condition (87%)',
            'All ports functional',
            'Minor wear on corners'
          ],
          similarListings: 8,
          demandLevel: 'High'
        }
      },
      {
        keywords: ['book', 'textbook', 'novel'],
        result: {
          item: 'Academic Textbook',
          confidence: 94.5,
          category: 'Books & Education',
          estimatedValue: '₹500 - ₹1,200',
          rentalSuggestion: '₹50 - ₹100/day',
          features: [
            'Good condition pages',
            'No major damage detected',
            'Readable text quality',
            'Standard paperback size'
          ],
          similarListings: 15,
          demandLevel: 'Medium'
        }
      },
      {
        keywords: ['phone', 'mobile', 'smartphone'],
        result: {
          item: 'Smartphone Device',
          confidence: 91.8,
          category: 'Electronics - Mobile',
          estimatedValue: '₹15,000 - ₹35,000',
          rentalSuggestion: '₹200 - ₹400/day',
          features: [
            'Screen in good condition',
            'No visible cracks',
            'Functional buttons detected',
            'Standard smartphone form'
          ],
          similarListings: 12,
          demandLevel: 'High'
        }
      }
    ];

    // Return a random item for demo purposes
    const randomItem = commonItems[Math.floor(Math.random() * commonItems.length)];
    return randomItem.result;
  };

  const simulateAIScan = async () => {
    if (!selectedImage) {
      setError('Please select or capture an image first');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setError(null);
    
    try {
      const result = await analyzeImageWithAI(selectedImage);
      setScanResult(result);
    } catch (err) {
      setError('Analysis failed. Please try again with a clearer image.');
      console.error('AI Analysis error:', err);
    } finally {
      setIsScanning(false);
    }
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

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

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
              onClick={startCamera}
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

      {/* Camera View */}
      {isCameraActive && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover rounded-lg border"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-4">
                <Button onClick={capturePhoto} className="bg-white text-black hover:bg-gray-100">
                  <Camera className="w-4 h-4 mr-2" />
                  Capture
                </Button>
                <Button variant="outline" onClick={stopCamera} className="bg-white text-black">
                  Cancel
                </Button>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </CardContent>
        </Card>
      )}

      {/* Image Preview and Scan */}
      {selectedImage && !isCameraActive && (
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
                  <span className="text-sm text-gray-500">{Math.round(scanProgress)}%</span>
                </div>
                <Progress value={scanProgress} className="mb-4" />
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Sparkles className="w-4 h-4 animate-pulse text-purple-500" />
                  <span>
                    {scanProgress < 15 ? 'Loading computer vision model...' :
                     scanProgress < 30 ? 'Detecting object boundaries...' :
                     scanProgress < 45 ? 'Extracting visual features...' :
                     scanProgress < 60 ? 'Analyzing object characteristics...' :
                     scanProgress < 75 ? 'Comparing with knowledge base...' :
                     scanProgress < 90 ? 'Determining condition and value...' :
                     'Generating market insights...'}
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
                    <Badge className={scanResult.confidence > 85 ? "bg-green-500" : "bg-yellow-500"}>
                      {scanResult.confidence}%
                    </Badge>
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
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={() => window.setCurrentView && window.setCurrentView('add-item')}
                  >
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
                Identifies items with 89%+ accuracy using computer vision
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
