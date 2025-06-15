
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import BrowseItemsPage from "./pages/BrowseItemsPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import CommunityWishlist from "./components/CommunityWishlist";
import SquadUpPage from "./components/SquadUpPage";
import CampusPulsePage from "./components/CampusPulsePage";
import CampusCreditsPage from "./components/CampusCreditsPage";
import SustainabilityPage from "./components/SustainabilityPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Index />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={() => {}} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignupPage onLogin={() => {}} />} />
        <Route path="/browse" element={<BrowseItemsPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/community-wishlist" 
          element={
            <ProtectedRoute>
              <CommunityWishlist />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/squad-up" 
          element={
            <ProtectedRoute>
              <SquadUpPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/campus-pulse" 
          element={
            <ProtectedRoute>
              <CampusPulsePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/campus-credits" 
          element={
            <ProtectedRoute>
              <CampusCreditsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sustainability" 
          element={
            <ProtectedRoute>
              <SustainabilityPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
