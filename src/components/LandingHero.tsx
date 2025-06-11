
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Play, Users, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingHero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Trust Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <Users className="w-3 h-3" />
            10,000+ Students
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified Safe
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Star className="w-3 h-3" />
            4.9/5 Rating
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Campus Sharing
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Made Simple
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Rent textbooks, electronics, and more from verified students in your college. 
          Save money, reduce waste, and build community connections.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg flex items-center gap-2 transition-all duration-300 hover:border-blue-400 hover:text-blue-600"
          >
            <Play className="w-5 h-5" />
            How it Works
          </Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for textbooks, laptops, cameras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-0 shadow-md"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Link to={`/browse${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}>
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700"
              >
                Search
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Popular: MacBook, GATE Books, Camera, Gaming Console
          </p>
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "📚 Textbooks", href: "/browse?category=textbooks" },
            { name: "💻 Electronics", href: "/browse?category=electronics" },
            { name: "🎮 Gaming", href: "/browse?category=gaming" },
            { name: "📷 Cameras", href: "/browse?category=cameras" },
            { name: "🚲 Sports", href: "/browse?category=sports" },
            { name: "🎵 Music", href: "/browse?category=music" }
          ].map((category, index) => (
            <Link key={index} to={category.href}>
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors duration-200"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce delay-1000">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
          📚
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-bounce delay-2000">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
          💻
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-bounce delay-500">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
          🎮
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-1500">
        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg">
          📷
        </div>
      </div>
    </section>
  );
};
