
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Palette, Camera } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  location?: string;
  image_url?: string;
  year?: number;
  description?: string;
}

interface EnhancedPortfolioProps {
  projects: PortfolioProject[];
  artistName: string;
}

const EnhancedPortfolio: React.FC<EnhancedPortfolioProps> = ({ projects, artistName }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Palette className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Portfolio en construction</h3>
        <p className="text-gray-500">
          {artistName.split(' ')[0]} n'a pas encore ajouté de réalisations à son portfolio
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm">
          <div className="relative h-64 overflow-hidden">
            <img
              src={project.image_url || 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1964&auto=format&fit=crop'}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Enhanced overlay content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              {/* Top badges */}
              <div className="flex justify-between items-start">
                {project.year && (
                  <span className="bg-wxll-artist text-white text-xs font-bold px-3 py-1 rounded-full">
                    {project.year}
                  </span>
                )}
                <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              {/* Bottom content */}
              <div className="text-white">
                <h3 className="font-bold text-lg mb-2 group-hover:text-wxll-light transition-colors">
                  {project.title}
                </h3>
                
                {project.location && (
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                )}
                
                {project.description && (
                  <p className="text-sm text-white/90 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Enhanced card content */}
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-wxll-dark group-hover:text-wxll-artist transition-colors">
                {project.title}
              </h3>
              
              {project.year && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {project.year}
                </div>
              )}
            </div>
            
            {project.location && (
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{project.location}</span>
              </div>
            )}
            
            {project.description && (
              <p className="text-gray-600 text-sm leading-relaxed mt-3 line-clamp-3">
                {project.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EnhancedPortfolio;
