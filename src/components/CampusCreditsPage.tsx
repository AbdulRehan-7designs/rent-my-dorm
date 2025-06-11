
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Gift, 
  TrendingUp, 
  Star, 
  Users, 
  BookOpen,
  Coffee,
  ShoppingBag,
  Target
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LoyaltyTransaction {
  id: string;
  transaction_type: 'earned' | 'redeemed';
  amount: number;
  reason: string;
  created_at: string;
}

const CampusCreditsPage = () => {
  const { profile } = useAuth();

  // Mock data since we're using temporary mock data until types are updated
  const campusCredits = profile?.karma_score || 250;
  const totalEarned = 500;
  const totalRedeemed = 250;

  const mockTransactions: LoyaltyTransaction[] = [
    {
      id: '1',
      transaction_type: 'earned',
      amount: 50,
      reason: 'Completed rental - MacBook Pro',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      transaction_type: 'earned',
      amount: 25,
      reason: 'First-time renter bonus',
      created_at: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      transaction_type: 'redeemed',
      amount: -100,
      reason: 'Campus Store Voucher',
      created_at: '2024-01-13T09:15:00Z'
    }
  ];

  const rewards = [
    {
      id: '1',
      title: 'Campus Store Voucher',
      description: '₹200 voucher for college bookstore',
      cost: 200,
      icon: <BookOpen className="w-6 h-6" />,
      available: true
    },
    {
      id: '2',
      title: 'Coffee Shop Credit',
      description: '₹150 credit at campus coffee shop',
      cost: 150,
      icon: <Coffee className="w-6 h-6" />,
      available: true
    },
    {
      id: '3',
      title: 'Free Premium Listing',
      description: 'Boost your item listing for 7 days',
      cost: 100,
      icon: <TrendingUp className="w-6 h-6" />,
      available: true
    },
    {
      id: '4',
      title: 'Campus Merch',
      description: 'Exclusive RentMyDorm t-shirt',
      cost: 300,
      icon: <ShoppingBag className="w-6 h-6" />,
      available: campusCredits >= 300
    }
  ];

  const challenges = [
    {
      id: '1',
      title: 'First Week Challenge',
      description: 'Complete 3 rentals in your first week',
      reward: 100,
      progress: 67,
      completed: false
    },
    {
      id: '2',
      title: 'Social Butterfly',
      description: 'Refer 5 friends to RentMyDorm',
      reward: 200,
      progress: 40,
      completed: false
    },
    {
      id: '3',
      title: 'Eco Warrior',
      description: 'Save 10kg CO2 through rentals',
      reward: 150,
      progress: 80,
      completed: false
    }
  ];

  const successfulRentals = profile?.karma_score ? Math.floor(profile.karma_score / 10) : 8;
  const nextTierCredits = 500;
  const progressToNextTier = (campusCredits / nextTierCredits) * 100;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Campus Credits</h1>
        <p className="text-gray-600">Earn rewards for being an awesome community member!</p>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Award className="w-10 h-10 mx-auto mb-3" />
            <p className="text-3xl font-bold">{campusCredits}</p>
            <p className="text-sm opacity-90">Available Credits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-500" />
            <p className="text-3xl font-bold text-gray-900">{totalEarned}</p>
            <p className="text-sm text-gray-600">Total Earned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Gift className="w-10 h-10 mx-auto mb-3 text-purple-500" />
            <p className="text-3xl font-bold text-gray-900">{totalRedeemed}</p>
            <p className="text-sm text-gray-600">Total Redeemed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
            <p className="text-3xl font-bold text-gray-900">{successfulRentals}</p>
            <p className="text-sm text-gray-600">Successful Rentals</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Tier */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Progress to Gold Tier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Current: Silver Member</span>
              <span>{campusCredits}/{nextTierCredits} credits</span>
            </div>
            <Progress value={progressToNextTier} className="h-3" />
            <p className="text-gray-600 text-sm">
              Reach {nextTierCredits} credits to unlock Gold tier benefits: 2x earning rate and exclusive rewards!
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Available Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${reward.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                      {reward.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{reward.title}</h4>
                      <p className="text-gray-600 text-sm">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-blue-600">{reward.cost}</p>
                    <Button 
                      size="sm" 
                      disabled={!reward.available}
                      className="mt-2"
                    >
                      {reward.available ? 'Redeem' : 'Locked'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                    <Badge className="bg-green-100 text-green-800">+{challenge.reward}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.transaction_type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.transaction_type === 'earned' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.reason}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`font-bold ${
                  transaction.transaction_type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.transaction_type === 'earned' ? '+' : ''}{transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusCreditsPage;
