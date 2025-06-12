
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iabbforluonuybwqgauo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYmJmb3JsdW9udXlid3FnYXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzM4MTAsImV4cCI6MjA2NTA0OTgxMH0.-MYwuIl_IqvAxoKe8vLFnbSifwrpdaQb0CPcdNUuSQw'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Profile {
  id: string
  email?: string
  nom_complet?: string
  telephone?: string
  localisation?: string
  style_artistique?: string
  biographie?: string
  instagram_handle?: string
  website?: string
  experience_years?: number
  profile_image_url?: string
  created_at?: string
  updated_at?: string
}
