
import React from 'react';
import { useOwnerProposals } from '@/hooks/useOwnerProposals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Calendar, Euro, MapPin, Palette } from 'lucide-react';
import { ProposalSkeleton } from '@/components/ui/loading-skeletons';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getErrorMessage } from '@/utils/errorMessages';
import { toast } from 'sonner';

interface OwnerProposalsSectionProps {
  ownerId: string;
}

export const OwnerProposalsSection: React.FC<OwnerProposalsSectionProps> = ({ ownerId }) => {
  const { data: proposals = [], isLoading, error } = useOwnerProposals(ownerId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'rejected': return 'Refusée';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          Propositions Reçues
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProposalSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          Propositions Reçues
        </h2>
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-red-600 mb-4">
              {getErrorMessage(error)}
            </p>
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingProposals = proposals.filter(p => p.status === 'pending');
  const otherProposals = proposals.filter(p => p.status !== 'pending');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        Propositions Reçues ({proposals.length})
      </h2>

      {proposals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucune proposition</h3>
            <p className="text-gray-400">Les propositions d'artistes apparaîtront ici.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Propositions en attente */}
          {pendingProposals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-700">
                En attente de réponse ({pendingProposals.length})
              </h3>
              <div className="space-y-4">
                {pendingProposals.map((proposal) => (
                  <Card key={proposal.id} className="border-l-4 border-l-yellow-400">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={proposal.artist?.profile_image_url} />
                            <AvatarFallback className="bg-purple-100 text-purple-700">
                              {proposal.artist?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-lg">{proposal.title}</h4>
                            <p className="text-gray-600">par {proposal.artist?.name}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              {proposal.artist?.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {proposal.artist.location}
                                </span>
                              )}
                              {proposal.artist?.style && (
                                <span className="flex items-center gap-1">
                                  <Palette className="h-3 w-3" />
                                  {proposal.artist.style}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusText(proposal.status)}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatDistanceToNow(new Date(proposal.created_at), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </p>
                        </div>
                      </div>

                      {proposal.description && (
                        <p className="text-gray-700 mb-4">{proposal.description}</p>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          {proposal.budget_proposed && (
                            <div className="flex items-center gap-1 text-green-600 font-semibold">
                              <Euro className="h-4 w-4" />
                              {proposal.budget_proposed}€
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Voir le profil
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Contacter
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => toast.success('Fonctionnalité bientôt disponible')}
                          >
                            Accepter
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => toast.success('Fonctionnalité bientôt disponible')}
                          >
                            Refuser
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Autres propositions */}
          {otherProposals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Historique ({otherProposals.length})
              </h3>
              <div className="space-y-4">
                {otherProposals.map((proposal) => (
                  <Card key={proposal.id} className="opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={proposal.artist?.profile_image_url} />
                            <AvatarFallback className="bg-purple-100 text-purple-700">
                              {proposal.artist?.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{proposal.title}</h4>
                            <p className="text-sm text-gray-600">par {proposal.artist?.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusText(proposal.status)}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDistanceToNow(new Date(proposal.updated_at), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
