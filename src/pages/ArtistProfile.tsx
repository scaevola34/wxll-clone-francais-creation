
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Heart, Instagram, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const ArtistProfile = () => {
  const { id } = useParams();
  
  // This would come from an API in a real application
  const artist = {
    id: "5",
    name: "Julie Dubois",
    instagram: "@julie_dubois_art",
    style: "Art Urbain",
    location: "Toulouse",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop",
    description: "Artiste urbaine passionnée par la création de fresques colorées et engagées. Spécialisée dans l'art urbain contemporain avec une touche de street art traditionnel.",
    projects: 25,
    experience: "5 ans",
    website: "https://julie-dubois-art.fr",
    previousWorks: [
      {
        id: 1,
        title: "Fresque Murales École Primaire",
        location: "Toulouse Centre",
        imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1964&auto=format&fit=crop",
        year: "2024",
        description: "Création d'une fresque colorée représentant la nature et les animaux pour égayer la cour de récréation."
      },
      {
        id: 2,
        title: "Mur Commercial Quartier Saint-Cyprien",
        location: "Toulouse",
        imageUrl: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1964&auto=format&fit=crop",
        year: "2023",
        description: "Œuvre abstraite aux couleurs vives pour dynamiser l'entrée d'un centre commercial."
      },
      {
        id: 3,
        title: "Passage Souterrain Métro",
        location: "Station Capitole",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1964&auto=format&fit=crop",
        year: "2023",
        description: "Transformation d'un passage souterrain en galerie d'art urbain avec des motifs géométriques."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col artist-theme">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image Section */}
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <img 
                src={artist.imageUrl} 
                alt={artist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 gradient-artist">{artist.name}</h1>
                {artist.instagram && (
                  <div className="flex items-center text-wxll-artist mb-3">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a 
                      href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {artist.instagram}
                    </a>
                  </div>
                )}
                {artist.website && (
                  <div className="flex items-center text-wxll-artist mb-3">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <a 
                      href={artist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Site web
                    </a>
                  </div>
                )}
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{artist.location}</span>
                </div>
                <span className="inline-block bg-wxll-artist/10 border border-wxll-artist/20 text-wxll-artist text-sm font-medium px-3 py-1 rounded-full">
                  {artist.style}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">{artist.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-wxll-artist/10">
                  <div className="text-2xl font-bold text-wxll-artist">{artist.projects}</div>
                  <div className="text-gray-600">Projets réalisés</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-wxll-artist/10">
                  <div className="text-2xl font-bold text-wxll-artist">{artist.experience}</div>
                  <div className="text-gray-600">d'expérience</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-artist flex-1 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contacter
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 border-wxll-artist text-wxll-artist hover:bg-wxll-artist hover:text-white">
                  <Heart className="w-4 h-4" />
                  Suivre
                </Button>
              </div>
            </div>
          </div>

          {/* Previous Realizations Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 gradient-artist">Réalisations précédentes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez quelques-unes des œuvres créées par {artist.name.split(' ')[0]} dans la région toulousaine
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artist.previousWorks.map((work) => (
                <Card key={work.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-wxll-artist text-white text-xs font-bold px-3 py-1 rounded-full">
                        {work.year}
                      </span>
                    </div>
                    
                    {/* Location on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">{work.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-wxll-dark group-hover:text-wxll-artist transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {work.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
