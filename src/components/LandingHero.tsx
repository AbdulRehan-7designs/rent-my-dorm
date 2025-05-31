import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Zap, Shield, TrendingUp, Star, Gift, Award, Sparkles, Bot, Camera, Brain, ArrowRight, Play, Rocket, School, Lightbulb } from 'lucide-react';
import AuthModal from './AuthModal';

const LandingHero = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [animationClass, setAnimationClass] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setAnimationClass('animate-fade-in');
    
    // Rotate featured items
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Smart Matching",
      description: "Advanced ML algorithms match you with perfect items instantly",
      color: "from-blue-500 to-cyan-500",
      bgPattern: "🧠"
    },
    {
      icon: Camera,
      title: "AI Object Recognition",
      description: "Instant product verification using computer vision technology",
      color: "from-orange-500 to-red-500",
      bgPattern: "📸"
    },
    {
      icon: Bot,
      title: "AI Chatbot Assistant",
      description: "24/7 intelligent support powered by natural language processing",
      color: "from-green-500 to-emerald-500",
      bgPattern: "🤖"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Personalized suggestions based on your behavior and preferences",
      color: "from-purple-500 to-pink-500",
      bgPattern: "✨"
    }
  ];

  // Updated stats for student-focused community
  const stats = [
    { 
      icon: "🧑‍🎓", 
      title: "100+ students signed up for early access",
      subtitle: "Growing community",
      color: "from-blue-500 to-purple-500"
    },
    { 
      icon: "🏫", 
      title: "Pilot-ready for colleges across India", 
      subtitle: "National expansion",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: "💡", 
      title: "₹0+ Transparent Micro-Renting Value", 
      subtitle: "Honest pricing",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      icon: "⭐", 
      title: "User-first approach with 100% focus on safety", 
      subtitle: "Safety guaranteed",
      color: "from-pink-500 to-red-500"
    }
  ];

  const FloatingElement = ({ delay, children, className = "" }) => (
    <div 
      className={`absolute animate-bounce ${className}`}
      style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
    >
      {children}
    </div>
  );

  return (
    <div className={`min-h-screen overflow-hidden ${animationClass}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 min-h-screen flex items-center">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <FloatingElement delay={0} className="top-20 left-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center text-2xl">
            💻
          </div>
        </FloatingElement>
        
        <FloatingElement delay={1} className="top-32 right-20">
          <div className="w-12 h-12 bg-yellow-400/20 rounded-full backdrop-blur-sm flex items-center justify-center text-xl">
            📚
          </div>
        </FloatingElement>
        
        <FloatingElement delay={2} className="bottom-40 left-20">
          <div className="w-20 h-20 bg-pink-400/10 rounded-3xl backdrop-blur-sm flex items-center justify-center text-3xl">
            🎮
          </div>
        </FloatingElement>
        
        <FloatingElement delay={0.5} className="top-60 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-8 bg-blue-400/20 rounded-full backdrop-blur-sm flex items-center justify-center">
            ⚡
          </div>
        </FloatingElement>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Animated Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
                <GraduationCap className="w-14 h-14 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg">
                🚀
              </div>
            </div>
          </div>
          
          {/* Main Heading with Typewriter Effect */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-scale-in">Rent</span>
            <span className="text-yellow-300 inline-block animate-scale-in" style={{animationDelay: '0.2s'}}>My</span>
            <span className="inline-block animate-scale-in" style={{animationDelay: '0.4s'}}>Dorm</span>
          </h1>
          
          <div className="mb-8">
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-semibold animate-fade-in" style={{animationDelay: '0.6s'}}>
              India's First AI-Powered Campus Rental Platform 🇮🇳
            </p>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.8s'}}>
              From books to laptops, furniture to gadgets - rent, lend, and earn within your college community. 
              Experience the future of sharing with cutting-edge AI!
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            {/* Primary Sign In Button */}
            <div className="group relative animate-scale-in" style={{animationDelay: '1s'}}>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Button 
                size="lg" 
                className="relative bg-white text-orange-600 hover:bg-orange-50 px-12 py-6 text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20"
                onClick={() => window.location.href = '/login'}
              >
                <Sparkles className="w-6 h-6 mr-3 text-orange-500 animate-pulse" />
                <span>Sign In Now</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12"></div>
              </Button>
            </div>

            {/* Secondary Get Started Button - Updated text */}
            <div className="group relative animate-scale-in" style={{animationDelay: '1.2s'}}>
              <Button 
                size="lg" 
                variant="outline" 
                className="relative border-2 border-white/50 text-white/90 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:text-white px-10 py-6 text-lg font-semibold rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/signup'}
              >
                <Brain className="w-5 h-5 mr-3 animate-pulse" />
                <span>Get Started</span>
                <Play className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge className="bg-yellow-400/90 backdrop-blur-sm text-yellow-900 px-6 py-3 text-sm font-bold animate-pulse hover:scale-110 transition-transform cursor-pointer">
              🚀 AI-Powered Matching
            </Badge>
            <Badge className="bg-green-400/90 backdrop-blur-sm text-green-900 px-6 py-3 text-sm font-bold animate-pulse hover:scale-110 transition-transform cursor-pointer">
              💳 UPI & Digital Payments
            </Badge>
            <Badge className="bg-blue-400/90 backdrop-blur-sm text-blue-900 px-6 py-3 text-sm font-bold animate-pulse hover:scale-110 transition-transform cursor-pointer">
              🤖 Smart Recommendations
            </Badge>
          </div>

          {/* Interactive Demo Preview */}
          <div className="relative animate-fade-in" style={{animationDelay: '1.4s'}}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mx-auto max-w-2xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">🎯 See AI in Action</h3>
              <div className="text-left space-y-3 text-white/80">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">✓</div>
                  <span>Upload item photo → AI identifies instantly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">⚡</div>
                  <span>Smart price suggestions based on demand</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">🎯</div>
                  <span>Personalized recommendations for you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Showcase */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              🤖 Powered by Advanced AI & Machine Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of campus sharing with cutting-edge artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-110 group bg-gradient-to-br from-white to-gray-50 ${
                  currentFeature === index ? 'ring-4 ring-orange-300 scale-105' : ''
                }`}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {feature.bgPattern}
                  </div>
                  
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-all duration-500 shadow-lg relative`}>
                    <feature.icon className="w-10 h-10 text-white" />
                    <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  
                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Updated Student Community Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Built for Students, by Students
            </h2>
            <p className="text-xl text-gray-600">Join the upcoming campus community revolution</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className={`bg-gradient-to-r ${stat.color} rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}>
                  {/* Background pattern */}
                  <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {stat.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{stat.title}</h3>
                    <p className="text-white/80 text-sm font-medium">{stat.subtitle}</p>
                  </div>
                  
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the Future? 🚀
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already using AI to revolutionize campus sharing
          </p>
          <Button 
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50 px-12 py-6 text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            onClick={() => window.location.href = '/signup'}
          >
            <Sparkles className="w-6 h-6 mr-3 text-orange-500" />
            Get Started Today
            <ArrowRight className="w-6 h-6 ml-3" />
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
