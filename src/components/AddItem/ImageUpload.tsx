
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, X } from 'lucide-react';

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
