
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Shield, Users, Zap, Rocket, Sparkles, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingHero = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleBrowse = () => {
    navigate('/browse');
  };

  // Floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-60"></div>
        </div>
      ))}
    </div>
  );

  // 3D Card component
  const Feature3D = ({ icon: Icon, title, description, delay }: any) => (
    <div 
      className="group relative transform transition-all duration-700 hover:scale-105 animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full filter blur-3xl animate-spin"></div>
      </div>

      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          {/* Main Hero Content */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
              <span className="text-orange-300 font-medium">Campus Rental Revolution</span>
              <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-red-200 mb-6 leading-tight animate-pulse">
              RentMyDorm
            </h1>
            
            <div className="relative inline-block">
              <Rocket className="w-16 h-16 mx-auto text-orange-500 animate-bounce mb-4" style={{ 
                transform: 'rotate(-45deg)',
                animation: 'bounce 2s ease-in-out infinite, spin 3s linear infinite'
              }} />
              <div className="absolute -top-2 -right-2">
                <Star className="w-6 h-6 text-yellow-400 animate-ping" />
              </div>
            </div>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Share, Rent, Save with your
            </p>
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Campus Community 🚀
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </Button>
            
            <Button 
              onClick={handleBrowse}
              variant="outline"
              size="lg"
              className="group border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:border-orange-400"
            >
              <Search className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
              Browse Items
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {[
              { number: "10K+", label: "Happy Students", icon: Users },
              { number: "50K+", label: "Items Shared", icon: Heart },
              { number: "500+", label: "Colleges", icon: Shield },
              { number: "₹2M+", label: "Money Saved", icon: Zap }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-2">
                  <stat.icon className="w-8 h-8 mx-auto text-orange-400 mb-2 transition-transform group-hover:scale-125 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.number}</p>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature3D 
            icon={Zap} 
            title="Instant Rentals" 
            description="Need something urgently? Our instant rental system gets you what you need in minutes, not hours."
            delay="0.2s"
          />
          <Feature3D 
            icon={Shield} 
            title="Secure & Trusted" 
            description="Campus-verified users, secure payments, and comprehensive insurance ensure safe transactions every time."
            delay="0.4s"
          />
          <Feature3D 
            icon={Users} 
            title="Community Driven" 
            description="Built by students, for students. Join thousands of peers sharing resources and building connections."
            delay="0.6s"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="inline-block bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-lg border border-orange-500/20 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Campus Experience?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join the campus sharing revolution. Save money, make friends, and live more sustainably.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/50"
            >
              Join RentMyDorm Today
              <Rocket className="ml-2 w-5 h-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
