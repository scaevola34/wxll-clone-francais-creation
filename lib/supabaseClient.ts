// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Profile = {
  id: string
  email: string
  nom_complet: string | null
  telephone: string | null
  localisation: string | null
  style_artistique: string | null
  biographie: string | null
  created_at: string
  updated_at: string
}
