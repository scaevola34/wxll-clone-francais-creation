
import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useAuthComplete } from '@/hooks/useAuthComplete';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Euro, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Spinner from '@/components/ui/Spinner';

export const ProjectsSection = () => {
  const { proposals, projects, loading, updateProposalStatus, updateProjectStatus } = useProjects();
  const { userType } = useAuthComplete();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size={32} />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', variant: 'secondary' as const, icon: Clock },
      accepted: { label: 'Accepté', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Refusé', variant: 'destructive' as const, icon: XCircle },
      completed: { label: 'Terminé', variant: 'default' as const, icon: CheckCircle },
      in_progress: { label: 'En cours', variant: 'secondary' as const, icon: Clock },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleProposalResponse = async (proposalId: string, status: 'accepted' | 'rejected') => {
    try {
      await updateProposalStatus(proposalId, status);
    } catch (error) {
      console.error('Erreur lors de la réponse:', error);
    }
  };

  const handleProjectUpdate = async (projectId: string, status: string) => {
    try {
      await updateProjectStatus(projectId, status);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Propositions de projets (pour les artistes) */}
      {userType === 'artist' && proposals.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Propositions reçues</h3>
          <div className="grid gap-4">
            {proposals.filter(p => p.status === 'pending').map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Par {proposal.wall_owner?.Name || 'Propriétaire'}
                      </p>
                    </div>
                    {getStatusBadge(proposal.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  {proposal.description && (
                    <p className="text-gray-700 mb-4">{proposal.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    {proposal.budget_proposed && (
                      <div className="flex items-center gap-1">
                        <Euro className="h-4 w-4" />
                        <span>{proposal.budget_proposed}€</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDistanceToNow(new Date(proposal.created_at), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </span>
                    </div>
                  </div>

                  {proposal.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleProposalResponse(proposal.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accepter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleProposalResponse(proposal.id, 'rejected')}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Refuser
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Projets en cours */}
      {projects.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Mes projets</h3>
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {userType === 'artist' 
                          ? `Avec ${project.wall_owner?.Name || 'Propriétaire'}`
                          : `Avec ${project.artist?.name || 'Artiste'}`
                        }
                      </p>
                    </div>
                    {getStatusBadge(project.status || 'in_progress')}
                  </div>
                </CardHeader>
                <CardContent>
                  {project.description && (
                    <p className="text-gray-700 mb-4">{project.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    {project.budget && (
                      <div className="flex items-center gap-1">
                        <Euro className="h-4 w-4" />
                        <span>{project.budget}€</span>
                      </div>
                    )}
                    {project.deadline && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Échéance: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {project.status === 'in_progress' && userType === 'artist' && (
                    <Button
                      onClick={() => handleProjectUpdate(project.id, 'completed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Marquer comme terminé
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Message si aucun projet */}
      {proposals.length === 0 && projects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Clock className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun projet pour le moment
          </h3>
          <p className="text-gray-600">
            {userType === 'artist' 
              ? 'Les propositions de projets apparaîtront ici.'
              : 'Vos projets créés apparaîtront ici.'
            }
          </p>
        </div>
      )}
    </div>
  );
};
