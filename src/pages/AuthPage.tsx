
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Store, Shield, GraduationCap, Sparkles, Zap, Star } from 'lucide-react';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Rent & lend awesome stuff!',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      features: ['📚 Rent textbooks', '🎮 Gaming gear', '⚡ Quick delivery', '🎯 AI recommendations']
    },
    {
      id: 'vendor',
      title: 'Vendor',
      description: 'Sell & earn with style!',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      features: ['💰 Make money', '📈 Analytics', '🚀 Campus reach', '⭐ Build reputation']
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage like a boss!',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      features: ['👑 Full control', '📊 Insights', '🛡️ Security', '🎯 Approve listings']
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(formData.email, formData.password);

    if (error) {
      toast({
        title: "Oops! 😅",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back! 🎉",
        description: "Let's get you back to renting awesome stuff!"
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch 🤔",
        description: "Your passwords don't match. Try again!",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short 📏",
        description: "Make it at least 6 characters - your future self will thank you!",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(formData.email, formData.password, formData.fullName);

    if (error) {
      toast({
        title: "Sign Up Failed 😓",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account Created! 🚀",
        description: "Check your email and let's get this party started!"
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole) || roles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <Sparkles className="absolute top-1/4 left-1/3 w-8 h-8 text-pink-400 opacity-30 animate-spin" style={{animationDuration: '3s'}} />
        <Zap className="absolute bottom-1/3 right-1/3 w-6 h-6 text-yellow-500 opacity-40 animate-pulse" />
        <Star className="absolute top-2/3 left-1/6 w-10 h-10 text-purple-500 opacity-25 animate-bounce" style={{animationDelay: '2s'}} />
      </div>

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <Card className="w-full max-w-4xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          {/* Header with Logo */}
          <CardHeader className="text-center pb-2 relative">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              RentMyDorm
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Your campus rental playground! 🎮✨
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="signin" className="text-lg py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                  Sign In 🚀
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-lg py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                  Join the Fun 🎉
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Superstar! 🌟</h3>
                  <p className="text-gray-600">Ready to continue your amazing journey?</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.awesome.email@college.edu"
                      className="h-12 text-base border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 rounded-xl"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-semibold text-gray-700">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Your super secret password"
                      className="h-12 text-base border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 rounded-xl"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Signing you in...
                      </>
                    ) : (
                      <>
                        Sign In & Let's Go! 🚀
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Join the Campus Revolution! 🎯</h3>
                  <p className="text-gray-600">Choose your role and start your adventure</p>
                </div>

                {/* Interactive Role Selection */}
                <div className="mb-8">
                  <Label className="text-base font-semibold text-gray-700 mb-4 block">Choose Your Superhero Role 🦸‍♀️</Label>
                  <div className="grid md:grid-cols-3 gap-4">
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
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                          <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                          <div className="space-y-1">
                            {role.features.map((feature, index) => (
                              <div key={index} className="text-xs text-gray-500">{feature}</div>
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

                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base font-semibold text-gray-700">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your awesome name"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold text-gray-700">College Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@college.edu"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base font-semibold text-gray-700">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Make it strong! 💪"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-base font-semibold text-gray-700">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="One more time!"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className={`w-full h-14 text-lg font-bold bg-gradient-to-r ${selectedRoleData.color} hover:shadow-xl text-white rounded-xl transition-all duration-300 transform hover:scale-105`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Creating your account...
                      </>
                    ) : (
                      <>
                        Create Account & Start Adventure! 🎯
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
