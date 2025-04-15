
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from 'lucide-react';
import ArtistCard from '@/components/ArtistCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample artists data (in a real app, this would come from an API)
  const artists = [
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
    },
    {
      id: "4",
      name: "Thomas Martin",
      style: "Calligraffiti",
      location: "Bordeaux",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
    },
    {
      id: "5",
      name: "Julie Dubois",
      style: "Art Urbain",
      location: "Toulouse",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: "6",
      name: "Lucas Petit",
      style: "Pop Art Urbain",
      location: "Nantes",
      imageUrl: "https://images.unsplash.com/photo-1561059488-916d69792237?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="section-title text-center">Artistes Street Art</h1>
            <p className="section-subtitle text-center">
              Découvrez des artistes talentueux prêts à transformer vos espaces
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Rechercher par nom, style ou ville..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} {...artist} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Artists;
