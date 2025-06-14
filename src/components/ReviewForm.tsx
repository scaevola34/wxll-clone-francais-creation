
import React, { useState } from 'react';
import { useCreateReview } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewFormProps {
  artistId: string;
  artistName: string;
  projectId?: string;
  onSuccess?: () => void;
}

export const ReviewForm = ({ artistId, artistName, projectId, onSuccess }: ReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const createReview = useCreateReview();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewerName.trim() || rating === 0) {
      return;
    }

    try {
      await createReview.mutateAsync({
        artist_id: artistId,
        reviewer_name: reviewerName,
        rating,
        comment: comment.trim() || undefined,
      });
      
      setIsOpen(false);
      setReviewerName('');
      setRating(0);
      setComment('');
      onSuccess?.();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const renderStarRating = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <button
          key={i}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(starValue)}
        >
          <Star
            className={`h-8 w-8 transition-colors cursor-pointer ${
              starValue <= (hoveredRating || rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <MessageSquare className="h-4 w-4 mr-2" />
          Laisser un avis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Évaluer {artistName}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="reviewer-name">Votre nom *</Label>
            <Input
              id="reviewer-name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Ex: Marie Dupont"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Note globale *</Label>
            <div className="flex items-center gap-2">
              {renderStarRating()}
              <span className="text-sm text-gray-600 ml-2">
                {rating > 0 ? `${rating}/5` : 'Cliquez pour noter'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Commentaire (optionnel)</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Partagez votre expérience avec cet artiste..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={createReview.isPending}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={createReview.isPending || !reviewerName.trim() || rating === 0}
            >
              {createReview.isPending ? 'Publication...' : 'Publier l\'avis'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
