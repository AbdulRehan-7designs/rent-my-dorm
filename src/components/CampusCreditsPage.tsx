
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  Gift, 
  Award, 
  TrendingUp, 
  Star, 
  ShoppingCart,
  Clock,
  Plus,
  Minus
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface LoyaltyTransaction {
  id: string;
  transaction_type: string;
  amount: number;
  reason: string;
  created_at: string;
}

const CampusCreditsPage = () => {
  const { user, profile } = useAuth();

  // Fetch loyalty transactions
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['loyalty-transactions', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as LoyaltyTransaction[];
    },
    enabled: !!user?.id
  });

  const currentCredits = profile?.campus_credits || 100;

  const rewardOptions = [
    {
      id: 1,
      title: '₹10 Platform Fee Discount',
      cost: 50,
      description: 'Get ₹10 off your next rental fee',
      icon: <Gift className="w-6 h-6" />,
      available: currentCredits >= 50
    },
    {
      id: 2,
      title: 'Featured Listing Boost',
      cost: 100,
      description: 'Make your item listing featured for 7 days',
      icon: <Star className="w-6 h-6" />,
      available: currentCredits >= 100
    },
    {
      id: 3,
      title: '₹25 Platform Fee Discount',
      cost: 150,
      description: 'Get ₹25 off your next rental fee',
      icon: <Gift className="w-6 h-6" />,
      available: currentCredits >= 150
    },
    {
      id: 4,
      title: 'Priority Support',
      cost: 200,
      description: 'Get priority customer support for 30 days',
      icon: <Award className="w-6 h-6" />,
      available: currentCredits >= 200
    }
  ];

  const earningOpportunities = [
    {
      action: 'Complete a rental',
      credits: 10,
      description: 'Successfully rent or lend an item'
    },
    {
      action: 'Write a review',
      credits: 5,
      description: 'Leave a detailed review after rental'
    },
    {
      action: 'Refer a friend',
      credits: 25,
      description: 'Invite friends to join RentMyDorm'
    },
    {
      action: 'Verify identity',
      credits: 20,
      description: 'Complete phone/ID verification'
    },
    {
      action: 'First listing',
      credits: 15,
      description: 'List your first item for rent'
    }
  ];

  const getTransactionIcon = (type: string) => {
    return type === 'earned' ? (
      <Plus className="w-4 h-4 text-green-500" />
    ) : (
      <Minus className="w-4 h-4 text-red-500" />
    );
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading your Campus Credits...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Campus Credits</h1>
        <p className="text-gray-600">Earn, redeem, and grow your campus community impact</p>
      </div>

      {/* Current Balance Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-12 h-12 mr-3" />
            <div>
              <p className="text-4xl font-bold">{currentCredits}</p>
              <p className="text-lg opacity-90">Campus Credits</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-2xl font-bold">{transactions.filter(t => t.transaction_type === 'earned').length}</p>
              <p className="text-sm opacity-90">Earned</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{transactions.filter(t => t.transaction_type === 'redeemed').length}</p>
              <p className="text-sm opacity-90">Redeemed</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{profile?.successful_rentals || 0}</p>
              <p className="text-sm opacity-90">Rentals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rewards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rewards">Redeem Rewards</TabsTrigger>
          <TabsTrigger value="earn">Earn Credits</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {rewardOptions.map((reward) => (
              <Card key={reward.id} className={`${reward.available ? 'hover:shadow-md' : 'opacity-60'} transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      {reward.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{reward.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-800">
                          <Coins className="w-3 h-3 mr-1" />
                          {reward.cost} Credits
                        </Badge>
                        <Button
                          size="sm"
                          disabled={!reward.available}
                          className={reward.available ? 'bg-purple-600 hover:bg-purple-700' : ''}
                        >
                          {reward.available ? 'Redeem' : 'Insufficient Credits'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Ways to Earn Campus Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earningOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{opportunity.action}</h4>
                      <p className="text-gray-600 text-sm">{opportunity.description}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      +{opportunity.credits} Credits
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 mx-auto text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bonus Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Complete your profile verification to unlock bonus credit earning opportunities!
              </p>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                Complete Verification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <Coins className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No transactions yet</h3>
                  <p className="text-gray-500">Start earning credits by completing rentals!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.transaction_type)}
                        <div>
                          <p className="font-medium text-gray-900">{transaction.reason}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.transaction_type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.transaction_type === 'earned' ? '+' : '-'}{transaction.amount}
                        </p>
                        <p className="text-xs text-gray-500">Credits</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampusCreditsPage;
