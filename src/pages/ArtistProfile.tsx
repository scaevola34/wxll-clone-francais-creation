import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Heart, Instagram, ExternalLink, Camera } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewsSection from '@/components/ReviewsSection';
import ImageUpload from '@/components/ui/ImageUpload';
import { supabase } from '@/lib/supabaseClient';
import { useReviews } from '@/hooks/useReviews';

interface Artist {
  id: string;
  name: string;
  instagram_handle?: string;
  style?: string;
  location?: string;
  profile_image_url?: string;
  description?: string;
  bio?: string;
  projects_count?: number;
  experience_years?: number;
  website?: string;
}

interface ArtistProject {
  id: string;
  title: string;
  location?: string;
  image_url?: string;
  year?: number;
  description?: string;
}

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [projects, setProjects] = useState<ArtistProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const { averageRating } = useReviews(id);

  useEffect(() => {
    const fetchArtistData = async () => {
      if (!id) return;

      try {
        // Fetch artist data
        const { data: artistData, error: artistError } = await supabase
          .from('artists')
          .select('*')
          .eq('id', id)
          .single();

        if (artistError) {
          console.error('Error fetching artist:', artistError);
          return;
        }

        setArtist(artistData);

        // Fetch artist projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('artist_projects')
          .select('*')
          .eq('artist_id', id);

        if (projectsError) {
          console.error('Error fetching projects:', projectsError);
          return;
        }

        setProjects(projectsData || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  const handleImageUpload = async (imageUrl: string) => {
    if (!id || !imageUrl) return;
    
    try {
      const { error } = await supabase
        .from('artists')
        .update({ profile_image_url: imageUrl })
        .eq('id', id);

      if (error) {
        console.error('Error updating profile image:', error);
        return;
      }

      // Update local state
      setArtist(prev => prev ? { ...prev, profile_image_url: imageUrl } : null);
      setShowImageUpload(false);
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">Chargement du profil...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg text-gray-600">Artiste non trouvé</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col artist-theme">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Image Section */}
            <div className="relative h-[500px] rounded-xl overflow-hidden group">
              <img 
                src={artist.profile_image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop'} 
                alt={artist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Upload button overlay */}
              <button
                onClick={() => setShowImageUpload(!showImageUpload)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Camera className="w-5 h-5" />
              </button>
              
              {/* Image upload panel */}
              {showImageUpload && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4">Changer la photo de profil</h3>
                    <ImageUpload
                      currentImageUrl={artist.profile_image_url}
                      onImageUploaded={handleImageUpload}
                      bucket="artist-images"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setShowImageUpload(false)}
                      className="mt-4 w-full"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 gradient-artist">{artist.name}</h1>
                
                {/* Display dynamic rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-wxll-artist font-medium">
                    {averageRating.toFixed(1)}
                  </span>
                </div>

                {artist.instagram_handle && (
                  <div className="flex items-center text-wxll-artist mb-3">
                    <Instagram className="w-4 h-4 mr-2" />
                    <a 
                      href={`https://instagram.com/${artist.instagram_handle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {artist.instagram_handle}
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
                  <span>{artist.location || 'Localisation non spécifiée'}</span>
                </div>
                {artist.style && (
                  <span className="inline-block bg-wxll-artist/10 border border-wxll-artist/20 text-wxll-artist text-sm font-medium px-3 py-1 rounded-full">
                    {artist.style}
                  </span>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {artist.description || artist.bio || 'Aucune description disponible'}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-wxll-artist/10">
                  <div className="text-2xl font-bold text-wxll-artist">{artist.projects_count || 0}</div>
                  <div className="text-gray-600">Projets réalisés</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-wxll-artist/10">
                  <div className="text-2xl font-bold text-wxll-artist">{artist.experience_years || 0} ans</div>
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

          {/* Reviews Section */}
          <ReviewsSection artistId={id!} artistName={artist.name} />

          {/* Previous Realizations Section */}
          {projects.length > 0 && (
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 gradient-artist">Réalisations précédentes</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Découvrez quelques-unes des œuvres créées par {artist.name.split(' ')[0]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((work) => (
                  <Card key={work.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={work.image_url || 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1964&auto=format&fit=crop'}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Year Badge */}
                      {work.year && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-wxll-artist text-white text-xs font-bold px-3 py-1 rounded-full">
                            {work.year}
                          </span>
                        </div>
                      )}
                      
                      {/* Location on image */}
                      {work.location && (
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center text-white">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm font-medium">{work.location}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-wxll-dark group-hover:text-wxll-artist transition-colors">
                        {work.title}
                      </h3>
                      {work.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {work.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
