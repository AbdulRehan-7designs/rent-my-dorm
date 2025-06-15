import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Play, Users, Shield, Star, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingHero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
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
              <div className={`w-1 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full ${
                Math.random() > 0.5 ? 'animate-ping' : ''
              }`} />
            </div>
          ))}
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rotate-45 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Enhanced Trust Indicators */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <Badge className="bg-gradient-to-r from-orange-200 to-pink-200 text-orange-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform border-0">
            <Users className="w-4 h-4" />
            25,000+ Students
          </Badge>
          <Badge className="bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform border-0">
            <Shield className="w-4 h-4" />
            Campus Verified
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-200 to-blue-200 text-blue-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform border-0">
            <Star className="w-4 h-4" />
            4.9/5 Rating
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-200 to-indigo-200 text-indigo-800 flex items-center gap-2 px-4 py-2 hover:scale-105 transition-transform border-0">
            <Zap className="w-4 h-4" />
            AI-Powered
          </Badge>
        </div>

        {/* Enhanced Main Headline */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-200 to-pink-200 text-orange-800 rounded-full text-sm font-medium mb-6 border-0">
            <Sparkles className="w-4 h-4" />
            🏆 Campus Rental Revolution ⚡
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            RentMyDorm
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
              Student Life, Elevated
            </span>
          </h1>
        </div>

        {/* Enhanced Subheadline */}
        <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-4xl mx-auto leading-relaxed">
          Share, Rent, Save with your
          <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 text-3xl md:text-4xl mt-2">
            Campus Community ✨
          </span>
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-full border-0"
            >
              Get Started →
            </Button>
          </Link>
        </div>

        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gradient-to-r from-orange-200 to-pink-200">
              <Input
                type="text"
                placeholder="Search for textbooks, laptops, cameras, or anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-32 py-6 text-lg border-0 rounded-2xl focus:ring-2 focus:ring-pink-400 bg-transparent text-gray-800"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <Link to={`/browse${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}>
                <Button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-xl border-0"
                >
                  Search
                </Button>
              </Link>
            </div>
          </div>
          <p className="text-sm text-purple-200 mt-3">
            🔥 Trending: MacBook Pro, GATE Books, DSLR Camera, Gaming Console, Study Lamp
          </p>
        </div>

        {/* Enhanced Quick Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "📚 Textbooks", href: "/browse?category=textbooks", gradient: "from-orange-200 to-pink-200 hover:from-orange-300 hover:to-pink-300" },
            { name: "💻 Electronics", href: "/browse?category=electronics", gradient: "from-pink-200 to-purple-200 hover:from-pink-300 hover:to-purple-300" },
            { name: "🎮 Gaming", href: "/browse?category=gaming", gradient: "from-purple-200 to-blue-200 hover:from-purple-300 hover:to-blue-300" },
            { name: "📷 Cameras", href: "/browse?category=cameras", gradient: "from-blue-200 to-indigo-200 hover:from-blue-300 hover:to-indigo-300" },
            { name: "🚲 Sports", href: "/browse?category=sports", gradient: "from-indigo-200 to-orange-200 hover:from-indigo-300 hover:to-orange-300" },
            { name: "🎵 Music", href: "/browse?category=music", gradient: "from-orange-200 to-pink-200 hover:from-orange-300 hover:to-pink-300" }
          ].map((category, index) => (
            <Link key={index} to={category.href}>
              <Badge 
                variant="secondary" 
                className={`px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md bg-gradient-to-r ${category.gradient} text-gray-800 border-0`}
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-1000">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-pink-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-2xl">📚</span>
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-bounce delay-2000">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-xl">💻</span>
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-500">
        <div className="w-18 h-18 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-2xl">🎮</span>
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-1500">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          <span className="text-lg">📷</span>
        </div>
      </div>
    </section>
  );
};
