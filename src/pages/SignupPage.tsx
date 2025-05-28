
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { User, Store, Shield, Mail, Lock, Eye, EyeOff, ArrowRight, GraduationCap, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage = ({ onLogin }) => {
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

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Rent & lend items',
      icon: User,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'List products & services',
      icon: Store,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage college community',
      icon: Shield,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        email: formData.email,
        name: formData.name,
        role: selectedRole,
        college: formData.college || (selectedRole === 'admin' ? 'RentMyDorm Admin' : 'IIT Delhi'),
        points: 0,
        level: 1,
        badges: ['New Member'],
        joinedDate: new Date().toISOString()
      };

      onLogin(userData);
      setIsLoading(false);
      
      toast({
        title: "Account Created! 🎉",
        description: `Welcome to RentMyDorm as ${selectedRole}`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Join RentMyDorm
          </h1>
          <p className="text-gray-600 mt-2">Create your account and start renting</p>
        </div>

        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Choose your role and create account</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Your Role</Label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedRole === role.id
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 scale-105'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${role.color} ${
                        selectedRole === role.id ? 'scale-110' : ''
                      } transition-transform duration-300`}>
                        <role.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative group">
                <UserCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-colors group-hover:text-orange-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-colors group-hover:text-orange-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  className="pl-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            {/* College Input (Optional) */}
            {selectedRole !== 'admin' && (
              <div className="space-y-2">
                <Label htmlFor="college">College/University (Optional)</Label>
                <Input
                  id="college"
                  type="text"
                  placeholder="e.g., IIT Delhi"
                  className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                />
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-colors group-hover:text-orange-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pl-12 pr-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 hover:bg-orange-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-colors group-hover:text-orange-500" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-12 pr-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8 hover:bg-orange-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Signup Button */}
            <Button 
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="mr-2">Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Links */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                  Sign in here
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                <Link to="/" className="hover:text-orange-600 transition-colors">
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
