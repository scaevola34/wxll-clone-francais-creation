
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface ProposalWithArtist {
  id: string;
  title: string;
  description?: string;
  budget_proposed?: number;
  status: string;
  created_at: string;
  updated_at: string;
  artist_id: string;
  wall_owner_id: string;
  artist?: {
    id: string;
    name: string;
    profile_image_url?: string;
    style?: string;
    location?: string;
  };
}

export const useOwnerProposals = (ownerId?: string) => {
  return useQuery<ProposalWithArtist[]>({
    queryKey: ['owner-proposals', ownerId],
    queryFn: async () => {
      if (!ownerId) return [];
      
      const { data, error } = await supabase
        .from('project_proposals')
        .select(`
          *,
          artist:artists(
            id,
            name,
            profile_image_url,
            style,
            location
          )
        `)
        .eq('wall_owner_id', ownerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProposalWithArtist[];
    },
    enabled: !!ownerId,
  });
};
