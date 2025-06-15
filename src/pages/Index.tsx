import { LandingHero } from "@/components/LandingHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Zap, BookOpen, Gamepad2, Camera, Bike, ArrowRight, CheckCircle, TrendingUp, Award, Heart, Globe, Leaf, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Campus Community",
      description: "Connect with verified students and vendors from your college"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure Transactions",
      description: "Protected payments and verified identities for safe rentals"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Booking",
      description: "Quick and easy rental process with real-time availability"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Trusted Reviews",
      description: "Community-driven ratings and reviews for quality assurance"
    }
  ];

  const advancedFeatures = [
    {
      icon: <Award className="w-12 h-12 text-yellow-500" />,
      title: "Campus Credits",
      description: "Earn rewards for every rental and redeem them for exciting perks",
      href: "/campus-credits"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-500" />,
      title: "Campus Pulse",
      description: "Personalized feed with trending items and smart recommendations",
      href: "/campus-pulse"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Community Wishlist",
      description: "Request items and get matched with available rentals instantly",
      href: "/community-wishlist"
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Squad Up",
      description: "Join group rentals and split costs with friends",
      href: "/squad-up"
    },
    {
      icon: <Leaf className="w-12 h-12 text-emerald-500" />,
      title: "Sustainability Tracker",
      description: "Track your environmental impact and contribution to waste reduction",
      href: "/sustainability"
    }
  ];

  const popularCategories = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      name: "Textbooks",
      count: "1,500+ items",
      color: "bg-orange-100 text-orange-700",
      href: "/browse?category=textbooks"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      name: "Gaming",
      count: "800+ items",
      color: "bg-purple-100 text-purple-700",
      href: "/browse?category=gaming"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      name: "Electronics",
      count: "1,200+ items",
      color: "bg-green-100 text-green-700",
      href: "/browse?category=electronics"
    },
    {
      icon: <Bike className="w-6 h-6" />,
      name: "Sports",
      count: "600+ items",
      color: "bg-yellow-100 text-yellow-700",
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
    { label: "Active Students", value: "25,000+", icon: Users },
    { label: "Items Listed", value: "15,000+", icon: BookOpen },
    { label: "Successful Rentals", value: "75,000+", icon: CheckCircle },
    { label: "Money Saved", value: "₹2.5Cr+", icon: TrendingUp }
  ];

  const campusNetworks = [
    "IIT Bombay", "BITS Pilani", "VIT Vellore", "NIT Warangal", 
    "IIIT Hyderabad", "Manipal Institute", "SRM University", "Amity University"
  ];

  const sustainabilityStats = [
    { label: "CO₂ Saved", value: "50+ tons" },
    { label: "Items Reused", value: "25,000+" },
    { label: "Trees Saved", value: "200+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <LandingHero />
      
      {/* Enhanced Stats Section with Animation */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Students Nationwide
            </h2>
            <p className="text-xl text-purple-100">
              Join India's fastest-growing student rental community
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-purple-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Showcase */}
      <section className="py-20 bg-gradient-to-br from-purple-800 via-indigo-800 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Next-Generation Features
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Experience the future of student rentals with AI-powered recommendations, 
              community features, and sustainability tracking
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group bg-white/10 backdrop-blur-sm border-orange-300/30 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 rounded-full bg-gradient-to-r from-orange-200/20 to-yellow-200/20 group-hover:from-orange-200/30 group-hover:to-yellow-200/30 transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-purple-200 leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center justify-center text-orange-300 font-medium group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Features Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose RentMyDorm?
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              The smartest way to access what you need without the commitment of buying
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white/10 backdrop-blur-sm border-orange-300/30">
                <CardContent className="pt-8 pb-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories with Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-purple-100">
              Discover what your fellow students are renting
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-white/10 backdrop-blur-sm border-orange-300/30">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-orange-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-purple-200 text-sm mb-3">{category.count}</p>
                    <div className="flex items-center text-orange-300 font-medium text-sm">
                      <span>Browse</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-3">
                Explore All Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials with Photos */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-purple-100">
              Real experiences from our campus community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow bg-white/10 backdrop-blur-sm border-orange-300/30">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-purple-200 text-sm">{testimonial.college}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-purple-100 italic leading-relaxed">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Network Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Available Across Leading Campuses
            </h2>
            <p className="text-xl text-purple-100">
              Join thousands of students from top institutions
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {campusNetworks.map((campus, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm font-medium border-orange-300 text-orange-300 bg-white/10">
                {campus}
              </Badge>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-purple-200 mb-4">Don't see your campus?</p>
            <Button variant="outline" size="lg" className="border-orange-300 text-orange-300 hover:bg-orange-500 hover:text-white">
              <MessageSquare className="w-5 h-5 mr-2" />
              Request Your Campus
            </Button>
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <section className="py-20 bg-gradient-to-r from-green-800 to-emerald-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Environmental Impact
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Together We're Making a Difference
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Every rental contributes to a more sustainable future
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {sustainabilityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-green-300 mb-2">{stat.value}</div>
                <div className="text-green-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/sustainability">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Leaf className="w-5 h-5 mr-2" />
                See Your Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-purple-100">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Browse & Find</h3>
              <p className="text-purple-200 leading-relaxed">Search for items you need from verified students in your campus using our AI-powered recommendations</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Book & Pay</h3>
              <p className="text-purple-200 leading-relaxed">Secure booking with transparent pricing, protected payments, and digital rental agreements</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Use & Return</h3>
              <p className="text-purple-200 leading-relaxed">Enjoy your rental, earn Campus Credits, and return it on time to maintain your reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who are already saving money, reducing waste, 
            and building stronger campus communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Start Saving Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold">
                Browse Items
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Verified community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">RentMyDorm</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                India's first AI-powered campus rental marketplace. Making student life more affordable, 
                sustainable, and connected.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  🌱 Eco-Friendly
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  💰 Money Saver
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/browse" className="hover:text-white transition-colors">Browse Items</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">List an Item</Link></li>
                <li><Link to="/campus-credits" className="hover:text-white transition-colors">Campus Credits</Link></li>
                <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/community-wishlist" className="hover:text-white transition-colors">Community Wishlist</Link></li>
                <li><Link to="/squad-up" className="hover:text-white transition-colors">Squad Up</Link></li>
                <li><Link to="/campus-pulse" className="hover:text-white transition-colors">Campus Pulse</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Student Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Campus Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 RentMyDorm. All rights reserved. Made with ❤️ for students.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
