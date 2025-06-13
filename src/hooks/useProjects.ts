
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface ProjectProposal {
  id: string;
  wall_owner_id: string;
  artist_id: string;
  title: string;
  description?: string;
  budget_proposed?: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
  artist?: {
    name: string;
    profile_image_url?: string;
  };
  wall_owner?: {
    Name: string;
  };
}

export interface Project {
  id: string;
  artist_id?: string;
  wall_owner_id?: string;
  title: string;
  description?: string;
  status?: string;
  budget?: number;
  deadline?: string;
  proposal_id?: string;
  completed_at?: string;
  created_at: string;
  artist?: {
    name: string;
    profile_image_url?: string;
  };
  wall_owner?: {
    Name: string;
  };
}

export const useProjects = () => {
  const [proposals, setProposals] = useState<ProjectProposal[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userType } = useAuth();

  useEffect(() => {
    if (!user || !userType) return;

    fetchData();

    // Écouter les changements en temps réel
    const proposalsChannel = supabase
      .channel('project_proposals')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'project_proposals'
      }, () => {
        fetchData();
      })
      .subscribe();

    const projectsChannel = supabase
      .channel('projects')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects'
      }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(proposalsChannel);
      supabase.removeChannel(projectsChannel);
    };
  }, [user, userType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Récupérer les propositions
      const { data: proposalsData, error: proposalsError } = await supabase
        .from('project_proposals')
        .select(`
          *,
          artist:artists(name, profile_image_url),
          wall_owner:wall_owners(Name)
        `)
        .order('created_at', { ascending: false });

      if (proposalsError) throw proposalsError;

      // Récupérer les projets
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          artist:artists(name, profile_image_url),
          wall_owner:wall_owners(Name)
        `)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const typedProposals = (proposalsData || []).map(proposal => ({
        ...proposal,
        status: proposal.status as 'pending' | 'accepted' | 'rejected' | 'completed'
      }));

      setProposals(typedProposals);
      setProjects(projectsData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const createProposal = async (artistId: string, title: string, description: string, budget: number) => {
    if (!user || userType !== 'owner') return;

    try {
      const { error } = await supabase
        .from('project_proposals')
        .insert({
          wall_owner_id: user.id,
          artist_id: artistId,
          title,
          description,
          budget_proposed: budget
        });

      if (error) throw error;
      
      fetchData();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la création');
    }
  };

  const updateProposalStatus = async (proposalId: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('project_proposals')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', proposalId);

      if (error) throw error;

      // Si accepté, créer un projet
      if (status === 'accepted') {
        const proposal = proposals.find(p => p.id === proposalId);
        if (proposal) {
          await supabase
            .from('projects')
            .insert({
              artist_id: proposal.artist_id,
              wall_owner_id: proposal.wall_owner_id,
              title: proposal.title,
              description: proposal.description,
              budget: proposal.budget_proposed,
              proposal_id: proposalId,
              status: 'in_progress'
            });
        }
      }
      
      fetchData();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const updateProjectStatus = async (projectId: string, status: string) => {
    try {
      const updateData: any = { status, updated_at: new Date().toISOString() };
      
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', projectId);

      if (error) throw error;
      
      fetchData();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  return {
    proposals,
    projects,
    loading,
    error,
    createProposal,
    updateProposalStatus,
    updateProjectStatus,
    refetch: fetchData
  };
};
