import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useArtists = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      console.log('Récupération des artistes...')
      const { data, error } = await supabase
        .from('Artist')
        .select('*, Walls(*)')
      
      if (error) {
        console.error('Erreur:', error)
      } else {
        console.log('Artistes récupérés:', data)
        setArtists(data)
      }
      setLoading(false)
    }

    fetchArtists()
  }, [])

  return { artists, loading }
}
