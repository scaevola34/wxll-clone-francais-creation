
import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Send } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectProposalFormProps {
  artistId?: string;
  artistName?: string;
}

export const ProjectProposalForm = ({ artistId, artistName }: ProjectProposalFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { createProposal } = useProjects();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!artistId) {
      toast.error('Artiste non sélectionné');
      return;
    }

    if (!title.trim() || !description.trim() || !budget) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      await createProposal(artistId, title, description, parseInt(budget));
      
      toast.success('Proposition envoyée avec succès !');
      setIsOpen(false);
      setTitle('');
      setDescription('');
      setBudget('');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la proposition');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const trigger = artistId ? (
    <Button className="w-full">
      <Send className="h-4 w-4 mr-2" />
      Proposer un projet à {artistName}
    </Button>
  ) : (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Nouvelle proposition
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {artistId ? `Proposer un projet à ${artistName}` : 'Nouvelle proposition de projet'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du projet *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Fresque murale pour école primaire"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du projet *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre projet, vos attentes, le lieu, les contraintes..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget proposé (€) *</Label>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Ex: 2500"
              min="1"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Envoi...' : 'Envoyer la proposition'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
