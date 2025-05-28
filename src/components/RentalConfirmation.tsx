
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Calendar,
  MapPin,
  Package,
  User
} from 'lucide-react';
import FeeBreakdown from './FeeBreakdown';
import { calculateTransactionFee, UserRentalHistory } from '@/utils/feeCalculation';
import { escrowService } from '@/utils/escrowManager';

interface RentalItem {
  id: string;
  title: string;
  price: number;
  priceType: string;
  vendor: {
    id: string;
    name: string;
    rating: number;
  };
  duration: number;
  location: string;
  image?: string;
}

interface RenterDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  rentalHistory: UserRentalHistory;
}

interface RentalConfirmationProps {
  item: RentalItem;
  renter: RenterDetails;
  onConfirm: (transactionId: string) => void;
  onCancel: () => void;
}

const RentalConfirmation: React.FC<RentalConfirmationProps> = ({
  item,
  renter,
  onConfirm,
  onCancel
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeeBreakdown, setShowFeeBreakdown] = useState(true);

  // Calculate total rental amount
  const totalRentalAmount = item.price * item.duration;
  
  // Calculate fees
  const feeCalculation = calculateTransactionFee(totalRentalAmount, renter.rentalHistory);

  const handleConfirmRental = async () => {
    setIsProcessing(true);

    try {
      // Create escrow transaction
      const escrowTransaction = escrowService.createEscrow({
        rentalId: `rental_${Date.now()}`,
        renterId: renter.id,
        vendorId: item.vendor.id,
        totalAmount: totalRentalAmount,
        commissionFee: feeCalculation.commissionFee,
        vendorAmount: feeCalculation.vendorAmount
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Hold funds in escrow
      const fundsHeld = escrowService.holdFunds(escrowTransaction.id);
      
      if (fundsHeld) {
        toast({
          title: "Rental Confirmed! 🎉",
          description: `₹${totalRentalAmount} held in secure escrow until rental completion`,
        });

        onConfirm(escrowTransaction.id);
      } else {
        throw new Error("Failed to process payment");
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Rental</h1>
        <p className="text-gray-600">Review the details and complete your transaction</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Item Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <span>Rental Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">₹{item.price}/{item.priceType}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{item.vendor.name}</span>
                <Badge variant="outline">⭐ {item.vendor.rating}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{item.duration} {item.priceType}(s)</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{item.location}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Rental Subtotal</span>
              <span>₹{totalRentalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Fee Breakdown */}
        <div className="space-y-6">
          <FeeBreakdown 
            feeCalculation={feeCalculation}
            userRole="renter"
          />

          {/* Renter Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-600" />
                <span>Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span>{renter.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span>{renter.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span>{renter.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Rentals</span>
                <span>{renter.rentalHistory.completedRentals}</span>
              </div>
              {feeCalculation.isLoyaltyDiscount && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  🏆 Loyalty Member - 3% Commission Rate
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 justify-center">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing}
          size="lg"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleConfirmRental}
          disabled={isProcessing}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Confirm & Pay ₹{totalRentalAmount}
            </>
          )}
        </Button>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <div>
            <h4 className="font-semibold text-blue-900">Secure Escrow Protection</h4>
            <p className="text-blue-700 text-sm">
              Your payment is protected. Funds are held securely until rental completion, 
              and the vendor only receives payment after you confirm the item return.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmation;
