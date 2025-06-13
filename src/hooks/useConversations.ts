
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Conversation {
  id: string;
  artist_id: string;
  wall_owner_id: string;
  project_id?: string;
  created_at: string;
  updated_at: string;
  artist?: {
    name: string;
    profile_image_url?: string;
  };
  wall_owner?: {
    Name: string;
  };
  last_message?: {
    content: string;
    created_at: string;
    sender_type: string;
  };
  unread_count?: number;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userType } = useAuth();

  useEffect(() => {
    if (!user || !userType) return;

    fetchConversations();

    // Écouter les changements en temps réel
    const channel = supabase
      .channel('conversations')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'conversations'
      }, () => {
        fetchConversations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, userType]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('conversations')
        .select(`
          *,
          artist:artists(name, profile_image_url),
          wall_owner:wall_owners(Name)
        `);

      const { data, error } = await query;

      if (error) throw error;

      // Récupérer le dernier message et le nombre de messages non lus pour chaque conversation
      const conversationsWithMessages = await Promise.all(
        (data || []).map(async (conv) => {
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('content, created_at, sender_type')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .neq('sender_id', user?.id);

          return {
            ...conv,
            last_message: lastMessage,
            unread_count: count || 0
          };
        })
      );

      setConversations(conversationsWithMessages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (artistId: string, wallOwnerId: string, projectId?: string) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          artist_id: artistId,
          wall_owner_id: wallOwnerId,
          project_id: projectId
        })
        .select()
        .single();

      if (error) throw error;
      
      fetchConversations();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la création');
    }
  };

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    createConversation
  };
};
