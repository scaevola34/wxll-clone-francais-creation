
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, Palette, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/ui/Spinner";

const Register: React.FC = () => {
  const [step, setStep] = useState<'userType' | 'ownerType' | 'form'>('userType');
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"artist" | "buyer">("buyer");
  const [ownerType, setOwnerType] = useState<"particulier" | "syndic" | "association" | "collectivite" | "entreprise">("particulier");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();

  const handleUserTypeSelect = (selectedRole: "artist" | "buyer") => {
    setRole(selectedRole);
    if (selectedRole === "artist") {
      setStep('form');
    } else {
      setStep('ownerType');
    }
  };

  const handleOwnerTypeSelect = (selectedOwnerType: typeof ownerType) => {
    setOwnerType(selectedOwnerType);
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nom_complet: nom,
            role,
            owner_type: role === "buyer" ? ownerType : undefined,
          },
        },
      });
      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Inscription réussie !",
        description:
          "Un email de confirmation vient d'être envoyé. Vérifie ta boîte mail.",
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'inscription",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (step === 'userType') {
    return (
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Rejoignez WXLLSPACE
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              Choisissez votre profil pour commencer
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              onClick={() => handleUserTypeSelect("artist")}
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:border-purple-500 hover:bg-purple-50"
            >
              <Palette className="h-8 w-8 text-purple-600" />
              <span className="font-semibold">Je suis un Artiste</span>
              <span className="text-sm text-gray-500">Street art, muralisme, graffiti</span>
            </Button>

            <Button
              onClick={() => handleUserTypeSelect("buyer")}
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:border-blue-500 hover:bg-blue-50"
            >
              <Building className="h-8 w-8 text-blue-600" />
              <span className="font-semibold">J'ai un mur disponible</span>
              <span className="text-sm text-gray-500">Particulier, entreprise, collectivité</span>
            </Button>
          </CardContent>

          <CardFooter className="text-center text-gray-600">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-purple-600 hover:underline font-semibold">
              Se connecter
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (step === 'ownerType') {
    return (
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Type de propriétaire
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-4">
              Précisez votre statut
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {[
              { value: "particulier", label: "Particulier", desc: "Propriétaire privé" },
              { value: "syndic", label: "Syndic", desc: "Gestion immobilière" },
              { value: "association", label: "Association", desc: "Organisation à but non lucratif" },
              { value: "collectivite", label: "Collectivité", desc: "Mairie, région, département" },
              { value: "entreprise", label: "Entreprise", desc: "Société privée" }
            ].map((option) => (
              <Button
                key={option.value}
                onClick={() => handleOwnerTypeSelect(option.value as typeof ownerType)}
                variant="outline"
                className="w-full h-16 flex flex-col items-start justify-center space-y-1 border-2 hover:border-blue-500 hover:bg-blue-50 text-left"
              >
                <span className="font-semibold">{option.label}</span>
                <span className="text-sm text-gray-500">{option.desc}</span>
              </Button>
            ))}
          </CardContent>

          <CardFooter>
            <Button
              onClick={() => setStep('userType')}
              variant="ghost"
              className="w-full"
            >
              Retour
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-4">
            {role === "artist" ? "Profil Artiste" : `Profil Propriétaire - ${ownerType}`}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-700">
                  Inscription réussie ! Vérifie ta boîte mail pour
                  confirmer ton compte.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="nom" className="text-sm font-semibold text-gray-700">
                Nom complet
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="nom"
                  type="text"
                  placeholder="Votre nom complet"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6 pt-6">
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              disabled={loading || success}
            >
              {loading ? (
                <Spinner size={20} />
              ) : (
                "Créer mon compte"
              )}
            </Button>

            <div className="flex justify-between w-full text-sm">
              <Button
                type="button"
                onClick={() => role === "buyer" ? setStep('ownerType') : setStep('userType')}
                variant="ghost"
                className="text-gray-600"
              >
                Retour
              </Button>
              <div className="text-gray-600">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-purple-600 hover:underline font-semibold">
                  Se connecter
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
