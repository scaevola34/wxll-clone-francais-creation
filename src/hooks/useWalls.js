import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useWalls = (filters = {}) => {
  const [walls, setWalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWalls();
  }, [filters]);

  const fetchWalls = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching walls from Supabase...');
      
      // Requête de base avec l'image
      let query = supabase
        .from('wall_owners')
        .select('*');

      // Application des filtres si fournis
      if (filters.location) {
        query = query.ilike('location_postal_code', `%${filters.location}%`);
      }
      
      if (filters.surface_type) {
        query = query.eq('surface_type', filters.surface_type);
      }
      
      if (filters.owner_type) {
        query = query.eq('owner_type', filters.owner_type);
      }
      
      if (filters.indoor !== undefined) {
        query = query.eq('indoor', filters.indoor);
      }
      
      if (filters.budget_min) {
        query = query.gte('budget_min', filters.budget_min);
      }
      
      if (filters.budget_max) {
        query = query.lte('budget_max', filters.budget_max);
      }
      
      if (filters.search) {
        query = query.or(`description.ilike.%${filters.search}%,location_postal_code.ilike.%${filters.search}%`);
      }

      // Ordre par défaut : plus récents en premier
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform the data to match our component props + intégrer les nouvelles images
      const transformedWalls = data?.map(wall => ({
        id: wall.id,
        title: wall.description || 'Mur disponible',
        location: wall.location_postal_code || 'Location non spécifiée',
        size: `${wall.width_m || 0}m x ${wall.height_m || 0}m`,
        // Priorité : image_url (nouvelle) puis photo_urls puis placeholder
        imageUrl: wall.image_url || 
                 wall.photo_urls?.[0] || 
                 '/placeholder-wall.png',
        budget: wall.budget_min && wall.budget_max 
          ? `${wall.budget_min}€ - ${wall.budget_max}€` 
          : 'Budget à discuter',
        surface_type: wall.surface_type,
        indoor: wall.indoor,
        owner_type: wall.owner_type,
        // Données complètes pour les détails
        description: wall.description,
        width_m: wall.width_m,
        height_m: wall.height_m,
        budget_min: wall.budget_min,
        budget_max: wall.budget_max,
        photo_urls: wall.photo_urls,
        image_url: wall.image_url, // Nouvelle colonne pour l'upload
        owner_name: wall.name,
        owner_email: wall.email,
        created_at: wall.created_at
      })) || [];

      console.log('Walls from Supabase:', transformedWalls);
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

  // Fonction pour récupérer un mur spécifique
  const getWallById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('wall_owners')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Même transformation que dans fetchWalls
      return {
        id: data.id,
        title: data.description || 'Mur disponible',
        location: data.location_postal_code || 'Location non spécifiée',
        size: `${data.width_m || 0}m x ${data.height_m || 0}m`,
        imageUrl: data.image_url || 
                 data.photo_urls?.[0] || 
                 '/placeholder-wall.png',
        budget: data.budget_min && data.budget_max 
          ? `${data.budget_min}€ - ${data.budget_max}€` 
          : 'Budget à discuter',
        surface_type: data.surface_type,
        indoor: data.indoor,
        owner_type: data.owner_type,
        description: data.description,
        width_m: data.width_m,
        height_m: data.height_m,
        budget_min: data.budget_min,
        budget_max: data.budget_max,
        photo_urls: data.photo_urls,
        image_url: data.image_url,
        owner_name: data.name,
        owner_email: data.email,
        created_at: data.created_at
      };
    } catch (error) {
      console.error('Error fetching wall by ID:', error);
      return null;
    }
  };

  // Fonction pour mettre à jour un mur
  const updateWall = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('wall_owners')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Mettre à jour l'état local
      await fetchWalls(); // Refetch pour garder la cohérence

      return data;
    } catch (error) {
      console.error('Error updating wall:', error);
      throw error;
    }
  };

  return { 
    walls, 
    loading, 
    error, 
    getWallById, 
    updateWall,
    refetch: fetchWalls 
  };
};
