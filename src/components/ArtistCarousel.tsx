
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, MapPin, Palette, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface Artist {
  id: string;
  name: string;
  style: string;
  location: string;
  imageUrl: string;
  rating?: number;
  specialties?: string[];
  projectsCount?: number;
}

interface ArtistCarouselProps {
  artists: Artist[];
}

const ArtistCarousel: React.FC<ArtistCarouselProps> = ({ artists }) => {
  const { isArtistFavorite, toggleArtistFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent, artistId: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleArtistFavorite(artistId);
  };

  if (!artists || artists.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Aucun artiste trouvé</div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {artists.map((artist) => (
            <CarouselItem key={artist.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="group h-full">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full group-hover:-translate-y-2">
                  {/* Image Section with Overlay */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-wxll-artist/20 to-wxll-artist-light/20">
                    <img
                      src={artist.imageUrl || '/placeholder-artist.jpg'}
                      alt={`Oeuvre de ${artist.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Heart Icon with Favorite State */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        onClick={(e) => handleFavoriteClick(e, artist.id)}
                      >
                        <Heart 
                          className={`h-4 w-4 transition-colors ${
                            isArtistFavorite(artist.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-white'
                          }`} 
                        />
                      </Button>
                    </div>
                    
                    {/* Quick Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">{artist.location}</span>
                        </div>
                        {artist.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{artist.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 relative bg-white">
                    <div className="mb-4">
                      <h3 className="font-bold text-xl mb-2 text-wxll-dark group-hover:text-wxll-artist transition-colors">
                        {artist.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Palette className="h-4 w-4 text-wxll-artist" />
                        <span className="text-sm font-medium text-gray-600">{artist.style}</span>
                      </div>
                    </div>
                    
                    {/* Rating Stars */}
                    {artist.rating && (
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < artist.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            } mr-0.5`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({artist.rating}/5)</span>
                      </div>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block bg-wxll-artist/10 text-wxll-artist text-xs font-medium px-3 py-1.5 rounded-full border border-wxll-artist/20">
                        {artist.style}
                      </span>
                      {artist.specialties?.slice(0, 1).map((specialty, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project Count */}
                    {artist.projectsCount !== undefined && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between p-3 bg-wxll-artist/5 rounded-lg border border-wxll-artist/10">
                          <span className="text-sm text-gray-600">Projets réalisés</span>
                          <span className="font-bold text-wxll-artist">{artist.projectsCount}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* CTA Button */}
                    <Link to={`/artistes/${artist.id}`} className="block">
                      <Button className="w-full btn-artist group-hover:shadow-lg transition-all">
                        <span>Voir le profil</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Enhanced Navigation */}
        <CarouselPrevious className="hidden md:flex -left-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all hover:scale-110" />
        <CarouselNext className="hidden md:flex -right-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all hover:scale-110" />
      </Carousel>
      
      {/* Progress Indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {artists.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCarousel;
