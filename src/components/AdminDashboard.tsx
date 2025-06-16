
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, TrendingUp, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { escrowService } from '@/utils/escrowManager';
import { formatCurrency } from '@/utils/feeCalculation';
import AdminStats from './Admin/AdminStats';
import QuickActions from './Admin/QuickActions';
import PendingApprovals from './Admin/PendingApprovals';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const AdminDashboard = ({ user, onLogout, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  // Calculate platform earnings from escrow transactions
  const allTransactions = escrowService.getAllTransactions();
  const completedTransactions = allTransactions.filter(t => t.status === 'released');
  const totalCommissionEarned = completedTransactions.reduce((sum, t) => sum + t.commissionFee, 0);
  const totalVolumeProcessed = completedTransactions.reduce((sum, t) => sum + t.totalAmount, 0);

  const handleApproval = (itemId: number, action: 'approve' | 'reject') => {
    if (action === 'approve') {
      toast({
        title: "✅ Approved Successfully",
        description: `Item has been approved and is now live`,
      });
    } else {
      toast({
        title: "❌ Rejected",
        description: `Item has been rejected. Notification sent to submitter.`,
        variant: "destructive"
      });
    }
  };

  const viewDetails = (itemId: number) => {
    toast({
      title: "📋 Viewing Details",
      description: `Opening detailed view for item`,
    });
  };

  const recentActivity = [
    { action: 'Approved', item: 'Engineering Books Set listing', college: 'IIT Bombay', time: '30 min ago', type: 'success', earnings: '₹45' },
    { action: 'Rejected', item: 'Unauthorized vendor application', college: 'VIT Vellore', time: '1 hour ago', type: 'error', earnings: '₹0' },
    { action: 'Completed', item: 'Laptop rental transaction', college: 'BITS Pilani', time: '2 hours ago', type: 'info', earnings: '₹75' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Control Center 🛡️
            </h1>
            <p className="text-gray-600 mt-2">Manage colleges, approve listings, and oversee the RentMyDorm ecosystem</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2">
              Super Admin
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications (7)
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <AdminStats 
        totalCommissionEarned={totalCommissionEarned}
        totalVolumeProcessed={totalVolumeProcessed}
        formatCurrency={formatCurrency}
      />

      <QuickActions onNavigate={onNavigate} />

      <div className="grid lg:grid-cols-2 gap-6">
        <PendingApprovals 
          onApproval={handleApproval}
          onViewDetails={viewDetails}
        />

        {/* Recent Activity with Earnings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Recent Activity & Earnings</span>
            </CardTitle>
            <CardDescription>Latest administrative actions and platform earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-green-100 text-green-600' :
                      activity.type === 'error' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'success' ? <CheckCircle className="w-5 h-5" /> :
                       activity.type === 'error' ? <XCircle className="w-5 h-5" /> :
                       <DollarSign className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        <span className={`${
                          activity.type === 'success' ? 'text-green-600' :
                          activity.type === 'error' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          {activity.action}
                        </span> {activity.item}
                      </p>
                      <p className="text-sm text-gray-600">{activity.college}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{activity.earnings}</p>
                    <p className="text-xs text-gray-500">commission</p>
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

export default AdminDashboard;
