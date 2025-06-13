import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MapPin, Palette, Shield, Building, Home } from 'lucide-react';

import ArtistCard from '@/components/ArtistCard';
import WallCard from '@/components/WallCard';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCard from '@/components/TestimonialCard';
import StatsSection from '@/components/StatsSection';
import AuthModal from '@/components/AuthModal';
import ArtistCarousel from '@/components/ArtistCarousel';
import WallCarousel from '@/components/WallCarousel';
import { useArtists } from '@/hooks/useArtists';
import { useWalls } from '@/hooks/useWalls';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'register' | 'login'>('register');
  const [userType, setUserType] = useState<'artist' | 'owner' | null>(null);

  const { artists, loading: artistsLoading } = useArtists();
  const { walls, loading: wallsLoading } = useWalls();

  // Témoignages (exemple)
  const testimonials = [
    {
      name: 'Thomas Moreau',
      role: 'Propriétaire de mur',
      quote:
        "WXLLSPACE m'a permis de transformer la façade de mon commerce en une véritable œuvre d'art. Le processus était simple et le résultat est spectaculaire!",
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop',
    },
    {
      name: 'Julie Lambert',
      role: 'Artiste street art',
      quote:
        "Grâce à WXLLSPACE, j'ai pu trouver des projets intéressants et développer ma visibilité. Un outil essentiel pour les artistes urbains!",
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    },
    {
      name: 'Nicolas Petit',
      role: "Directeur d'agence",
      quote:
        'La fresque réalisée dans nos locaux a transformé l'ambiance de travail. Le processus de sélection d'artiste était fluide et professionnel.',
      rating: 4,
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  const openAuthModal = (type: 'artist' | 'owner') => {
    setUserType(type);
    setAuthInitialTab('register');
    setShowAuthModal(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-32 flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/43b7f1bd-60a5-4bff-aeaa-2873676d8ee2.png"
            alt="Urban Wall Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Faites parler les murs <br />
              <span className="text-wxll-artist">avec l'art</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl">
              La marketplace qui met en relation street artists et propriétaires de murs pour créer des œuvres uniques.
            </p>

            {/* CTA */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group cursor-pointer"
                onClick={() => openAuthModal('artist')}
              >
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

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all group">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-wxll-wall-owner rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">J'ai un mur disponible</h3>
                    <p className="text-gray-300 text-sm">Trouvez des artistes talentueux</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    className="w-full bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white group-hover:scale-105 transition-all"
                    onClick={() => openAuthModal('owner')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Je suis un particulier
                  </Button>
                  <Button
                    className="w-full bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white group-hover:scale-105 transition-all"
                    onClick={() => openAuthModal('owner')}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Je suis un professionnel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Artistes en vedette */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Artistes en vedette</h2>
            <p className="section-subtitle">
              Découvrez des artistes talentueux prêts à transformer votre espace en œuvre d'art unique...
            </p>
          </div>

          <div className="mb-12">
            {artistsLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-gray-600">Chargement des artistes...</div>
              </div>
            ) : (
              <ArtistCarousel artists={artists} />
            )}
          </div>

          <div className="text-center">
            <Link to="/artistes">
              <Button
                variant="outline"
                size="lg"
                className="group hover:shadow-lg transition-all border-wxll-artist text-wxll-artist hover:bg-wxll-artist hover:text-white"
              >
                Découvrir tous les artistes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Murs disponibles */}
      <section className="py-24 bg-wxll-light/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Murs disponibles</h2>
            <p className="section-subtitle">
              Explorez les espaces qui attendent d'être transformés par votre créativité artistique
            </p>
          </div>

          <div className="mb-12">
            {wallsLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-lg text-gray-600">Chargement des murs...</div>
              </div>
            ) : (
              <WallCarousel walls={walls} />
            )}
          </div>

          <div className="text-center">
            <Link to="/murs">
              <Button
                variant="outline"
                size="lg"
                className="group hover:shadow-lg transition-all border-wxll-wall-owner text-wxll-wall-owner hover:bg-wxll-wall-owner hover:text-white"
              >
                Explorer tous les murs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Ils nous font confiance</h2>
            <p className="section-subtitle">
              Découvrez les témoignages de notre communauté d'artistes et propriétaires
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="transform hover:scale-105 transition-transform duration-300">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 bg-gradient-to-r from-wxll-dark via-gray-900 to-wxll-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Prêt à donner vie à votre projet?</h2>
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
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authInitialTab}
      />
    </>
  );
};

export default Index;

