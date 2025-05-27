
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Scan, CheckCircle, XCircle, Zap, ArrowLeft, RefreshCw, Eye } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const AIObjectRecognition = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanResults, setScanResults] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Mock AI object recognition results
  const mockScanResults = [
    { name: 'MacBook Pro', confidence: 95, category: 'Electronics', verified: true },
    { name: 'Laptop Computer', confidence: 88, category: 'Electronics', verified: true },
    { name: 'Apple MacBook', confidence: 92, category: 'Electronics', verified: true }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        simulateAIScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIScan = () => {
    setIsScanning(true);
    setScanResults(null);
    setConfidence(0);

    // Simulate AI processing with progress
    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResults(mockScanResults);
          toast({
            title: "AI Scan Complete! 🎯",
            description: "Object successfully identified and verified",
          });
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  };

  const startCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg');
      setSelectedImage(imageData);
      simulateAIScan();
      
      // Stop camera stream
      video.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Eye className="w-8 h-8 mr-3 text-blue-600" />
            AI Object Recognition
          </h1>
          <p className="text-gray-600 mt-2">Verify items instantly using advanced computer vision</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2 text-blue-600" />
              Capture or Upload Item
            </CardTitle>
            <CardDescription>
              Use your camera or upload an image for AI-powered item recognition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Camera Section */}
            <div className="space-y-4">
              <Button 
                onClick={startCameraCapture}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Camera
              </Button>
              
              <video 
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg border-2 border-dashed border-gray-300"
                style={{ display: videoRef.current?.srcObject ? 'block' : 'none' }}
              />
              
              {videoRef.current?.srcObject && (
                <Button onClick={captureImage} className="w-full" variant="outline">
                  <Scan className="w-4 h-4 mr-2" />
                  Capture Image
                </Button>
              )}
            </div>

            {/* Upload Section */}
            <div className="border-t pt-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
            </div>

            {/* Selected Image Preview */}
            {selectedImage && (
              <div className="mt-6">
                <img 
                  src={selectedImage} 
                  alt="Selected item"
                  className="w-full rounded-lg border shadow-lg"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-orange-600" />
              AI Analysis Results
            </CardTitle>
            <CardDescription>
              Real-time object detection and verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isScanning && (
              <div className="text-center py-8">
                <RefreshCw className="w-12 h-12 mx-auto text-blue-600 animate-spin mb-4" />
                <h3 className="text-lg font-semibold mb-2">AI Analyzing...</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">Confidence: {Math.round(confidence)}%</p>
              </div>
            )}

            {scanResults && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-green-600">✅ Analysis Complete</h3>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>

                {scanResults.map((result, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{result.name}</h4>
                          <p className="text-sm text-gray-600">Category: {result.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            {result.verified ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mr-2" />
                            )}
                            <span className="font-bold text-lg">{result.confidence}%</span>
                          </div>
                          <p className="text-xs text-gray-500">Confidence</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🔍 AI Insights</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Object successfully identified using computer vision</li>
                    <li>• High confidence match with database</li>
                    <li>• Item appears to be in good condition</li>
                    <li>• Authenticity verification passed</li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Proceed with Verified Item
                </Button>
              </div>
            )}

            {!isScanning && !scanResults && (
              <div className="text-center py-12 text-gray-500">
                <Scan className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Upload or capture an image to start AI analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default AIObjectRecognition;
