
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Search,
  MessageSquare,
  Package,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';

const ChatInterface = ({ onBack }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Rahul Kumar',
      college: 'IIT Delhi',
      lastMessage: 'Is the MacBook still available?',
      time: '2 min ago',
      unread: 2,
      online: true,
      item: 'MacBook Pro 13"',
      avatar: 'R'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      college: 'NIT Trichy',
      lastMessage: 'Thanks for the books! They were really helpful.',
      time: '1 hour ago',
      unread: 0,
      online: false,
      item: 'Engineering Mathematics',
      avatar: 'P'
    },
    {
      id: 3,
      name: 'Amit Patel',
      college: 'BITS Pilani',
      lastMessage: 'Can we meet tomorrow to see the table?',
      time: '3 hours ago',
      unread: 1,
      online: true,
      item: 'Study Table',
      avatar: 'A'
    }
  ];

  const messages = selectedChat ? [
    {
      id: 1,
      sender: 'other',
      content: 'Hi! I saw your listing for the MacBook Pro. Is it still available?',
      time: '10:30 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'me',
      content: 'Yes, it\'s still available! It\'s in excellent condition with the original charger.',
      time: '10:32 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'other',
      content: 'Great! What\'s your best price for a week\'s rental?',
      time: '10:35 AM',
      status: 'read'
    },
    {
      id: 4,
      sender: 'me',
      content: 'I can do ₹1200 for a week. It includes the charger and a laptop sleeve.',
      time: '10:37 AM',
      status: 'delivered'
    },
    {
      id: 5,
      sender: 'other',
      content: 'That sounds perfect! When can we meet?',
      time: '10:40 AM',
      status: 'sent'
    }
  ] : [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        </div>
        <p className="text-gray-600">Connect with other students and negotiate your rentals</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-orange-500" />
              <span>Conversations</span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-orange-50 border-orange-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                        <p className="text-xs text-gray-500">{chat.time}</p>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {chat.item}
                        </Badge>
                        {chat.unread > 0 && (
                          <Badge className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        {selectedChat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChat.college}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        <Package className="w-3 h-3 mr-1" />
                        {selectedChat.item}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0">
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-between mt-1 ${
                          message.sender === 'me' ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          <span className="text-xs">{message.time}</span>
                          {message.sender === 'me' && (
                            <div className="ml-2">
                              {message.status === 'sent' && <Check className="w-3 h-3" />}
                              {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                              {message.status === 'read' && <CheckCheck className="w-3 h-3 text-blue-300" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a chat from the list to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ChatInterface;
