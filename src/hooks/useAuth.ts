import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

export const useSignUp = () =>
  useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      nom_complet: string;
      role: "artist" | "buyer";
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            nom_complet: payload.nom_complet,
            role: payload.role,
          },
        },
      });
      if (error) throw error;
      return data.user as User;
    },
    onSuccess: () => {
      toast.success(
        "Inscription réussie ! Vérifie ta boîte mail pour confirmer ton compte."
      );
    },
    onError: (err: any) => {
      toast.error(err.message ?? "Erreur lors de l'inscription");
    },
  });

export const useSignIn = () =>
  useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword(payload);
      if (error) throw error;
      return data.user as User;
    },
    onSuccess: () => {
      toast.success("Connexion réussie ! Bienvenue 👋");
    },
    onError: (err: any) => {
      toast.error(err.message ?? "Email ou mot de passe incorrect");
    },
  });

export const useSignOut = () =>
  useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  });

/* ------------- FIN DU FICHIER ------------------ */

/**
 * Petit alias “historique” : certains anciens fichiers importent encore
 * `useAuth`.  On expose donc une fonction qui retourne juste l’utilisateur
 * courant et son état de chargement.
 */
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user ?? null;
    },
  });
};

/* On exporte aussi par défaut les mutations si besoin */
export {
  useSignIn,
  useSignUp,
  useSignOut,
};                    // déjà présents plus haut

