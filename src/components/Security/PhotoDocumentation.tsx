
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PhotoEvidence {
  id: string;
  type: 'before_rental' | 'after_rental' | 'damage_report';
  url: string;
  timestamp: Date;
  aiAnalysis?: {
    condition: 'excellent' | 'good' | 'fair' | 'poor';
    damageDetected: boolean;
    confidence: number;
    issues: string[];
  };
}

interface PhotoDocumentationProps {
  itemId: string;
  rentalId: string;
  phase: 'pickup' | 'return';
  onComplete: (photos: PhotoEvidence[]) => void;
}

const PhotoDocumentation: React.FC<PhotoDocumentationProps> = ({
  itemId,
  rentalId,
  phase,
  onComplete
}) => {
  const [photos, setPhotos] = useState<PhotoEvidence[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = async (files: FileList) => {
    const newPhotos: PhotoEvidence[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        if (e.target?.result) {
          const photoId = `photo_${Date.now()}_${i}`;
          const photo: PhotoEvidence = {
            id: photoId,
            type: phase === 'pickup' ? 'before_rental' : 'after_rental',
            url: e.target.result as string,
            timestamp: new Date()
          };

          // Simulate AI analysis
          setIsAnalyzing(true);
          setTimeout(() => {
            const conditionOptions: Array<'excellent' | 'good' | 'fair' | 'poor'> = ['excellent', 'good', 'fair', 'poor'];
            const randomCondition = conditionOptions[Math.random() > 0.3 ? 1 : 2]; // More likely to be 'good' or 'fair'
            
            const aiAnalysis = {
              condition: randomCondition,
              damageDetected: Math.random() > 0.7,
              confidence: Math.floor(Math.random() * 20) + 80,
              issues: Math.random() > 0.5 ? [] : ['Minor scratches detected', 'Surface wear visible']
            };

            photo.aiAnalysis = aiAnalysis;
            newPhotos.push(photo);
            setPhotos(prev => [...prev, photo]);
            setIsAnalyzing(false);

            toast({
              title: "Photo Analyzed",
              description: `Condition: ${aiAnalysis.condition} (${aiAnalysis.confidence}% confidence)`,
            });
          }, 2000);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const completeDocumentation = () => {
    if (photos.length < 2) {
      toast({
        title: "Insufficient Photos",
        description: "Please take at least 2 photos from different angles",
        variant: "destructive"
      });
      return;
    }

    onComplete(photos);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <span>
            {phase === 'pickup' ? 'Pre-Rental Documentation' : 'Post-Rental Documentation'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Documentation Guidelines</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Take photos from multiple angles</li>
            <li>• Ensure good lighting and clear focus</li>
            <li>• Document any existing damage or wear</li>
            <li>• Include close-ups of important features</li>
          </ul>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Take photos to document item condition</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handlePhotoUpload(e.target.files)}
            className="hidden"
            ref={fileInputRef}
          />
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Photos
          </Button>
        </div>

        {isAnalyzing && (
          <div className="text-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">AI analyzing photo condition...</p>
          </div>
        )}

        {photos.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative">
                <img 
                  src={photo.url} 
                  alt="Documentation" 
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={() => removePhoto(photo.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
                
                {photo.aiAnalysis && (
                  <div className="absolute bottom-2 left-2 space-y-1">
                    <Badge 
                      className={`text-xs ${
                        photo.aiAnalysis.condition === 'excellent' ? 'bg-green-500' :
                        photo.aiAnalysis.condition === 'good' ? 'bg-blue-500' :
                        photo.aiAnalysis.condition === 'fair' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    >
                      {photo.aiAnalysis.condition}
                    </Badge>
                    
                    {photo.aiAnalysis.damageDetected && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Damage
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {photos.length >= 2 && (
          <Button 
            onClick={completeDocumentation}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Documentation ({photos.length} photos)
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoDocumentation;
