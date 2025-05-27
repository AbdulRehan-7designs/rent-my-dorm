
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Heart,
  MessageSquare,
  Clock,
  Shield
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ContactPage = ({ onBack, itemOwner, item }) => {
  const [message, setMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message sent! 📩",
        description: `Your message has been sent to ${itemOwner?.name}`,
      });
      setMessage('');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites 💔" : "Added to favorites ❤️",
      description: isLiked ? "Item removed from your liked items" : "Item saved to your favorites",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Contact Owner</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Item Details */}
        <Card>
          <CardContent className="p-6">
            <div className="relative mb-4">
              <img 
                src={item?.image || "/placeholder.svg"} 
                alt={item?.title || "Item"}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="ghost"
                className={`absolute top-2 right-2 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                onClick={handleLike}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">{item?.title || "MacBook Pro 13"}</h2>
            <p className="text-gray-600 mb-4">{item?.description || "Perfect for coding and design work"}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-orange-600">{item?.price || "₹800/day"}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-medium">{item?.rating || "4.8"}</span>
                <span className="text-gray-500">({item?.reviews || "24"} reviews)</span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{item?.location || "IIT Delhi"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Available from tomorrow</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Contact */}
        <div className="space-y-6">
          {/* Owner Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {itemOwner?.name?.charAt(0)?.toUpperCase() || "R"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{itemOwner?.name || "Rahul Kumar"}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Student
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">4.9 (156 reviews)</span>
                    </div>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>rahul@iitdelhi.ac.in</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>Usually responds in 2 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Message */}
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Hi! I'm interested in renting your item. When is it available?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleSendMessage}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={() => toast({ title: "Chat opened! 💬" })}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Quick Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => toast({ title: "Viewing similar items 🔍" })}>
              View Similar Items
            </Button>
            <Button variant="outline" onClick={() => toast({ title: "Saved for later 📌" })}>
              Save for Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
