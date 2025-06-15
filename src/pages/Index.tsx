import { LandingHero } from "@/components/LandingHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Shield, Zap, BookOpen, Gamepad2, Camera, Bike, ArrowRight, CheckCircle, TrendingUp, Award, Heart, Globe, Leaf, MessageSquare, Sparkles, Coffee, Pizza, Music, Headphones, Laptop, GraduationCap, Clock, DollarSign, Recycle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Campus Squad 🏫",
      description: "Connect with your college besties and trusted campus vendors",
      gradient: "from-orange-500/20 to-pink-500/20",
      emoji: "👥"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Super Safe 🛡️",
      description: "Student-verified IDs and secure payments. No sketchy deals!",
      gradient: "from-green-500/20 to-emerald-500/20",
      emoji: "🔒"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast ⚡",
      description: "Book in seconds, get stuff instantly. Faster than your WiFi!",
      gradient: "from-yellow-500/20 to-orange-500/20",
      emoji: "✨"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-500" />,
      title: "Rate & Roast 😅",
      description: "Honest reviews from real students. No fake 5-star nonsense!",
      gradient: "from-purple-500/20 to-pink-500/20",
      emoji: "⭐"
    }
  ];

  const coolFeatures = [
    {
      icon: <Award className="w-12 h-12 text-yellow-500" />,
      title: "Campus Credits 🪙",
      description: "Earn points like a boss! Redeem for pizza, coffee, or that textbook you definitely need",
      href: "/campus-credits",
      gradient: "from-yellow-500/20 to-orange-500/20",
      bgEmoji: "💰"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-500" />,
      title: "Campus Pulse 📈",
      description: "AI-powered feed that knows what you want before you do. Spooky but useful!",
      href: "/campus-pulse",
      gradient: "from-orange-500/20 to-pink-500/20",
      bgEmoji: "🔥"
    },
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Wishlist Magic 🪄",
      description: "Drop your wishlist, watch the magic happen. Your dream DSLR awaits!",
      href: "/community-wishlist",
      gradient: "from-red-500/20 to-pink-500/20",
      bgEmoji: "✨"
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Squad Up! 🤝",
      description: "Split costs with friends! Because sharing is caring (and cheaper)",
      href: "/squad-up",
      gradient: "from-green-500/20 to-emerald-500/20",
      bgEmoji: "🤗"
    }
  ];

  const categories = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      name: "Textbooks 📚",
      count: "1,500+",
      description: "From GATE prep to random electives you'll never read",
      color: "bg-gradient-to-br from-orange-500 to-pink-500",
      href: "/browse?category=textbooks",
      emoji: "📖"
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      name: "Tech Stuff 💻",
      description: "MacBooks, gaming rigs, and that tablet for 'notes'",
      count: "1,200+",
      color: "bg-gradient-to-br from-pink-500 to-purple-500",
      href: "/browse?category=electronics",
      emoji: "⚡"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      name: "Gaming Zone 🎮",
      description: "PS5s, controllers, and midnight gaming sessions",
      count: "800+",
      color: "bg-gradient-to-br from-purple-500 to-blue-500",
      href: "/browse?category=gaming",
      emoji: "🎯"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      name: "Content Creator 📸",
      description: "DSLRs, ring lights for those Insta reels",
      count: "600+",
      color: "bg-gradient-to-br from-blue-500 to-indigo-500",
      href: "/browse?category=cameras",
      emoji: "📷"
    },
    {
      icon: <Bike className="w-8 h-8" />,
      name: "Sports & Fitness 🏃",
      description: "Cycles, gym equipment, cricket bats",
      count: "500+",
      color: "bg-gradient-to-br from-indigo-500 to-green-500",
      href: "/browse?category=sports",
      emoji: "🏆"
    },
    {
      icon: <Music className="w-8 h-8" />,
      name: "Music & Audio 🎵",
      description: "Guitars, speakers for hostel parties",
      count: "400+",
      color: "bg-gradient-to-br from-green-500 to-orange-500",
      href: "/browse?category=music",
      emoji: "🎸"
    }
  ];

  const testimonials = [
    {
      name: "Priya 'Bookworm' Singh",
      college: "IIT Bombay",
      text: "Saved ₹15K this sem by renting! Now I can afford good hostel mess food (finally!) 😋",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      emoji: "🤓"
    },
    {
      name: "Rahul 'Gamer' Kumar", 
      college: "BITS Pilani",
      text: "Found a sick camera for my YouTube channel through Squad Up. My content is fire now! 🔥",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      emoji: "🎬"
    },
    {
      name: "Anisha 'Hustler' Patel",
      college: "VIT Vellore",
      text: "Campus Credits got me free pizza for a week! This app is literally feeding me 🍕",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      emoji: "🍕"
    }
  ];

  const stats = [
    { label: "Cool Students", value: "25K+", icon: Users, color: "text-orange-500", emoji: "😎" },
    { label: "Awesome Items", value: "15K+", icon: BookOpen, color: "text-yellow-500", emoji: "🛒" },
    { label: "Happy Rentals", value: "75K+", icon: CheckCircle, color: "text-green-500", emoji: "✅" },
    { label: "Money Saved", value: "₹2.5Cr+", icon: DollarSign, color: "text-purple-500", emoji: "💸" }
  ];

  const howItWorks = [
    {
      step: "1️⃣",
      title: "Browse & Drool 🤤",
      description: "Scroll through amazing stuff your campus friends are sharing. Our AI knows your vibe!",
      color: "from-orange-400 to-pink-400",
      emoji: "👀"
    },
    {
      step: "2️⃣", 
      title: "Book & Chill 😌",
      description: "Secure booking with zero drama. Digital agreements because we're not living in 2010!",
      color: "from-pink-400 to-purple-400",
      emoji: "📱"
    },
    {
      step: "3️⃣",
      title: "Use & Flex 💪",
      description: "Enjoy your rental, earn Campus Credits, return on time. Keep your rep clean!",
      color: "from-purple-400 to-blue-400",
      emoji: "🏆"
    }
  ];

  const sustainabilityStats = [
    { label: "CO₂ Saved", value: "50+ tons", emoji: "🌱", description: "Mother Earth thanks you!" },
    { label: "Items Reused", value: "25K+", emoji: "♻️", description: "Reduce, reuse, rock!" },
    { label: "Trees Saved", value: "200+", emoji: "🌳", description: "Virtual hugs from trees" }
  ];

  const campusVibes = [
    "IIT Bombay 🏛️", "BITS Pilani 🔬", "VIT Vellore ⚡", "NIT Warangal 🏗️", 
    "IIIT Hyderabad 💻", "Manipal 🏥", "SRM University 🎓", "Amity 🌟"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 overflow-x-hidden">
      <LandingHero />
      
      {/* Floating Emojis Animation */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {['📚', '💻', '🎮', '📱', '🎵', '📷', '🏆', '💡'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-bounce opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 2)}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Epic Stats with Continuous Gradients */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 via-pink-100/50 to-purple-100/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-full text-lg font-bold mb-8 shadow-2xl hover:scale-105 transition-transform border-0">
              <Sparkles className="w-6 h-6" />
              <span>🎉 Students Are Going Crazy For This! 🔥</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Numbers Don't Lie! 📊
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Join the revolution that's changing how students live, learn, and save! ✨
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-3xl flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-xl border-4 border-gradient-to-r from-orange-200 via-pink-200 to-purple-200 group-hover:border-opacity-100 mx-auto">
                    <div className="text-4xl">{stat.emoji}</div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 via-pink-500/30 to-purple-500/30 rounded-3xl -z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-500 blur-xl"></div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 transition-all">
                  {stat.value}
                </div>
                <div className="text-gray-700 font-bold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cool Features with Gradient Consistency */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white rounded-full text-lg font-bold mb-8 border-0">
              <Zap className="w-6 h-6" />
              <span>🤖 AI-Powered Awesomeness 🎯</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Features That'll Blow Your Mind! 🤯
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              We've packed this app with more cool stuff than your smartphone! 📱✨
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {coolFeatures.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <Card className="h-full hover:shadow-2xl transition-all duration-700 hover:-translate-y-6 cursor-pointer group bg-white border-0 shadow-xl overflow-hidden relative">
                  <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    {feature.bgEmoji}
                  </div>
                  <CardContent className="p-10 text-center relative z-10">
                    <div className="mb-8 flex justify-center">
                      <div className="relative">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white group-hover:scale-125 transition-transform duration-500 shadow-xl border-4 border-gradient-to-r from-orange-100 via-pink-100 to-purple-100 group-hover:border-opacity-100">
                          {feature.icon}
                        </div>
                        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/40 via-pink-500/40 to-purple-500/40 rounded-3xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 transition-all">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg font-medium">{feature.description}</p>
                    <div className="flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 font-bold text-lg group-hover:gap-4 transition-all">
                      <span>Let's Go! ✨</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features with Enhanced Gradients */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-full opacity-30" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Why Students Are Obsessed! 😍
            </h2>
            <p className="text-2xl text-purple-100 max-w-3xl mx-auto font-medium">
              It's like having a super smart friend who knows everything about campus life! 🧠✨
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white/15 backdrop-blur-md border-white/30 group relative overflow-hidden">
                <div className="absolute top-4 right-4 text-4xl opacity-20">
                  {feature.emoji}
                </div>
                <CardContent className="pt-12 pb-10 px-8">
                  <div className="mb-8 flex justify-center">
                    <div className={`p-6 rounded-3xl bg-gradient-to-br ${feature.gradient} group-hover:scale-125 transition-transform duration-500 border-2 border-white/20`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-300 group-hover:to-pink-300 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200 leading-relaxed text-lg font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Epic Categories Grid */}
      <section className="py-24 bg-gradient-to-br from-white via-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              What's Hot on Campus? 🔥
            </h2>
            <p className="text-2xl text-gray-600 font-medium">
              Everything you need for the ultimate student life! 🎓
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <Link key={index} to={category.href}>
                <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer group bg-white border-0 shadow-xl overflow-hidden relative h-full">
                  <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-30 transition-opacity">
                    {category.emoji}
                  </div>
                  <CardContent className="p-8 relative z-10">
                    <div className={`w-24 h-24 rounded-3xl ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-white shadow-xl mx-auto`}>
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 transition-all text-center">
                      {category.name}
                    </h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 font-bold text-lg mb-4 text-center">{category.count}</p>
                    <p className="text-gray-600 text-center leading-relaxed font-medium">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/browse">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 rounded-2xl border-0">
                🛒 Shop All The Cool Stuff! ✨
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fun Testimonials */}
      <section className="py-24 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Real Students, Real Stories! 🗣️
            </h2>
            <p className="text-2xl text-gray-600 font-medium">
              Don't just take our word for it - hear from your squad! 👥
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white border-0 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 text-4xl opacity-20">
                  {testimonial.emoji}
                </div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover shadow-xl border-4 border-gradient-to-r from-orange-200 to-pink-200"
                      />
                      <div className="absolute -bottom-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-lg">
                        {testimonial.emoji}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="font-black text-gray-900 text-xl">{testimonial.name}</div>
                      <div className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 font-bold">{testimonial.college}</div>
                    </div>
                  </div>
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed text-lg font-medium">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Student Style */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              How Easy Is This? 🤔
            </h2>
            <p className="text-2xl text-gray-600 font-medium">
              Easier than ordering late-night pizza! 🍕
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-32 h-32 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto group-hover:scale-125 transition-transform duration-500 shadow-2xl border-4 border-white`}>
                    {item.step}
                  </div>
                  <div className="absolute -top-4 -right-4 text-6xl opacity-50">
                    {item.emoji}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-orange-300 via-pink-300 to-purple-300"></div>
                  )}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-xl font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Network with More Energy */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              We're Everywhere! 🌍
            </h2>
            <p className="text-2xl text-purple-100 font-medium">
              Your favorite app is spreading across campuses faster than gossip! 📢
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {campusVibes.map((campus, index) => (
              <Badge key={index} variant="outline" className="px-8 py-4 text-lg font-bold border-white/40 text-white bg-white/15 backdrop-blur-sm hover:bg-white/25 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl">
                {campus}
              </Badge>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-purple-200 mb-8 text-xl font-medium">Your campus missing from the party? 🎉</p>
            <Button variant="outline" size="lg" className="border-gradient-to-r from-orange-300 to-pink-300 text-orange-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white transition-all duration-300 px-10 py-4 text-lg font-bold rounded-2xl">
              <MessageSquare className="w-6 h-6 mr-3" />
              ✨ Bring RentMyDorm Here!
            </Button>
          </div>
        </div>
      </section>

      {/* Sustainability with Fun Vibes */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full text-lg font-bold mb-8 border-0">
              <Leaf className="w-6 h-6" />
              <span>🌍 Saving The Planet One Rental At A Time! 🌱</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              You're An Eco Warrior! 🦸‍♀️
            </h2>
            <p className="text-2xl text-green-100 max-w-3xl mx-auto font-medium">
              Every time you rent instead of buy, you're literally saving the planet! 🌟
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            {sustainabilityStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">{stat.emoji}</div>
                <div className="text-5xl font-black text-white mb-4">{stat.value}</div>
                <div className="text-green-100 font-bold text-xl mb-2">{stat.label}</div>
                <div className="text-green-200 italic font-medium">{stat.description}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/sustainability">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold shadow-2xl rounded-2xl hover:scale-105 transition-all duration-300 border-0">
                <Leaf className="w-6 h-6 mr-3" />
                🌟 See Your Impact!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Epic Final CTA */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {['🎉', '✨', '💫', '⭐', '🔥', '💎'].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-6xl animate-bounce opacity-30"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + (i % 2)}s`
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-8">
            Ready To Join The Revolution? 🔥
          </h2>
          <p className="text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed font-medium">
            Stop paying full price for stuff you'll use once! Join thousands of smart students 
            who are saving money, making friends, and changing the world! 🌍✨
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-16 py-6 text-2xl font-black shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 rounded-2xl border-0">
                ✨ Let's Gooooo! ⚡
                <ArrowRight className="w-8 h-8 ml-3" />
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 px-16 py-6 text-2xl font-black transition-all duration-300 rounded-2xl border-4">
                🛒 Browse Cool Stuff
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center gap-16 text-lg opacity-90 font-bold">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              <span>🆓 Totally Free!</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <span>🔒 Super Secure</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" />
              <span>👥 Verified Squad</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Student Energy */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                RentMyDorm 🏠
              </h3>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg font-medium">
                India's coolest campus rental app! Making student life more affordable, 
                fun, and connected through the magic of sharing! ✨
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 text-lg font-bold border-0">
                  🌱 Planet Friendly
                </Badge>
                <Badge variant="secondary" className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 px-6 py-3 text-lg font-bold border-0">
                  💰 Money Saver
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-xl">Platform ✨</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/browse" className="hover:text-white transition-colors hover:underline font-medium">Browse Items</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors hover:underline font-medium">List an Item</Link></li>
                <li><Link to="/campus-credits" className="hover:text-white transition-colors hover:underline font-medium">Campus Credits</Link></li>
                <li><Link to="/sustainability" className="hover:text-white transition-colors hover:underline font-medium">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Community 👥</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/community-wishlist" className="hover:text-white transition-colors hover:underline font-medium">Community Wishlist</Link></li>
                <li><Link to="/squad-up" className="hover:text-white transition-colors hover:underline font-medium">Squad Up</Link></li>
                <li><Link to="/campus-pulse" className="hover:text-white transition-colors hover:underline font-medium">Campus Pulse</Link></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline font-medium">Student Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Support 🤝</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline font-medium">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline font-medium">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline font-medium">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline font-medium">Campus Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0 font-medium">
              &copy; 2024 RentMyDorm. All rights reserved. Made with ❤️ by students, for students! 🎓
            </p>
            <div className="flex items-center gap-8 font-medium">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
