
import { LandingHero } from "@/components/LandingHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Zap, BookOpen, Gamepad2, Camera, Bike } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Campus Community",
      description: "Connect with verified students and vendors from your college"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Secure Transactions",
      description: "Protected payments and verified identities for safe rentals"
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      title: "Instant Booking",
      description: "Quick and easy rental process with real-time availability"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Trusted Reviews",
      description: "Community-driven ratings and reviews for quality assurance"
    }
  ];

  const popularCategories = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      name: "Textbooks",
      count: "150+ items",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      name: "Gaming",
      count: "80+ items",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      name: "Electronics",
      count: "120+ items",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <Bike className="w-6 h-6" />,
      name: "Sports",
      count: "60+ items",
      color: "bg-orange-100 text-orange-700"
    }
  ];

  const testimonials = [
    {
      name: "Priya Singh",
      college: "IIT Bombay",
      text: "Saved ₹5000 this semester by renting textbooks instead of buying!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      college: "BITS Pilani",
      text: "Found the perfect camera for my project. The owner was super helpful.",
      rating: 5
    },
    {
      name: "Anisha Patel",
      college: "VIT Vellore",
      text: "Love the community here. Everyone is so trustworthy and friendly.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Active Students", value: "10,000+" },
    { label: "Items Listed", value: "5,000+" },
    { label: "Successful Rentals", value: "25,000+" },
    { label: "Money Saved", value: "₹50L+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <LandingHero />
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RentMyDorm?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The smartest way to access what you need without the commitment of buying
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover what your fellow students are renting
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link key={index} to="/browse">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our campus community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.college}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse & Find</h3>
              <p className="text-gray-600">Search for items you need from verified students in your campus</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book & Pay</h3>
              <p className="text-gray-600">Secure booking with transparent pricing and protected payments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Use & Return</h3>
              <p className="text-gray-600">Enjoy your rental and return it on time to maintain your reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who are already part of the sharing economy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RentMyDorm</h3>
              <p className="text-gray-400 mb-4">
                The campus marketplace for students, by students.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  🌱 Eco-Friendly
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  💰 Money Saver
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/browse" className="hover:text-white">Browse Items</Link></li>
                <li><Link to="/auth" className="hover:text-white">List an Item</Link></li>
                <li><Link to="/auth" className="hover:text-white">Join Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RentMyDorm. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
