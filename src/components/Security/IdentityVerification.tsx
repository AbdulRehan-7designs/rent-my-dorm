
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Camera, 
  Phone, 
  Mail, 
  CreditCard, 
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Upload
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface VerificationStatus {
  phone: boolean;
  email: boolean;
  studentId: boolean;
  governmentId: boolean;
  videoCall: boolean;
}

interface IdentityVerificationProps {
  userId: string;
  onVerificationComplete: (status: VerificationStatus) => void;
}

const IdentityVerification: React.FC<IdentityVerificationProps> = ({
  userId,
  onVerificationComplete
}) => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    phone: false,
    email: true, // Assume email is verified during signup
    studentId: false,
    governmentId: false,
    videoCall: false
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyPhone = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    // Simulate OTP verification
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, phone: true }));
      setIsVerifying(false);
      toast({
        title: "Phone Verified! ✅",
        description: "OTP verification successful",
      });
    }, 2000);
  };

  const verifyStudentId = async () => {
    if (!studentIdNumber) {
      toast({
        title: "Missing Student ID",
        description: "Please enter your student ID number",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    // Simulate student ID verification
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, studentId: true }));
      setIsVerifying(false);
      toast({
        title: "Student ID Verified! 🎓",
        description: "Student identity confirmed",
      });
    }, 3000);
  };

  const verifyGovernmentId = async () => {
    if (!aadhaarNumber || aadhaarNumber.length < 12) {
      toast({
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    // Simulate government ID verification
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, governmentId: true }));
      setIsVerifying(false);
      toast({
        title: "Government ID Verified! 🆔",
        description: "Identity verification successful",
      });
    }, 4000);
  };

  const scheduleVideoCall = () => {
    toast({
      title: "Video Call Scheduled 📹",
      description: "You'll receive a call within 24 hours for verification",
    });
    setVerificationStatus(prev => ({ ...prev, videoCall: true }));
  };

  const getTrustScore = () => {
    const verifiedCount = Object.values(verificationStatus).filter(Boolean).length;
    return (verifiedCount / 5) * 100;
  };

  const getVerificationLevel = () => {
    const score = getTrustScore();
    if (score >= 80) return { level: 'High', color: 'bg-green-500' };
    if (score >= 60) return { level: 'Medium', color: 'bg-yellow-500' };
    return { level: 'Low', color: 'bg-red-500' };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Identity Verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${getVerificationLevel().color} text-white`}>
              {getVerificationLevel().level} Trust
            </Badge>
            <span className="text-sm text-gray-600">{getTrustScore().toFixed(0)}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            {/* Email Verification */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-sm text-gray-600">Verify your email address</p>
                </div>
              </div>
              {verificationStatus.email ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Button size="sm" variant="outline">Verify</Button>
              )}
            </div>

            {/* Phone Verification */}
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Phone Verification</p>
                    <p className="text-sm text-gray-600">Verify via OTP</p>
                  </div>
                </div>
                {verificationStatus.phone && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              
              {!verificationStatus.phone && (
                <div className="flex space-x-2">
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={verifyPhone}
                    disabled={isVerifying}
                    size="sm"
                  >
                    {isVerifying ? 'Verifying...' : 'Send OTP'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="student" className="space-y-4">
            {/* Student ID Verification */}
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Student ID Verification</p>
                    <p className="text-sm text-gray-600">Verify your student status</p>
                  </div>
                </div>
                {verificationStatus.studentId && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              
              {!verificationStatus.studentId && (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter student ID number"
                    value={studentIdNumber}
                    onChange={(e) => setStudentIdNumber(e.target.value)}
                  />
                  <Button 
                    onClick={verifyStudentId}
                    disabled={isVerifying}
                    size="sm"
                    className="w-full"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Student ID'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            {/* Government ID Verification */}
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Government ID</p>
                    <p className="text-sm text-gray-600">Aadhaar verification</p>
                  </div>
                </div>
                {verificationStatus.governmentId && <CheckCircle className="w-5 h-5 text-green-600" />}
              </div>
              
              {!verificationStatus.governmentId && (
                <div className="space-y-2">
                  <Input
                    placeholder="Enter Aadhaar number"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    maxLength={12}
                  />
                  <Button 
                    onClick={verifyGovernmentId}
                    disabled={isVerifying}
                    size="sm"
                    className="w-full"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify Aadhaar'}
                  </Button>
                </div>
              )}
            </div>

            {/* Video Call Verification */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Camera className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Video Call Verification</p>
                  <p className="text-sm text-gray-600">For high-value rentals</p>
                </div>
              </div>
              {verificationStatus.videoCall ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Button size="sm" variant="outline" onClick={scheduleVideoCall}>
                  Schedule Call
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Verification Benefits</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Higher trust score increases rental approval chances</li>
            <li>• Access to premium items and lower security deposits</li>
            <li>• Priority customer support</li>
            <li>• Reduced verification requirements for future rentals</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityVerification;
