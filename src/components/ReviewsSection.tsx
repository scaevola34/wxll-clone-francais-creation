
import React, { useState } from 'react';
import { Star, User, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReviews } from '@/hooks/useReviews';

interface ReviewsSectionProps {
  artistId: string;
  artistName: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ artistId, artistName }) => {
  const { reviews, loading, averageRating, addReview } = useReviews(artistId);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    reviewerName: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await addReview(
      newReview.reviewerName,
      newReview.rating,
      newReview.comment
    );

    if (success) {
      setNewReview({ reviewerName: '', rating: 5, comment: '' });
      setShowAddReview(false);
    }

    setSubmitting(false);
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">Chargement des avis...</div>
      </div>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2 gradient-artist">Avis clients</h2>
          <div className="flex items-center gap-4">
            {renderStars(Math.round(averageRating), 'lg')}
            <span className="text-xl font-semibold text-wxll-artist">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              ({reviews.length} avis)
            </span>
          </div>
        </div>
        
        <Button
          onClick={() => setShowAddReview(!showAddReview)}
          className="btn-artist flex items-center gap-2"
        >
          {showAddReview ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddReview ? 'Annuler' : 'Laisser un avis'}
        </Button>
      </div>

      {/* Add Review Form */}
      {showAddReview && (
        <Card className="mb-6 border-wxll-artist/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Laisser un avis pour {artistName}
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Votre nom</label>
                <Input
                  type="text"
                  value={newReview.reviewerName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, reviewerName: e.target.value }))}
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Note</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {newReview.rating}/5
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Commentaire</label>
                <Textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Partagez votre expérience avec cet artiste..."
                  rows={4}
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  disabled={submitting || !newReview.reviewerName.trim()}
                  className="btn-artist"
                >
                  {submitting ? 'Publication...' : 'Publier l\'avis'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddReview(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Aucun avis pour le moment</p>
          <p className="text-sm">Soyez le premier à laisser un avis !</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="border-0 shadow-md bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-wxll-artist/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-wxll-artist" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.reviewer_name}</h4>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {review.comment && (
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
