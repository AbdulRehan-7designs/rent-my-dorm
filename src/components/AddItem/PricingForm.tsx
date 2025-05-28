
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from 'lucide-react';

interface PricingFormProps {
  formData: {
    price: string;
    priceType: string;
    deposit: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PricingForm: React.FC<PricingFormProps> = ({ formData, onInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Pricing & Terms</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Rental Price *</Label>
            <Input
              id="price"
              type="number"
              placeholder="800"
              value={formData.price}
              onChange={(e) => onInputChange('price', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="priceType">Per</Label>
            <Select value={formData.priceType} onValueChange={(value) => onInputChange('priceType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hour">Hour</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="deposit">Security Deposit (Optional)</Label>
          <Input
            id="deposit"
            type="number"
            placeholder="2000"
            value={formData.deposit}
            onChange={(e) => onInputChange('deposit', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingForm;
