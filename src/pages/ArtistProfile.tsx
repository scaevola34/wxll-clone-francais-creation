
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Share2, Globe, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ArtistProfile = () => {
  const { id } = useParams();
  
  // This would come from an API in a real application
  const artist = {
    id: "5",
    name: "Julie Dubois",
    style: "Art Urbain",
    location: "Toulouse",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop",
    description: "Artiste urbaine passionnée par la création de fresques colorées et engagées. Spécialisée dans l'art urbain contemporain avec une touche de street art traditionnel.",
    projects: 25,
    experience: "5 ans",
    website: "https://julie-dubois-art.fr"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <img 
                src={artist.imageUrl} 
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{artist.location}</span>
                </div>
                <span className="inline-block bg-wxll-light text-wxll-dark text-sm font-medium px-3 py-1 rounded-full">
                  {artist.style}
                </span>
              </div>

              <p className="text-gray-700">{artist.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{artist.projects}</div>
                  <div className="text-gray-600">Projets réalisés</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold">{artist.experience}</div>
                  <div className="text-gray-600">d'expérience</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contacter
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Suivre
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <a 
                  href={artist.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-wxll-blue transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <button className="text-gray-600 hover:text-wxll-blue transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
