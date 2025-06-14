
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Square, Home, Building2, MessageSquare } from 'lucide-react';

interface WallCardProps {
  id: string;
  title?: string | null;
  location?: string | null;
  surface_m2?: number | null;
  type?: string | null;
  image_url?: string | null;
  description?: string | null;
  indoor?: boolean;
  width_m?: number;
  height_m?: number;
  owner_type?: string;
  contact_email?: string;
}

const WallCard: React.FC<WallCardProps> = ({
  id,
  title,
  location,
  surface_m2,
  type,
  image_url,
  description,
  indoor,
  width_m,
  height_m,
  owner_type,
}) => {
  const getTypeIcon = () => {
    if (indoor) return <Home className="h-4 w-4" />;
    return <Building2 className="h-4 w-4" />;
  };

  const getTypeLabel = () => {
    if (type === 'facade') return 'Façade';
    if (type === 'interieur') return 'Intérieur';
    if (type === 'cloture') return 'Clôture';
    return type || 'Non spécifié';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image_url}
            alt={title || 'Mur disponible'}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={indoor ? "secondary" : "default"} className="flex items-center gap-1">
              {getTypeIcon()}
              {getTypeLabel()}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-lg">
          {title || 'Mur disponible'}
        </CardTitle>
        {location && (
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {description && (
          <p className="text-gray-700 text-sm line-clamp-3">
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {surface_m2 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Square className="h-3 w-3" />
              {surface_m2} m²
            </Badge>
          )}
          {width_m && height_m && (
            <Badge variant="outline">
              {width_m}m × {height_m}m
            </Badge>
          )}
          {owner_type && (
            <Badge variant="secondary">
              {owner_type === 'particular' ? 'Particulier' : 
               owner_type === 'company' ? 'Entreprise' : 
               owner_type === 'association' ? 'Association' : owner_type}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            Voir les détails
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Contacter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WallCard;
