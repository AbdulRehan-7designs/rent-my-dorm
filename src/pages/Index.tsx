
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

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Make setCurrentView available globally for dashboard navigation
  useEffect(() => {
    window.setCurrentView = setCurrentView;
    return () => {
      delete window.setCurrentView;
    };
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
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
    toast({
      title: "Logged out successfully",
      description: "See you soon! 👋",
    });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingHero onLogin={handleLogin} />;
      case 'student-dashboard':
        return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
      case 'vendor-dashboard':
        return <VendorDashboard user={currentUser} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
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
