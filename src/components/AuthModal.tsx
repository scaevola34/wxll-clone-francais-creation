
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { ArrowRight, User, MapPin, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [userType, setUserType] = useState<'artist' | 'owner' | null>(null);
  const [email, setEmail] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const navigate = useNavigate();

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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app with backend, this would create a user and send a verification email
    // For now, we'll simulate this behavior with a timeout
    setIsVerificationSent(true);
    
    // Show a toast notification
    toast.success("Email de vérification envoyé", {
      description: "Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification.",
    });
    
    // In a real implementation, we would not navigate away automatically
    // The user would need to verify their email first
  };

  const selectUserType = (type: 'artist' | 'owner') => {
    setUserType(type);
    setActiveTab('register');
  };

  const handleVerificationComplete = () => {
    // This would be triggered when a user returns to the app after verifying email
    // In a real implementation, this would validate the token from the URL
    if (userType === 'artist') {
      navigate('/artiste/profil');
    } else if (userType === 'owner') {
      navigate('/proprietaire/profil');
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connexion à WXLLSPACE</DialogTitle>
          <DialogDescription>
            Connectez-vous pour accéder à votre espace personnel
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
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
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            {!userType ? (
              <div className="py-6 space-y-4">
                <p className="text-center mb-4">Je suis...</p>
                <Button 
                  onClick={() => selectUserType('artist')} 
                  className="flex items-center justify-between w-full mb-4"
                  variant="outline"
                >
                  <User className="mr-2" size={18} />
                  <span className="flex-grow text-left">Un artiste street art</span>
                  <ArrowRight size={18} />
                </Button>
                <Button 
                  onClick={() => selectUserType('owner')} 
                  className="flex items-center justify-between w-full"
                  variant="outline"
                >
                  <MapPin className="mr-2" size={18} />
                  <span className="flex-grow text-left">Un propriétaire de mur</span>
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
                  onClick={() => setIsVerificationSent(false)} 
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
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nom complet</Label>
                  <Input id="register-name" placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <Input id="register-password" type="password" required />
                </div>
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setUserType(null)} 
                    className="mr-2"
                  >
                    Retour
                  </Button>
                  <Button type="submit">
                    S'inscrire
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
