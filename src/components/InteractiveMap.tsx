
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, User, Building } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  type: 'artist' | 'wall';
  details: any;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  onLocationClick?: (location: MapLocation) => void;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  onLocationClick,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Fonction pour géocoder une adresse (simulation - en prod, utiliser l'API Mapbox Geocoding)
  const geocodeAddress = (address: string): [number, number] => {
    // Simulation de coordonnées pour les principales villes françaises
    const cityCoordinates: { [key: string]: [number, number] } = {
      'paris': [2.3522, 48.8566],
      'lyon': [4.8357, 45.7640],
      'marseille': [5.3698, 43.2965],
      'toulouse': [1.4442, 43.6047],
      'nice': [7.2620, 43.7102],
      'nantes': [1.5534, 47.2184],
      'montpellier': [3.8767, 43.6109],
      'strasbourg': [7.7521, 48.5734],
      'bordeaux': [-0.5792, 44.8378],
      'lille': [3.0573, 50.6292]
    };

    const city = address.toLowerCase().split(' ')[0];
    return cityCoordinates[city] || [2.3522, 48.8566]; // Par défaut Paris
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.3522, 48.8566], // Centré sur Paris
      zoom: 6
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Ajouter les marqueurs
    locations.forEach((location) => {
      const coordinates = location.coordinates || geocodeAddress(location.location);
      
      // Créer l'élément du marqueur
      const el = document.createElement('div');
      el.className = `cursor-pointer w-8 h-8 bg-${location.type === 'artist' ? 'purple' : 'green'}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white`;
      el.innerHTML = location.type === 'artist' ? 
        '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>' :
        '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>';

      // Ajouter le marqueur
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map.current!);

      // Gérer le clic sur le marqueur
      el.addEventListener('click', () => {
        setSelectedLocation(location);
        onLocationClick?.(location);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [locations, mapboxToken, onLocationClick]);

  if (!mapboxToken) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Carte Interactive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Pour afficher la carte, veuillez saisir votre token Mapbox :
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Votre token Mapbox..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={() => {
              // Le token sera utilisé automatiquement via l'effet
            }}>
              Charger
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Obtenez votre token sur{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              mapbox.com
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-96 rounded-lg" />
      
      {/* Légende */}
      <Card className="absolute top-4 left-4 bg-white/90 backdrop-blur">
        <CardContent className="p-3">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <User className="w-2 h-2 text-white" />
              </div>
              <span>Artistes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Building className="w-2 h-2 text-white" />
              </div>
              <span>Murs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popup d'information */}
      {selectedLocation && (
        <Card className="absolute bottom-4 left-4 right-4 bg-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                {selectedLocation.type === 'artist' ? (
                  <User className="h-5 w-5 text-purple-600" />
                ) : (
                  <Building className="h-5 w-5 text-green-600" />
                )}
                {selectedLocation.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLocation(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              {selectedLocation.location}
            </div>
            {selectedLocation.type === 'artist' && selectedLocation.details.style && (
              <Badge variant="secondary" className="mb-2">
                {selectedLocation.details.style}
              </Badge>
            )}
            {selectedLocation.type === 'wall' && (
              <div className="flex gap-2 mb-2">
                <Badge variant="outline">
                  {selectedLocation.details.surface_m2}m²
                </Badge>
                <Badge variant="outline">
                  {selectedLocation.details.type}
                </Badge>
              </div>
            )}
            <Button 
              size="sm" 
              onClick={() => onLocationClick?.(selectedLocation)}
              className="w-full"
            >
              Voir le profil
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
