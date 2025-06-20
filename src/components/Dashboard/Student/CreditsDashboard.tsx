
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Plus, Minus, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CreditsDashboardProps {
  user: any;
}

const CreditsDashboard: React.FC<CreditsDashboardProps> = ({ user }) => {
  const transactions = [
    { id: 1, type: 'earned', amount: 50, description: 'Successful rental completion', date: '2024-01-15' },
    { id: 2, type: 'spent', amount: -30, description: 'Discount on laptop rental', date: '2024-01-12' },
    { id: 3, type: 'earned', amount: 25, description: 'Referral bonus', date: '2024-01-10' }
  ];

  const totalCredits = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Campus Credits</h1>
        <p className="text-gray-600">Earn and redeem credits for discounts</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span>Available Credits</span>
          </CardTitle>
          <CardDescription>Your current credit balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-4xl font-bold text-yellow-600 mb-2">{totalCredits}</div>
            <p className="text-gray-600">Campus Credits</p>
            <Button className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500">
              <Gift className="w-4 h-4 mr-2" />
              Redeem Credits
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your credit earning and spending history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? <Plus className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditsDashboard;
