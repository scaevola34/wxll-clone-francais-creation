
import React, { useState } from 'react';
import { useAuthComplete } from '@/hooks/useAuthComplete';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Palette, 
  MessageSquare, 
  FolderOpen, 
  Bell,
  Edit,
  Eye,
  Heart,
  Star,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';
import { ProjectsSection } from './ProjectsSection';
import Spinner from '@/components/ui/Spinner';

export const ArtistDashboard = () => {
  const { user, loading } = useAuthComplete();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={48} />
      </div>
    );
  }

  // Mock data - à remplacer par de vraies données depuis l'API
  const artistStats = {
    totalProjects: 12,
    pendingProposals: 3,
    completedProjects: 9,
    rating: 4.8,
    reviews: 24,
    profileViews: 156
  };

  const recentProjects = [
    {
      id: 1,
      title: "Fresque Murale École",
      status: "completed",
      client: "Mairie de Lyon",
      completedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Art Urbain Centre Commercial",
      status: "in_progress",
      client: "Groupe Immobilier",
      startedAt: "2024-01-20"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord Artiste
          </h1>
          <p className="text-gray-600">
            Bienvenue {user?.email} ! Gérez votre profil et vos projets.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Projets totaux</p>
                  <p className="text-2xl font-bold text-gray-900">{artistStats.totalProjects}</p>
                </div>
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Propositions en attente</p>
                  <p className="text-2xl font-bold text-orange-600">{artistStats.pendingProposals}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold text-yellow-600">{artistStats.rating}/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vues du profil</p>
                  <p className="text-2xl font-bold text-blue-600">{artistStats.profileViews}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Mes Projets
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Projets récents */}
            <Card>
              <CardHeader>
                <CardTitle>Projets récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-gray-600">{project.client}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                          {project.status === 'completed' ? 'Terminé' : 'En cours'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Modifier profil
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Ajouter projet
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Messages
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des projets</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsSection />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Mon Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Palette className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Portfolio en construction</h3>
                  <p className="text-gray-600 mb-4">
                    Ajoutez vos œuvres pour montrer votre talent aux propriétaires.
                  </p>
                  <Button>
                    <Palette className="h-4 w-4 mr-2" />
                    Ajouter une œuvre
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messagerie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message</h3>
                  <p className="text-gray-600 mb-4">
                    Vos conversations avec les propriétaires apparaîtront ici.
                  </p>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Voir tous les messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
