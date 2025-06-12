
import React, { useState } from 'react';
import { useArtists } from '@/hooks/useArtists';
import ArtistCard from '@/components/ArtistCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Palette, Filter } from 'lucide-react';

const Artists = () => {
  const { artists, loading, error } = useArtists();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [styleFilter, setStyleFilter] = useState('');

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || 
                           artist.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStyle = !styleFilter || 
                        artist.style?.toLowerCase().includes(styleFilter.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesStyle;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
            <p className="text-lg font-medium text-gray-700">Chargement des artistes...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-red-700 mb-2">Erreur</h2>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Artistes <span className="text-purple-600">WXLLSPACE</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les talents du street art français et trouvez l'artiste parfait pour votre projet
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filtres de recherche</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un artiste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Localisation..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="relative">
                <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Style artistique..."
                  value={styleFilter}
                  onChange={(e) => setStyleFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {(searchTerm || locationFilter || styleFilter) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {filteredArtists.length} artiste(s) trouvé(s)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setLocationFilter('');
                    setStyleFilter('');
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <ArtistCard 
                key={artist.id}
                id={artist.id as string}
                name={artist.name as string}
                style={artist.style as string}
                location={artist.location as string}
                projectsCount={artist.projects_count || 0}
                experienceYears={artist.experience_years || 0}
                profileImageUrl={artist.profile_image_url as string}
                instagramHandle={artist.instagram_handle as string}
                website={artist.website as string}
              />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun artiste trouvé</h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche pour trouver des artistes.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setStyleFilter('');
                }}
              >
                Voir tous les artistes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Artists;
