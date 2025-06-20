
import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import StudentHomePage from './StudentHomePage';
import BrowseItemsPage from './BrowseItemsPage';
import StudentRentalsPage from './StudentRentalsPage';
import WishlistPage from './WishlistPage';
import MessagesPage from './MessagesPage';
import CreditsDashboard from './CreditsDashboard';
import StudentProfilePage from './StudentProfilePage';

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <StudentHomePage />;
      case 'browse':
        return <BrowseItemsPage />;
      case 'my-rentals':
        return <StudentRentalsPage user={user} />;
      case 'wishlist':
        return <WishlistPage user={user} />;
      case 'messages':
        return <MessagesPage user={user} />;
      case 'credits':
        return <CreditsDashboard user={user} />;
      case 'profile':
        return <StudentProfilePage user={user} />;
      default:
        return <StudentHomePage />;
    }
  };

  return (
    <DashboardLayout
      userRole="student"
      user={user}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default StudentDashboard;
