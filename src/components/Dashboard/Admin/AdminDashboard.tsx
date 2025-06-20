
import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import AdminOverviewPage from './AdminOverviewPage';
import AdminUsersPage from './AdminUsersPage';
import AdminListingsPage from './AdminListingsPage';
import AdminReportsPage from './AdminReportsPage';
import AdminDisputesPage from './AdminDisputesPage';
import AdminAnnouncementsPage from './AdminAnnouncementsPage';
import AdminCollegesPage from './AdminCollegesPage';
import AdminSettingsPage from './AdminSettingsPage';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewPage user={user} />;
      case 'users':
        return <AdminUsersPage user={user} />;
      case 'listings':
        return <AdminListingsPage user={user} />;
      case 'reports':
        return <AdminReportsPage user={user} />;
      case 'disputes':
        return <AdminDisputesPage user={user} />;
      case 'announcements':
        return <AdminAnnouncementsPage user={user} />;
      case 'colleges':
        return <AdminCollegesPage user={user} />;
      case 'settings':
        return <AdminSettingsPage user={user} />;
      default:
        return <AdminOverviewPage user={user} />;
    }
  };

  return (
    <DashboardLayout
      userRole="admin"
      user={user}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
