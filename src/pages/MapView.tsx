
import React, { useState } from 'react';
import { useArtists } from '@/hooks/useArtists';
import { useWalls } from '@/hooks/useWalls';
import { InteractiveMap } from '@/components/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Building, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';

interface MapLocation {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  type: 'artist' | 'wall';
  details: any;
}

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const { data: artists = [], isLoading: loadingArtists } = useArtists();
  const { data: walls = [], isLoading: loadingWalls } = useWalls();
  const [activeTab, setActiveTab] = useState<'all' | 'artists' | 'walls'>('all');

  // Fonction pour géocoder (simulation)
  const geocodeLocation = (location: string): [number, number] => {
    const cityCoordinates: { [key: string]: [number, number] } = {
      'paris': [2.3522, 48.8566],
      'lyon': [4.8357, 45.7640],
      'marseille': [5.3698, 43.2965],
      'toulouse': [1.4442, 43.6047],
      'nice': [7.2620, 43.7102],
      'nantes': [-1.5534, 47.2184],
      'montpellier': [3.8767, 43.6109],
      'strasbourg': [7.7521, 48.5734],
      'bordeaux': [-0.5792, 44.8378],
      'lille': [3.0573, 50.6292]
    };

    const city = location?.toLowerCase().split(' ')[0];
    return cityCoordinates[city] || [2.3522 + Math.random() * 0.1, 48.8566 + Math.random() * 0.1];
  };

  // Convertir les artistes en locations
  const artistLocations: MapLocation[] = artists
    .filter(artist => artist.location)
    .map(artist => ({
      id: artist.id,
      name: artist.name,
      location: artist.location!,
      coordinates: geocodeLocation(artist.location!),
      type: 'artist' as const,
      details: {
        style: artist.style,
        experience_years: artist.experience_years,
        projects_count: artist.projects_count
      }
    }));

  // Convertir les murs en locations
  const wallLocations: MapLocation[] = walls
    .filter(wall => wall.location)
    .map(wall => ({
      id: wall.id,
      name: wall.title || wall.Name || 'Mur disponible',
      location: wall.location!,
      coordinates: geocodeLocation(wall.location!),
      type: 'wall' as const,
      details: {
        surface_m2: wall.surface_m2,
        type: wall.type,
        indoor: wall.indoor
      }
    }));

  // Filtrer selon l'onglet actif
  const getFilteredLocations = (): MapLocation[] => {
    switch (activeTab) {
      case 'artists':
        return artistLocations;
      case 'walls':
        return wallLocations;
      default:
        return [...artistLocations, ...wallLocations];
    }
  };

  const handleLocationClick = (location: MapLocation) => {
    if (location.type === 'artist') {
      navigate(`/artistes/${location.id}`);
    } else {
      // Pour les murs, on pourrait créer une page détail ou ouvrir une modale
      console.log('Détails du mur:', location);
    }
  };

  if (loadingArtists || loadingWalls) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Carte Interactive <span className="text-blue-600">WXLLSPACE</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les artistes et les murs disponibles près de chez vous
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{artistLocations.length}</p>
                <p className="text-gray-600">Artistes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <Building className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{wallLocations.length}</p>
                <p className="text-gray-600">Murs disponibles</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-6">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold">{artistLocations.length + wallLocations.length}</p>
                <p className="text-gray-600">Emplacements</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets et carte */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Localisation des artistes et murs
              </span>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-purple-50">
                  {artistLocations.length} artistes
                </Badge>
                <Badge variant="outline" className="bg-green-50">
                  {wallLocations.length} murs
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Tout voir
                </TabsTrigger>
                <TabsTrigger value="artists" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Artistes
                </TabsTrigger>
                <TabsTrigger value="walls" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Murs
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <InteractiveMap
                  locations={getFilteredLocations()}
                  onLocationClick={handleLocationClick}
                  className="w-full"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Comment utiliser la carte</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <MapPin className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                <p>Naviguez sur la carte pour explorer les différentes régions</p>
              </div>
              <div>
                <Eye className="h-5 w-5 mx-auto mb-2 text-purple-600" />
                <p>Cliquez sur les marqueurs pour voir les détails</p>
              </div>
              <div>
                <Users className="h-5 w-5 mx-auto mb-2 text-green-600" />
                <p>Utilisez les onglets pour filtrer artistes ou murs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;
