import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, Eye, MessageSquare, Settings, Upload, Home, Users, Plus } from 'lucide-react';

const OwnerDashboard = () => {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [walls, setWalls] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchOwnerData();
      fetchWalls();
      fetchProjects();
      fetchMessages();
    }
  }, [currentUserId]);

  const getCurrentUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      if (user) {
        setCurrentUserId(user.id);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }
  };

  const fetchOwnerData = async () => {
    try {
      const { data, error } = await supabase
        .from('wall_owners')
        .select('*')
        .eq('id', currentUserId)
        .single();

      if (error) throw error;
      setOwner(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données propriétaire:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWalls = async () => {
    try {
      const { data, error } = await supabase
        .from('walls')
        .select('*')
        .eq('owner_id', currentUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWalls(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des murs:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, artists(name), walls(title)')
        .eq('owner_id', currentUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('receiver_id', currentUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  const updateProfileImage = async (imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('wall_owners')
        .update({ image_url: imageUrl })
        .eq('id', currentUserId);

      if (error) throw error;
      
      setOwner(prev => prev ? { ...prev, image_url: imageUrl } : null);
      console.log('Image de profil mise à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'image:', error);
      alert('Erreur lors de la mise à jour de l\'image');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Chargement du dashboard...</div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Aucune donnée propriétaire trouvée</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour {owner.name} !
          </h1>
          <p className="text-gray-600">
            Gérez vos murs et connectez-vous avec des artistes street art depuis votre dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo de profil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Photo de profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  currentImageUrl={owner?.image_url}
                  onImageUploaded={updateProfileImage}
                  bucket="profile-images"
                />
                <p className="text-sm text-gray-500 mt-4">
                  Ajoutez une photo de profil pour vous présenter aux artistes.
                </p>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Mes murs</p>
                      <p className="text-2xl font-bold text-gray-900">{walls.length}</p>
                    </div>
                    <Home className="h-8 w-8 text-wxll-green" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Projets</p>
                      <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-wxll-blue" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Messages</p>
                      <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mes murs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mes murs</CardTitle>
                <Link to="/ajouter-mur">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter un mur
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {walls.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {walls.slice(0, 4).map((wall) => (
                      <div key={wall.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{wall.title || 'Mur sans titre'}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {wall.location || 'Localisation non définie'}
                            </p>
                          </div>
                          <Badge 
                            variant={wall.status === 'available' ? 'default' : 'secondary'}
                          >
                            {wall.status === 'available' ? 'Disponible' : 'Occupé'}
                          </Badge>
                        </div>
                        
                        {wall.image_url && (
                          <img 
                            src={wall.image_url} 
                            alt={wall.title}
                            className="w-full h-32 object-cover rounded-md mb-3"
                          />
                        )}
                        
                        <p className="text-sm text-gray-700 mb-3">
                          {wall.description?.substring(0, 100) || 'Aucune description'}
                          {wall.description?.length > 100 && '...'}
                        </p>
                        
                        <div className="flex gap-2">
                          <Link to={`/murs/${wall.id}`}>
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </Link>
                          <Link to={`/murs/${wall.id}/edit`}>
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      Vous n'avez pas encore ajouté de mur.
                    </p>
                    <Link to="/ajouter-mur">
                      <Button>
                        Ajouter mon premier mur
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Projets récents */}
            <Card>
              <CardHeader>
                <CardTitle>Projets récents</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{project.walls?.title || 'Projet'}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Artiste: {project.artists?.name || 'Non assigné'}
                          </p>
                        </div>
                        <Badge variant="outline">{project.status || 'En cours'}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Aucun projet pour le moment. Ajoutez un mur pour commencer !
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profil rapide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Mon profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={owner.image_url || '/placeholder-owner.png'}
                      alt={owner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{owner.name}</h3>
                      <p className="text-sm text-gray-600">Propriétaire de murs</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{owner.location || 'Localisation non définie'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Home className="h-4 w-4 text-gray-400" />
                      <span>{walls.length} mur{walls.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  <Link to={`/proprietaires/${owner.id}`}>
                    <Button variant="outline" className="w-full">
                      Voir mon profil public
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/ajouter-mur">
                    <Button className="w-full">
                      Ajouter un nouveau mur
                    </Button>
                  </Link>
                  
                  <Link to="/artistes">
                    <Button variant="outline" className="w-full">
                      Explorer les artistes
                    </Button>
                  </Link>
                  
                  <Link to="/messages">
                    <Button variant="outline" className="w-full">
                      Mes messages
                    </Button>
                  </Link>
                  
                  <Link to="/settings">
                    <Button variant="outline" className="w-full">
                      Paramètres du compte
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Messages récents */}
            <Card>
              <CardHeader>
                <CardTitle>Messages récents</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.slice(0, 3).map((message, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <p className="text-sm font-medium">Nouveau message</p>
                        <p className="text-xs text-gray-500">Il y a {Math.floor(Math.random() * 24)} heures</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Aucun message récent</p>
                )}
              </CardContent>
            </Card>

            {/* Conseils */}
            <Card className="bg-wxll-light border-wxll-green">
              <CardHeader>
                <CardTitle className="text-wxll-dark">💡 Conseil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-wxll-dark">
                  Ajoutez des photos de qualité à vos murs pour attirer plus d'artistes ! 
                  Les annonces avec photos reçoivent 3x plus de demandes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
