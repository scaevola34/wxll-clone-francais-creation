import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Artist {
  id: string;
  name: string;
  style: string | null;
  location: string | null;
  profile_image_url: string | null;
  bio?: string | null;
  experience_years?: number | null;
  projects_count?: number | null;
}

interface Params {
  search?: string;          // mot-clé
}

export const useArtists = ({ search }: Params) =>
  useQuery<Artist[]>({
    queryKey: ['artists', search],
    queryFn: async () => {
      let req = supabase
        .from('artists')          // <-- ta table actuelle
        .select('*');

      if (search) {
        req = req.ilike('name', `%${search}%`);
      }

      const { data, error } = await req;
      if (error) throw error;

      /* on renvoie tel quel, ArtistCard fera la mise en forme */
      return data as Artist[];
    },
  });
