
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import BrowseItemsPage from "./pages/BrowseItemsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./components/Dashboard/Student/StudentDashboard";
import VendorDashboard from "./components/Dashboard/Vendor/VendorDashboard";
import AdminDashboard from "./components/Dashboard/Admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  // Mock user data for demonstration
  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student", // Change to "vendor" or "admin" to test different dashboards
    college: "IIT Delhi"
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Handle logout logic here
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/browse" element={<BrowseItemsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* New Dashboard Routes */}
            <Route 
              path="/student-dashboard" 
              element={<StudentDashboard user={mockUser} onLogout={handleLogout} />} 
            />
            <Route 
              path="/vendor-dashboard" 
              element={<VendorDashboard user={{...mockUser, role: "vendor"}} onLogout={handleLogout} />} 
            />
            <Route 
              path="/admin-dashboard" 
              element={<AdminDashboard user={{...mockUser, role: "admin"}} onLogout={handleLogout} />} 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
