
-- Create reviews table for dynamic artist ratings
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_id UUID NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key constraint to link reviews to artists (only if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'reviews_artist_id_fkey'
  ) THEN
    ALTER TABLE public.reviews 
    ADD CONSTRAINT reviews_artist_id_fkey 
    FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS on reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews (drop if exists first)
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;

CREATE POLICY "Anyone can view reviews" 
  ON public.reviews 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can create reviews" 
  ON public.reviews 
  FOR INSERT 
  WITH CHECK (true);

-- Create storage buckets only if they don't exist
INSERT INTO storage.buckets (id, name, public) 
SELECT 'artist-images', 'artist-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'artist-images');

INSERT INTO storage.buckets (id, name, public) 
SELECT 'wall-images', 'wall-images', true
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'wall-images');

-- Drop existing storage policies and recreate them
DROP POLICY IF EXISTS "Anyone can view artist images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload artist images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update artist images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete artist images" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can view wall images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload wall images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update wall images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete wall images" ON storage.objects;

-- Create storage policies for artist images
CREATE POLICY "Anyone can view artist images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artist-images');

CREATE POLICY "Anyone can upload artist images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artist-images');

CREATE POLICY "Anyone can update artist images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'artist-images');

CREATE POLICY "Anyone can delete artist images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'artist-images');

-- Create storage policies for wall images
CREATE POLICY "Anyone can view wall images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wall-images');

CREATE POLICY "Anyone can upload wall images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'wall-images');

CREATE POLICY "Anyone can update wall images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'wall-images');

CREATE POLICY "Anyone can delete wall images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'wall-images');

-- Add function to calculate average rating for artists
CREATE OR REPLACE FUNCTION public.calculate_artist_rating(artist_uuid UUID)
RETURNS DECIMAL(3,2)
LANGUAGE plpgsql
AS $$
DECLARE
  avg_rating DECIMAL(3,2);
BEGIN
  SELECT COALESCE(AVG(rating::DECIMAL), 4.8) INTO avg_rating
  FROM public.reviews
  WHERE artist_id = artist_uuid;
  
  RETURN avg_rating;
END;
$$;

-- Insert sample reviews for testing
INSERT INTO public.reviews (artist_id, reviewer_name, rating, comment)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Marie Dubois', 5, 'Travail exceptionnel, très professionnelle et créative!'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Pierre Martin', 4, 'Belle réalisation, respecte les délais.'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Sophie Leroux', 5, 'Artiste talentueuse, je recommande vivement!');
