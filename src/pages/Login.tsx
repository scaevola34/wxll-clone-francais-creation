
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;

      // REDIRECTION CONDITIONNELLE selon le type d'utilisateur
      if (data.user) {
        // Vérifier dans quelle table il existe
        const { data: artistData } = await supabase
          .from('artists')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (artistData) {
          navigate('/artiste/profil');
        } else {
          navigate('/proprietaire/profil');
        }
      }
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      setResetEmailSent(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isResetMode) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
              <CardDescription>
                Entrez votre email pour recevoir un lien de réinitialisation
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleForgotPassword}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {resetEmailSent && (
                  <Alert>
                    <AlertDescription className="text-green-600">
                      Un email de réinitialisation a été envoyé à {email}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-wxll-blue hover:bg-blue-600" 
                  disabled={loading || resetEmailSent}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                </Button>
                
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setIsResetMode(false)}
                >
                  Retour à la connexion
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte WXLLSPACE
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="text-right text-sm">
                  <button
                    type="button"
                    onClick={() => setIsResetMode(true)}
                    className="text-wxll-blue hover:underline"
                  >
                    Mot de passe oublié?
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-wxll-blue hover:bg-blue-600" 
                disabled={loading}
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-wxll-blue hover:underline">
                  S'inscrire
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
