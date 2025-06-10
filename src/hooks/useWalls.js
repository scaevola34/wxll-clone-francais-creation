import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useWalls = () => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalls = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('wall_owners')
          .select('*');

        if (error) {
          throw error;
        }

        // Transform the data to match our component props
        const transformedWalls = data?.map(wall => ({
          id: wall.id,
          title: wall.description || 'Mur disponible',
          location: wall.location_postal_code || 'Location non spécifiée',
          size: `${wall.width_m || 0}m x ${wall.height_m || 0}m`,
          imageUrl: wall.photo_urls?.[0] || 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop',
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
  }, []);

  return { walls, loading, error };
};
