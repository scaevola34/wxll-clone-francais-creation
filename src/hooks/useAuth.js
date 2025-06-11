import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

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
      // Vérifier d'abord dans artists
      const { data: artistData } = await supabase
        .from('artists')
        .select('id')
        .eq('id', userId)
        .single();

      if (artistData) {
        setUserType('artist');
        return;
      }

      // Sinon vérifier dans wall_owners
      const { data: ownerData } = await supabase
        .from('wall_owners')
        .select('id')
        .eq('id', userId)
        .single();

      if (ownerData) {
        setUserType('owner');
        return;
      }

      // Si aucun des deux, utiliser les métadonnées
      const userMetadata = user?.user_metadata || user?.raw_user_meta_data;
      setUserType(userMetadata?.user_type || 'artist');
      
    } catch (error) {
      console.error('Erreur lors de la récupération du type utilisateur:', error);
      setUserType('artist'); // Par défaut
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    userType,
    loading,
    isAuthenticated: !!user,
    logout
  };
};

