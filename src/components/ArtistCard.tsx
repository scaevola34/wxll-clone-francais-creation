
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Briefcase, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={profile_image_url || undefined} alt={name} />
          <AvatarFallback className="text-lg">
            {name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{name}</CardTitle>
        {location && (
          <div className="flex items-center justify-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {style && (
          <Badge variant="secondary" className="w-fit">
            {style}
          </Badge>
        )}

        {bio && (
          <p className="text-gray-700 text-sm line-clamp-3">
            {bio}
          </p>
        )}

        <div className="flex justify-between text-sm text-gray-600">
          {experience_years && (
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {experience_years} ans
            </div>
          )}
          {projects_count && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {projects_count} projets
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link to={`/artistes/${id}`}>
              Voir le profil
            </Link>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Contacter
          </Button>
        </div>

        {(website || instagram_handle) && (
          <div className="flex gap-2 pt-2 border-t">
            {website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Site web
                </a>
              </Button>
            )}
            {instagram_handle && (
              <Button variant="ghost" size="sm" asChild>
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
