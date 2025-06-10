
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MapPin, Palette, Shield } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import WallCard from '@/components/WallCard';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCard from '@/components/TestimonialCard';
import StatsSection from '@/components/StatsSection';
import AuthModal from '@/components/AuthModal';
import ArtistCarousel from '@/components/ArtistCarousel';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('register');
  const [userType, setUserType] = useState<'artist' | 'owner' | null>(null);

  // Enhanced data for artists with additional fields
  const featuredArtists = [
    {
      id: "1",
      name: "Sophie Durand",
      style: "Graffiti Abstrait",
      location: "Paris",
      imageUrl: "https://images.unsplash.com/photo-1607000975631-8bdfb8aaa279?q=80&w=1974&auto=format&fit=crop",
      rating: 5,
      specialties: ["Murals", "Street Art"],
      projectsCount: 24
    },
    {
      id: "2",
      name: "Marc Lefèvre",
      style: "Muralisme",
      location: "Lyon",
      imageUrl: "https://images.unsplash.com/photo-1574014629736-e5efc9b7732e?q=80&w=1964&auto=format&fit=crop",
      rating: 4,
      specialties: ["Trompe-l'œil", "Fresque"],
      projectsCount: 18
    },
    {
      id: "3",
      name: "Emma Bernard",
      style: "Street Art Figuratif",
      location: "Marseille",
      imageUrl: "https://images.unsplash.com/photo-1623944887776-2f6e8acb83f3?q=80&w=1964&auto=format&fit=crop",
      rating: 5,
      specialties: ["Portrait", "Urban Art"],
      projectsCount: 32
    },
    {
      id: "4",
      name: "Thomas Martin",
      style: "Calligraffiti",
      location: "Bordeaux",
      imageUrl: "https://images.unsplash.com/photo-1584837140804-599ddb86a9f3?q=80&w=1964&auto=format&fit=crop",
      rating: 4,
      specialties: ["Typography", "Lettering"],
      projectsCount: 15
    },
    {
      id: "5",
      name: "Julie Moreau",
      style: "Pop Art Urbain",
      location: "Nantes",
      imageUrl: "https://images.unsplash.com/photo-1581368135153-a506cf13531c?q=80&w=1964&auto=format&fit=crop",
      rating: 5,
      specialties: ["Collage", "Street Art"],
      projectsCount: 28
    }
  ];

  // Sample data for walls
  const featuredWalls = [
    {
      id: "1",
      title: "Mur d'expression urbaine",
      location: "Paris, 11ème",
      size: "8m x 4m",
      imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
      budget: "2000€ - 3500€"
    },
    {
      id: "2",
      title: "Façade commerciale",
      location: "Lyon, Centre",
      size: "12m x 5m",
      imageUrl: "https://images.unsplash.com/photo-1566159266269-2ecbc9a5d4c6?q=80&w=1963&auto=format&fit=crop",
      budget: "4000€ - 6000€"
    },
    {
      id: "3",
      title: "Mur intérieur d'entreprise",
      location: "Bordeaux",
      size: "6m x 3m",
      imageUrl: "https://images.unsplash.com/photo-1508930572500-16235d0a1e4c?q=80&w=1968&auto=format&fit=crop",
      budget: "1500€ - 2500€"
    }
  ];

  // Sample testimonials
  const testimonials = [
    {
      name: "Thomas Moreau",
      role: "Propriétaire de mur",
      quote: "WXLLSPACE m'a permis de transformer la façade de mon commerce en une véritable œuvre d'art. Le processus était simple et le résultat est spectaculaire!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop"
    },
    {
      name: "Julie Lambert",
      role: "Artiste street art",
      quote: "Grâce à WXLLSPACE, j'ai pu trouver des projets intéressants et développer ma visibilité. Un outil essentiel pour les artistes urbains!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    },
    {
      name: "Nicolas Petit",
      role: "Directeur d'agence",
      quote: "La fresque réalisée dans nos locaux a transformé l'ambiance de travail. Le processus de sélection d'artiste était fluide et professionnel.",
      rating: 4,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const openAuthModal = (type: 'artist' | 'owner') => {
    setUserType(type);
    setAuthInitialTab('register');
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Enhanced Hero Section with new cover image */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/a978ae8c-d651-44ef-9ca1-3466286cdd78.png" 
            alt="Street Art Cover" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-block bg-wxll-artist/20 backdrop-blur-sm text-wxll-artist border border-wxll-artist/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                🎨 Plateforme #1 du street art en France
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Faites parler les murs <br/>
              <span className="text-wxll-artist">avec l'art</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl">
              La marketplace qui met en relation street artists et propriétaires de murs pour créer des œuvres uniques.
            </p>
            
            {/* Enhanced CTA Section */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group cursor-pointer" onClick={() => openAuthModal('artist')}>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-wxll-artist rounded-lg mr-4">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Je suis un artiste</h3>
                    <p className="text-gray-300 text-sm">Trouvez des murs à décorer</p>
                  </div>
                </div>
                <Button className="w-full bg-wxll-artist hover:bg-wxll-artist-dark group-hover:scale-105 transition-transform">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group cursor-pointer" onClick={() => openAuthModal('owner')}>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-wxll-wall-owner rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">J'ai un mur disponible</h3>
                    <p className="text-gray-300 text-sm">Trouvez des artistes talentueux</p>
                  </div>
                </div>
                <Button className="w-full bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white group-hover:scale-105 transition-all">
                  Publier mon mur
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>500+ artistes vérifiés</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Paiements sécurisés</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Partout en France</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Stats Section */}
      <StatsSection />
      
      {/* Featured Artists Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Artistes en vedette</h2>
            <p className="section-subtitle">
              Découvrez des artistes talentueux prêts à transformer votre espace en œuvre d'art unique
            </p>
          </div>
          
          <div className="mb-12">
            <ArtistCarousel artists={featuredArtists} />
          </div>
          
          <div className="text-center">
            <Link to="/artistes">
              <Button variant="outline" size="lg" className="group hover:shadow-lg transition-all border-wxll-artist text-wxll-artist hover:bg-wxll-artist hover:text-white">
                Découvrir tous les artistes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Featured Walls Section */}
      <section className="py-24 bg-wxll-light/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Murs disponibles</h2>
            <p className="section-subtitle">
              Explorez les espaces qui attendent d'être transformés par votre créativité artistique
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredWalls.map(wall => (
              <div key={wall.id} className="transform hover:scale-105 transition-transform duration-300">
                <WallCard {...wall} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/murs">
              <Button variant="outline" size="lg" className="group hover:shadow-lg transition-all border-wxll-wall-owner text-wxll-wall-owner hover:bg-wxll-wall-owner hover:text-white">
                Explorer tous les murs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Ils nous font confiance</h2>
            <p className="section-subtitle">
              Découvrez les témoignages de notre communauté d'artistes et propriétaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-r from-wxll-dark via-gray-900 to-wxll-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Prêt à donner vie à votre projet?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Rejoignez WXLLSPACE aujourd'hui et connectez-vous avec une communauté passionnée. 
            Que vous soyez artiste ou propriétaire, votre prochaine collaboration vous attend.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
            <Button 
              size="lg"
              className="flex-1 bg-wxll-artist hover:bg-wxll-artist-dark hover:scale-105 transition-all shadow-lg"
              onClick={() => openAuthModal('artist')}
            >
              <Palette className="mr-2 h-5 w-5" />
              Je suis artiste
            </Button>
            <Button 
              size="lg"
              className="flex-1 bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white hover:scale-105 transition-all shadow-lg"
              onClick={() => openAuthModal('owner')}
            >
              <MapPin className="mr-2 h-5 w-5" />
              J'ai un mur
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-400">
            <p>✨ Inscription gratuite • ⚡ Mise en relation rapide • 🔒 Paiements sécurisés</p>
          </div>
        </div>
      </section>
      
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authInitialTab}
        userType={userType}
      />
    </div>
  );
};

export default Index;
