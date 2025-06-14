
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Briefcase, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useArtistRating } from '@/hooks/useReviews';

interface ArtistCardProps {
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
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  id,
  name,
  style,
  location,
  bio,
  profile_image_url,
  website,
  instagram_handle,
  experience_years,
  projects_count,
}) => {
  const { data: rating } = useArtistRating(id);

  return (
    <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <CardHeader className="text-center pb-4">
        <Avatar className="h-20 w-20 mx-auto mb-3">
          <AvatarImage src={profile_image_url || undefined} alt={name} />
          <AvatarFallback className="text-lg bg-purple-100 text-purple-700">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg font-bold text-gray-900">{name}</CardTitle>
        {location && (
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col">
        {style && (
          <Badge variant="secondary" className="w-fit mx-auto bg-purple-100 text-purple-700">
            {style}
          </Badge>
        )}

        {/* Rating */}
        {rating && rating.total_reviews > 0 && (
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating.avg_rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({rating.total_reviews} avis)
            </span>
          </div>
        )}

        {bio && (
          <p className="text-gray-600 text-sm line-clamp-3 text-center flex-grow">
            {bio}
          </p>
        )}

        <div className="flex justify-center gap-6 text-sm text-gray-500 py-2">
          {experience_years && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {experience_years} ans
            </div>
          )}
          {projects_count !== null && projects_count !== undefined && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {projects_count} projets
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button asChild size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
            <Link to={`/artistes/${id}`}>
              Voir le profil
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 border-purple-200 text-purple-600 hover:bg-purple-50">
            <MessageSquare className="h-4 w-4" />
            Contacter
          </Button>
        </div>

        {(website || instagram_handle) && (
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            {website && (
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <a href={website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Site
                </a>
              </Button>
            )}
            {instagram_handle && (
              <Button variant="ghost" size="sm" asChild className="text-xs">
                <a 
                  href={`https://instagram.com/${instagram_handle.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  @{instagram_handle.replace('@', '')}
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
