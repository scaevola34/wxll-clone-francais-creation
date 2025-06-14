
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Artist {
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

export const useArtists = () => {
  return useQuery<Artist[]>({
    queryKey: ['artists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('visibility', true);

      if (error) throw error;
      return data as Artist[];
    },
  });
};
