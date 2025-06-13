
-- Créer la table des conversations
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  wall_owner_id UUID REFERENCES public.wall_owners(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer la table des messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('artist', 'wall_owner')),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer la table des notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('artist', 'wall_owner')),
  type TEXT NOT NULL CHECK (type IN ('message', 'project_update', 'payment', 'review')),
  title TEXT NOT NULL,
  content TEXT,
  is_read BOOLEAN DEFAULT false,
  related_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer la table des propositions de projets
CREATE TABLE public.project_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wall_owner_id UUID REFERENCES public.wall_owners(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  budget_proposed INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer la table des paiements
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'canceled')),
  commission_rate DECIMAL(3,2) DEFAULT 0.05,
  commission_amount INTEGER,
  artist_amount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Activer RLS sur toutes les nouvelles tables
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les conversations
CREATE POLICY "Users can view their own conversations" ON public.conversations
  FOR SELECT USING (
    (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
    (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
  );

CREATE POLICY "Users can create conversations" ON public.conversations
  FOR INSERT WITH CHECK (
    (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
    (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
  );

-- Politiques RLS pour les messages
CREATE POLICY "Users can view messages in their conversations" ON public.messages
  FOR SELECT USING (
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
            (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
    )
  );

CREATE POLICY "Users can send messages in their conversations" ON public.messages
  FOR INSERT WITH CHECK (
    conversation_id IN (
      SELECT id FROM public.conversations 
      WHERE (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
            (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
    )
  );

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (sender_id = auth.uid());

-- Politiques RLS pour les notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Politiques RLS pour les propositions de projets
CREATE POLICY "Users can view their project proposals" ON public.project_proposals
  FOR SELECT USING (
    (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
    (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
  );

CREATE POLICY "Wall owners can create project proposals" ON public.project_proposals
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id));

CREATE POLICY "Users can update their project proposals" ON public.project_proposals
  FOR UPDATE USING (
    (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
    (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
  );

-- Politiques RLS pour les paiements
CREATE POLICY "Users can view their payments" ON public.payments
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM public.projects 
      WHERE (auth.uid() IN (SELECT id FROM public.artists WHERE id = artist_id)) OR
            (auth.uid() IN (SELECT id FROM public.wall_owners WHERE id = wall_owner_id))
    )
  );

CREATE POLICY "System can manage payments" ON public.payments
  FOR ALL WITH CHECK (true);

-- Activer les mises à jour en temps réel
ALTER TABLE public.conversations REPLICA IDENTITY FULL;
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.project_proposals REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_proposals;

-- Mettre à jour la table des projets pour inclure plus d'informations
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS budget INTEGER;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS deadline DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS proposal_id UUID REFERENCES public.project_proposals(id);

-- Fonction pour calculer la note moyenne d'un artiste (mise à jour)
CREATE OR REPLACE FUNCTION public.calculate_artist_stats(artist_uuid uuid)
RETURNS TABLE(
  avg_rating DECIMAL(3,2),
  total_reviews INTEGER,
  completed_projects INTEGER
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(AVG(r.rating::DECIMAL), 0.0)::DECIMAL(3,2) as avg_rating,
    COUNT(r.id)::INTEGER as total_reviews,
    (SELECT COUNT(*)::INTEGER FROM public.projects p WHERE p.artist_id = artist_uuid AND p.status = 'completed') as completed_projects
  FROM public.reviews r
  WHERE r.artist_id = artist_uuid;
END;
$$;
