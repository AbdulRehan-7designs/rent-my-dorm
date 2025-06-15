
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { User, Store, Shield, Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, UserCircle, Sparkles, Zap, Star, Heart, Rocket, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Rent & lend awesome stuff! 🎓',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      features: ['📚 Rent textbooks & gear', '🎮 Gaming equipment', '⚡ Quick campus delivery', '🎯 AI-powered recommendations'],
      emojis: ['🎓', '📚', '🎮', '⚡']
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell & earn with style! 💰',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      features: ['💰 Make money selling', '📈 Business analytics', '🚀 Campus-wide reach', '⭐ Build your reputation'],
      emojis: ['💰', '📈', '🚀', '⭐']
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage like a boss! 👑',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      features: ['👑 Full platform control', '📊 Detailed insights', '🛡️ Security management', '🎯 Approve all listings'],
      emojis: ['👑', '🛡️', '📊', '🎯']
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Info! 🤔",
        description: "Please fill in all the awesome details to continue!",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch! 🙈",
        description: "Your passwords don't match. Try again, you got this!",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short! 📏",
        description: "Make it at least 6 characters - your future self will thank you!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        toast({
          title: "Sign Up Failed 😓",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account Created! 🎉🚀",
          description: `Welcome to RentMyDorm! Let's start this amazing journey!`,
        });
        navigate('/dashboard');
      }
    } catch (err) {
      toast({
        title: "Sign Up Error 😵",
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
        <Rocket className="absolute bottom-1/6 left-1/2 w-12 h-12 text-orange-500 opacity-25 animate-bounce" style={{animationDelay: '0.5s'}} />
      </div>

      <div className="w-full max-w-4xl relative z-10">
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
            Join RentMyDorm! 
          </h1>
          <p className="text-lg text-gray-600">Create your account and start the adventure! 🚀✨</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl">Join the Campus Revolution! 🎯</CardTitle>
            <CardDescription className="text-lg">Choose your role and create your awesome account</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 p-8">
            {/* Interactive Role Selection */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-gray-700 block">Choose Your Superhero Role 🦸‍♀️</Label>
              <div className="grid md:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`relative p-6 rounded-2xl border-3 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                      selectedRole === role.id
                        ? `border-transparent bg-gradient-to-br ${role.bgGradient} scale-105 shadow-xl ring-4 ring-opacity-50`
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                        selectedRole === role.id 
                          ? `bg-gradient-to-r ${role.color} scale-110 rotate-6 shadow-lg` 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}>
                        <role.icon className={`w-8 h-8 transition-all duration-500 ${
                          selectedRole === role.id ? 'text-white scale-110' : 'text-gray-600'
                        }`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                      
                      <div className="flex justify-center space-x-2 mb-4">
                        {role.emojis.map((emoji, index) => (
                          <span key={index} className={`text-2xl transition-all duration-300 ${
                            selectedRole === role.id ? 'animate-bounce' : ''
                          }`} style={{animationDelay: `${index * 0.1}s`}}>
                            {emoji}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-2 text-left">
                        {role.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                              selectedRole === role.id ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
                            }`}></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedRole === role.id && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold text-gray-700">Full Name</Label>
                <div className="relative group">
                  <UserCircle className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-purple-500 group-focus-within:text-purple-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your awesome name"
                    className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-purple-500 group-focus-within:text-purple-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* College Input (Optional) */}
            {selectedRole !== 'admin' && (
              <div className="space-y-2">
                <Label htmlFor="college" className="text-base font-semibold text-gray-700">College/University (Optional)</Label>
                <Input
                  id="college"
                  type="text"
                  placeholder="e.g., IIT Delhi, MIT, Stanford..."
                  className="h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                />
              </div>
            )}

            {/* Password Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold text-gray-700">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-purple-500 group-focus-within:text-purple-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Make it strong! 💪"
                    className="pl-12 pr-12 h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-10 w-10 hover:bg-purple-100 rounded-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-semibold text-gray-700">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-purple-500 group-focus-within:text-purple-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="One more time! 🔄"
                    className="pl-12 pr-12 h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-10 w-10 hover:bg-purple-100 rounded-lg"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Signup Button */}
            <Button 
              onClick={handleSignup}
              disabled={isLoading}
              className={`w-full h-16 text-xl font-bold bg-gradient-to-r ${selectedRoleData.color} hover:shadow-2xl text-white rounded-xl transition-all duration-300 transform hover:scale-105 group`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-6 h-6 animate-spin mr-3" />
                  <span>Creating your awesome account...</span>
                </div>
              ) : (
                <>
                  <span className="mr-3">Create Account & Start Adventure!</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Links */}
            <div className="text-center space-y-3">
              <p className="text-base text-gray-600">
                Already part of the family? 🏠{' '}
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-bold transition-colors hover:underline">
                  Sign in here!
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

export default SignupPage;
