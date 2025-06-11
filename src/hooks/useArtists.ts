
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Artist {
  id: string;
  name: string;
  style: string;
  location: string;
  imageUrl: string;
  rating: number;
  specialties: string[];
  projectsCount: number;
}

export const useArtists = (filters?: { style?: string; location?: string }) => {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      console.log('Fetching artists from Supabase...')
      try {
        let query = supabase
          .from('artists')
          .select('*')
        
        // Apply filters if provided
        if (filters?.style) {
          query = query.eq('style', filters.style);
        }
        if (filters?.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Supabase error:', error)
          setArtists([])
        } else {
          console.log('Artists from Supabase:', data)
          
          // Transform data and fetch dynamic ratings
          const transformedArtists = await Promise.all(
            (data || []).map(async (artist) => {
              // Get dynamic rating from reviews
              let rating = 4.8; // default
              try {
                const { data: ratingData } = await supabase
                  .rpc('calculate_artist_rating', { artist_uuid: artist.id });
                rating = Number(ratingData) || 4.8;
              } catch (error) {
                console.error('Error fetching rating for artist:', artist.id, error);
              }

              return {
                id: artist.id,
                name: artist.name,
                style: artist.style || 'Street Art',
                location: artist.location || 'France',
                imageUrl: artist.profile_image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop',
                rating,
                specialties: [artist.style].filter(Boolean),
                projectsCount: artist.projects_count || 0
              };
            })
          );
          
          setArtists(transformedArtists)
        }
      } catch (error) {
        console.error('Error fetching artists:', error)
        setArtists([])
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [filters])

  return { artists, loading }
}
