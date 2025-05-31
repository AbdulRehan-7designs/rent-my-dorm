
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Shield, 
  Clock, 
  AlertTriangle, 
  Package, 
  MessageSquare,
  CheckCircle,
  Ban,
  Star
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface RentalAgreementProps {
  lenderName: string;
  borrowerName: string;
  itemName: string;
  startDate: string;
  returnDate: string;
  rentalFee: number;
  platformFee: number;
  totalAmount: number;
  onAgree: () => void;
  onCancel: () => void;
}

const RentalAgreement: React.FC<RentalAgreementProps> = ({
  lenderName,
  borrowerName,
  itemName,
  startDate,
  returnDate,
  rentalFee,
  platformFee,
  totalAmount,
  onAgree,
  onCancel
}) => {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleAgree = () => {
    if (!hasReadTerms || !agreedToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please read and agree to all terms before proceeding",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Agreement Signed! 📃",
      description: "Digital rental agreement has been created and signed by both parties",
    });
    
    onAgree();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>📃 Rent My Dorm – Digital Rental Agreement</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Agreement Parties */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Agreement Between:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700 font-medium">Lender (Owner):</p>
                <p className="text-blue-900 font-semibold">{lenderName}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700 font-medium">Borrower (Renter):</p>
                <p className="text-blue-900 font-semibold">{borrowerName}</p>
              </div>
            </div>
          </div>

          {/* Rental Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Item:</p>
                <p className="font-semibold">{itemName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rental Period:</p>
                <p className="font-semibold">{startDate} → {returnDate}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Rental Fee:</p>
                <p className="font-semibold">₹{rentalFee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Platform Fee:</p>
                <p className="font-semibold">₹{platformFee}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-2">
                <p className="text-sm text-green-700">Total Paid:</p>
                <p className="font-bold text-green-900 text-lg">₹{totalAmount}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <span>📌 Strict Terms & Conditions</span>
            </h3>

            {/* Term 1: Item Handling */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>1. ✅ Item Handling</span>
                </h4>
                <p className="text-gray-700 text-sm">
                  Borrower must use the item responsibly and return it in original condition by the agreed return date.
                </p>
              </CardContent>
            </Card>

            {/* Term 2: Late Return Policy */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span>2. 🔁 Late Return Policy</span>
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Delay of up to 24 hours → <span className="font-semibold text-yellow-700">₹20 fine per item</span> (auto-applied)</p>
                  <p>• Delay beyond 3 days → <span className="font-semibold text-red-700">Permanent ban + college-wide flag</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Term 3: Loss or Damage Policy */}
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>3. ❌ Loss or Damage Policy</span>
                </h4>
                <p className="text-gray-700 text-sm mb-2">If the item is:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• <span className="font-semibold">Damaged</span> → Borrower must compensate up to <span className="font-semibold text-orange-700">70% of item's value</span></p>
                  <p>• <span className="font-semibold">Lost / Not Returned</span> → Borrower must compensate <span className="font-semibold text-red-700">full value</span> OR platform will:</p>
                  <div className="ml-4 space-y-1">
                    <p>- Ban borrower permanently</p>
                    <p>- Show "⚠️ Banned for Misuse" tag on profile</p>
                    <p>- Notify lender and optionally notify borrower's college admin (future feature)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Term 4: Pickup & Delivery */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>4. 📦 Pickup & Delivery</span>
                </h4>
                <p className="text-gray-700 text-sm">
                  Pickup/delivery method must be agreed upon in chat. Platform is not responsible for transport unless clearly marked "Platform Pickup".
                </p>
              </CardContent>
            </Card>

            {/* Term 5: Zero Deposit System */}
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>5. 🔒 Zero Deposit, Strict Reputation System</span>
                </h4>
                <p className="text-gray-700 text-sm mb-2">No upfront security is taken, but platform protection exists through:</p>
                <div className="space-y-1 text-sm text-gray-700 ml-4">
                  <p>• Verified college identity</p>
                  <p>• User ratings & flags</p>
                  <p>• Penalty enforcement</p>
                  <p>• Account reputation system visible to all</p>
                </div>
              </CardContent>
            </Card>

            {/* Term 6: Dispute Resolution */}
            <Card className="border-l-4 border-l-indigo-500">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>6. 💬 Dispute Resolution</span>
                </h4>
                <p className="text-gray-700 text-sm mb-2">Any issues must be reported within 48 hours.</p>
                <p className="text-gray-700 text-sm mb-2">Platform admin team will resolve disputes using:</p>
                <div className="space-y-1 text-sm text-gray-700 ml-4">
                  <p>• Chat history</p>
                  <p>• Item photos</p>
                  <p>• Verified user data</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reputation Tags Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-3">🏷️ In-App Reputation Tags</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <Badge className="bg-green-500 text-white">✅ Trusted Renter</Badge>
                <span className="text-purple-700">5+ successful rentals</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="destructive">⚠️ Late Returner</Badge>
                <span className="text-purple-700">2+ late returns</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-red-600 text-white">❌ Item Abuser</Badge>
                <span className="text-purple-700">Damage/missing item case</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Agreement Confirmation */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">✅ Agreement Confirmation</h3>
            <p className="text-gray-700">
              By clicking "Agree & Rent Now", both Lender and Borrower agree to follow the above terms. 
              Violating any rule may result in:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
              <li>Account suspension or ban</li>
              <li>Payment penalties</li>
              <li>Public profile flags (visible to other users and colleges)</li>
            </ul>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="read-terms" 
                  checked={hasReadTerms}
                  onCheckedChange={(checked) => setHasReadTerms(checked === true)}
                />
                <label htmlFor="read-terms" className="text-sm text-gray-700">
                  I have read and understood all terms and conditions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="agree-terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                />
                <label htmlFor="agree-terms" className="text-sm text-gray-700">
                  I agree to abide by all rules and accept the consequences of violations
                </label>
              </div>
            </div>
          </div>

          {/* Trust & Safety Message */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">🛡️ We Protect Your Rentals</h4>
                <p className="text-blue-800 text-sm mb-2">
                  We protect your rentals without charging extra. Verified college IDs, user ratings, 
                  clear rules, and smart penalties — so you rent confidently, even without a deposit.
                </p>
                <p className="text-blue-800 text-sm">
                  We ensure student-to-student rentals are safe with verified users, transparent rules, 
                  optional deposits, and a clear support policy — built for trust on every campus.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onCancel}
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAgree}
              disabled={!hasReadTerms || !agreedToTerms}
              size="lg"
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <FileText className="w-4 h-4 mr-2" />
              Agree & Rent Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalAgreement;
