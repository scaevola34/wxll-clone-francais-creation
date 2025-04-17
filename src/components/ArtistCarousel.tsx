
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from 'lucide-react';

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
  return (
    <div className="relative w-full px-4 md:px-10">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {artists.map((artist) => (
            <CarouselItem key={artist.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Link to={`/artistes/${artist.id}`} className="block group">
                <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-md">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={artist.imageUrl}
                      alt={`Oeuvre de ${artist.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-5 pt-6 relative">
                    <div className="absolute -top-8 left-5">
                      <Avatar className="h-16 w-16 border-4 border-background shadow-md">
                        <AvatarImage src={artist.imageUrl} alt={artist.name} />
                        <AvatarFallback>{artist.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="pt-6">
                      <h3 className="font-bold text-xl mb-1">{artist.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{artist.location}</p>
                      
                      {artist.rating && (
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < artist.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              } mr-0.5`}
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block bg-wxll-light text-wxll-dark text-xs font-medium px-3 py-1 rounded-full">
                          {artist.style}
                        </span>
                        {artist.specialties?.slice(0, 1).map((specialty, index) => (
                          <span key={index} className="inline-block bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      {artist.projectsCount !== undefined && (
                        <p className="text-sm text-muted-foreground">
                          {artist.projectsCount} projet{artist.projectsCount !== 1 ? 's' : ''} réalisé{artist.projectsCount !== 1 ? 's' : ''}
                        </p>
                      )}
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-primary group-hover:underline">Voir le profil</span>
                        <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex absolute -left-4" />
        <CarouselNext className="hidden md:flex absolute -right-4" />
      </Carousel>
    </div>
  );
};

export default ArtistCarousel;
