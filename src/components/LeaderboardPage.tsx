
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  TrendingUp, 
  ArrowLeft,
  Award,
  Users,
  Target,
  Zap
} from 'lucide-react';

const LeaderboardPage = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState('points');

  const pointsLeaderboard = [
    { rank: 1, name: 'Arjun Mehta', points: 5420, level: 15, college: 'IIT Delhi', avatar: 'A' },
    { rank: 2, name: 'Priya Sharma', points: 4890, level: 14, college: 'IIT Bombay', avatar: 'P' },
    { rank: 3, name: 'Rajesh Kumar', points: 4350, level: 13, college: 'IIT Madras', avatar: 'R' },
    { rank: 4, name: 'Sneha Patel', points: 3920, level: 12, college: 'IIT Delhi', avatar: 'S' },
    { rank: 5, name: 'Vikash Singh', points: 3650, level: 12, college: 'IIT Kanpur', avatar: 'V' },
    { rank: 12, name: user?.name || 'You', points: user?.points || 2450, level: user?.level || 10, college: 'Your College', avatar: user?.name?.charAt(0) || 'Y' }
  ];

  const monthlyLeaderboard = [
    { rank: 1, name: 'Kavya Reddy', points: 890, level: 11, college: 'IIT Hyderabad', avatar: 'K' },
    { rank: 2, name: 'Rohit Gupta', points: 750, level: 9, college: 'IIT Delhi', avatar: 'R' },
    { rank: 3, name: 'Ananya Singh', points: 680, level: 10, college: 'IIT Bombay', avatar: 'A' },
    { rank: 8, name: user?.name || 'You', points: 340, level: user?.level || 10, college: 'Your College', avatar: user?.name?.charAt(0) || 'Y' }
  ];

  const weeklyLeaderboard = [
    { rank: 1, name: 'Dev Patel', points: 180, level: 8, college: 'IIT Guwahati', avatar: 'D' },
    { rank: 2, name: 'Isha Jain', points: 160, level: 7, college: 'IIT Delhi', avatar: 'I' },
    { rank: 3, name: 'Akash Yadav', points: 140, level: 9, college: 'IIT Roorkee', avatar: 'A' },
    { rank: 5, name: user?.name || 'You', points: 95, level: user?.level || 10, college: 'Your College', avatar: user?.name?.charAt(0) || 'Y' }
  ];

  const achievements = [
    { title: 'Top Contributor', description: 'Most items shared this month', icon: Crown, color: 'text-yellow-600' },
    { title: 'Rising Star', description: 'Fastest growing user', icon: TrendingUp, color: 'text-blue-600' },
    { title: 'Community Hero', description: 'Most helpful reviews', icon: Award, color: 'text-purple-600' },
    { title: 'Green Champion', description: 'Highest sustainability impact', icon: Target, color: 'text-green-600' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">#{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const LeaderboardList = ({ data, showYourRank = false }) => (
    <div className="space-y-3">
      {data.map((item, index) => {
        const isCurrentUser = item.name === (user?.name || 'You');
        return (
          <Card key={index} className={`hover:shadow-md transition-shadow ${isCurrentUser ? 'ring-2 ring-orange-500 bg-orange-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center">
                    {getRankIcon(item.rank)}
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={isCurrentUser ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-500 text-white'}>
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.name} {isCurrentUser && <span className="text-orange-600">(You)</span>}
                    </p>
                    <p className="text-sm text-gray-600">{item.college}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-lg font-bold text-orange-600">{item.points}</p>
                      <p className="text-sm text-gray-500">points</p>
                    </div>
                    <Badge className={getRankBadgeColor(item.rank)}>
                      Level {item.level}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
      </div>

      {/* Your Stats */}
      <Card className="mb-8 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-white text-orange-500 text-xl">
                  {user?.name?.charAt(0)?.toUpperCase() || 'Y'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">Your Rank</h2>
                <p className="text-white/80">Keep sharing to climb higher!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">#12</div>
              <div className="text-white/80">Overall Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Achievements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-orange-500" />
            <span>Featured Achievements</span>
          </CardTitle>
          <CardDescription>Special recognitions for outstanding contributors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${achievement.color}`}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="points">All Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>
        
        <TabsContent value="points" className="mt-6">
          <LeaderboardList data={pointsLeaderboard} />
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-6">
          <LeaderboardList data={monthlyLeaderboard} />
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-6">
          <LeaderboardList data={weeklyLeaderboard} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaderboardPage;
