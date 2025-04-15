
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from 'lucide-react';
import WallCard from '@/components/WallCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Walls = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample walls data (in a real app, this would come from an API)
  const walls = [
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
    },
    {
      id: "4",
      title: "Façade résidentielle",
      location: "Marseille",
      size: "10m x 6m",
      imageUrl: "https://images.unsplash.com/photo-1487452066049-a710f7296400?q=80&w=2071&auto=format&fit=crop",
      budget: "3000€ - 5000€"
    },
    {
      id: "5",
      title: "Mur extérieur école",
      location: "Toulouse",
      size: "15m x 4m",
      imageUrl: "https://images.unsplash.com/photo-1595294022490-66e84339b765?q=80&w=2070&auto=format&fit=crop",
      budget: "3500€ - 6000€"
    },
    {
      id: "6",
      title: "Palissade de chantier",
      location: "Nantes",
      size: "20m x 3m",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      budget: "2500€ - 4000€"
    }
  ];

  const filteredWalls = walls.filter(wall =>
    wall.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wall.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h1 className="section-title text-center">Murs Disponibles</h1>
            <p className="section-subtitle text-center">
              Trouvez le support idéal pour votre prochaine création artistique
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Rechercher par titre ou localisation..."
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
              {filteredWalls.map((wall) => (
                <WallCard key={wall.id} {...wall} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Walls;
