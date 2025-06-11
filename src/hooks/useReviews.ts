
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Review {
  id: string;
  artist_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export const useReviews = (artistId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState<number>(4.8);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!artistId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch reviews for the artist
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('artist_id', artistId)
          .order('created_at', { ascending: false });

        if (reviewsError) {
          console.error('Error fetching reviews:', reviewsError);
          return;
        }

        setReviews(reviewsData || []);

        // Calculate average rating using the database function
        const { data: ratingData, error: ratingError } = await supabase
          .rpc('calculate_artist_rating', { artist_uuid: artistId });

        if (ratingError) {
          console.error('Error calculating rating:', ratingError);
        } else {
          setAverageRating(Number(ratingData) || 4.8);
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [artistId]);

  const addReview = async (reviewerName: string, rating: number, comment: string) => {
    if (!artistId) return;

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          artist_id: artistId,
          reviewer_name: reviewerName,
          rating,
          comment
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding review:', error);
        return false;
      }

      // Refresh reviews and rating
      setReviews(prev => [data, ...prev]);
      
      // Recalculate average
      const { data: ratingData } = await supabase
        .rpc('calculate_artist_rating', { artist_uuid: artistId });
      
      setAverageRating(Number(ratingData) || 4.8);
      
      return true;
    } catch (error) {
      console.error('Error adding review:', error);
      return false;
    }
  };

  return { reviews, loading, averageRating, addReview };
};
