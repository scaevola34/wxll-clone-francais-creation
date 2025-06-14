
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface Wall {
  id: string;
  Name: string;
  location_postal_code: string;
  width_m: number;
  height_m: number;
  surface_type: string;
  indoor: boolean;
  description?: string;
  image_url?: string;
  visibility: boolean;
  created_at: string;
  contact_email?: string;
}

export const useOwnerWalls = (ownerId?: string) => {
  return useQuery<Wall[]>({
    queryKey: ['owner-walls', ownerId],
    queryFn: async () => {
      if (!ownerId) return [];
      
      const { data, error } = await supabase
        .from('wall_owners')
        .select('*')
        .eq('id', ownerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Wall[];
    },
    enabled: !!ownerId,
  });
};

export const useCreateWall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (wallData: {
      id: string;
      Name: string;
      location_postal_code: string;
      width_m: number;
      height_m: number;
      surface_type: string;
      indoor: boolean;
      description?: string;
      image_url?: string;
      contact_email?: string;
    }) => {
      const { data, error } = await supabase
        .from('wall_owners')
        .insert([wallData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['owner-walls', data.id] });
      toast.success('Mur ajouté avec succès !');
    },
    onError: (error) => {
      toast.error('Erreur lors de l\'ajout du mur');
      console.error('Error creating wall:', error);
    },
  });
};

export const useUpdateWall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ wallId, wallData }: {
      wallId: string;
      wallData: Partial<Wall>;
    }) => {
      const { data, error } = await supabase
        .from('wall_owners')
        .update(wallData)
        .eq('id', wallId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['owner-walls'] });
      toast.success('Mur mis à jour avec succès !');
    },
    onError: (error) => {
      toast.error('Erreur lors de la mise à jour du mur');
      console.error('Error updating wall:', error);
    },
  });
};

export const useDeleteWall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (wallId: string) => {
      const { error } = await supabase
        .from('wall_owners')
        .delete()
        .eq('id', wallId);

      if (error) throw error;
      return wallId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owner-walls'] });
      toast.success('Mur supprimé avec succès !');
    },
    onError: (error) => {
      toast.error('Erreur lors de la suppression du mur');
      console.error('Error deleting wall:', error);
    },
  });
};
