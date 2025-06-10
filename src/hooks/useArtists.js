import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export const useArtists = (filters = {}) => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchArtists()
  }, [filters])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching artists from Supabase...')
      
      // Requête de base avec l'image de profil
      let query = supabase
        .from('artists')
        .select(`
          *,
          profile_image_url
        `)

      // Application des filtres si fournis
      if (filters.style && filters.style.length > 0) {
        query = query.in('style', filters.style)
      }
      
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }
      
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,bio.ilike.%${filters.search}%`)
      }

      // Ordre par défaut : plus récents en premier
      query = query.order('created_at', { ascending: false })
      
      const { data, error } = await query
      
      if (error) {
        console.error('Supabase error:', error)
        setError(error.message)
        return
      }

      // Traitement des données : ajouter imageUrl pour compatibilité
      const processedArtists = (data || []).map(artist => ({
        ...artist,
        // Assurer la compatibilité avec les composants existants
        imageUrl: artist.profile_image_url || '/placeholder-artist.png',
        // Calculer une note par défaut si pas de reviews
        rating: artist.rating || (4 + Math.random()).toFixed(1)
      }))

      console.log('Artists from Supabase:', processedArtists)
      setArtists(processedArtists)
      
    } catch (error) {
      console.error('Error fetching artists:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour récupérer un artiste spécifique
  const getArtistById = async (id) => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select(`
          *,
          profile_image_url
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      return {
        ...data,
        imageUrl: data.profile_image_url || '/placeholder-artist.png',
        rating: data.rating || (4 + Math.random()).toFixed(1)
      }
    } catch (error) {
      console.error('Error fetching artist by ID:', error)
      return null
    }
  }

  // Fonction pour mettre à jour un artiste (utile pour les dashboards)
  const updateArtist = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('artists')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Mettre à jour l'état local
      setArtists(prev => prev.map(artist => 
        artist.id === id 
          ? { 
              ...artist, 
              ...data,
              imageUrl: data.profile_image_url || '/placeholder-artist.png'
            }
          : artist
      ))

      return data
    } catch (error) {
      console.error('Error updating artist:', error)
      throw error
    }
  }

  return { 
    artists, 
    loading, 
    error, 
    getArtistById, 
    updateArtist,
    refetch: fetchArtists 
  }
}
