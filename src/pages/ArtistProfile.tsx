
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MapPin, Globe, Instagram, Briefcase } from 'lucide-react';
import { ImageGallery } from '@/components/ImageGallery';
import { ProfileSkeleton } from '@/components/ui/loading-skeletons';
import { ProjectProposalForm } from '@/components/ProjectProposalForm';
import ReviewsSection from '@/components/ReviewsSection';
import { ReviewForm } from '@/components/ReviewForm';
import { getErrorMessage } from '@/utils/errorMessages';
import { toast } from 'sonner';

interface Artist {
  id: string;
  name: string;
  style?: string | null;
  location?: string | null;
  bio?: string | null;
  profile_image_url?: string | null;
  website?: string | null;
  instagram_handle?: string | null;
  experience_years?: number | null;
  projects_count?: number | null;
  contact_email?: string | null;
  previous_works_urls?: string[] | null;
  coverage_area?: string | null;
  visibility?: boolean;
  created_at?: string;
}

const fetchArtist = async (id: string): Promise<Artist | null> => {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Artist;
  } catch (error) {
    console.error('Error fetching artist:', error);
    toast.error(getErrorMessage(error));
    return null;
  }
};

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: artist, isLoading, error } = useQuery({
    queryKey: ['artist', id],
    queryFn: () => fetchArtist(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileSkeleton />
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-red-600 mb-4">
                {getErrorMessage(error) || 'Artiste non trouvé'}
              </p>
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Artist Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src={artist.profile_image_url || undefined} alt={artist.name} />
                  <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
                    {artist.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold">{artist.name}</CardTitle>
                {artist.location && (
                  <div className="flex items-center justify-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {artist.location}
                  </div>
                )}
                {artist.style && (
                  <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-700">
                    {artist.style}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Bio */}
                {artist.bio && (
                  <div>
                    <h3 className="font-semibold mb-2">À propos</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{artist.bio}</p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex justify-between text-center pt-4 border-t">
                  {artist.experience_years && (
                    <div>
                      <div className="font-semibold text-lg">{artist.experience_years}</div>
                      <div className="text-xs text-gray-600">ans d'expérience</div>
                    </div>
                  )}
                  {artist.projects_count !== null && (
                    <div>
                      <div className="font-semibold text-lg">{artist.projects_count}</div>
                      <div className="text-xs text-gray-600">projets réalisés</div>
                    </div>
                  )}
                </div>

                {/* Contact & Social */}
                <Separator />
                <div className="space-y-3">
                  {artist.website && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={artist.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Site Web
                      </a>
                    </Button>
                  )}
                  {artist.instagram_handle && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a 
                        href={`https://instagram.com/${artist.instagram_handle.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-4 w-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  )}
                </div>

                {/* Action Buttons */}
                <Separator />
                <div className="space-y-2">
                  <ProjectProposalForm artistId={artist.id} artistName={artist.name} />
                  <ReviewForm artistId={artist.id} artistName={artist.name} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Portfolio & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Section */}
            {artist.previous_works_urls && artist.previous_works_urls.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Portfolio ({artist.previous_works_urls.length} œuvres)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageGallery images={artist.previous_works_urls} />
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <ReviewsSection artistId={artist.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
