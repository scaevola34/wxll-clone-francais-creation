
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useArtists = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      console.log('Fetching artists from Supabase...')
      try {
        const { data, error } = await supabase
          .from('artists')
          .select('*')
        
        if (error) {
          console.error('Supabase error:', error)
          setArtists([])
        } else {
          console.log('Artists from Supabase:', data)
          // Transform data to match the interface expected by components
          const transformedArtists = data?.map(artist => ({
            id: artist.id,
            name: artist.name,
            style: artist.style || 'Street Art',
            location: artist.location || 'France',
            imageUrl: artist.profile_image_url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop',
            rating: 4.8, // Could be calculated from reviews later
            specialties: [artist.style].filter(Boolean),
            projectsCount: artist.projects_count || 0
          })) || []
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
  }, [])

  return { artists, loading }
}
