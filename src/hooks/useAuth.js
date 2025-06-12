
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session initiale
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await getUserType(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await getUserType(session.user.id);
        } else {
          setUser(null);
          setUserType(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getUserType = async (userId) => {
    try {
      console.log('🔍 Vérification du type utilisateur pour:', userId);
      
      // Vérifier d'abord dans artists
      const { data: artistData, error: artistError } = await supabase
        .from('artists')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      console.log('👨‍🎨 Résultat artists:', { artistData, artistError });

      if (artistData) {
        console.log('✅ Utilisateur identifié comme artiste');
        setUserType('artist');
        return;
      }

      // Sinon vérifier dans wall_owners
      const { data: ownerData, error: ownerError } = await supabase
        .from('wall_owners')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      console.log('🏢 Résultat wall_owners:', { ownerData, ownerError });

      if (ownerData) {
        console.log('✅ Utilisateur identifié comme propriétaire');
        setUserType('owner');
        return;
      }

      console.log('⚠️ Utilisateur non trouvé dans les tables, type par défaut: artist');
      setUserType('artist');
      
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du type utilisateur:', error);
      setUserType('artist'); // Par défaut
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Déconnexion en cours...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear state
      setUser(null);
      setUserType(null);
      
      console.log('✅ Déconnexion réussie');
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    }
  };

  return {
    user,
    userType,
    loading,
    isAuthenticated: !!user,
    logout
  };
};
