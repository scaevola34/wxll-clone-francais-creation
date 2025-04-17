
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import WallCard from '@/components/WallCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WallFilters from '@/components/WallFilters';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Walls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    clientType: [] as string[],
    locationType: [] as string[],
    minArea: 0,
    maxArea: 200,
    timeframe: '',
  });

  // Sample walls data (in a real app, this would come from an API)
  const walls = [
    {
      id: "1",
      title: "Mur d'expression urbaine",
      location: "Paris, 11ème",
      size: "8m x 4m",
      imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop",
      budget: "2000€ - 3500€",
      clientType: "B2B",
      locationType: "exterior",
      area: 32,
      timeframe: "3months"
    },
    {
      id: "2",
      title: "Façade commerciale",
      location: "Lyon, Centre",
      size: "12m x 5m",
      imageUrl: "https://images.unsplash.com/photo-1566159266269-2ecbc9a5d4c6?q=80&w=1963&auto=format&fit=crop",
      budget: "4000€ - 6000€",
      clientType: "B2B",
      locationType: "exterior",
      area: 60,
      timeframe: "year"
    },
    {
      id: "3",
      title: "Mur intérieur d'entreprise",
      location: "Bordeaux",
      size: "6m x 3m",
      imageUrl: "https://images.unsplash.com/photo-1508930572500-16235d0a1e4c?q=80&w=1968&auto=format&fit=crop",
      budget: "1500€ - 2500€",
      clientType: "B2B",
      locationType: "interior",
      area: 18,
      timeframe: "asap"
    },
    {
      id: "4",
      title: "Façade résidentielle",
      location: "Marseille",
      size: "10m x 6m",
      imageUrl: "https://images.unsplash.com/photo-1487452066049-a710f7296400?q=80&w=2071&auto=format&fit=crop",
      budget: "3000€ - 5000€",
      clientType: "B2C",
      locationType: "exterior",
      area: 60,
      timeframe: "year"
    },
    {
      id: "5",
      title: "Mur extérieur école",
      location: "Toulouse",
      size: "15m x 4m",
      imageUrl: "https://images.unsplash.com/photo-1595294022490-66e84339b765?q=80&w=2070&auto=format&fit=crop",
      budget: "3500€ - 6000€",
      clientType: "B2B",
      locationType: "exterior",
      area: 60,
      timeframe: "3months"
    },
    {
      id: "6",
      title: "Palissade de chantier",
      location: "Nantes",
      size: "20m x 3m",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      budget: "2500€ - 4000€",
      clientType: "B2C",
      locationType: "exterior",
      area: 60,
      timeframe: "asap"
    }
  ];

  const resetFilters = () => {
    setFilters({
      clientType: [],
      locationType: [],
      minArea: 0,
      maxArea: 200,
      timeframe: '',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.clientType.length > 0) count++;
    if (filters.locationType.length > 0) count++;
    if (filters.minArea > 0 || filters.maxArea < 200) count++;
    if (filters.timeframe) count++;
    return count;
  };

  const filteredWalls = walls.filter(wall => {
    // Search term filter
    const matchesSearch = 
      wall.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wall.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Client type filter
    const matchesClientType = 
      filters.clientType.length === 0 ||
      filters.clientType.includes(wall.clientType);
    
    // Location type filter
    const matchesLocationType = 
      filters.locationType.length === 0 ||
      filters.locationType.includes(wall.locationType);
    
    // Area filter
    const matchesArea = 
      wall.area >= filters.minArea && 
      wall.area <= filters.maxArea;
    
    // Timeframe filter
    const matchesTimeframe = 
      !filters.timeframe || 
      wall.timeframe === filters.timeframe;
    
    return matchesSearch && matchesClientType && matchesLocationType && matchesArea && matchesTimeframe;
  });

  const activeFilterCount = getActiveFilterCount();

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 relative">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtres
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-wxll-blue text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <WallFilters
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span>Filtres actifs:</span>
                {filters.clientType.map(type => (
                  <span key={type} className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    {type === 'B2B' ? 'B2B' : 'B2C'}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        clientType: prev.clientType.filter(t => t !== type)
                      }))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {filters.locationType.map(type => (
                  <span key={type} className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    {type === 'interior' ? 'Intérieur' : 'Extérieur'}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        locationType: prev.locationType.filter(t => t !== type)
                      }))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {(filters.minArea > 0 || filters.maxArea < 200) && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    {filters.minArea}-{filters.maxArea} m²
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        minArea: 0,
                        maxArea: 200
                      }))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.timeframe && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    {filters.timeframe === 'asap' ? 'Dès que possible' : 
                     filters.timeframe === '3months' ? '< 3 mois' : 'Dans l\'année'}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        timeframe: ''
                      }))}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  className="text-wxll-blue hover:underline text-sm"
                  onClick={resetFilters}
                >
                  Tout effacer
                </button>
              </div>
            )}

            {filteredWalls.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">Aucun mur ne correspond à vos critères de recherche.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWalls.map((wall) => (
                  <WallCard key={wall.id} {...wall} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Walls;
