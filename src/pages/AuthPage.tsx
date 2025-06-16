
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Store, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from '@/components/Auth/AnimatedBackground';
import { AuthLogo } from '@/components/Auth/AuthLogo';

const AuthPage = () => {
  const [selectedRole, setSelectedRole] = useState('student');

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Rent & lend awesome stuff! 🎓',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      emojis: ['🎓', '📚', '🎮', '⚡']
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell & earn with style! 💰',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      emojis: ['💰', '📈', '🚀', '⭐']
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage like a boss! 👑',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      emojis: ['👑', '🛡️', '📊', '🎯']
    }
  ];

  const selectedRoleData = roles.find(role => role.id === selectedRole) || roles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">
        <AuthLogo 
          title="Welcome to RentMyDorm!" 
          subtitle="Your campus marketplace adventure starts here! 🚀" 
        />

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Join the Revolution! 🎯</CardTitle>
            <CardDescription>Choose how you want to get started</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="signin">Sign In</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup" className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Create Your Account</h3>
                  <p className="text-gray-600 mb-6">Join thousands of students already using RentMyDorm!</p>
                  
                  <Link to="/signup">
                    <Button 
                      className={`w-full h-14 text-lg font-bold bg-gradient-to-r ${selectedRoleData.color} hover:shadow-xl text-white rounded-xl transition-all duration-300 transform hover:scale-105 group`}
                    >
                      <span className="mr-3">Create Account & Start!</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="signin" className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Welcome Back!</h3>
                  <p className="text-gray-600 mb-6">Sign in to continue your journey</p>
                  
                  <Link to="/login">
                    <Button 
                      className={`w-full h-14 text-lg font-bold bg-gradient-to-r ${selectedRoleData.color} hover:shadow-xl text-white rounded-xl transition-all duration-300 transform hover:scale-105 group`}
                    >
                      <span className="mr-3">Sign In & Continue!</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center space-y-3">
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

export default AuthPage;
