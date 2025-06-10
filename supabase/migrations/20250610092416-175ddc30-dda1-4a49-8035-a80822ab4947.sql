
-- First, let's add missing columns to the artists table to match Julie Dubois profile
ALTER TABLE public.artists 
ADD COLUMN IF NOT EXISTS style TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS projects_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS experience_years INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Create a table for artist previous works/projects
CREATE TABLE IF NOT EXISTS public.artist_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT,
  image_url TEXT,
  year INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a projects table for tracking all completed projects (for stats)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artists(id),
  wall_owner_id UUID REFERENCES public.wall_owners(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'completed',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.artist_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for artist_projects (publicly readable for portfolios)
CREATE POLICY "Artist projects are viewable by everyone" 
  ON public.artist_projects 
  FOR SELECT 
  USING (true);

CREATE POLICY "Artists can manage their own projects" 
  ON public.artist_projects 
  FOR ALL 
  USING (true);

-- Create RLS policies for projects (publicly readable for stats)
CREATE POLICY "Projects are viewable by everyone" 
  ON public.projects 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can manage projects" 
  ON public.projects 
  FOR ALL 
  USING (true);

-- Insert sample data for Julie Dubois to match the profile
INSERT INTO public.artists (
  id,
  name,
  instagram_handle,
  style,
  location,
  bio,
  description,
  projects_count,
  experience_years,
  website,
  profile_image_url,
  contact_email
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Julie Dubois',
  '@julie_dubois_art',
  'Art Urbain',
  'Toulouse',
  'Artiste urbaine passionnée par la création de fresques colorées et engagées.',
  'Artiste urbaine passionnée par la création de fresques colorées et engagées. Spécialisée dans l''art urbain contemporain avec une touche de street art traditionnel.',
  25,
  5,
  'https://julie-dubois-art.fr',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1964&auto=format&fit=crop',
  'julie@example.com'
) ON CONFLICT (id) DO UPDATE SET
  instagram_handle = EXCLUDED.instagram_handle,
  style = EXCLUDED.style,
  location = EXCLUDED.location,
  bio = EXCLUDED.bio,
  description = EXCLUDED.description,
  projects_count = EXCLUDED.projects_count,
  experience_years = EXCLUDED.experience_years,
  website = EXCLUDED.website,
  profile_image_url = EXCLUDED.profile_image_url;

-- Insert sample previous works for Julie Dubois
INSERT INTO public.artist_projects (
  artist_id,
  title,
  location,
  image_url,
  year,
  description
) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Fresque Murales École Primaire',
  'Toulouse Centre',
  'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?q=80&w=1964&auto=format&fit=crop',
  2024,
  'Création d''une fresque colorée représentant la nature et les animaux pour égayer la cour de récréation.'
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Mur Commercial Quartier Saint-Cyprien',
  'Toulouse',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1964&auto=format&fit=crop',
  2023,
  'Œuvre abstraite aux couleurs vives pour dynamiser l''entrée d''un centre commercial.'
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Passage Souterrain Métro',
  'Station Capitole',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1964&auto=format&fit=crop',
  2023,
  'Transformation d''un passage souterrain en galerie d''art urbain avec des motifs géométriques.'
);

-- Insert some sample projects for stats
INSERT INTO public.projects (artist_id, wall_owner_id, title, description, status, completed_at)
SELECT 
  '550e8400-e29b-41d4-a716-446655440000',
  NULL,
  'Projet ' || generate_series,
  'Description du projet ' || generate_series,
  'completed',
  NOW() - (generate_series || ' days')::INTERVAL
FROM generate_series(1, 25);

-- Add some additional sample projects without specific artists (for total count)
INSERT INTO public.projects (title, description, status, completed_at)
SELECT 
  'Projet Communautaire ' || generate_series,
  'Description du projet communautaire ' || generate_series,
  'completed',
  NOW() - (generate_series || ' days')::INTERVAL
FROM generate_series(26, 1200);
