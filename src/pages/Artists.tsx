import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ArtistCard from '@/components/ArtistCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useArtists } from '@/hooks/useArtists';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Artists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [styleFilter, setStyleFilter] = useState(searchParams.get('style') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  
  const { artists, loading } = useArtists();

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (styleFilter) params.set('style', styleFilter);
    if (locationFilter) params.set('location', locationFilter);
    
    setSearchParams(params, { replace: true });
  }, [searchTerm, styleFilter, locationFilter, setSearchParams]);

  // Get unique styles and locations for filters
  const uniqueStyles = useMemo(() => {
    const styles = artists.map(artist => artist.style).filter(Boolean);
    return [...new Set(styles)];
  }, [artists]);

  const uniqueLocations = useMemo(() => {
    const locations = artists.map(artist => artist.location).filter(Boolean);
    return [...new Set(locations)];
  }, [artists]);

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artist.style && artist.style.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (artist.location && artist.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStyle = !styleFilter || artist.style === styleFilter;
      const matchesLocation = !locationFilter || artist.location === locationFilter;
      
      return matchesSearch && matchesStyle && matchesLocation;
    });
  }, [artists, searchTerm, styleFilter, locationFilter]);

  const resetFilters = () => {
    setStyleFilter('');
    setLocationFilter('');
    setSearchTerm('');
    setSearchParams({}, { replace: true });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (styleFilter) count++;
    if (locationFilter) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">Chargement des artistes...</div>
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Filtres</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-gray-500 hover:text-wxll-blue" 
                        onClick={resetFilters}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Réinitialiser
                      </Button>
                    </div>
                    
                    <div>
                      <Label className="block mb-2">Style artistique</Label>
                      <Select value={styleFilter} onValueChange={setStyleFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les styles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Tous les styles</SelectItem>
                          {uniqueStyles.map((style) => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="block mb-2">Localisation</Label>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les villes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Toutes les villes</SelectItem>
                          {uniqueLocations.map((location) => (
                            <SelectItem key={location} value={location}>{location}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 mb-4 text-sm">
                <span>Filtres actifs:</span>
                {styleFilter && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    Style: {styleFilter}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setStyleFilter('')}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {locationFilter && (
                  <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center">
                    Ville: {locationFilter}
                    <button
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => setLocationFilter('')}
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

            {filteredArtists.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-gray-500">Aucun artiste ne correspond à vos critères de recherche.</p>
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
                {filteredArtists.map((artist) => (
                  <ArtistCard 
                    key={artist.id} 
                    id={artist.id}
                    name={artist.name}
                    style={artist.style || 'Style non spécifié'}
                    location={artist.location || 'Localisation non spécifiée'}
                    imageUrl={artist.imageUrl}
                    rating={artist.rating}
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

export default Artists;
