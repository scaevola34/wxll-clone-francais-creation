/* -----------------------------------------------------------
   src/pages/Register.tsx – version complète
------------------------------------------------------------ */

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
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/ui/Spinner";

const Register: React.FC = () => {
  /* ---------------- états locaux ---------------- */
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"artist" | "buyer">("buyer");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();

  /* ---------------- handler inscription ---------------- */
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
          },
        },
      });
      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Inscription réussie !",
        description:
          "Un email de confirmation vient d’être envoyé. Vérifie ta boîte mail.",
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Erreur lors de l’inscription",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- render ---------------- */
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-4">
            Rejoignez la communauté WXLLSPACE
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
                  Inscription réussie&nbsp;! Vérifie ta boîte mail pour
                  confirmer ton compte.
                </AlertDescription>
              </Alert>
            )}

            {/* nom complet */}
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
                  className="pl-10 h-12 border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue"
                  required
                />
              </div>
            </div>

            {/* email */}
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
                  className="pl-10 h-12 border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue"
                  required
                />
              </div>
            </div>

            {/* mot de passe */}
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
                  className="pl-10 pr-10 h-12 border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue"
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

            {/* rôle */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Je suis
              </Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    className="accent-purple-600"
                    checked={role === "buyer"}
                    onChange={() => setRole("buyer")}
                  />
                  Acheteur
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="artist"
                    className="accent-purple-600"
                    checked={role === "artist"}
                    onChange={() => setRole("artist")}
                  />
                  Artiste
                </label>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6 pt-6">
            <Button
              type="submit"
              className="w-full bg-wxll-blue hover:bg-blue-600 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              disabled={loading || success}
            >
              {loading ? (
                <Spinner size={20} />
              ) : (
                "Créer mon compte"
              )}
            </Button>

            <div className="text-center text-gray-600">
              Déjà un compte&nbsp;?{" "}
              <Link to="/login" className="text-wxll-blue hover:underline font-semibold">
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
