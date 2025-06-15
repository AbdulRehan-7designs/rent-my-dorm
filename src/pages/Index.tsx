
import { LandingHero } from "@/components/LandingHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Zap, BookOpen, Gamepad2, Camera, Bike, ArrowRight, CheckCircle, TrendingUp, Award, Heart, Globe, Leaf, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Campus Community",
      description: "Connect with verified students and vendors from your college",
      gradient: "from-orange-500/20 to-yellow-500/20"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure Transactions",
      description: "Protected payments and verified identities for safe rentals",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Booking",
      description: "Quick and easy rental process with real-time availability",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-500" />,
      title: "Trusted Reviews",
      description: "Community-driven ratings and reviews for quality assurance",
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  const advancedFeatures = [
    {
      icon: <Award className="w-12 h-12 text-yellow-500" />,
      title: "Campus Credits",
      description: "Earn rewards for every rental and redeem them for exciting perks",
      href: "/campus-credits",
      gradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-500" />,
      title: "Campus Pulse",
      description: "Personalized feed with trending items and smart recommendations",
      href: "/campus-pulse",
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Community Wishlist",
      description: "Request items and get matched with available rentals instantly",
      href: "/community-wishlist",
      gradient: "from-red-500/10 to-pink-500/10"
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Squad Up",
      description: "Join group rentals and split costs with friends",
      href: "/squad-up",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: <Leaf className="w-12 h-12 text-emerald-500" />,
      title: "Sustainability Tracker",
      description: "Track your environmental impact and contribution to waste reduction",
      href: "/sustainability",
      gradient: "from-emerald-500/10 to-green-500/10"
    }
  ];

  const popularCategories = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      name: "Textbooks",
      count: "1,500+ items",
      color: "bg-gradient-to-br from-orange-500 to-yellow-500",
      href: "/browse?category=textbooks"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      name: "Gaming",
      count: "800+ items",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      href: "/browse?category=gaming"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      name: "Electronics",
      count: "1,200+ items",
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      href: "/browse?category=electronics"
    },
    {
      icon: <Bike className="w-6 h-6" />,
      name: "Sports",
      count: "600+ items",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      href: "/browse?category=sports"
    }
  ];

  const testimonials = [
    {
      name: "Priya Singh",
      college: "IIT Bombay",
      text: "Saved ₹15,000 this semester by renting textbooks instead of buying! The AI recommendations are spot-on.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Rahul Kumar",
      college: "BITS Pilani",
      text: "Found the perfect camera for my project through Squad Up. Splitting costs made it so affordable!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Anisha Patel",
      college: "VIT Vellore",
      text: "The Campus Credits system is amazing! I've already redeemed rewards at the campus canteen.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const stats = [
    { label: "Active Students", value: "25,000+", icon: Users, color: "text-orange-500" },
    { label: "Items Listed", value: "15,000+", icon: BookOpen, color: "text-yellow-500" },
    { label: "Successful Rentals", value: "75,000+", icon: CheckCircle, color: "text-green-500" },
    { label: "Money Saved", value: "₹2.5Cr+", icon: TrendingUp, color: "text-purple-500" }
  ];

  const campusNetworks = [
    "IIT Bombay", "BITS Pilani", "VIT Vellore", "NIT Warangal", 
    "IIIT Hyderabad", "Manipal Institute", "SRM University", "Amity University"
  ];

  const sustainabilityStats = [
    { label: "CO₂ Saved", value: "50+ tons", icon: "🌱" },
    { label: "Items Reused", value: "25,000+", icon: "♻️" },
    { label: "Trees Saved", value: "200+", icon: "🌳" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <LandingHero />
      
      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Trusted by Students Nationwide
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join India's Leading Student Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of campus rentals with our vibrant community
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg border border-gray-100">
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity"></div>
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Showcase */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Next-Generation Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience cutting-edge technology with AI-powered recommendations, 
              community features, and real-time sustainability tracking
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <Card className="h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer group bg-white border-0 shadow-lg overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="mb-8 flex justify-center">
                      <div className="relative">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white group-hover:scale-110 transition-transform duration-300 shadow-md">
                          {feature.icon}
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-2xl -z-10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                    <div className="flex items-center justify-center text-orange-500 font-semibold group-hover:gap-3 transition-all">
                      <span>Explore Feature</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Students Love RentMyDorm
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              The smartest way to access what you need without the commitment of buying
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/10 backdrop-blur-sm border-white/20 group">
                <CardContent className="pt-10 pb-8 px-6">
                  <div className="mb-6 flex justify-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover what your fellow students are renting most
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {popularCategories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-white border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 rounded-2xl ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-white shadow-lg`}>
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{category.count}</p>
                    <div className="flex items-center text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>Browse Collection</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/browse">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Explore All Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our campus community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.college}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed text-lg">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Network */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Available Across Leading Campuses
            </h2>
            <p className="text-xl text-purple-100">
              Join thousands of students from top institutions across India
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {campusNetworks.map((campus, index) => (
              <Badge key={index} variant="outline" className="px-6 py-3 text-sm font-medium border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                {campus}
              </Badge>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-purple-200 mb-6 text-lg">Don't see your campus listed?</p>
            <Button variant="outline" size="lg" className="border-orange-300 text-orange-300 hover:bg-orange-500 hover:text-white transition-all duration-300 px-8 py-3">
              <MessageSquare className="w-5 h-5 mr-2" />
              Request Your Campus
            </Button>
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Environmental Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Together We're Making a Difference
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Every rental contributes to a more sustainable future for our planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {sustainabilityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-green-100 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/sustainability">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                <Leaf className="w-5 h-5 mr-2" />
                Track Your Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Browse & Find",
                description: "Search for items you need from verified students in your campus using our AI-powered recommendations",
                color: "from-orange-400 to-yellow-400"
              },
              {
                step: "2",
                title: "Book & Pay",
                description: "Secure booking with transparent pricing, protected payments, and digital rental agreements",
                color: "from-green-400 to-emerald-400"
              },
              {
                step: "3",
                title: "Use & Return",
                description: "Enjoy your rental, earn Campus Credits, and return it on time to maintain your reputation",
                color: "from-purple-400 to-pink-400"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    {item.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who are already saving money, reducing waste, 
            and building stronger campus communities through smart sharing
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Start Saving Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-12 py-4 text-lg font-bold transition-all duration-300">
                Browse Items
              </Button>
            </Link>
          </div>
          <div className="flex justify-center gap-12 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Secure transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Verified community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                RentMyDorm
              </h3>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                India's first AI-powered campus rental marketplace. Making student life more affordable, 
                sustainable, and connected through the power of community sharing.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
                  🌱 Eco-Friendly
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-4 py-2">
                  💰 Money Saver
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Platform</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/browse" className="hover:text-white transition-colors hover:underline">Browse Items</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors hover:underline">List an Item</Link></li>
                <li><Link to="/campus-credits" className="hover:text-white transition-colors hover:underline">Campus Credits</Link></li>
                <li><Link to="/sustainability" className="hover:text-white transition-colors hover:underline">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Community</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/community-wishlist" className="hover:text-white transition-colors hover:underline">Community Wishlist</Link></li>
                <li><Link to="/squad-up" className="hover:text-white transition-colors hover:underline">Squad Up</Link></li>
                <li><Link to="/campus-pulse" className="hover:text-white transition-colors hover:underline">Campus Pulse</Link></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Student Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Campus Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              &copy; 2024 RentMyDorm. All rights reserved. Made with ❤️ for students, by students.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
