
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Wall {
  id: string;
  title: string | null;
  location: string | null;
  surface_m2: number | null;
  type: string | null;
  image_url: string | null;
  Name?: string;
  description?: string;
  indoor?: boolean;
  width_m?: number;
  height_m?: number;
  owner_type?: string;
  contact_email?: string;
}

export const useWalls = () => {
  return useQuery<Wall[]>({
    queryKey: ['walls'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wall_owners')
        .select('*')
        .eq('visibility', true);

      if (error) throw error;
      
      return (data || []).map(wall => ({
        id: wall.id,
        title: wall.Name,
        location: wall.location_postal_code,
        surface_m2: wall.surface_area_m2,
        type: wall.surface_type,
        image_url: wall.image_url,
        Name: wall.Name,
        description: wall.description,
        indoor: wall.indoor,
        width_m: wall.width_m,
        height_m: wall.height_m,
        owner_type: wall.owner_type,
        contact_email: wall.contact_email,
      }));
    },
  });
};
