import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Wall {
  id: string;
  title: string;
  location: string;
  size: string;
  imageUrl: string;
  budget: string;
  surface_type?: string;
  indoor: boolean;
  owner_type?: string;
}

export const useWalls = (filters?: { 
  location?: string; 
  surface_type?: string; 
  indoor?: boolean; 
  budget_min?: number; 
  budget_max?: number; 
  owner_type?: string;
}) => {
  const [walls, setWalls] = useState<Wall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchWalls = async () => {
      try {
        setLoading(true);
        
        let query = supabase
          .from('wall_owners')
          .select('*');

        // Apply filters if provided
        if (filters?.location) {
          query = query.ilike('location_postal_code', `%${filters.location}%`);
        }
        if (filters?.surface_type) {
          query = query.eq('surface_type', filters.surface_type);
        }
        if (filters?.indoor !== undefined) {
          query = query.eq('indoor', filters.indoor);
        }
        if (filters?.budget_min) {
          query = query.gte('budget_min', filters.budget_min);
        }
        if (filters?.budget_max) {
          query = query.lte('budget_max', filters.budget_max);
        }
        if (filters?.owner_type) {
          query = query.eq('owner_type', filters.owner_type);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        // Transform the data to match our component props
        const transformedWalls = data?.map(wall => ({
          id: wall.id,
          title: wall.description || 'Mur disponible',
          location: wall.location_postal_code || 'Location non spécifiée',
          size: `${wall.width_m || 0}m x ${wall.height_m || 0}m`,
          imageUrl: wall.photo_urls?.[0] || wall.image_url || 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
          budget: wall.budget_min && wall.budget_max 
            ? `${wall.budget_min}€ - ${wall.budget_max}€` 
            : 'Budget à discuter',
          surface_type: wall.surface_type,
          indoor: wall.indoor,
          owner_type: wall.owner_type
        })) || [];

        setWalls(transformedWalls);
      } catch (error) {
        console.error('Error fetching walls:', error);
        setError(error);
        // Keep empty array as fallback
        setWalls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWalls();
  }, [filters]);

  return { walls, loading, error };
};
