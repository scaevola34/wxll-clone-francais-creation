
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalLoader from "./components/GlobalLoader";
import ScrollToTopButton from "./components/ScrollToTopButton";

/* --- pages --- */
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Walls from "./pages/Walls";
import Apropos from "./pages/Apropos";
import FAQ from "./pages/FAQ";
import HowItWorksPage from "./pages/HowItWorksPage";
import NotFound from "./pages/NotFound";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,            // garde les données 1 min en cache
      refetchOnWindowFocus: false,  // pas de refresh automatique quand on revient sur l'onglet
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <TooltipProvider>
        <Toaster />   {/* shadcn toast */}
        <Sonner />    {/* sonner notifications */}
        <BrowserRouter>
          {/* 1. Loader global + bouton top  */}
          <GlobalLoader />
          <ScrollToTopButton />

          {/* 2. Layout principal */}
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />      {/* header */}
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/artistes" element={<Artists />} />
                <Route path="/artistes/:id" element={<ArtistProfile />} />
                <Route path="/murs" element={<Walls />} />
                <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
                <Route path="/a-propos" element={<Apropos />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />

                {/* zones protégées pour artistes */}
                <Route
                  path="/artiste/profil"
                  element={
                    <ProtectedRoute requireUserType="artist">
                      <ArtistDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* zones protégées pour propriétaires */}
                <Route
                  path="/proprietaire/profil"
                  element={
                    <ProtectedRoute requireUserType="owner">
                      <OwnerDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />      {/* footer */}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
