
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Users, Zap, BookOpen, Gamepad2, Laptop, Coffee } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "AI-powered search to find exactly what you need on campus"
    },
    {
      icon: Shield,
      title: "Campus Safe",
      description: "College email verification and campus-only community"
    },
    {
      icon: Users,
      title: "Peer-to-Peer",
      description: "Rent directly from fellow students and trusted vendors"
    },
    {
      icon: Zap,
      title: "Instant Book",
      description: "Quick rentals with instant booking for urgent needs"
    }
  ];

  const categories = [
    { icon: BookOpen, name: "Textbooks", count: "500+ items" },
    { icon: Laptop, name: "Electronics", count: "200+ items" },
    { icon: Gamepad2, name: "Gaming", count: "150+ items" },
    { icon: Coffee, name: "Dorm Essentials", count: "300+ items" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your Campus Rental
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Marketplace
            </span>
          </h1>
          
          <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
            Rent textbooks, electronics, dorm essentials, and more from fellow students. 
            Save money, build community, and access everything you need on campus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600" asChild>
              <Link to="/browse">Browse Items</Link>
            </Button>
          </div>
          
          <div className="mt-8 flex justify-center gap-4 text-sm text-indigo-200">
            <Badge variant="secondary" className="bg-white/20 text-white">
              🎓 Telangana Colleges
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              🔒 Campus Verified
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              ⚡ Instant Rentals
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Campus Life
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              RentMyDorm is designed specifically for college students in Telangana, 
              with features that make campus rentals safe, easy, and affordable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-gray-600">
              Discover thousands of items available for rent on your campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to="/browse">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Renting?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of students already saving money and building community through campus rentals.
          </p>
          <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" asChild>
            <Link to="/auth">Join RentMyDorm Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
