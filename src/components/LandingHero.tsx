
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Play, Users, Shield, Star, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingHero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className={`w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full ${
                Math.random() > 0.5 ? 'animate-ping' : ''
              }`} />
            </div>
          ))}
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rotate-45 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Enhanced Trust Indicators */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Badge className="bg-green-100 text-green-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
            <Users className="w-4 h-4" />
            25,000+ Students
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
            <Shield className="w-4 h-4" />
            Campus Verified
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
            <Star className="w-4 h-4" />
            4.9/5 Rating
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform">
            <Zap className="w-4 h-4" />
            AI-Powered
          </Badge>
        </div>

        {/* Enhanced Main Headline */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            India's First AI-Powered Campus Marketplace
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Campus Sharing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              Made Smart
            </span>
          </h1>
        </div>

        {/* Enhanced Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
          Rent textbooks, electronics, and more from verified students in your college. 
          <span className="font-semibold text-blue-600"> Save money, reduce waste, and build community connections</span> with our AI-powered platform.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-10 py-4 text-lg flex items-center gap-3 transition-all duration-300 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg"
          >
            <Play className="w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <Input
                type="text"
                placeholder="Search for textbooks, laptops, cameras, or anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-32 py-6 text-lg border-0 rounded-2xl focus:ring-2 focus:ring-blue-400 bg-transparent"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <Link to={`/browse${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}>
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                >
                  Search
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            🔥 Trending: MacBook Pro, GATE Books, DSLR Camera, Gaming Console, Study Lamp
          </p>
        </div>

        {/* Enhanced Quick Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "📚 Textbooks", href: "/browse?category=textbooks", color: "hover:bg-blue-100 hover:text-blue-700" },
            { name: "💻 Electronics", href: "/browse?category=electronics", color: "hover:bg-purple-100 hover:text-purple-700" },
            { name: "🎮 Gaming", href: "/browse?category=gaming", color: "hover:bg-green-100 hover:text-green-700" },
            { name: "📷 Cameras", href: "/browse?category=cameras", color: "hover:bg-orange-100 hover:text-orange-700" },
            { name: "🚲 Sports", href: "/browse?category=sports", color: "hover:bg-red-100 hover:text-red-700" },
            { name: "🎵 Music", href: "/browse?category=music", color: "hover:bg-yellow-100 hover:text-yellow-700" }
          ].map((category, index) => (
            <Link key={index} to={category.href}>
              <Badge 
                variant="secondary" 
                className={`px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md ${category.color}`}
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-1000">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-2xl">📚</span>
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-bounce delay-2000">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-xl">💻</span>
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-500">
        <div className="w-18 h-18 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-2xl">🎮</span>
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-1500">
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-lg">📷</span>
        </div>
      </div>
    </section>
  );
};
