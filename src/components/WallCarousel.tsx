
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
import { ArrowRight, MapPin, Ruler, Euro, Building } from 'lucide-react';

interface Wall {
  id: string;
  title: string;
  location: string;
  size: string;
  imageUrl: string;
  budget: string;
  surface_type?: string;
  indoor?: boolean;
  owner_type?: string;
}

interface WallCarouselProps {
  walls: Wall[];
}

const WallCarousel: React.FC<WallCarouselProps> = ({ walls }) => {
  if (!walls || walls.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Aucun mur trouvé</div>
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
          {walls.map((wall) => (
            <CarouselItem key={wall.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="group h-full">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full group-hover:-translate-y-2">
                  {/* Image Section with Overlay */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-wxll-wall-owner/20 to-wxll-wall-owner-light/20">
                    <img
                      src={wall.imageUrl}
                      alt={wall.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Quick Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">{wall.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Ruler className="h-4 w-4" />
                          <span className="text-sm font-medium">{wall.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 relative bg-white">
                    <div className="mb-4">
                      <h3 className="font-bold text-xl mb-2 text-wxll-dark group-hover:text-wxll-wall-owner transition-colors">
                        {wall.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Building className="h-4 w-4 text-wxll-wall-owner" />
                        <span className="text-sm font-medium text-gray-600">
                          {wall.indoor ? 'Intérieur' : 'Extérieur'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Surface Type */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {wall.surface_type && (
                        <span className="inline-block bg-wxll-wall-owner/10 text-wxll-wall-owner text-xs font-medium px-3 py-1.5 rounded-full border border-wxll-wall-owner/20">
                          {wall.surface_type}
                        </span>
                      )}
                      {wall.owner_type && (
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                          {wall.owner_type === 'individual' ? 'Particulier' : 'Professionnel'}
                        </span>
                      )}
                    </div>
                    
                    {/* Budget */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between p-3 bg-wxll-wall-owner/5 rounded-lg border border-wxll-wall-owner/10">
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-wxll-wall-owner" />
                          <span className="text-sm text-gray-600">Budget</span>
                        </div>
                        <span className="font-bold text-wxll-wall-owner">{wall.budget}</span>
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <Link to={`/murs/${wall.id}`} className="block">
                      <Button className="w-full bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white group-hover:shadow-lg transition-all">
                        <span>Voir le mur</span>
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
        {walls.map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
        ))}
      </div>
    </div>
  );
};

export default WallCarousel;
