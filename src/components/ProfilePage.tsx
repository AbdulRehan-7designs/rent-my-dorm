
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Star, 
  Award, 
  Edit3, 
  Camera, 
  MapPin, 
  Mail, 
  Phone,
  GraduationCap,
  Calendar,
  Trophy,
  Target,
  ArrowLeft
} from 'lucide-react';

const ProfilePage = ({ user, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@college.edu',
    phone: '+91 9876543210',
    college: 'IIT Delhi',
    branch: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate about technology and sustainability. Love sharing resources with fellow students!'
  });

  const achievements = [
    { title: 'Early Adopter', description: 'One of the first 100 users', icon: Trophy, color: 'text-yellow-600' },
    { title: 'Trusted Lender', description: '50+ successful lends', icon: Star, color: 'text-blue-600' },
    { title: 'Green Champion', description: 'Saved 100kg CO2 through sharing', icon: Target, color: 'text-green-600' },
    { title: 'Community Builder', description: 'Referred 10+ friends', icon: Award, color: 'text-purple-600' }
  ];

  const stats = [
    { label: 'Items Rented', value: '24', icon: Calendar },
    { label: 'Items Lent', value: '18', icon: GraduationCap },
    { label: 'Rating', value: '4.9', icon: Star },
    { label: 'Level', value: user?.level || '12', icon: Trophy }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
      </div>

      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl">
                    {profileData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.college} • {profileData.branch}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    Level {user?.level || '12'}
                  </Badge>
                  <span className="text-orange-600 font-semibold">{user?.points || '2,450'} pts</span>
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-orange-500" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profileData.name} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={profileData.email} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={profileData.phone} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input 
                id="bio" 
                value={profileData.bio} 
                disabled={!isEditing}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-orange-500" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
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
      </div>
    </div>
  );
};

export default ProfilePage;
