
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

interface AIDetectionResult {
  item: string;
  confidence: number;
  category: string;
  suggestedPrice: string;
  condition: string;
}

interface AIDetectionProps {
  aiDetection: AIDetectionResult | null;
  onAIDetection: () => void;
  onApplySuggestions: () => void;
}

const AIDetection: React.FC<AIDetectionProps> = ({ 
  aiDetection, 
  onAIDetection, 
  onApplySuggestions 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5" />
          <span>AI Item Detection</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!aiDetection ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">Let AI analyze your item and auto-fill details</p>
            <Button onClick={onAIDetection} className="bg-gradient-to-r from-purple-500 to-blue-500">
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze with AI
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Detected Item:</span>
              <span>{aiDetection.item}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Confidence:</span>
              <span>{aiDetection.confidence}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Suggested Price:</span>
              <span>{aiDetection.suggestedPrice}</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onApplySuggestions}
            >
              Apply AI Suggestions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIDetection;
