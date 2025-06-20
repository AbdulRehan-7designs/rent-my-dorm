
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MessagesPageProps {
  user: any;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ user }) => {
  const conversations = [
    { id: 1, name: 'Tech Store', lastMessage: 'Laptop is ready for pickup', time: '2 min ago', unread: 2 },
    { id: 2, name: 'Furniture Hub', lastMessage: 'Table delivery confirmed', time: '1 hour ago', unread: 0 },
    { id: 3, name: 'Photo Pro', lastMessage: 'Thanks for the rental!', time: '2 days ago', unread: 0 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Chat with vendors and other students</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Conversations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations.map((conv) => (
                <div key={conv.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{conv.name}</p>
                    {conv.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription>Select a conversation to start chatting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
              Select a conversation to view messages
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
