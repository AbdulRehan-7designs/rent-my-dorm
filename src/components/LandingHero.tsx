
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Zap, Shield, TrendingUp, Star, Gift, Award } from 'lucide-react';
import AuthModal from './AuthModal';

const LandingHero = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('animate-fade-in');
  }, []);

  const features = [
    {
      icon: Users,
      title: "Campus Community",
      description: "Connect with students across Indian colleges",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Smart recommendations for your needs",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "UPI, Paytm, PhonePe - all Indian payments",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Gift,
      title: "Earn Rewards",
      description: "Points, badges, and leaderboards",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students", icon: Users },
    { number: "500+", label: "Partner Colleges", icon: GraduationCap },
    { number: "50,000+", label: "Items Rented", icon: TrendingUp },
    { number: "4.8★", label: "User Rating", icon: Star }
  ];

  return (
    <div className={`min-h-screen ${animationClass}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-500 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
              Rent<span className="text-yellow-300">My</span>Dorm
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              India's First AI-Powered Campus Rental Platform
            </p>
            
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto">
              From books to laptops, furniture to gadgets - rent, lend, and earn within your college community. 
              Built for Indian students, by Indian students! 🇮🇳
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setAuthType('signup');
                  setShowAuthModal(true);
                }}
              >
                Start Renting Today
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  setAuthType('login');
                  setShowAuthModal(true);
                }}
              >
                Sign In
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge className="bg-yellow-400 text-yellow-900 px-4 py-2 text-sm font-semibold">
                ₹0 Registration Fee
              </Badge>
              <Badge className="bg-green-400 text-green-900 px-4 py-2 text-sm font-semibold">
                UPI Payments
              </Badge>
              <Badge className="bg-blue-400 text-blue-900 px-4 py-2 text-sm font-semibold">
                AI Verified Items
              </Badge>
            </div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-pink-400/10 rounded-xl backdrop-blur-sm animate-float"></div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RentMyDorm?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of campus sharing with cutting-edge AI technology and Indian payment solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already saving money and building connections
          </p>
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-orange-50 px-12 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => {
              setAuthType('signup');
              setShowAuthModal(true);
            }}
          >
            Get Started Free
          </Button>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        type={authType}
        onLogin={onLogin}
      />
    </div>
  );
};

export default LandingHero;
