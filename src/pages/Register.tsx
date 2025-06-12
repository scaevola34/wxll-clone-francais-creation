import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Building2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Register = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'artist' | 'owner' | ''>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Artist fields
  const [artistName, setArtistName] = useState('');
  const [location, setLocation] = useState('');
  const [instagram, setInstagram] = useState('');
  const [style, setStyle] = useState('');

  // Wall owner fields
  const [ownerName, setOwnerName] = useState('');
  const [ownerType, setOwnerType] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [wallWidth, setWallWidth] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [surfaceType, setSurfaceType] = useState('');
  const [isIndoor, setIsIndoor] = useState(false);

  const handleUserTypeSelect = (type: 'artist' | 'owner') => {
    setUserType(type);
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Début de l\'inscription', { userType, email });
    
    if (password !== confirmPassword) {
      toast({
        title: "❌ Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "❌ Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      console.log('📝 Création du compte utilisateur...');

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            full_name: userType === 'artist' ? artistName : ownerName,
          }
        }
      });

      if (authError) {
        console.error('❌ Erreur auth:', authError);
        throw authError;
      }

      if (!authData.user) {
        console.error('❌ Pas d\'utilisateur créé');
        throw new Error('User creation failed');
      }

      console.log('✅ Utilisateur créé:', authData.user.id);

      // Create profile based on user type
      if (userType === 'artist') {
        console.log('🎨 Création du profil artiste...');
        const { error: artistError } = await supabase
          .from('artists')
          .insert({
            id: authData.user.id, // Explicitly set the user ID
            name: artistName,
            contact_email: email,
            location: location,
            instagram_handle: instagram,
            style: style,
            bio: '',
            coverage_area: location,
          });

        if (artistError) {
          console.error('❌ Erreur création artiste:', artistError);
          throw artistError;
        }
        console.log('✅ Profil artiste créé');
      } else if (userType === 'owner') {
        console.log('🏢 Création du profil propriétaire...');
        const { error: ownerError } = await supabase
          .from('wall_owners')
          .insert({
            id: authData.user.id, // Explicitly set the user ID
            Name: ownerName,
            contact_email: email,
            width_m: parseFloat(wallWidth),
            height_m: parseFloat(wallHeight),
            indoor: isIndoor,
            surface_type: surfaceType,
            owner_type: ownerType,
            location_postal_code: postalCode,
          });

        if (ownerError) {
          console.error('❌ Erreur création propriétaire:', ownerError);
          throw ownerError;
        }
        console.log('✅ Profil propriétaire créé');
      }

      toast({
        title: "✅ Compte créé !",
        description: "Votre compte a été créé avec succès. Vérifiez votre email pour confirmer votre compte.",
      });

      console.log('🎉 Inscription terminée, redirection vers login');
      navigate('/login');

    } catch (error: any) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      toast({
        title: "❌ Erreur",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Choisissez votre profil
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Sélectionnez le type de compte que vous souhaitez créer
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleUserTypeSelect('artist')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Artiste</h3>
                <p className="text-sm text-gray-600">Je crée du street art et cherche des murs</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleUserTypeSelect('owner')}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Propriétaire</h3>
                <p className="text-sm text-gray-600">J'ai un mur à proposer aux artistes</p>
              </div>
            </div>
          </button>
        </div>
      </CardContent>

      <CardFooter>
        <Link to="/login" className="w-full">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la connexion
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {userType === 'artist' ? 'Profil Artiste' : 'Profil Propriétaire'}
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Complétez vos informations pour créer votre compte
        </p>
      </CardHeader>
      
      <form onSubmit={handleRegister}>
        <CardContent className="space-y-4">
          {/* Common fields */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {userType === 'artist' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="artistName">Nom d'artiste</Label>
                <Input
                  id="artistName"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Paris, Lyon, Marseille..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram (optionnel)</Label>
                <Input
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@votre_instagram"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style artistique</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="graffiti">Graffiti</SelectItem>
                    <SelectItem value="street-art">Street Art</SelectItem>
                    <SelectItem value="muralism">Muralisme</SelectItem>
                    <SelectItem value="stencil">Pochoir</SelectItem>
                    <SelectItem value="abstract">Art Abstrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Nom complet</Label>
                <Input
                  id="ownerName"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Type de propriétaire</Label>
                <RadioGroup value={ownerType} onValueChange={setOwnerType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="particulier" id="particulier" />
                    <Label htmlFor="particulier">Particulier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entreprise" id="entreprise" />
                    <Label htmlFor="entreprise">Entreprise</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="association" id="association" />
                    <Label htmlFor="association">Association</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="collectivite" id="collectivite" />
                    <Label htmlFor="collectivite">Collectivité</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="75001"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wallWidth">Largeur (m)</Label>
                  <Input
                    id="wallWidth"
                    type="number"
                    value={wallWidth}
                    onChange={(e) => setWallWidth(e.target.value)}
                    step="0.1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallHeight">Hauteur (m)</Label>
                  <Input
                    id="wallHeight"
                    type="number"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(e.target.value)}
                    step="0.1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type de surface</Label>
                <Select value={surfaceType} onValueChange={setSurfaceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de surface" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beton">Béton</SelectItem>
                    <SelectItem value="brique">Brique</SelectItem>
                    <SelectItem value="metal">Métal</SelectItem>
                    <SelectItem value="bois">Bois</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="indoor"
                  checked={isIndoor}
                  onCheckedChange={(checked) => setIsIndoor(checked === true)}
                />
                <Label htmlFor="indoor">Mur intérieur</Label>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Création en cours...
              </>
            ) : (
              'Créer mon compte'
            )}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => setStep(1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </CardFooter>
      </form>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {step === 1 ? renderStep1() : renderStep2()}
    </div>
  );
};

export default Register;
