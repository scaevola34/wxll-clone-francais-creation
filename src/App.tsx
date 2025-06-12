
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Walls from "./pages/Walls";
import Apropos from "./pages/Apropos";
import FAQ from "./pages/FAQ";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFound from "./pages/NotFound";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import OwnerDashboard from "./pages/OwnerDashboard";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/artistes" element={<Artists />} />
            <Route path="/artistes/:id" element={<ArtistProfile />} />
            <Route path="/murs" element={<Walls />} />
            <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            {/* Routes protégées avec type d'utilisateur spécifique */}
            <Route 
              path="/artiste/profil" 
              element={
                <ProtectedRoute requireUserType="artist">
                  <ArtistDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/proprietaire/profil" 
              element={
                <ProtectedRoute requireUserType="owner">
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/artiste" 
              element={
                <ProtectedRoute requireUserType="artist">
                  <ArtistDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/proprietaire" 
              element={
                <ProtectedRoute requireUserType="owner">
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
