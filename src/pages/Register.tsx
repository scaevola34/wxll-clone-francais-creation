
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Palette, Building2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nomComplet: '',
    userType: 'artist'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password || !formData.nomComplet) {
      toast({
        title: "❌ Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "❌ Mots de passe différents",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "❌ Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      console.log('🚀 Début inscription:', {
        email: formData.email,
        userType: formData.userType
      });

      // 1. Créer le compte utilisateur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            nom_complet: formData.nomComplet,
            user_type: formData.userType
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      console.log('✅ SignUp réussi, user:', authData.user.id);

      // 2. Insérer dans la table correspondante selon le type d'utilisateur
      if (formData.userType === 'artist') {
        console.log('🗄️ Insertion artists:', {
          id: authData.user.id,
          name: formData.nomComplet,
          contact_email: formData.email
        });

        const { error: artistError } = await supabase
          .from('artists')
          .insert({
            id: authData.user.id,
            name: formData.nomComplet,
            contact_email: formData.email
          });

        if (artistError) {
          console.error('❌ Erreur insertion artists:', artistError);
          throw artistError;
        }

        console.log('✅ Insertion artists réussie');
      } else {
        console.log('🗄️ Insertion wall_owners:', {
          id: authData.user.id,
          Name: formData.nomComplet,
          contact_email: formData.email
        });

        const { error: ownerError } = await supabase
          .from('wall_owners')
          .insert({
            id: authData.user.id,
            Name: formData.nomComplet,
            contact_email: formData.email,
            // Valeurs par défaut requises
            width_m: 0,
            height_m: 0,
            indoor: false,
            surface_type: 'brick',
            owner_type: 'individual',
            location_postal_code: '00000'
          });

        if (ownerError) {
          console.error('❌ Erreur insertion wall_owners:', ownerError);
          throw ownerError;
        }

        console.log('✅ Insertion wall_owners réussie');
      }

      toast({
        title: "✅ Inscription réussie !",
        description: "Votre compte a été créé avec succès. Vous êtes maintenant connecté.",
      });

      // 3. Rediriger vers le bon dashboard
      if (formData.userType === 'artist') {
        navigate('/artiste/profil');
      } else {
        navigate('/proprietaire/profil');
      }

    } catch (error: any) {
      console.error('❌ Erreur inscription:', error);
      
      let errorMessage = "Une erreur est survenue lors de l'inscription.";
      
      if (error.message?.includes('User already registered')) {
        errorMessage = "Un compte existe déjà avec cette adresse email.";
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = "Adresse email invalide.";
      } else if (error.message?.includes('Password')) {
        errorMessage = "Le mot de passe ne respecte pas les critères requis.";
      }

      toast({
        title: "❌ Erreur d'inscription",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Rejoindre WXLLSPACE
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Créez votre compte sur la marketplace du street art
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={formData.userType} onValueChange={(value) => handleInputChange('userType', value)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="artist" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Artiste
              </TabsTrigger>
              <TabsTrigger value="owner" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Propriétaire
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSignUp} className="space-y-4">
              <TabsContent value="artist" className="space-y-4 mt-0">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-purple-600">🎨 Compte Artiste</h3>
                  <p className="text-sm text-gray-600">Présentez vos œuvres et trouvez des projets</p>
                </div>
              </TabsContent>

              <TabsContent value="owner" className="space-y-4 mt-0">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-blue-600">🏢 Compte Propriétaire</h3>
                  <p className="text-sm text-gray-600">Proposez vos murs aux artistes</p>
                </div>
              </TabsContent>

              <div className="space-y-2">
                <Label htmlFor="nomComplet" className="text-sm font-medium text-gray-700">
                  Nom complet *
                </Label>
                <Input
                  id="nomComplet"
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.nomComplet}
                  onChange={(e) => handleInputChange('nomComplet', e.target.value)}
                  required
                  className="h-12 border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Adresse email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-12 border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Au moins 6 caractères"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="h-12 border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmer le mot de passe *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Répétez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className="h-12 border-2 focus:border-purple-500 transition-colors"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 mt-6"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Créer mon compte WXLLSPACE
                  </>
                )}
              </Button>
            </form>

            <div className="text-center mt-6 space-y-3">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Se connecter
                </Link>
              </p>
              
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
