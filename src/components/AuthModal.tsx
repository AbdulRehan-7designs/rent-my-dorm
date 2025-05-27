
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { User, Store, Shield, GraduationCap, Mail, Lock, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, type, onLogin }) => {
  const [activeTab, setActiveTab] = useState(type);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    college: '',
    role: 'student',
    year: '',
    branch: '',
    hostelnumber: ''
  });

  const colleges = [
    'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'BITS Pilani', 'BITS Goa',
    'VIT Vellore', 'SRM University', 'Manipal University', 'Delhi University',
    'Jadavpur University', 'Anna University', 'Other'
  ];

  const branches = [
    'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical',
    'Chemical', 'Aerospace', 'Biotechnology', 'Information Technology',
    'Data Science', 'AI & ML', 'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuth = () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (activeTab === 'signup' && (!formData.name || !formData.college)) {
      toast({
        title: "Missing Information", 
        description: "Please complete your profile",
        variant: "destructive"
      });
      return;
    }

    // Simulate authentication
    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: formData.role,
      college: formData.college,
      phone: formData.phone,
      year: formData.year,
      branch: formData.branch,
      hostelNumber: formData.hostelnumber,
      points: Math.floor(Math.random() * 1000),
      level: Math.floor(Math.random() * 5) + 1,
      badges: ['Verified Student', 'First Rental'],
      joinedDate: new Date().toISOString()
    };

    onLogin(userData);
    onClose();
  };

  // Animated Avatar Component
  const AnimatedAvatar = () => (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
        {/* Face */}
        <div className="relative">
          {/* Eyes */}
          <div className="flex space-x-3 mb-2">
            <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${
              isPasswordFocused ? 'h-1' : 'h-3'
            }`}>
              <div className={`w-1.5 h-1.5 bg-gray-800 rounded-full transition-all duration-300 ${
                isPasswordFocused ? 'opacity-0' : 'opacity-100 mt-0.5 ml-0.5'
              }`}></div>
            </div>
            <div className={`w-3 h-3 bg-white rounded-full transition-all duration-300 ${
              isPasswordFocused ? 'h-1' : 'h-3'
            }`}>
              <div className={`w-1.5 h-1.5 bg-gray-800 rounded-full transition-all duration-300 ${
                isPasswordFocused ? 'opacity-0' : 'opacity-100 mt-0.5 ml-0.5'
              }`}></div>
            </div>
          </div>
          {/* Mouth */}
          <div className="w-4 h-2 border-b-2 border-white rounded-full mx-auto"></div>
        </div>
      </div>
      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
    </div>
  );

  const RoleCard = ({ role, icon: Icon, title, description, features }) => (
    <Card 
      className={`cursor-pointer transition-all duration-500 transform hover:scale-105 ${
        formData.role === role 
          ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-red-50 scale-105 shadow-lg' 
          : 'hover:shadow-lg hover:bg-gray-50'
      }`}
      onClick={() => handleInputChange('role', role)}
    >
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
          formData.role === role 
            ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-110 rotate-6' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}>
          <Icon className={`w-8 h-8 transition-all duration-500 ${
            formData.role === role ? 'text-white scale-110' : 'text-gray-600'
          }`} />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                formData.role === role ? 'bg-orange-400 animate-pulse' : 'bg-gray-300'
              }`}></div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Welcome to RentMyDorm
          </DialogTitle>
        </DialogHeader>

        {/* Animated Avatar */}
        <AnimatedAvatar />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="text-lg transition-all duration-300 hover:scale-105">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-lg transition-all duration-300 hover:scale-105">Create Account</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Welcome Back! 🎉</h3>
              <p className="text-gray-600">Continue your campus rental journey</p>
            </div>

            <div className="space-y-4">
              <div className="group">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500" />
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

              <div className="group">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
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

              <Button 
                onClick={handleAuth}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="mr-2">Sign In</span>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100"></div>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Join RentMyDorm 🚀</h3>
              <p className="text-gray-600">Choose your role and start your journey</p>
            </div>

            {/* Role Selection with Animation */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <RoleCard
                role="student"
                icon={User}
                title="Student"
                description="Rent & lend items"
                features={['Browse campus items', 'Earn points & badges', 'Join interest groups', 'AI recommendations']}
              />
              
              <RoleCard
                role="vendor"
                icon={Store}
                title="Verified Vendor"
                description="List products & services"
                features={['Manage inventory', 'Build trust ratings', 'Campus-wide reach', 'Analytics dashboard']}
              />
              
              <RoleCard
                role="admin"
                icon={Shield}
                title="Campus Admin"
                description="Manage college community"
                features={['Approve listings', 'Manage events', 'Monitor activities', 'Analytics reports']}
              />
            </div>

            {/* Personal Information with Animation */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 group-hover:border-orange-300"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="group">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500" />
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

              <div className="group">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500" />
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    className="pl-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="group">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-12 pr-12 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
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
            </div>

            {/* College Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="college">College/University</Label>
                <Select value={formData.college} onValueChange={(value) => handleInputChange('college', value)}>
                  <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college}>{college}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'student' && (
                <>
                  <div>
                    <Label htmlFor="year">Year of Study</Label>
                    <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="masters">Masters</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="branch">Branch/Department</Label>
                    <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="hostelnumber">Hostel/Room Number (Optional)</Label>
                    <Input
                      id="hostelnumber"
                      placeholder="e.g., H4-201"
                      className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={formData.hostelnumber}
                      onChange={(e) => handleInputChange('hostelnumber', e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <Button 
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
            >
              <span className="mr-2">Create Account</span>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin opacity-0 group-hover:opacity-100"></div>
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
