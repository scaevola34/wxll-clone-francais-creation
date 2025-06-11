import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

// Pages existantes
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Walls from "./pages/Walls";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFound from "./pages/NotFound";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import VerifyEmail from "./pages/VerifyEmail";

// ✅ Nouvelles pages à créer dans /src/pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Accueil + navigation principale */}
            <Route path="/" element={<Index />} />
            <Route path="/artistes" element={<Artists />} />
            <Route path="/artistes/:id" element={<ArtistProfile />} />
            <Route path="/murs" element={<Walls />} />
            <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
            <Route path="/a-propos" element={<NotFound />} />

            {/* Dashboards */}
            <Route path="/artiste/profil" element={<ArtistDashboard />} />
            <Route path="/proprietaire/profil" element={<OwnerDashboard />} />

            {/* Auth / Email */}
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;

