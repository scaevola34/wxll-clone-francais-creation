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
  search?: string;
}

export const useArtists = ({ search }: Params = {}) =>
  useQuery<Artist[]>({
    queryKey: ['artists', search],
    queryFn: async () => {
      let req = supabase
        .from('artists')
        .select('*');

      if (search) {
  req = req
    .not('location', 'is', null)  // Exclure les artistes sans ville
    .ilike('location', `%${search}%`);  // Rechercher dans la localisation
}

      const { data, error } = await req;
      if (error) throw error;

      return data as Artist[];
    },
  });

