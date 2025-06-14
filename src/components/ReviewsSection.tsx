
import React from 'react';
import { useReviews, useArtistRating } from '@/hooks/useReviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, Award } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReviewsSectionProps {
  artistId: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ artistId }) => {
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews(artistId);
  const { data: rating, isLoading: ratingLoading } = useArtistRating(artistId);

  if (reviewsLoading || ratingLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-24 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.round(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            Évaluations et Avis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {rating?.avg_rating?.toFixed(1) || '0.0'}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {renderStars(rating?.avg_rating || 0)}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div>{rating?.total_reviews || 0} avis</div>
                <div>{rating?.completed_projects || 0} projets terminés</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Avis des clients ({reviews.length})
        </h3>
        
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Aucun avis pour le moment</p>
              <p className="text-sm text-gray-400">Les premiers avis apparaîtront ici après les projets terminés</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{review.reviewer_name}</div>
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(review.created_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {review.rating}/5
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.rating)}
                </div>
                
                {review.comment && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{review.comment}"
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
