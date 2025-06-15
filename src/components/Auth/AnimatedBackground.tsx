
import { Sparkles, Zap, Star, Heart, Rocket } from 'lucide-react';

export const AnimatedBackground = () => {
  return (
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
  );
};
