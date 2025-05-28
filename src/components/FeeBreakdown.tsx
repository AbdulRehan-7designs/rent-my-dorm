
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Award, DollarSign, Info } from 'lucide-react';
import { FeeCalculation, formatCurrency } from '@/utils/feeCalculation';

interface FeeBreakdownProps {
  feeCalculation: FeeCalculation;
  userRole: 'renter' | 'vendor';
  className?: string;
}

const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ 
  feeCalculation, 
  userRole, 
  className 
}) => {
  const { 
    rentalAmount, 
    commissionFee, 
    vendorAmount, 
    isLoyaltyDiscount, 
    feeBreakdown,
    commissionRate 
  } = feeCalculation;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span>Transaction Fee Breakdown</span>
          {isLoyaltyDiscount && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Loyalty Discount
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rental Amount */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Rental Amount</span>
          <span className="font-semibold text-lg">{formatCurrency(rentalAmount)}</span>
        </div>

        <Separator />

        {/* Commission Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Platform Commission</span>
              <Badge variant="outline">
                {(commissionRate * 100).toFixed(0)}%
              </Badge>
            </div>
            <span className="font-medium text-red-600">
              -{formatCurrency(commissionFee)}
            </span>
          </div>

          {/* Loyalty Discount */}
          {isLoyaltyDiscount && feeBreakdown.loyaltyDiscount && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-purple-600 flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>Loyalty Discount (2% off)</span>
              </span>
              <span className="text-purple-600">
                +{formatCurrency(feeBreakdown.loyaltyDiscount)}
              </span>
            </div>
          )}

          {/* Fee Adjustments */}
          {feeBreakdown.minimumFeeApplied && (
            <div className="flex items-center space-x-2 text-sm text-amber-600">
              <Info className="w-3 h-3" />
              <span>Minimum fee of ₹10 applied</span>
            </div>
          )}

          {feeBreakdown.maximumFeeCapped && (
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <Info className="w-3 h-3" />
              <span>Fee capped at maximum ₹100</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Final Amounts */}
        {userRole === 'vendor' ? (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">You'll Receive</span>
            <span className="font-bold text-xl text-green-600">
              {formatCurrency(vendorAmount)}
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Vendor Receives</span>
              <span className="font-medium">{formatCurrency(vendorAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-medium">Total You Pay</span>
              <span className="font-bold text-xl text-blue-600">
                {formatCurrency(rentalAmount)}
              </span>
            </div>
          </div>
        )}

        {/* Escrow Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Secure Transaction</p>
              <p>
                Funds are held in escrow until rental completion. 
                Commission is deducted only after successful transaction.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeeBreakdown;
