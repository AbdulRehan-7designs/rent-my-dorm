
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Package, DollarSign, Shield } from 'lucide-react';

interface AdminStatsProps {
  totalCommissionEarned: number;
  totalVolumeProcessed: number;
  formatCurrency: (amount: number) => string;
}

const AdminStats: React.FC<AdminStatsProps> = ({ 
  totalCommissionEarned, 
  totalVolumeProcessed, 
  formatCurrency 
}) => {
  const adminStats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'text-blue-600', trend: '+156 this month' },
    { label: 'Active Listings', value: '1,234', icon: Package, color: 'text-green-600', trend: '+89 pending' },
    { label: 'Platform Earnings', value: formatCurrency(totalCommissionEarned), icon: DollarSign, color: 'text-purple-600', trend: `${formatCurrency(totalVolumeProcessed)} volume` },
    { label: 'Trust Score', value: '94%', icon: Shield, color: 'text-orange-600', trend: '+2% this week' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {adminStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-blue-600 font-medium">{stat.trend}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
