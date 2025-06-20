
import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import VendorOverviewPage from './VendorOverviewPage';
import VendorListingsPage from './VendorListingsPage';
import AddItemPage from '../../AddItemPage';
import VendorCalendarPage from './VendorCalendarPage';
import VendorOrdersPage from './VendorOrdersPage';
import VendorRevenuePage from './VendorRevenuePage';
import VendorReviewsPage from './VendorReviewsPage';
import VendorProfilePage from './VendorProfilePage';

interface VendorDashboardProps {
  user: any;
  onLogout: () => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('listings');

  const renderContent = () => {
    switch (activeTab) {
      case 'listings':
        return <VendorListingsPage user={user} />;
      case 'add-item':
        return <AddItemPage onBack={() => {}} />;
      case 'calendar':
        return <VendorCalendarPage user={user} />;
      case 'orders':
        return <VendorOrdersPage user={user} />;
      case 'revenue':
        return <VendorRevenuePage user={user} />;
      case 'reviews':
        return <VendorReviewsPage user={user} />;
      case 'profile':
        return <VendorProfilePage user={user} />;
      default:
        return <VendorListingsPage user={user} />;
    }
  };

  return (
    <DashboardLayout
      userRole="vendor"
      user={user}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default VendorDashboard;
