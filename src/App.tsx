
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from './contexts/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import ArtistProfile from "./pages/ArtistProfile";
import Walls from "./pages/Walls";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ArtistDashboard from "./pages/ArtistDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import HowItWorksPage from "./pages/HowItWorksPage";
import Apropos from "./pages/Apropos";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import MyProjects from "./pages/MyProjects";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                {/* Pages publiques */}
                <Route path="/" element={<Index />} />
                <Route path="/artistes" element={<Artists />} />
                <Route path="/artiste/:id" element={<ArtistProfile />} />
                <Route path="/murs" element={<Walls />} />
                <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
                <Route path="/a-propos" element={<Apropos />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* Authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                
                {/* Pages protégées */}
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } />
                <Route path="/mes-projets" element={
                  <ProtectedRoute>
                    <MyProjects />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/artiste" element={
                  <ProtectedRoute requireUserType="artist">
                    <ArtistDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/proprietaire" element={
                  <ProtectedRoute requireUserType="owner">
                    <OwnerDashboard />
                  </ProtectedRoute>
                } />
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
