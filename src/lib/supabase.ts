import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Profile {
  id: string;
  email?: string;
  nom_complet?: string;
  telephone?: string;
  localisation?: string;
  style_artistique?: string;
  biographie?: string;
  instagram_handle?: string;
  website?: string;
  experience_years?: number;
  profile_image_url?: string;
  created_at?: string;
  updated_at?: string;
}
