
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { User, Store, Shield, Mail, ArrowRight, UserCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AnimatedBackground } from '@/components/Auth/AnimatedBackground';
import { AuthLogo } from '@/components/Auth/AuthLogo';
import { RoleSelector } from '@/components/Auth/RoleSelector';
import { PasswordInput } from '@/components/Auth/PasswordInput';

const SignupPage = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: ''
  });
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
      emojis: ['🎓', '📚', '🎮', '⚡'],
      benefits: ['💰 Save money', '🚀 Fast delivery', '🎯 AI recommendations', '⭐ Build reputation']
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell & earn with style! 💰',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      features: ['💰 Make money selling', '📈 Business analytics', '🚀 Campus-wide reach', '⭐ Build your reputation'],
      emojis: ['💰', '📈', '🚀', '⭐'],
      benefits: ['💰 Passive income', '📈 Business insights', '🚀 Scale your hustle', '⭐ Top seller badges']
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage like a boss! 👑',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      features: ['👑 Full platform control', '📊 Detailed insights', '🛡️ Security management', '🎯 Approve all listings'],
      emojis: ['👑', '🛡️', '📊', '🎯'],
      benefits: ['👑 Ultimate control', '📊 Deep insights', '🛡️ Security powers', '🎯 Impact campus life']
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
      <AnimatedBackground />

      <div className="w-full max-w-4xl relative z-10">
        <AuthLogo 
          title="Join RentMyDorm!" 
          subtitle="Create your account and start the adventure! 🚀✨" 
        />

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl">Join the Campus Revolution! 🎯</CardTitle>
            <CardDescription className="text-lg">Choose your role and create your awesome account</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 p-8">
            <RoleSelector 
              roles={roles}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />

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
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Make it strong! 💪"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
              />

              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                placeholder="One more time! 🔄"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
              />
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
