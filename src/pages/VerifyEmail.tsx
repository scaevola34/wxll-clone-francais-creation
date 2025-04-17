
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const userType = searchParams.get('type') as 'artist' | 'owner' | null;
  
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would verify the token with a backend API
    // For now, we'll simulate the verification process
    const simulateVerification = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful verification
      if (token && email) {
        setVerificationStatus('success');
        toast.success("Email vérifié avec succès");
      } else {
        setVerificationStatus('error');
        toast.error("Échec de la vérification de l'email");
      }
    };
    
    simulateVerification();
  }, [token, email]);
  
  const handleContinue = () => {
    if (userType === 'artist') {
      navigate('/artiste/profil');
    } else if (userType === 'owner') {
      navigate('/proprietaire/profil');
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Vérification de l'email</CardTitle>
          <CardDescription className="text-center">
            {verificationStatus === 'loading' && "Nous vérifions votre adresse email..."}
            {verificationStatus === 'success' && "Votre adresse email a été vérifiée avec succès!"}
            {verificationStatus === 'error' && "Nous n'avons pas pu vérifier votre adresse email."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex justify-center py-6">
          {verificationStatus === 'loading' && <Loader2 className="h-16 w-16 text-wxll-blue animate-spin" />}
          {verificationStatus === 'success' && <CheckCircle className="h-16 w-16 text-green-500" />}
          {verificationStatus === 'error' && <XCircle className="h-16 w-16 text-red-500" />}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          {verificationStatus === 'success' && (
            <Button onClick={handleContinue} className="w-full">
              Continuer vers votre espace
            </Button>
          )}
          
          {verificationStatus === 'error' && (
            <>
              <p className="text-sm text-muted-foreground text-center">
                Le lien de vérification est peut-être expiré ou invalide. Veuillez essayer de vous réinscrire.
              </p>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                Retour à l'accueil
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
