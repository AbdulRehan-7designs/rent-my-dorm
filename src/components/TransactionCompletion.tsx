
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  DollarSign, 
  Shield, 
  Star,
  MessageSquare
} from 'lucide-react';
import { escrowService, EscrowTransaction } from '@/utils/escrowManager';
import { formatCurrency } from '@/utils/feeCalculation';

interface TransactionCompletionProps {
  transactionId: string;
  onComplete: () => void;
}

const TransactionCompletion: React.FC<TransactionCompletionProps> = ({
  transactionId,
  onComplete
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const transaction = escrowService.getTransactionStatus(transactionId);

  if (!transaction) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Transaction not found</p>
        </CardContent>
      </Card>
    );
  }

  const handleCompleteTransaction = async () => {
    setIsCompleting(true);

    try {
      // Simulate rental confirmation process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Release funds from escrow
      const released = escrowService.releaseFunds(transactionId);

      if (released) {
        toast({
          title: "🎉 Transaction Completed!",
          description: `Vendor payment of ${formatCurrency(transaction.vendorAmount)} has been processed`,
        });

        // Log platform earnings
        console.log(`Platform earned: ${formatCurrency(transaction.commissionFee)} from transaction ${transactionId}`);

        onComplete();
      } else {
        throw new Error("Failed to release funds");
      }
    } catch (error) {
      toast({
        title: "Error Completing Transaction",
        description: "Please contact support for assistance",
        variant: "destructive"
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span>Complete Your Rental</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Transaction Status */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Secure Escrow Status</h4>
                <p className="text-blue-700 text-sm">
                  {formatCurrency(transaction.totalAmount)} is currently held in escrow
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Vendor will receive:</span>
                <p className="font-semibold text-blue-900">{formatCurrency(transaction.vendorAmount)}</p>
              </div>
              <div>
                <span className="text-blue-600">Platform commission:</span>
                <p className="font-semibold text-blue-900">{formatCurrency(transaction.commissionFee)}</p>
              </div>
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Rate your rental experience</h4>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional feedback (optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience with this rental..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirmation */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Confirm Return</h4>
            <p className="text-sm text-gray-600 mb-3">
              By completing this transaction, you confirm that:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• The rental item has been returned in good condition</li>
              <li>• You are satisfied with the rental experience</li>
              <li>• Payment should be released to the vendor</li>
            </ul>
          </div>

          <Button
            onClick={handleCompleteTransaction}
            disabled={isCompleting || rating === 0}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            size="lg"
          >
            {isCompleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Completing Transaction...
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-2" />
                Complete Rental & Release Payment
              </>
            )}
          </Button>

          {rating === 0 && (
            <p className="text-sm text-orange-600 text-center">
              Please provide a rating before completing the transaction
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionCompletion;
