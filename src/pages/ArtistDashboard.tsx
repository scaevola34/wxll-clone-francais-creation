import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/ui/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, Eye, MessageSquare, Settings, Upload } from 'lucide-react';

const ArtistDashboard = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchArtistData();
    fetchProjects();
    fetchMessages();
  }, []);

  const fetchArtistData = async () => {
    try {
      // Remplace 'ARTIST_ID' par l'ID réel de l'artiste connecté
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', 'ARTIST_ID') // À remplacer par l'ID de l'utilisateur connecté
        .single();

      if (error) throw error;
      setArtist(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données artiste:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      // Cette requête sera à adapter selon ta structure de table projects
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('artist_id', 'ARTIST_ID'); // À remplacer par l'ID de l'utilisateur connecté

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      // Cette requête sera à adapter selon ta structure de table messages
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('receiver_id', 'ARTIST_ID') // À remplacer par l'ID de l'utilisateur connecté
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
        .from('artists')
        .update({ profile_image_url: imageUrl })
        .eq('id', 'ARTIST_ID'); // À remplacer par l'ID de l'utilisateur connecté

      if (error) throw error;
      
      // Mettre à jour l'état local
      setArtist(prev => prev ? { ...prev, profile_image_url: imageUrl } : null);
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

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Aucune donnée artiste trouvée</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour {artist.name} !
          </h1>
          <p className="text-gray-600">
            Gérez votre profil et suivez vos projets depuis votre dashboard.
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
                  currentImageUrl={artist?.profile_image_url}
                  onImageUploaded={updateProfileImage}
                  bucket="profile-images"
                />
                <p className="text-sm text-gray-500 mt-4">
                  Ajoutez une photo de profil pour vous présenter aux propriétaires de murs.
                </p>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Projets</p>
                      <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-wxll-green" />
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
                    <MessageSquare className="h-8 w-8 text-wxll-blue" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projets récents */}
            <Card>
              <CardHeader>
                <CardTitle>Projets récents</CardTitle>
              </CardHeader>
              <CardContent>
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold">Projet #{index + 1}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Localisation du projet
                          </p>
                        </div>
                        <Badge variant="outline">En cours</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Aucun projet pour le moment. Explorez les murs disponibles !
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
                      src={artist.profile_image_url || '/placeholder-artist.png'}
                      alt={artist.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{artist.name}</h3>
                      <p className="text-sm text-gray-600">{artist.style || 'Style non défini'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{artist.location || 'Localisation non définie'}</span>
                    </div>
                  </div>

                  <Link to={`/artistes/${artist.id}`}>
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
                  <Link to="/murs">
                    <Button className="w-full">
                      Explorer les murs
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
                        <p className="text-xs text-gray-500">Il y a 2 heures</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Aucun message récent</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
