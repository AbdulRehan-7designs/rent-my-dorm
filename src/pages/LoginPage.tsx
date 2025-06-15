
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { User, Store, Shield, Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, Sparkles, Zap, Star, Heart, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Rent & lend awesome stuff! 📚🎮',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      emojis: ['🎓', '📚', '🎮', '⚡']
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell & earn with style! 💰📈',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      emojis: ['💰', '📈', '🚀', '⭐']
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage like a boss! 👑🛡️',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      emojis: ['👑', '🛡️', '📊', '🎯']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Oops! Missing Info 🤔",
        description: "Please fill in all the awesome details!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        toast({
          title: "Login Failed 😔",
          description: error.message || "Invalid credentials. Please check your email and password.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back, superstar! 🎉✨",
          description: `Successfully logged in! Let's get this party started!`,
        });
        navigate('/dashboard');
      }
    } catch (err) {
      toast({
        title: "Login Error 😵",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole) || roles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <Sparkles className="absolute top-1/4 left-1/3 w-8 h-8 text-pink-400 opacity-30 animate-spin" style={{animationDuration: '3s'}} />
        <Zap className="absolute bottom-1/3 right-1/3 w-6 h-6 text-yellow-500 opacity-40 animate-pulse" />
        <Star className="absolute top-2/3 left-1/6 w-10 h-10 text-purple-500 opacity-25 animate-bounce" style={{animationDelay: '2s'}} />
        <Heart className="absolute top-1/2 right-1/6 w-8 h-8 text-red-400 opacity-30 animate-pulse" style={{animationDelay: '1.5s'}} />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back! 
          </h1>
          <p className="text-lg text-gray-600">Ready to continue your awesome journey? 🚀</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In & Let's Go! 🎯</CardTitle>
            <CardDescription>Choose your role and jump back in</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Interactive Role Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-700">Select Your Superhero Role 🦸‍♀️</Label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                      selectedRole === role.id
                        ? `border-transparent bg-gradient-to-r ${role.bgGradient} scale-105 shadow-lg ring-4 ring-opacity-50`
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        selectedRole === role.id 
                          ? `bg-gradient-to-r ${role.color} scale-110 rotate-6 shadow-md` 
                          : 'bg-gray-100'
                      }`}>
                        <role.icon className={`w-6 h-6 transition-all duration-500 ${
                          selectedRole === role.id ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                      <div className="flex space-x-1">
                        {role.emojis.map((emoji, index) => (
                          <span key={index} className={`text-lg transition-all duration-300 ${
                            selectedRole === role.id ? 'animate-bounce' : ''
                          }`} style={{animationDelay: `${index * 0.1}s`}}>
                            {emoji}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedRole === role.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500 group-focus-within:text-orange-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.awesome.email@college.edu"
                  className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 rounded-xl"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold text-gray-700">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500 group-focus-within:text-orange-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your super secret password"
                  className="pl-12 pr-12 h-14 text-base border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 rounded-xl"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-10 w-10 hover:bg-orange-100 rounded-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Login Button */}
            <Button 
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full h-14 text-lg font-bold bg-gradient-to-r ${selectedRoleData.color} hover:shadow-xl text-white rounded-xl transition-all duration-300 transform hover:scale-105 group`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-6 h-6 animate-spin mr-3" />
                  <span>Signing you in...</span>
                </div>
              ) : (
                <>
                  <span className="mr-3">Sign In & Let's Go!</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Links */}
            <div className="text-center space-y-3">
              <p className="text-base text-gray-600">
                New to the party? 🎉{' '}
                <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-bold transition-colors hover:underline">
                  Join us here!
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                <Link to="/" className="hover:text-orange-600 transition-colors hover:underline">
                  ← Back to home
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
