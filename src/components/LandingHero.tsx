
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Zap, Shield, TrendingUp, Star, Gift, Award, Sparkles, Bot, Camera, Brain } from 'lucide-react';
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
      icon: Brain,
      title: "AI Smart Matching",
      description: "Advanced ML algorithms match you with perfect items",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Camera,
      title: "AI Object Recognition",
      description: "Instant product verification using computer vision",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Bot,
      title: "AI Chatbot Assistant",
      description: "24/7 intelligent support for all your queries",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Personalized item suggestions based on your needs",
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
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-lg backdrop-blur-sm animate-bounce"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-yellow-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-20 h-20 bg-pink-400/10 rounded-xl backdrop-blur-sm animate-bounce"></div>
          <div className="absolute top-60 left-1/2 w-8 h-8 bg-blue-400/20 rounded-full animate-ping"></div>
        </div>

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
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
              India's First AI-Powered Campus Rental Platform
            </p>
            
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              From books to laptops, furniture to gadgets - rent, lend, and earn within your college community. 
              Built for Indian students, by Indian students! 🇮🇳
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              {/* Enhanced Sign In Button */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Button 
                  size="lg" 
                  className="relative bg-white text-orange-600 hover:bg-orange-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                  onClick={() => {
                    setAuthType('login');
                    setShowAuthModal(true);
                  }}
                >
                  <Sparkles className="w-6 h-6 mr-3 text-orange-500" />
                  Sign In with AI Magic
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
                </Button>
              </div>
              
              {/* Enhanced Sign Up Button */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="relative border-2 border-white text-white hover:bg-white hover:text-orange-600 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  onClick={() => {
                    setAuthType('signup');
                    setShowAuthModal(true);
                  }}
                >
                  <Brain className="w-6 h-6 mr-3" />
                  Start Your AI Journey
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-yellow-400 text-yellow-900 px-6 py-3 text-sm font-bold animate-pulse">
                🚀 AI-Powered Matching
              </Badge>
              <Badge className="bg-green-400 text-green-900 px-6 py-3 text-sm font-bold animate-pulse">
                💳 UPI & Digital Payments
              </Badge>
              <Badge className="bg-blue-400 text-blue-900 px-6 py-3 text-sm font-bold animate-pulse">
                🤖 Smart Recommendations
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Highlight Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🤖 Powered by Advanced AI & Machine Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of campus sharing with cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 group bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Campus Experience with AI?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already using smart technology to save money and build connections
          </p>
          <div className="group relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <Button 
              size="lg" 
              className="relative bg-white text-orange-600 hover:bg-orange-50 px-16 py-6 text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                setAuthType('signup');
                setShowAuthModal(true);
              }}
            >
              <Bot className="w-8 h-8 mr-4" />
              Get Started with AI Free
            </Button>
          </div>
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
