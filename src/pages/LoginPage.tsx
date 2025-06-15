
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { User, Store, Shield, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AnimatedBackground } from '@/components/Auth/AnimatedBackground';
import { AuthLogo } from '@/components/Auth/AuthLogo';
import { RoleSelector } from '@/components/Auth/RoleSelector';
import { PasswordInput } from '@/components/Auth/PasswordInput';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
      emojis: ['🎓', '📚', '🎮', '⚡'],
      benefits: ['💰 Save money', '🚀 Fast delivery', '🎯 AI recommendations', '⭐ Build reputation']
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell & earn with style! 💰📈',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      emojis: ['💰', '📈', '🚀', '⭐'],
      benefits: ['💰 Passive income', '📈 Business insights', '🚀 Scale your hustle', '⭐ Top seller badges']
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage like a boss! 👑🛡️',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      emojis: ['👑', '🛡️', '📊', '🎯'],
      benefits: ['👑 Ultimate control', '📊 Deep insights', '🛡️ Security powers', '🎯 Impact campus life']
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
      <AnimatedBackground />

      <div className="w-full max-w-lg relative z-10">
        <AuthLogo 
          title="Welcome Back!" 
          subtitle="Ready to continue your awesome journey? 🚀" 
        />

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In & Let's Go! 🎯</CardTitle>
            <CardDescription>Choose your role and jump back in</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RoleSelector 
              roles={roles}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
              compact={true}
            />

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
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Your super secret password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
            />

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
