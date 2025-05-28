
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';

interface LocationFormProps {
  formData: {
    location: string;
    availability: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ formData, onInputChange }) => {
  return (
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
            onChange={(e) => onInputChange('location', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="availability">Available From</Label>
          <Input
            id="availability"
            type="date"
            value={formData.availability}
            onChange={(e) => onInputChange('availability', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationForm;
