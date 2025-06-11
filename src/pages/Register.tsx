import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("artist"); // default role
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
    if (!passwordRegex.test(password)) {
      toast({ title: "Mot de passe invalide", description: "12 caractères minimum, 1 majuscule, 1 chiffre, 1 caractère spécial." });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }, // stocké dans user_metadata
      },
    });

    if (error) {
      toast({ title: "Erreur", description: error.message });
    } else {
      toast({ title: "Inscription réussie", description: "Vérifie ta boîte mail pour confirmer ton compte." });
      navigate("/verify-email");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded p-2">
          <option value="artist">Je suis un artiste</option>
          <option value="owner">Je suis propriétaire de mur</option>
        </select>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Mot de passe sécurisé" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">S’inscrire</Button>
      </form>
    </div>
  );
};

export default Register;
