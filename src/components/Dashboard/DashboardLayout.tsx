
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface DashboardLayoutProps {
  userRole: 'student' | 'vendor' | 'admin';
  user: any;
  onLogout: () => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole,
  user,
  onLogout,
  children
}) => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          userRole={userRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          user={user}
          onLogout={onLogout}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <TopNavbar
          user={user}
          userRole={userRole}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
