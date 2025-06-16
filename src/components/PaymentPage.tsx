
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CreditCard, 
  Clock, 
  Sparkles, 
  Rocket,
  Star,
  Lock,
  Zap,
  Gift,
  Smartphone
} from 'lucide-react';

interface PaymentPageProps {
  onBack: () => void;
}

const PaymentPage = ({ onBack }: PaymentPageProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const upcomingFeatures = [
    {
      title: '⚡ Instant UPI Payments',
      description: 'Lightning-fast payments with all major UPI apps',
      icon: Smartphone,
      eta: 'Coming in 2 weeks'
    },
    {
      title: '💳 Smart Cards & Wallets',
      description: 'Credit/Debit cards, Paytm, PhonePe, Google Pay',
      icon: CreditCard,
      eta: 'Coming in 3 weeks'
    },
    {
      title: '🎁 Campus Credits Integration',
      description: 'Pay with your earned campus credits and loyalty points',
      icon: Gift,
      eta: 'Coming in 4 weeks'
    },
    {
      title: '🔒 Escrow Security',
      description: 'Advanced escrow system for secure transactions',
      icon: Lock,
      eta: 'Coming in 5 weeks'
    },
    {
      title: '⭐ Smart Fee Calculator',
      description: 'Dynamic pricing with loyalty discounts',
      icon: Star,
      eta: 'Coming in 6 weeks'
    },
    {
      title: '🚀 Auto-Renewal & Subscriptions',
      description: 'Seamless recurring payments for long-term rentals',
      icon: Rocket,
      eta: 'Coming in 8 weeks'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <CreditCard className="w-8 h-8 text-blue-500" />
            <span>Payment Gateway</span>
          </h1>
          <p className="text-gray-600 mt-2">Secure and smart payment solutions</p>
        </div>
      </div>

      {/* Coming Soon Hero */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-8 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin border-t-purple-600"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-purple-900 mb-4">
            🚀 Coming Very Soon!
          </h2>
          
          <p className="text-lg text-purple-700 mb-6 max-w-2xl mx-auto">
            We're building the most advanced payment system for campus rentals! 
            Get ready for lightning-fast, secure, and smart payment experiences.
          </p>

          <div className="flex justify-center space-x-4 mb-6">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">
              🔒 Bank-level Security
            </Badge>
            <Badge className="bg-pink-100 text-pink-800 px-4 py-2 text-sm">
              ⚡ Instant Transactions
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
              🎁 Reward Points
            </Badge>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-2 text-purple-700">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Expected Launch: January 2025</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Features Grid */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span>What's Coming</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {feature.eta}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Early Access Signup */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Gift className="w-6 h-6" />
            <span>🎉 Get Early Access!</span>
          </CardTitle>
          <CardDescription className="text-green-700">
            Be the first to experience our revolutionary payment system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-900">Early Bird Benefits:</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>0% transaction fees for first 100 transactions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Exclusive beta tester badge and rewards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Bonus 1000 campus credits on launch</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Join Early Access Waitlist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Temporary Solution */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center">
            <h4 className="font-semibold text-blue-900 mb-2">🤝 Current Payment Method</h4>
            <p className="text-blue-700 mb-4">
              For now, payments are handled directly between users through secure campus channels.
              Our advanced payment gateway will replace this soon!
            </p>
            <Badge className="bg-blue-100 text-blue-800">
              Direct User-to-User Transactions
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
