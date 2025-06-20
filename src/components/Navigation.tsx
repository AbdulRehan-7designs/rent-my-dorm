
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StudentDashboard from './StudentDashboard';
import VendorDashboard from './VendorDashboard';
import AdminDashboard from './AdminDashboard';
import AddItemPage from './AddItemPage';
import BrowseItemsPage from '../pages/BrowseItemsPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import ActiveRentalsPage from './ActiveRentalsPage';
import VendorAnalyticsPage from './VendorAnalyticsPage';
import VendorOrdersPage from './VendorOrdersPage';
import ChatInterface from './ChatInterface';
import AdminApprovalsPage from './AdminApprovalsPage';
import AdminAnnouncementsPage from './AdminAnnouncementsPage';
import CollegeManagementPage from './CollegeManagementPage';
import VendorApplicationsPage from './VendorApplicationsPage';
import CampusCreditsPage from './CampusCreditsPage';
import CampusPulsePage from './CampusPulsePage';
import LeaderboardPage from './LeaderboardPage';
import SquadUpPage from './SquadUpPage';
import MyRentalsPage from './MyRentalsPage';
import LikedItemsPage from './LikedItemsPage';
import SustainabilityPage from './SustainabilityPage';
import ContactPage from './ContactPage';
import SecurityDashboard from './Security/SecurityDashboard';
import AIRecommendations from './AIRecommendations';
import PaymentPage from './PaymentPage';
import AnnouncementPopup from './AnnouncementPopup';

const Navigation = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        if (user?.role === 'admin') {
          return <AdminDashboard user={user} onLogout={onLogout} onNavigate={handleNavigate} />;
        } else if (user?.role === 'vendor') {
          return <VendorDashboard user={user} onLogout={onLogout} onNavigate={handleNavigate} />;
        }
        return <StudentDashboard user={user} onLogout={onLogout} onNavigate={handleNavigate} />;
      
      case 'add-item':
        return <AddItemPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'browse-items':
        return <BrowseItemsPage />;
      
      case 'ai-recommendations':
        return <AIRecommendations onBack={() => handleNavigate('dashboard')} user={user} />;
      
      case 'profile':
        return <ProfilePage onBack={() => handleNavigate('dashboard')} />;
      
      case 'settings':
        return <SettingsPage />;
      
      case 'active-rentals':
        return <ActiveRentalsPage user={user} onBack={() => handleNavigate('dashboard')} />;
      
      case 'vendor-analytics':
        return <VendorAnalyticsPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'vendor-orders':
        return <VendorOrdersPage />;
      
      case 'chat':
        return <ChatInterface onBack={() => handleNavigate('dashboard')} />;
      
      case 'admin-approvals':
        return <AdminApprovalsPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'admin-announcements':
        return <AdminAnnouncementsPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'college-management':
        return <CollegeManagementPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'vendor-applications':
        return <VendorApplicationsPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'campus-credits':
        return <CampusCreditsPage user={user} onBack={() => handleNavigate('dashboard')} />;
      
      case 'campus-pulse':
        return <CampusPulsePage onBack={() => handleNavigate('dashboard')} />;
      
      case 'leaderboard':
        return <LeaderboardPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'squad-up':
        return <SquadUpPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'my-rentals':
        return <MyRentalsPage user={user} onBack={() => handleNavigate('dashboard')} />;
      
      case 'liked-items':
        return <LikedItemsPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'sustainability':
        return <SustainabilityPage />;
      
      case 'contact':
        return <ContactPage onBack={() => handleNavigate('dashboard')} itemOwner={null} item={null} />;
      
      case 'security':
        return <SecurityDashboard onBack={() => handleNavigate('dashboard')} />;
      
      case 'payment':
        return <PaymentPage onBack={() => handleNavigate('dashboard')} />;
      
      default:
        return <StudentDashboard user={user} onLogout={onLogout} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showAnnouncement && (
        <AnnouncementPopup onClose={() => setShowAnnouncement(false)} />
      )}
      {renderContent()}
    </div>
  );
};

export default Navigation;
