
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, User, Store, Shield, GraduationCap, 
  CheckCircle, ArrowRight, Mail
} from 'lucide-react';
import { AnimatedBackground } from '@/components/Auth/AnimatedBackground';
import { RoleSelector } from '@/components/Auth/RoleSelector';
import { PasswordInput } from '@/components/Auth/PasswordInput';

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
      title: 'Student Explorer',
      description: 'Rent, lend & discover amazing stuff!',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      emojis: ['🎓', '📚', '🎮', '⚡'],
      benefits: ['💰 Save money', '🚀 Fast delivery', '🎯 AI recommendations', '⭐ Build reputation'],
      stats: { users: '15K+', items: '50K+', savings: '$2M+' }
    },
    {
      id: 'vendor',
      title: 'Campus Entrepreneur',
      description: 'Turn your stuff into cash flow!',
      icon: Store,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      emojis: ['💰', '📈', '🚀', '⭐'],
      benefits: ['💰 Passive income', '📈 Business insights', '🚀 Scale your hustle', '⭐ Top seller badges'],
      stats: { vendors: '2K+', earnings: '$500K+', satisfaction: '98%' }
    },
    {
      id: 'admin',
      title: 'Platform Guardian',
      description: 'Shape the future of campus sharing!',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      emojis: ['👑', '🛡️', '📊', '🎯'],
      benefits: ['👑 Ultimate control', '📊 Deep insights', '🛡️ Security powers', '🎯 Impact campus life'],
      stats: { campuses: '50+', transactions: '100K+', uptime: '99.9%' }
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
        title: "Welcome back, superstar! 🎉",
        description: "Ready to continue your awesome journey?"
      });
      navigate('/dashboard');
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
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole) || roles[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      <AnimatedBackground />

      <div className="flex items-center justify-center min-h-screen relative z-10">
        <Card className="w-full max-w-6xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          {/* Enhanced Header with Logo and Stats */}
          <CardHeader className="text-center pb-2 relative">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                  <span className="text-xs font-bold">🎓</span>
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <CardTitle className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              RentMyDorm
            </CardTitle>
            <CardDescription className="text-xl text-gray-600 mb-6">
              Your ultimate campus rental playground! 🎮✨
            </CardDescription>
            
            {/* Live Stats Bar */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">15K+</div>
                <div className="text-xs text-gray-600">Active Students</div>
              </div>
              <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                <div className="text-2xl font-bold text-green-600">50K+</div>
                <div className="text-xs text-gray-600">Items Available</div>
              </div>
              <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">$2M+</div>
                <div className="text-xs text-gray-600">Money Saved</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl h-14">
                <TabsTrigger 
                  value="signin" 
                  className="text-lg py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <span className="mr-2">🚀</span> Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="text-lg py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <span className="mr-2">🎉</span> Join the Fun
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Champion! 🌟</h3>
                  <p className="text-lg text-gray-600">Ready to continue your rental adventure?</p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-500 group-focus-within:text-orange-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.awesome.email@college.edu"
                        className="pl-12 h-14 text-base border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all duration-300 rounded-xl"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <PasswordInput
                    id="signin-password"
                    label="Password"
                    placeholder="Your super secret password"
                    value={formData.password}
                    onChange={(value) => setFormData(prev => ({...prev, password: value}))}
                    required
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl group" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin mr-3" />
                        Signing you in...
                      </>
                    ) : (
                      <>
                        <span className="mr-3">Sign In & Let's Go!</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Join the Campus Revolution! 🎯</h3>
                  <p className="text-lg text-gray-600">Choose your adventure and create your account</p>
                </div>

                <RoleSelector 
                  roles={roles}
                  selectedRole={selectedRole}
                  onRoleSelect={setSelectedRole}
                />

                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base font-semibold text-gray-700">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your awesome name"
                        className="h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-base font-semibold text-gray-700">College Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="your.email@college.edu"
                        className="h-14 text-base border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <PasswordInput
                      id="signup-password"
                      label="Password"
                      placeholder="Make it strong! 💪"
                      value={formData.password}
                      onChange={(value) => setFormData(prev => ({...prev, password: value}))}
                      required
                    />
                    
                    <PasswordInput
                      id="confirmPassword"
                      label="Confirm Password"
                      placeholder="One more time!"
                      value={formData.confirmPassword}
                      onChange={(value) => setFormData(prev => ({...prev, confirmPassword: value}))}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className={`w-full h-16 text-xl font-bold bg-gradient-to-r ${selectedRoleData.color} hover:shadow-2xl text-white rounded-xl transition-all duration-300 transform hover:scale-105 group`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin mr-3" />
                        Creating your account...
                      </>
                    ) : (
                      <>
                        <span className="mr-3">Create Account & Start Adventure!</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
