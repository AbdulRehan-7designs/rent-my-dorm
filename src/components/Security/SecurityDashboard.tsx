
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from 'lucide-react';
import PhotoDocumentation from './PhotoDocumentation';
import IdentityVerification from './IdentityVerification';
import DynamicDeposit from './DynamicDeposit';

interface SecurityDashboardProps {
  onBack: () => void;
}

const SecurityDashboard: React.FC<SecurityDashboardProps> = ({ onBack }) => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // Demo data
  const demoUserProfile = {
    trustScore: 750,
    completedRentals: 8,
    verificationLevel: 'medium' as const,
    damageHistory: 0,
    lateReturns: 1
  };

  const demoItemDetails = {
    value: 50000,
    category: 'electronics' as const,
    riskLevel: 'medium' as const
  };

  const handlePhotoComplete = (photos: any[]) => {
    console.log('Photos completed:', photos);
    setActiveDemo(null);
  };

  const handleVerificationComplete = (status: any) => {
    console.log('Verification completed:', status);
  };

  const handleDepositCalculated = (amount: number, breakdown: any) => {
    console.log('Deposit calculated:', amount, breakdown);
  };

  if (activeDemo === 'photo') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Button variant="ghost" onClick={() => setActiveDemo(null)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Security Features
        </Button>
        <PhotoDocumentation
          itemId="demo-item"
          rentalId="demo-rental"
          phase="pickup"
          onComplete={handlePhotoComplete}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Security & Trust Center</h1>
          <p className="text-gray-600 mt-2">Advanced security features for safe rentals</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="photo">Photo Docs</TabsTrigger>
          <TabsTrigger value="verification">Identity</TabsTrigger>
          <TabsTrigger value="deposit">Smart Deposit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                  onClick={() => setActiveDemo('photo')}>
              <CardHeader>
                <CardTitle className="text-lg">📸 Photo Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI-powered condition assessment with before/after photos
                </p>
                <Button variant="outline" className="w-full">
                  Try Demo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🆔 Identity Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Multi-level verification including government ID and student status
                </p>
                <Button variant="outline" className="w-full">
                  View Features
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💰 Smart Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Dynamic security deposits based on trust score and history
                </p>
                <Button variant="outline" className="w-full">
                  Calculate Savings
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>🛡️ Security Features Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Implemented ✅</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• AI-powered photo documentation</li>
                    <li>• Multi-level identity verification</li>
                    <li>• Dynamic security deposits</li>
                    <li>• Trust score calculation</li>
                    <li>• Basic escrow system</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Coming Soon 🚀</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• QR code item tracking</li>
                    <li>• GPS tracking for valuables</li>
                    <li>• Insurance integration</li>
                    <li>• Video call verification</li>
                    <li>• Automated damage detection</li>
                    <li>• Real-time monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photo">
          <PhotoDocumentation
            itemId="demo-item"
            rentalId="demo-rental"
            phase="pickup"
            onComplete={handlePhotoComplete}
          />
        </TabsContent>

        <TabsContent value="verification">
          <IdentityVerification
            userId="demo-user"
            onVerificationComplete={handleVerificationComplete}
          />
        </TabsContent>

        <TabsContent value="deposit">
          <DynamicDeposit
            userProfile={demoUserProfile}
            itemDetails={demoItemDetails}
            baseDeposit={5000}
            onDepositCalculated={handleDepositCalculated}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
