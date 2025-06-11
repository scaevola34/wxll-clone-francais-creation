
import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import WallCard from '@/components/WallCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWalls } from '@/hooks/useWalls';
import WallFilters from '@/components/WallFilters';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Walls = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ownerType: [] as string[],
    locationType: [] as string[],
    surfaceType: [] as string[],
    minArea: 0,
    maxArea: 200,
    timeframe: '',
  });

  const { walls, loading } = useWalls();

  const resetFilters = () => {
    setFilters({
      ownerType: [],
      locationType: [],
      surfaceType: [],
      minArea: 0,
      maxArea: 200,
      timeframe: '',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.ownerType.length > 0) count++;
    if (filters.locationType.length > 0) count++;
    if (filters.surfaceType.length > 0) count++;
    if (filters.minArea > 0 || filters.maxArea < 200) count++;
    if (filters.timeframe) count++;
    return count;
  };

  // Get unique surface types for filters
  const uniqueSurfaceTypes = useMemo(() => {
    const types = walls.map(wall => wall.surface_type).filter(Boolean);
    return [...new Set(types)];
  }, [walls]);

  const filteredWalls = useMemo(() => {
    return walls.filter(wall => {
      // Search term filter
      const matchesSearch = 
        wall.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wall.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Owner type filter
      const matchesOwnerType = 
        filters.ownerType.length === 0 ||
        filters.ownerType.includes(wall.owner_type || '');
      
      // Location type filter (indoor/outdoor)
      const matchesLocationType = 
        filters.locationType.length === 0 ||
        (filters.locationType.includes('indoor') && wall.indoor) ||
        (filters.locationType.includes('outdoor') && !wall.indoor);
      
      // Surface type filter
      const matchesSurfaceType = 
        filters.surfaceType.length === 0 ||
        filters.surfaceType.includes(wall.surface_type || '');
      
      // Area filter - convert size string to area
      const wallArea = parseFloat(wall.size.split('x')[0]) * parseFloat(wall.size.split('x')[1]) || 0;
      const matchesArea = 
        wallArea >= filters.minArea && 
        wallArea <= filters.maxArea;
      
      return matchesSearch && matchesOwnerType && matchesLocationType && matchesSurfaceType && matchesArea;
    });
  }, [walls, searchTerm, filters]);

  const activeFilterCount = getActiveFilterCount();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">Chargement des murs...</div>
        </main>
        <Footer />
      </div>
    );
  }

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

            {/* Search and Filters Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
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
                    <Button variant="outline" className="flex items-center gap-2 relative border-2">
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
                      uniqueSurfaceTypes={uniqueSurfaceTypes}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <span>Filtres actifs:</span>
                  {filters.ownerType.map(type => (
                    <span key={type} className="bg-white border px-2 py-1 rounded-full flex items-center">
                      {type === 'individual' ? 'Particulier' : 'Professionnel'}
                      <button
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          ownerType: prev.ownerType.filter(t => t !== type)
                        }))}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {filters.locationType.map(type => (
                    <span key={type} className="bg-white border px-2 py-1 rounded-full flex items-center">
                      {type === 'indoor' ? 'Intérieur' : 'Extérieur'}
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
                  {filters.surfaceType.map(type => (
                    <span key={type} className="bg-white border px-2 py-1 rounded-full flex items-center">
                      {type}
                      <button
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          surfaceType: prev.surfaceType.filter(t => t !== type)
                        }))}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {(filters.minArea > 0 || filters.maxArea < 200) && (
                    <span className="bg-white border px-2 py-1 rounded-full flex items-center">
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
                  <button
                    className="text-wxll-blue hover:underline text-sm"
                    onClick={resetFilters}
                  >
                    Tout effacer
                  </button>
                </div>
              )}
            </div>

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
                  <WallCard 
                    key={wall.id} 
                    id={wall.id}
                    title={wall.title}
                    location={wall.location}
                    size={wall.size}
                    imageUrl={wall.imageUrl}
                    budget={wall.budget}
                    clientType={wall.owner_type === 'individual' ? 'B2C' : 'B2B'}
                    locationType={wall.indoor ? 'interior' : 'exterior'}
                    surfaceType={wall.surface_type}
                  />
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
