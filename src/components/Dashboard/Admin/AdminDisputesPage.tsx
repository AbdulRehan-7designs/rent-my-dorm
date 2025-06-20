
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminDisputesPageProps {
  user: any;
}

const AdminDisputesPage: React.FC<AdminDisputesPageProps> = ({ user }) => {
  const disputes = [
    { id: 1, title: 'Item not as described', reporter: 'Rahul Kumar', item: 'MacBook Pro', status: 'open', priority: 'high' },
    { id: 2, title: 'Late return fee dispute', reporter: 'Priya Sharma', item: 'Study Table', status: 'investigating', priority: 'medium' },
    { id: 3, title: 'Damage claim', reporter: 'Amit Patel', item: 'Camera', status: 'resolved', priority: 'low' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dispute Management</h1>
        <p className="text-gray-600">Handle user disputes and conflicts</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Active Disputes</span>
          </CardTitle>
          <CardDescription>Resolve user conflicts and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disputes.map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    dispute.priority === 'high' ? 'bg-red-100 text-red-600' :
                    dispute.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{dispute.title}</p>
                    <p className="text-sm text-gray-600">by {dispute.reporter} • {dispute.item}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={dispute.priority === 'high' ? 'destructive' : 
                                dispute.priority === 'medium' ? 'default' : 'secondary'}>
                    {dispute.priority}
                  </Badge>
                  <Badge variant={dispute.status === 'resolved' ? 'default' : 'secondary'}>
                    {dispute.status}
                  </Badge>
                  {dispute.status !== 'resolved' && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-green-600">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDisputesPage;
