import { useState, useEffect } from 'react'
import { supabase, type Profile } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
    } else {
      setProfile(null)
      setLoading(false)
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) {
        // Si le profil n'existe pas, le créer
        if (error.code === 'PGRST116') {
          await createProfile()
        } else {
          throw error
        }
      } else {
        setProfile(data)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email || '',
          nom_complet: user.user_metadata?.nom_complet || user.email || ''
        })
        .select()
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la création du profil')
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      setProfile(data)
      return data
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  }
}
