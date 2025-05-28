
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, AlertCircle } from 'lucide-react';

interface AIDetectionResult {
  item: string;
  confidence: number;
  category: string;
  suggestedPrice: string;
  condition: string;
  marketDemand: 'Low' | 'Medium' | 'High';
  features: string[];
}

interface AIDetectionProps {
  aiDetection: AIDetectionResult | null;
  onAIDetection: () => void;
  onApplySuggestions: () => void;
  images: any[];
}

const AIDetection: React.FC<AIDetectionProps> = ({ 
  aiDetection, 
  onAIDetection, 
  onApplySuggestions,
  images 
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
            {images.length === 0 ? (
              <div className="text-gray-500 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
                <p>Please upload at least one image to enable AI analysis</p>
              </div>
            ) : (
              <>
                <Brain className="w-12 h-12 text-purple-500 mx-auto" />
                <p className="text-gray-600">Let AI analyze your item images and auto-fill details</p>
                <Button 
                  onClick={onAIDetection} 
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                  disabled={images.length === 0}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze with AI
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">Detected Item:</span>
                <span className="text-right">{aiDetection.item}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Confidence:</span>
                <Badge variant={aiDetection.confidence > 85 ? "default" : "secondary"}>
                  {aiDetection.confidence}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Category:</span>
                <span className="text-right">{aiDetection.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Condition:</span>
                <span className="text-right">{aiDetection.condition}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Suggested Price:</span>
                <span className="text-right font-semibold text-green-600">{aiDetection.suggestedPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Market Demand:</span>
                <Badge variant={aiDetection.marketDemand === 'High' ? "default" : "secondary"}>
                  {aiDetection.marketDemand}
                </Badge>
              </div>
            </div>
            
            {aiDetection.features && aiDetection.features.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm">Detected Features:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {aiDetection.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
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
