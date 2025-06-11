import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X, Camera } from 'lucide-react';
import WallCard from '@/components/WallCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWalls } from '@/hooks/useWalls';
import WallFilters from '@/components/WallFilters';
import ImageUpload from '@/components/ui/ImageUpload';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from '@/lib/supabaseClient';

const Walls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    ownerType: searchParams.get('ownerType')?.split(',').filter(Boolean) || [],
    locationType: searchParams.get('locationType')?.split(',').filter(Boolean) || [],
    surfaceType: searchParams.get('surfaceType')?.split(',').filter(Boolean) || [],
    minArea: parseInt(searchParams.get('minArea') || '0'),
    maxArea: parseInt(searchParams.get('maxArea') || '200'),
    timeframe: searchParams.get('timeframe') || '',
  });

  const { walls, loading } = useWalls();
  const [showImageUpload, setShowImageUpload] = useState<string | null>(null);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filters.ownerType.length > 0) params.set('ownerType', filters.ownerType.join(','));
    if (filters.locationType.length > 0) params.set('locationType', filters.locationType.join(','));
    if (filters.surfaceType.length > 0) params.set('surfaceType', filters.surfaceType.join(','));
    if (filters.minArea > 0) params.set('minArea', filters.minArea.toString());
    if (filters.maxArea < 200) params.set('maxArea', filters.maxArea.toString());
    if (filters.timeframe) params.set('timeframe', filters.timeframe);
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, filters, setSearchParams]);

  const handleImageUpload = async (wallId: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('wall_owners')
        .update({ image_url: imageUrl })
        .eq('id', wallId);

      if (error) {
        console.error('Error updating wall image:', error);
        return;
      }

      setShowImageUpload(null);
      // Optionally refresh the walls list here
    } catch (error) {
      console.error('Error updating wall image:', error);
    }
  };

  const resetFilters = () => {
    setFilters({
      ownerType: [],
      locationType: [],
      surfaceType: [],
      minArea: 0,
      maxArea: 200,
      timeframe: '',
    });
    setSearchTerm('');
    setSearchParams({}, { replace: true });
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
    return [...new Set(types)] as string[];
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
                  <div key={wall.id} className="relative group">
                    <WallCard 
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
                    
                    {/* Image upload button overlay */}
                    <button
                      onClick={() => setShowImageUpload(wall.id)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    
                    {/* Image upload modal */}
                    {showImageUpload === wall.id && (
                      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                          <h3 className="text-lg font-semibold mb-4">Changer l'image du mur</h3>
                          <ImageUpload
                            currentImageUrl={wall.imageUrl}
                            onImageUploaded={(url) => handleImageUpload(wall.id, url)}
                            bucket="wall-images"
                          />
                          <Button
                            variant="outline"
                            onClick={() => setShowImageUpload(null)}
                            className="mt-4 w-full"
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
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

</edits_to_apply>
