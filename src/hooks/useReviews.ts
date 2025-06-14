
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface Review {
  id: string;
  artist_id: string;
  reviewer_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ArtistRating {
  avg_rating: number;
  total_reviews: number;
  completed_projects: number;
}

export const useReviews = (artistId?: string) => {
  return useQuery<Review[]>({
    queryKey: ['reviews', artistId],
    queryFn: async () => {
      if (!artistId) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('artist_id', artistId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
    enabled: !!artistId,
  });
};

export const useArtistRating = (artistId?: string) => {
  return useQuery<ArtistRating>({
    queryKey: ['artist-rating', artistId],
    queryFn: async () => {
      if (!artistId) return { avg_rating: 0, total_reviews: 0, completed_projects: 0 };
      
      const { data, error } = await supabase
        .rpc('calculate_artist_stats', { artist_uuid: artistId });

      if (error) throw error;
      return data[0] as ArtistRating;
    },
    enabled: !!artistId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: {
      artist_id: string;
      reviewer_name: string;
      rating: number;
      comment?: string;
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert([reviewData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', data.artist_id] });
      queryClient.invalidateQueries({ queryKey: ['artist-rating', data.artist_id] });
      toast.success('Avis publié avec succès !');
    },
    onError: (error) => {
      toast.error('Erreur lors de la publication de l\'avis');
      console.error('Error creating review:', error);
    },
  });
};
