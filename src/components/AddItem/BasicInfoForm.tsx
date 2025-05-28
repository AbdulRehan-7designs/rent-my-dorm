
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoFormProps {
  formData: {
    title: string;
    description: string;
    category: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const categories = [
  'Electronics', 'Books', 'Furniture', 'Gaming', 'Vehicles', 'Sports', 'Musical Instruments', 'Other'
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('title', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your item, its condition, and any included accessories..."
            rows={4}
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)}>
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
  );
};

export default BasicInfoForm;
