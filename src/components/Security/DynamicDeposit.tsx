
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, DollarSign, TrendingDown, Star } from 'lucide-react';

interface UserProfile {
  trustScore: number;
  completedRentals: number;
  verificationLevel: 'low' | 'medium' | 'high';
  damageHistory: number;
  lateReturns: number;
}

interface ItemDetails {
  value: number;
  category: 'electronics' | 'books' | 'furniture' | 'clothing';
  riskLevel: 'low' | 'medium' | 'high';
}

interface DynamicDepositProps {
  userProfile: UserProfile;
  itemDetails: ItemDetails;
  baseDeposit: number;
  onDepositCalculated: (amount: number, breakdown: any) => void;
}

const DynamicDeposit: React.FC<DynamicDepositProps> = ({
  userProfile,
  itemDetails,
  baseDeposit,
  onDepositCalculated
}) => {
  const [depositBreakdown, setDepositBreakdown] = useState<any>(null);

  useEffect(() => {
    calculateDynamicDeposit();
  }, [userProfile, itemDetails, baseDeposit]);

  const calculateDynamicDeposit = () => {
    let finalDeposit = baseDeposit;
    const adjustments = [];

    // Trust Score Adjustment (-50% to +100%)
    const trustMultiplier = getTrustMultiplier(userProfile.trustScore);
    const trustAdjustment = baseDeposit * (trustMultiplier - 1);
    finalDeposit += trustAdjustment;
    
    if (trustAdjustment !== 0) {
      adjustments.push({
        type: 'Trust Score',
        amount: trustAdjustment,
        description: `${userProfile.trustScore}/1000 trust score`
      });
    }

    // Verification Level Discount
    const verificationDiscount = getVerificationDiscount(userProfile.verificationLevel);
    const verificationAdjustment = -baseDeposit * verificationDiscount;
    finalDeposit += verificationAdjustment;
    
    if (verificationAdjustment !== 0) {
      adjustments.push({
        type: 'Verification Level',
        amount: verificationAdjustment,
        description: `${userProfile.verificationLevel} verification`
      });
    }

    // Rental History Bonus
    if (userProfile.completedRentals >= 10) {
      const historyDiscount = -baseDeposit * 0.15;
      finalDeposit += historyDiscount;
      adjustments.push({
        type: 'Rental History',
        amount: historyDiscount,
        description: `${userProfile.completedRentals}+ completed rentals`
      });
    }

    // Risk Adjustment based on item category
    const riskAdjustment = getRiskAdjustment(itemDetails.category, itemDetails.riskLevel);
    const riskAmount = baseDeposit * riskAdjustment;
    finalDeposit += riskAmount;
    
    if (riskAmount !== 0) {
      adjustments.push({
        type: 'Item Risk',
        amount: riskAmount,
        description: `${itemDetails.category} - ${itemDetails.riskLevel} risk`
      });
    }

    // Damage History Penalty
    if (userProfile.damageHistory > 0) {
      const damagesPenalty = baseDeposit * (userProfile.damageHistory * 0.1);
      finalDeposit += damagesPenalty;
      adjustments.push({
        type: 'Damage History',
        amount: damagesPenalty,
        description: `${userProfile.damageHistory} past damage reports`
      });
    }

    // Ensure minimum deposit
    finalDeposit = Math.max(finalDeposit, baseDeposit * 0.3);
    
    const breakdown = {
      baseDeposit,
      finalDeposit: Math.round(finalDeposit),
      adjustments,
      savingsPercent: Math.round(((baseDeposit - finalDeposit) / baseDeposit) * 100)
    };

    setDepositBreakdown(breakdown);
    onDepositCalculated(breakdown.finalDeposit, breakdown);
  };

  const getTrustMultiplier = (trustScore: number): number => {
    if (trustScore >= 800) return 0.5; // 50% reduction
    if (trustScore >= 700) return 0.7; // 30% reduction
    if (trustScore >= 600) return 0.9; // 10% reduction
    if (trustScore >= 400) return 1.0; // No change
    if (trustScore >= 300) return 1.3; // 30% increase
    return 1.5; // 50% increase
  };

  const getVerificationDiscount = (level: string): number => {
    switch (level) {
      case 'high': return 0.2; // 20% discount
      case 'medium': return 0.1; // 10% discount
      case 'low': return 0; // No discount
      default: return 0;
    }
  };

  const getRiskAdjustment = (category: string, riskLevel: string): number => {
    const categoryMultipliers = {
      electronics: 0.1,
      furniture: 0.05,
      books: -0.1,
      clothing: -0.05
    };

    const riskMultipliers = {
      high: 0.2,
      medium: 0.1,
      low: 0
    };

    return (categoryMultipliers[category] || 0) + (riskMultipliers[riskLevel] || 0);
  };

  if (!depositBreakdown) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span>Smart Security Deposit</span>
          {depositBreakdown.savingsPercent > 0 && (
            <Badge className="bg-green-500 text-white">
              {depositBreakdown.savingsPercent}% Savings
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Final Amount */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Your Security Deposit</p>
              <p className="text-2xl font-bold text-green-700">
                ₹{depositBreakdown.finalDeposit}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Standard Rate</p>
              <p className="text-lg text-gray-500 line-through">
                ₹{depositBreakdown.baseDeposit}
              </p>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Deposit Calculation</h4>
          
          <div className="flex justify-between text-sm">
            <span>Base Deposit</span>
            <span>₹{depositBreakdown.baseDeposit}</span>
          </div>

          {depositBreakdown.adjustments.map((adj, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span>{adj.type}</span>
                {adj.amount < 0 && <TrendingDown className="w-3 h-3 text-green-600" />}
              </div>
              <span className={adj.amount < 0 ? 'text-green-600' : 'text-red-600'}>
                {adj.amount > 0 ? '+' : ''}₹{Math.round(adj.amount)}
              </span>
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Final Deposit</span>
            <span>₹{depositBreakdown.finalDeposit}</span>
          </div>
        </div>

        {/* Trust Building Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h5 className="font-medium text-blue-900 mb-2">💡 Reduce Your Deposit</h5>
          <ul className="text-sm text-blue-700 space-y-1">
            {userProfile.verificationLevel !== 'high' && (
              <li>• Complete identity verification for up to 20% discount</li>
            )}
            {userProfile.completedRentals < 10 && (
              <li>• Complete 10+ rentals for loyalty discount</li>
            )}
            {userProfile.trustScore < 700 && (
              <li>• Maintain good rental history to improve trust score</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicDeposit;
