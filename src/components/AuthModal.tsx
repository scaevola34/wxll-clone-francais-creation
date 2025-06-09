
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ArrowRight, User, MapPin, Mail, AlertCircle, ArrowLeft, Palette, Building } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  userType?: 'artist' | 'owner' | null;
}

const AuthModal = ({ isOpen, onClose, initialTab = 'login', userType: initialUserType = null }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userType, setUserType] = useState<'artist' | 'owner' | null>(initialUserType);
  const [email, setEmail] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const navigate = useNavigate();

  // Artist form data
  const [artistData, setArtistData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    bio: '',
    style: '',
    experience: '',
    specialties: '',
    portfolio: '',
    instagram: '',
    priceRange: ''
  });

  // Owner form data
  const [ownerData, setOwnerData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    category: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would validate credentials and authenticate the user
    if (userType === 'artist') {
      navigate('/artiste/profil');
    } else if (userType === 'owner') {
      navigate('/proprietaire/profil');
    }
    onClose();
  };

  const handleArtistRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationStep === 1) {
      setRegistrationStep(2);
    } else if (registrationStep === 2) {
      setRegistrationStep(3);
    } else {
      // Final step - submit registration
      setIsVerificationSent(true);
      setEmail(artistData.email);
      toast.success("Email de vérification envoyé", {
        description: "Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification.",
      });
    }
  };

  const handleOwnerRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationStep === 1) {
      setRegistrationStep(2);
    } else {
      // Final step - submit registration
      setIsVerificationSent(true);
      setEmail(ownerData.email);
      toast.success("Email de vérification envoyé", {
        description: "Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification.",
      });
    }
  };

  const selectUserType = (type: 'artist' | 'owner') => {
    setUserType(type);
    setActiveTab('register');
    setRegistrationStep(1);
  };

  const handleVerificationComplete = () => {
    if (userType === 'artist') {
      navigate('/artiste/profil');
    } else if (userType === 'owner') {
      navigate('/proprietaire/profil');
    }
    onClose();
  };

  const resetModal = () => {
    setUserType(null);
    setRegistrationStep(1);
    setIsVerificationSent(false);
    setArtistData({
      name: '', email: '', password: '', phone: '', location: '', bio: '',
      style: '', experience: '', specialties: '', portfolio: '', instagram: '', priceRange: ''
    });
    setOwnerData({
      name: '', email: '', password: '', location: '', category: ''
    });
  };

  const getModalTitle = () => {
    if (activeTab === 'login') return 'Connexion à WXLLSPACE';
    if (!userType) return 'Inscription à WXLLSPACE';
    if (isVerificationSent) return 'Vérifiez votre email';
    
    if (userType === 'artist') {
      if (registrationStep === 1) return 'Informations personnelles';
      if (registrationStep === 2) return 'Votre profil artistique';
      return 'Détails professionnels';
    } else {
      if (registrationStep === 1) return 'Informations personnelles';
      return 'Détails de votre espace';
    }
  };

  const getModalDescription = () => {
    if (activeTab === 'login') return 'Connectez-vous pour accéder à votre espace personnel';
    if (!userType) return 'Choisissez votre type de compte pour commencer';
    if (isVerificationSent) return '';
    
    if (userType === 'artist') {
      if (registrationStep === 1) return 'Commençons par vos informations de base';
      if (registrationStep === 2) return 'Parlez-nous de votre art et votre style';
      return 'Finalisez votre profil professionnel';
    } else {
      if (registrationStep === 1) return 'Créez votre compte propriétaire';
      return 'Décrivez votre espace disponible';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetModal();
      }
    }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {userType === 'artist' && <Palette className="h-5 w-5 text-wxll-artist" />}
            {userType === 'owner' && <Building className="h-5 w-5 text-wxll-wall-owner" />}
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription>
            {getModalDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              {!userType && (
                <div className="space-y-4 mb-6">
                  <p className="text-center text-sm text-muted-foreground">Je suis...</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button"
                      onClick={() => setUserType('artist')} 
                      variant={userType === 'artist' ? 'default' : 'outline'}
                      className={userType === 'artist' ? 'bg-wxll-artist hover:bg-wxll-artist-dark' : 'border-wxll-artist text-wxll-artist hover:bg-wxll-artist hover:text-white'}
                    >
                      <Palette className="mr-2 h-4 w-4" />
                      Artiste
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => setUserType('owner')} 
                      variant={userType === 'owner' ? 'default' : 'outline'}
                      className={userType === 'owner' ? 'bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark' : 'border-wxll-wall-owner text-wxll-wall-owner hover:bg-wxll-wall-owner hover:text-white'}
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Propriétaire
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" required />
                <div className="text-right text-sm">
                  <a href="#" className="text-wxll-blue hover:underline">
                    Mot de passe oublié?
                  </a>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  className={`w-full ${userType === 'artist' ? 'bg-wxll-artist hover:bg-wxll-artist-dark' : userType === 'owner' ? 'bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white' : ''}`}
                  disabled={!userType}
                >
                  Se connecter
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            {!userType ? (
              <div className="py-6 space-y-4">
                <p className="text-center mb-4">Je souhaite m'inscrire en tant que...</p>
                <Button 
                  onClick={() => selectUserType('artist')} 
                  className="flex items-center justify-between w-full mb-4 border-wxll-artist text-wxll-artist hover:bg-wxll-artist hover:text-white"
                  variant="outline"
                >
                  <Palette className="mr-2" size={18} />
                  <span className="flex-grow text-left">Artiste street art</span>
                  <ArrowRight size={18} />
                </Button>
                <Button 
                  onClick={() => selectUserType('owner')} 
                  className="flex items-center justify-between w-full border-wxll-wall-owner text-wxll-wall-owner hover:bg-wxll-wall-owner hover:text-white"
                  variant="outline"
                >
                  <Building className="mr-2" size={18} />
                  <span className="flex-grow text-left">Propriétaire de mur/espace</span>
                  <ArrowRight size={18} />
                </Button>
              </div>
            ) : isVerificationSent ? (
              <div className="py-6 space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertTitle>Vérifiez votre email</AlertTitle>
                  <AlertDescription>
                    Nous avons envoyé un lien de vérification à {email}. Veuillez vérifier votre boîte de réception et cliquer sur le lien pour activer votre compte.
                  </AlertDescription>
                </Alert>
                <p className="text-sm text-muted-foreground mt-2">
                  Vous n'avez pas reçu d'email? Vérifiez votre dossier spam ou essayez de vous réinscrire.
                </p>
                <Button 
                  onClick={() => {
                    setIsVerificationSent(false);
                    setRegistrationStep(1);
                  }} 
                  variant="outline" 
                  className="w-full mt-4"
                >
                  Retour à l'inscription
                </Button>
                <Button 
                  onClick={handleVerificationComplete} 
                  className="w-full"
                  variant="link"
                >
                  J'ai déjà vérifié mon email
                </Button>
              </div>
            ) : userType === 'artist' ? (
              // Artist registration form
              <form onSubmit={handleArtistRegistration} className="space-y-4 py-4">
                {registrationStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="artist-name">Nom complet *</Label>
                      <Input 
                        id="artist-name" 
                        placeholder="Votre nom complet" 
                        required 
                        value={artistData.name}
                        onChange={(e) => setArtistData({...artistData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-email">Email *</Label>
                      <Input 
                        id="artist-email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        required 
                        value={artistData.email}
                        onChange={(e) => setArtistData({...artistData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-password">Mot de passe *</Label>
                      <Input 
                        id="artist-password" 
                        type="password" 
                        required 
                        value={artistData.password}
                        onChange={(e) => setArtistData({...artistData, password: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-phone">Téléphone</Label>
                      <Input 
                        id="artist-phone" 
                        type="tel" 
                        placeholder="06 XX XX XX XX" 
                        value={artistData.phone}
                        onChange={(e) => setArtistData({...artistData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-location">Localisation *</Label>
                      <Input 
                        id="artist-location" 
                        placeholder="Ville, région" 
                        required 
                        value={artistData.location}
                        onChange={(e) => setArtistData({...artistData, location: e.target.value})}
                      />
                    </div>
                  </>
                )}

                {registrationStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="artist-bio">Bio/Description *</Label>
                      <Textarea 
                        id="artist-bio" 
                        placeholder="Décrivez votre parcours et votre passion pour l'art urbain..." 
                        required
                        value={artistData.bio}
                        onChange={(e) => setArtistData({...artistData, bio: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-style">Style artistique *</Label>
                      <Select value={artistData.style} onValueChange={(value) => setArtistData({...artistData, style: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre style principal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="graffiti">Graffiti</SelectItem>
                          <SelectItem value="muralisme">Muralisme</SelectItem>
                          <SelectItem value="street-art">Street Art</SelectItem>
                          <SelectItem value="calligraffiti">Calligraffiti</SelectItem>
                          <SelectItem value="pop-art">Pop Art Urbain</SelectItem>
                          <SelectItem value="abstrait">Art Abstrait</SelectItem>
                          <SelectItem value="figuratif">Art Figuratif</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-experience">Expérience *</Label>
                      <Select value={artistData.experience} onValueChange={(value) => setArtistData({...artistData, experience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Votre niveau d'expérience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debutant">Débutant (moins de 2 ans)</SelectItem>
                          <SelectItem value="intermediaire">Intermédiaire (2-5 ans)</SelectItem>
                          <SelectItem value="confirme">Confirmé (5-10 ans)</SelectItem>
                          <SelectItem value="expert">Expert (plus de 10 ans)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-specialties">Spécialités</Label>
                      <Input 
                        id="artist-specialties" 
                        placeholder="Ex: Portraits, Lettering, Trompe-l'œil..." 
                        value={artistData.specialties}
                        onChange={(e) => setArtistData({...artistData, specialties: e.target.value})}
                      />
                    </div>
                  </>
                )}

                {registrationStep === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="artist-portfolio">Site portfolio/Behance</Label>
                      <Input 
                        id="artist-portfolio" 
                        type="url" 
                        placeholder="https://..." 
                        value={artistData.portfolio}
                        onChange={(e) => setArtistData({...artistData, portfolio: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-instagram">Instagram</Label>
                      <Input 
                        id="artist-instagram" 
                        placeholder="@votre_instagram" 
                        value={artistData.instagram}
                        onChange={(e) => setArtistData({...artistData, instagram: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist-price">Fourchette de prix *</Label>
                      <Select value={artistData.priceRange} onValueChange={(value) => setArtistData({...artistData, priceRange: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Vos tarifs habituels par m²" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-100">50€ - 100€/m²</SelectItem>
                          <SelectItem value="100-200">100€ - 200€/m²</SelectItem>
                          <SelectItem value="200-400">200€ - 400€/m²</SelectItem>
                          <SelectItem value="400+">400€+/m²</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <DialogFooter className="flex gap-2">
                  {registrationStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setRegistrationStep(registrationStep - 1)}
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Précédent
                    </Button>
                  )}
                  {registrationStep === 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setUserType(null)} 
                      className="flex-1"
                    >
                      Retour
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    className="flex-1 bg-wxll-artist hover:bg-wxll-artist-dark"
                  >
                    {registrationStep === 3 ? 'Finaliser' : 'Suivant'}
                    {registrationStep < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </DialogFooter>
              </form>
            ) : (
              // Owner registration form
              <form onSubmit={handleOwnerRegistration} className="space-y-4 py-4">
                {registrationStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="owner-name">Nom complet *</Label>
                      <Input 
                        id="owner-name" 
                        placeholder="Votre nom" 
                        required 
                        value={ownerData.name}
                        onChange={(e) => setOwnerData({...ownerData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="owner-email">Email *</Label>
                      <Input 
                        id="owner-email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        required 
                        value={ownerData.email}
                        onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="owner-password">Mot de passe *</Label>
                      <Input 
                        id="owner-password" 
                        type="password" 
                        required 
                        value={ownerData.password}
                        onChange={(e) => setOwnerData({...ownerData, password: e.target.value})}
                      />
                    </div>
                  </>
                )}

                {registrationStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="owner-location">Localisation de votre espace *</Label>
                      <Input 
                        id="owner-location" 
                        placeholder="Ville, adresse approximative" 
                        required 
                        value={ownerData.location}
                        onChange={(e) => setOwnerData({...ownerData, location: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="owner-category">Type d'espace *</Label>
                      <Select value={ownerData.category} onValueChange={(value) => setOwnerData({...ownerData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Quel type d'espace proposez-vous ?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facade-commerciale">Façade commerciale</SelectItem>
                          <SelectItem value="mur-exterieur">Mur extérieur privé</SelectItem>
                          <SelectItem value="mur-interieur">Mur intérieur</SelectItem>
                          <SelectItem value="bureau-entreprise">Bureau/Entreprise</SelectItem>
                          <SelectItem value="espace-public">Espace public/collectivité</SelectItem>
                          <SelectItem value="palissade">Palissade de chantier</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <DialogFooter className="flex gap-2">
                  {registrationStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setRegistrationStep(registrationStep - 1)}
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Précédent
                    </Button>
                  )}
                  {registrationStep === 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setUserType(null)} 
                      className="flex-1"
                    >
                      Retour
                    </Button>
                  )}
                  <Button 
                    type="submit" 
                    className="flex-1 bg-wxll-wall-owner hover:bg-wxll-wall-owner-dark text-white"
                  >
                    {registrationStep === 2 ? "S'inscrire" : 'Suivant'}
                    {registrationStep === 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
