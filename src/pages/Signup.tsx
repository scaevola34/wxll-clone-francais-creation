import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("artist");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert("Erreur à l'inscription : " + error.message);
    } else {
      // Crée un profil associé
      const user = data.user;
      if (user) {
        await supabase.from("profiles").insert({
          id: user.id,
          full_name: email,
          role
        });
        navigate("/dashboard");
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Inscription</h2>
      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className="border p-2 w-full mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="artist">Artiste</option>
        <option value="owner">Propriétaire de mur</option>
      </select>
      <button className="bg-black text-white p-2 w-full" type="submit">
        S'inscrire
      </button>
    </form>
  );
}

