
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Users, Bell, Eye, CheckCircle, XCircle } from 'lucide-react';

interface PendingApprovalsProps {
  onApproval: (itemId: number, action: 'approve' | 'reject') => void;
  onViewDetails: (itemId: number) => void;
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ onApproval, onViewDetails }) => {
  const pendingApprovals = [
    { 
      id: 1, 
      type: 'listing', 
      title: 'MacBook Pro 13" Rental', 
      college: 'IIT Delhi', 
      submittedBy: 'Rahul Kumar', 
      time: '2 hours ago', 
      priority: 'high'
    },
    { 
      id: 2, 
      type: 'vendor', 
      title: 'New Vendor Registration', 
      college: 'NIT Trichy', 
      submittedBy: 'TechRentals Co.', 
      time: '4 hours ago', 
      priority: 'medium'
    },
    { 
      id: 3, 
      type: 'event', 
      title: 'Campus Tech Fair Event', 
      college: 'BITS Pilani', 
      submittedBy: 'Student Union', 
      time: '1 day ago', 
      priority: 'low'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-yellow-500" />
          <span>Pending Approvals</span>
        </CardTitle>
        <CardDescription>Items waiting for your review and approval</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingApprovals.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.priority === 'high' ? 'bg-red-100 text-red-600' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.type === 'listing' ? <Package className="w-5 h-5" /> :
                     item.type === 'vendor' ? <Users className="w-5 h-5" /> :
                     <Bell className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.college} • {item.submittedBy}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
                <Badge variant={item.priority === 'high' ? 'destructive' : 
                              item.priority === 'medium' ? 'default' : 'secondary'}>
                  {item.priority}
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onViewDetails(item.id)}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onApproval(item.id, 'approve')}
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onApproval(item.id, 'reject')}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingApprovals;
