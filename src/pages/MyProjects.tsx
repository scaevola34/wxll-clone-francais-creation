
import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Euro, 
  Calendar,
  Plus,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const MyProjects = () => {
  const { proposals, projects, loading, updateProposalStatus, updateProjectStatus, createProposal } = useProjects();
  const { userType } = useAuth();
  const { toast } = useToast();
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    budget: '',
    artistId: ''
  });
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const, icon: Clock },
      accepted: { label: 'Accepté', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Refusé', variant: 'destructive' as const, icon: XCircle },
      completed: { label: 'Terminé', variant: 'default' as const, icon: CheckCircle },
      in_progress: { label: 'En cours', variant: 'default' as const, icon: Clock }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;

    return (
      <Badge variant={config?.variant || 'secondary'} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config?.label || status}
      </Badge>
    );
  };

  const handleStatusUpdate = async (type: 'proposal' | 'project', id: string, status: string) => {
    try {
      if (type === 'proposal') {
        await updateProposalStatus(id, status as 'accepted' | 'rejected');
      } else {
        await updateProjectStatus(id, status);
      }
      
      toast({
        title: "Statut mis à jour",
        description: "Le statut a été mis à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut.",
        variant: "destructive",
      });
    }
  };

  const handleCreateProposal = async () => {
    try {
      await createProposal(
        newProposal.artistId,
        newProposal.title,
        newProposal.description,
        parseInt(newProposal.budget)
      );
      
      setNewProposal({ title: '', description: '', budget: '', artistId: '' });
      setShowCreateDialog(false);
      
      toast({
        title: "Proposition créée",
        description: "Votre proposition a été envoyée à l'artiste.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la proposition.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Projets</h1>
          <p className="text-gray-600">
            {userType === 'artist' 
              ? 'Gérez vos propositions et projets en cours' 
              : 'Suivez vos demandes et projets avec les artistes'
            }
          </p>
        </div>
        
        {userType === 'owner' && (
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle proposition
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer une proposition</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre du projet</Label>
                  <Input
                    id="title"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Fresque murale pour école"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProposal.description}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez votre projet..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget proposé (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newProposal.budget}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, budget: e.target.value }))}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="artistId">ID Artiste</Label>
                  <Input
                    id="artistId"
                    value={newProposal.artistId}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, artistId: e.target.value }))}
                    placeholder="ID de l'artiste"
                  />
                </div>
                <Button 
                  onClick={handleCreateProposal}
                  disabled={!newProposal.title || !newProposal.artistId}
                  className="w-full"
                >
                  Envoyer la proposition
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="proposals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="proposals" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Propositions ({proposals.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Projets ({projects.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FolderOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune proposition</h3>
                <p className="text-gray-500">
                  {userType === 'artist' 
                    ? 'Vous n\'avez reçu aucune proposition pour le moment.' 
                    : 'Vous n\'avez créé aucune proposition pour le moment.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      {getStatusBadge(proposal.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {userType === 'artist' 
                        ? `Par ${proposal.wall_owner?.Name || 'Propriétaire'}` 
                        : `Pour ${proposal.artist?.name || 'Artiste'}`
                      }
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {proposal.description && (
                      <p className="text-gray-700 text-sm">{proposal.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm">
                      {proposal.budget_proposed && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Euro className="h-4 w-4" />
                          {proposal.budget_proposed}€
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDistanceToNow(new Date(proposal.created_at), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </div>
                    </div>

                    {userType === 'artist' && proposal.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate('proposal', proposal.id, 'accepted')}
                          className="flex-1"
                        >
                          Accepter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate('proposal', proposal.id, 'rejected')}
                          className="flex-1"
                        >
                          Refuser
                        </Button>
                      </div>
                    )}

                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {projects.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun projet</h3>
                <p className="text-gray-500">
                  Vos projets acceptés apparaîtront ici.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      {getStatusBadge(project.status || 'in_progress')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {userType === 'artist' 
                        ? `Par ${project.wall_owner?.Name || 'Propriétaire'}` 
                        : `Avec ${project.artist?.name || 'Artiste'}`
                      }
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.description && (
                      <p className="text-gray-700 text-sm">{project.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm">
                      {project.budget && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Euro className="h-4 w-4" />
                          {project.budget}€
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDistanceToNow(new Date(project.created_at), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </div>
                    </div>

                    {project.deadline && (
                      <div className="text-sm text-orange-600">
                        Échéance: {new Date(project.deadline).toLocaleDateString('fr-FR')}
                      </div>
                    )}

                    {project.status !== 'completed' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate('project', project.id, 'completed')}
                        className="w-full"
                      >
                        Marquer comme terminé
                      </Button>
                    )}

                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyProjects;
