
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArtistCard from '@/components/ArtistCard';
import WallCard from '@/components/WallCard';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCard from '@/components/TestimonialCard';
import StatsSection from '@/components/StatsSection';

const Index = () => {
  // Sample data for artists
  const featuredArtists = [
    {
      id: "1",
      name: "Sophie Durand",
      style: "Graffiti Abstrait",
      location: "Paris",
      imageUrl: "https://images.unsplash.com/photo-1607000975631-8bdfb8aaa279?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Marc Lefèvre",
      style: "Muralisme",
      location: "Lyon",
      imageUrl: "https://images.unsplash.com/photo-1574014629736-e5efc9b7732e?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: "3",
      name: "Emma Bernard",
      style: "Street Art Figuratif",
      location: "Marseille",
      imageUrl: "https://images.unsplash.com/photo-1623944887776-2f6e8acb83f3?q=80&w=1964&auto=format&fit=crop"
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551639325-8d9c370e5151?q=80&w=2071&auto=format&fit=crop" 
            alt="Street Art Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connectez l'art urbain aux espaces urbains
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              La première marketplace française qui met en relation artistes street art et propriétaires de murs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                Je suis un artiste
              </Button>
              <Button className="btn-secondary">
                J'ai un mur disponible
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Artists Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Artistes en vedette</h2>
          <p className="section-subtitle text-center">
            Découvrez des artistes talentueux prêts à transformer votre espace
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredArtists.map(artist => (
              <ArtistCard key={artist.id} {...artist} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/artistes">
              <Button variant="outline" className="group">
                Voir tous les artistes
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Featured Walls Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Murs disponibles</h2>
          <p className="section-subtitle text-center">
            Explorez les espaces qui attendent d'être transformés par votre créativité
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredWalls.map(wall => (
              <WallCard key={wall.id} {...wall} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/murs">
              <Button variant="outline" className="group">
                Voir tous les murs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-wxll-light">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Ce qu'ils disent</h2>
          <p className="section-subtitle text-center">
            Découvrez les expériences de nos utilisateurs avec WXLLSPACE
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-wxll-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à donner vie à votre projet street art?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez WXLLSPACE aujourd'hui et connectez-vous avec des artistes talentueux ou trouvez le mur parfait pour votre vision artistique.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="btn-primary">
              Je suis un artiste
            </Button>
            <Button className="bg-white text-wxll-dark hover:bg-gray-200 transition-colors px-6 py-3 rounded-md font-medium">
              J'ai un mur disponible
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
