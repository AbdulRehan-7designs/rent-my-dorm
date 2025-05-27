
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Smile,
  Paperclip,
  Star,
  MapPin,
  Clock
} from 'lucide-react';

const ChatInterface = ({ onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Rahul Kumar',
      content: 'Hi! Is the MacBook still available for rent?',
      time: '2:30 PM',
      isOwn: false,
      avatar: 'R'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Yes, it\'s available! When do you need it?',
      time: '2:32 PM',
      isOwn: true,
      avatar: 'Y'
    },
    {
      id: 3,
      sender: 'Rahul Kumar',
      content: 'I need it for a project from Monday to Friday. What\'s the total cost?',
      time: '2:35 PM',
      isOwn: false,
      avatar: 'R'
    },
    {
      id: 4,
      sender: 'You',
      content: 'That would be ₹4000 for 5 days. I can also include the charger and a laptop bag.',
      time: '2:37 PM',
      isOwn: true,
      avatar: 'Y'
    },
    {
      id: 5,
      sender: 'Rahul Kumar',
      content: 'Perfect! That sounds great. Can we meet at the campus library tomorrow?',
      time: '2:40 PM',
      isOwn: false,
      avatar: 'R'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        avatar: 'Y'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              R
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">Rahul Kumar</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
              <Badge variant="secondary" className="text-xs">
                Verified Student
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Item Context Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <img 
              src="/placeholder.svg" 
              alt="MacBook Pro"
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">MacBook Pro 13" 2023</h3>
              <p className="text-gray-600 text-sm">Perfect for coding and design work</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-orange-600">₹800/day</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm">4.8 (24 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Avatar className="w-8 h-8">
                <AvatarFallback className={`text-white text-sm ${
                  msg.isOwn 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}>
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`rounded-lg px-4 py-2 ${
                msg.isOwn 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.isOwn ? 'text-orange-100' : 'text-gray-500'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
        <Button variant="ghost" size="icon">
          <Paperclip className="w-4 h-4" />
        </Button>
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border-none bg-transparent focus-visible:ring-0"
        />
        <Button variant="ghost" size="icon">
          <Smile className="w-4 h-4" />
        </Button>
        <Button 
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          size="icon"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
