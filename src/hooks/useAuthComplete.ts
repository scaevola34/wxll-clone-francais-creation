
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { useSignOut } from './useAuth';

export const useAuthComplete = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'artist' | 'owner' | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signOutMutation = useSignOut();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      if (session?.user) {
        determineUserType(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        if (session?.user) {
          determineUserType(session.user.id);
        } else {
          setUserType(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const determineUserType = async (userId: string) => {
    try {
      setLoading(true);
      
      // Check if user is an artist
      const { data: artistData } = await supabase
        .from('artists')
        .select('id')
        .eq('id', userId)
        .single();

      if (artistData) {
        setUserType('artist');
      } else {
        setUserType('owner');
      }
    } catch (error) {
      console.error('Error determining user type:', error);
      setUserType('owner'); // Default to owner
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOutMutation.mutate();
  };

  return {
    user,
    userType,
    loading,
    isAuthenticated,
    logout
  };
};
