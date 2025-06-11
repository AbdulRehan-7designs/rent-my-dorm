
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, Recycle, TreePine, DollarSign, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SustainabilityData {
  co2_saved: number;
  waste_reduced: number;
  money_saved: number;
}

const SustainabilityPage = () => {
  const { profile } = useAuth();

  // Mock sustainability data
  const sustainabilityData: SustainabilityData = {
    co2_saved: 12.5,
    waste_reduced: 8.2,
    money_saved: 3500
  };

  const sustainabilityScore = profile?.karma_score || 85;
  const totalRentals = profile?.karma_score ? Math.floor(profile.karma_score / 10) : 12;

  const achievements = [
    {
      title: 'Eco Warrior',
      description: 'Saved 10kg of CO2',
      icon: <Leaf className="w-6 h-6" />,
      achieved: sustainabilityData.co2_saved >= 10,
      progress: Math.min((sustainabilityData.co2_saved / 10) * 100, 100)
    },
    {
      title: 'Waste Reducer',
      description: 'Prevented 5kg of waste',
      icon: <Recycle className="w-6 h-6" />,
      achieved: sustainabilityData.waste_reduced >= 5,
      progress: Math.min((sustainabilityData.waste_reduced / 5) * 100, 100)
    },
    {
      title: 'Money Saver',
      description: 'Saved ₹1000 through sharing',
      icon: <DollarSign className="w-6 h-6" />,
      achieved: sustainabilityData.money_saved >= 1000,
      progress: Math.min((sustainabilityData.money_saved / 1000) * 100, 100)
    },
    {
      title: 'Green Champion',
      description: 'Reach 100 sustainability score',
      icon: <Award className="w-6 h-6" />,
      achieved: sustainabilityScore >= 100,
      progress: Math.min((sustainabilityScore / 100) * 100, 100)
    }
  ];

  const tips = [
    {
      title: 'Rent Instead of Buy',
      description: 'For items you use occasionally, renting reduces manufacturing demand',
      impact: 'Saves 2-5kg CO2 per item'
    },
    {
      title: 'Share Textbooks',
      description: 'Digital sharing and rental of academic materials',
      impact: 'Prevents 0.5kg waste per book'
    },
    {
      title: 'Group Rentals',
      description: 'Use Squad Up feature for expensive electronics',
      impact: 'Maximizes utilization efficiency'
    },
    {
      title: 'Local Campus Trading',
      description: 'Keep items within campus to reduce transport emissions',
      impact: 'Reduces transport CO2 by 80%'
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Sustainability Impact</h1>
        <p className="text-gray-600">See how your rental choices help the planet</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6 text-center">
            <Leaf className="w-10 h-10 mx-auto mb-3" />
            <p className="text-3xl font-bold">{sustainabilityData.co2_saved.toFixed(1)}</p>
            <p className="text-sm opacity-90">kg CO2 Saved</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
          <CardContent className="p-6 text-center">
            <Recycle className="w-10 h-10 mx-auto mb-3" />
            <p className="text-3xl font-bold">{sustainabilityData.waste_reduced.toFixed(1)}</p>
            <p className="text-sm opacity-90">kg Waste Prevented</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-10 h-10 mx-auto mb-3" />
            <p className="text-3xl font-bold">₹{sustainabilityData.money_saved.toFixed(0)}</p>
            <p className="text-sm opacity-90">Money Saved</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
          <CardContent className="p-6 text-center">
            <TreePine className="w-10 h-10 mx-auto mb-3" />
            <p className="text-3xl font-bold">{sustainabilityScore}</p>
            <p className="text-sm opacity-90">Sustainability Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Sustainability Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-3 rounded-lg ${achievement.achieved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    {achievement.achieved && (
                      <Badge className="bg-green-100 text-green-800">Achieved!</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.achieved ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{achievement.progress.toFixed(0)}% Complete</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Maximize Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, index) => (
              <div key={index} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{tip.description}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {tip.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campus Comparison */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-center">Campus Impact Comparison</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-bold text-green-600">{totalRentals}</p>
              <p className="text-sm text-gray-600">Your Rentals</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">Top 25%</p>
              <p className="text-sm text-gray-600">Campus Ranking</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">5.2kg</p>
              <p className="text-sm text-gray-600">Campus Average CO2</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded-lg">
            <p className="text-gray-700">
              🌱 Your impact is <span className="font-bold text-green-600">2.3x above</span> the campus average! 
              Keep up the great work in building a sustainable community.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SustainabilityPage;
