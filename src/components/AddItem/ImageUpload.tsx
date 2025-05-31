
import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, X, AlertCircle } from 'lucide-react';

interface Image {
  id: number;
  src: string;
  file: File;
}

interface ImageUploadProps {
  images: Image[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (id: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ images, onImageUpload, onRemoveImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError('Camera access denied. Please allow camera permissions and try again.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `camera-photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          
          // Create a proper FileList-like object
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          
          // Use the hidden input to trigger the upload
          if (hiddenFileInputRef.current) {
            hiddenFileInputRef.current.files = dataTransfer.files;
            
            // Create a proper event
            const event = new Event('change', { bubbles: true });
            Object.defineProperty(event, 'target', {
              writable: false,
              value: hiddenFileInputRef.current
            });
            
            onImageUpload(event as React.ChangeEvent<HTMLInputElement>);
          }
          
          stopCamera();
        }
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  return (
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
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
                ref={fileInputRef}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Choose Files
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="camera" className="space-y-4">
            {cameraError && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{cameraError}</span>
                </div>
              </div>
            )}
            
            {!isCameraActive ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Take a photo of your item</p>
                <Button variant="outline" onClick={startCamera}>
                  <Camera className="w-4 h-4 mr-2" />
                  Open Camera
                </Button>
              </div>
            ) : (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg border"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
                  <Button onClick={capturePhoto} className="bg-white text-black hover:bg-gray-100">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture
                  </Button>
                  <Button variant="outline" onClick={stopCamera} className="bg-white text-black">
                    Cancel
                  </Button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Hidden input for camera captured files */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={hiddenFileInputRef}
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {images.map((img) => (
              <div key={img.id} className="relative">
                <img src={img.src} alt="Upload" className="w-full h-32 object-cover rounded-lg" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={() => onRemoveImage(img.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
