
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Artists from "./pages/Artists";
import Walls from "./pages/Walls";
import HowItWorks from "./components/HowItWorks";
import NotFound from "./pages/NotFound";
import ArtistProfile from "./pages/ArtistProfile";
import ArtistDashboard from "./pages/ArtistDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artistes" element={<Artists />} />
          <Route path="/artistes/:id" element={<ArtistProfile />} />
          <Route path="/murs" element={<Walls />} />
          <Route path="/comment-ca-marche" element={<HowItWorks />} />
          <Route path="/a-propos" element={<NotFound />} />
          <Route path="/artiste/profil" element={<ArtistDashboard />} />
          <Route path="/proprietaire/profil" element={<OwnerDashboard />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
