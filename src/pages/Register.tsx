/*  src/pages/Register.tsx
    Page d’inscription – spinner + toast
------------------------------------------------------------------- */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { useSignUp } from "@/hooks/useAuth";

const Register: React.FC = () => {
  /* états locaux */
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"artist" | "buyer">("buyer");

  /* mutation React-Query */
  const { mutate: signUp, isLoading } = useSignUp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp({ email, password, nom_complet: nom, role });
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Inscription</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Nom complet"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Mot de passe (≥ 6 car.)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* rôle */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="buyer"
              checked={role === "buyer"}
              onChange={() => setRole("buyer")}
              className="accent-purple-600"
            />
            Acheteur
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="artist"
              checked={role === "artist"}
              onChange={() => setRole("artist")}
              className="accent-purple-600"
            />
            Artiste
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size={20} /> : "Créer mon compte"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Déjà un compte ?{" "}
        <Link to="/login" className="text-purple-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </main>
  );
};

export default Register;

