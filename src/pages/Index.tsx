import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import LandingHero from '@/components/LandingHero';
import AuthModal from '@/components/AuthModal';
import StudentDashboard from '@/components/StudentDashboard';
import VendorDashboard from '@/components/VendorDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import ItemListing from '@/components/ItemListing';
import ChatInterface from '@/components/ChatInterface';
import Navigation from '@/components/Navigation';
import AIObjectRecognition from '@/components/AIObjectRecognition';
import AIRecommendations from '@/components/AIRecommendations';
import ProfilePage from '@/components/ProfilePage';
import SettingsPage from '@/components/SettingsPage';
import MyRentalsPage from '@/components/MyRentalsPage';
import LeaderboardPage from '@/components/LeaderboardPage';
import ContactPage from '@/components/ContactPage';
import LikedItemsPage from '@/components/LikedItemsPage';
import AddItemPage from '@/components/AddItemPage';
import ActiveRentalsPage from '@/components/ActiveRentalsPage';
import VendorAnalyticsPage from '@/components/VendorAnalyticsPage';
import VendorOrdersPage from '@/components/VendorOrdersPage';
import AdminApprovalsPage from '@/components/AdminApprovalsPage';
import AdminAnnouncementsPage from '@/components/AdminAnnouncementsPage';
import RentalConfirmation from '@/components/RentalConfirmation';
import TransactionCompletion from '@/components/TransactionCompletion';
import SecurityDashboard from '@/components/Security/SecurityDashboard';

// Extend the Window interface to include setCurrentView
declare global {
  interface Window {
    setCurrentView?: (view: string) => void;
  }
}

const Index = ({ currentUser: propCurrentUser, onLogin: propOnLogin }) => {
  const [currentUser, setCurrentUser] = useState(propCurrentUser);
  const [currentView, setCurrentView] = useState(propCurrentUser ? 
    (propCurrentUser.role === 'student' ? 'student-dashboard' : 
     propCurrentUser.role === 'vendor' ? 'vendor-dashboard' : 'admin-dashboard') 
    : 'landing');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [demoTransactionId, setDemoTransactionId] = useState<string | null>(null);

  // Make setCurrentView available globally for dashboard navigation
  useEffect(() => {
    window.setCurrentView = setCurrentView;
    return () => {
      if (window.setCurrentView) {
        delete window.setCurrentView;
      }
    };
  }, []);

  // Update user when prop changes
  useEffect(() => {
    if (propCurrentUser) {
      setCurrentUser(propCurrentUser);
      if (propCurrentUser.role === 'student') {
        setCurrentView('student-dashboard');
      } else if (propCurrentUser.role === 'vendor') {
        setCurrentView('vendor-dashboard');
      } else if (propCurrentUser.role === 'admin') {
        setCurrentView('admin-dashboard');
      }
    }
  }, [propCurrentUser]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    if (propOnLogin) {
      propOnLogin(userData);
    }
    if (userData.role === 'student') {
      setCurrentView('student-dashboard');
    } else if (userData.role === 'vendor') {
      setCurrentView('vendor-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentView('admin-dashboard');
    }
    toast({
      title: "Welcome to RentMyDorm! 🎉",
      description: `Successfully logged in as ${userData.role}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
    setDemoTransactionId(null);
    toast({
      title: "Logged out successfully",
      description: "See you soon! 👋",
    });
  };

  // Demo data for rental confirmation
  const demoRentalItem = {
    id: 'demo-item-1',
    title: 'MacBook Pro 13-inch M2',
    price: 1500,
    priceType: 'day',
    vendor: {
      id: 'vendor-1',
      name: 'TechRentals Co.',
      rating: 4.8
    },
    duration: 3,
    location: 'IIT Delhi Campus',
    image: '/placeholder.svg'
  };

  const demoRenterDetails = {
    id: 'user-1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    rentalHistory: {
      completedRentals: 12, // This makes them a loyalty user
      totalTransactions: 15,
      trustScore: 850
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingHero onLogin={handleLogin} />;
      case 'student-dashboard':
        return <StudentDashboard user={currentUser} onLogout={handleLogout} onNavigate={setCurrentView} />;
      case 'vendor-dashboard':
        return <VendorDashboard user={currentUser} onLogout={handleLogout} onNavigate={setCurrentView} />;
      case 'admin-dashboard':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} onNavigate={setCurrentView} />;
      case 'browse-items':
        return <ItemListing onBack={() => setCurrentView('student-dashboard')} />;
      case 'chat':
        return <ChatInterface onBack={() => setCurrentView('student-dashboard')} />;
      case 'ai-object-recognition':
        return <AIObjectRecognition onBack={() => setCurrentView('student-dashboard')} />;
      case 'ai-recommendations':
        return <AIRecommendations onBack={() => setCurrentView('student-dashboard')} user={currentUser} />;
      case 'profile':
        return <ProfilePage user={currentUser} onBack={() => setCurrentView('student-dashboard')} />;
      case 'settings':
        return <SettingsPage onBack={() => setCurrentView('student-dashboard')} />;
      case 'my-rentals':
        return <MyRentalsPage onBack={() => setCurrentView('student-dashboard')} />;
      case 'leaderboard':
        return <LeaderboardPage user={currentUser} onBack={() => setCurrentView('student-dashboard')} />;
      
      // Contact and messaging pages
      case 'contact':
        return <ContactPage onBack={() => setCurrentView('browse-items')} itemOwner={currentUser} item={null} />;
      case 'liked-items':
        return <LikedItemsPage onBack={() => setCurrentView('student-dashboard')} />;
      case 'add-item':
        return <AddItemPage onBack={() => setCurrentView('student-dashboard')} />;
      case 'active-rentals':
        return <ActiveRentalsPage onBack={() => setCurrentView('student-dashboard')} />;
      
      // Vendor pages
      case 'vendor-analytics':
        return <VendorAnalyticsPage onBack={() => setCurrentView('vendor-dashboard')} />;
      case 'vendor-orders':
        return <VendorOrdersPage onBack={() => setCurrentView('vendor-dashboard')} />;
      
      // Admin pages
      case 'admin-approvals':
        return <AdminApprovalsPage onBack={() => setCurrentView('admin-dashboard')} />;
      case 'admin-announcements':
        return <AdminAnnouncementsPage onBack={() => setCurrentView('admin-dashboard')} />;
      
      // Transaction fee system demo pages
      case 'demo-rental-confirmation':
        return (
          <RentalConfirmation
            item={demoRentalItem}
            renter={demoRenterDetails}
            onConfirm={(transactionId) => {
              setDemoTransactionId(transactionId);
              setCurrentView('demo-transaction-completion');
            }}
            onCancel={() => setCurrentView('student-dashboard')}
          />
        );
      case 'demo-transaction-completion':
        return demoTransactionId ? (
          <TransactionCompletion
            transactionId={demoTransactionId}
            onComplete={() => {
              setCurrentView('student-dashboard');
              setDemoTransactionId(null);
            }}
          />
        ) : (
          <div className="p-8 text-center">
            <p>No transaction found</p>
            <Button onClick={() => setCurrentView('student-dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        );
      
      // Add new security dashboard case
      case 'security-dashboard':
        return <SecurityDashboard onBack={() => setCurrentView('student-dashboard')} />;
      
      default:
        return <LandingHero onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {currentUser && (
        <Navigation 
          user={currentUser} 
          onLogout={handleLogout}
          onNavigate={setCurrentView}
          currentView={currentView}
        />
      )}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
