import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useArtists = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      console.log('Fetching artists from Supabase...')
      const { data, error } = await supabase
        .from('artists')
        .select('*')
      
      if (error) {
        console.error('Supabase error:', error)
      } else {
        console.log('Artists from Supabase:', data)
        setArtists(data)
      }
      setLoading(false)
    }

    fetchArtists()
  }, [])

  return { artists, loading }
}
