import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Wall {
  id: string;
  title: string | null;
  location: string | null;
  surface_m2: number | null;
  type: string | null;           // ex. « façade », « intérieur »
  image_url: string | null;
}

interface Params {
  search?: string;               // mot-clé ville
  minSurface?: number;           // surface minimale m²
  type?: string;                 // façade / intérieur…
}

/* ------- le paramètre est optionnel, on met {} par défaut ------------ */
export const useWalls = ({
  search,
  minSurface,
  type,
}: Params = {}) =>
  useQuery<Wall[]>({
    queryKey: ['walls', search, minSurface, type],
    queryFn: async () => {
      let req = supabase.from('walls').select('*');

      /* recherche ville ------------------------------------------------ */
      if (search) {
        req = req
          .not('location', 'is', null)          // exclut NULL
          .ilike('location', `%${search}%`);    // côté serveur
      }

      /* type de mur ---------------------------------------------------- */
      if (type) {
        req = req.eq('type', type);
      }

      /* surface minimale ---------------------------------------------- */
      if (minSurface) {
        req = req
          .not('surface_m2', 'is', null)
          .gte('surface_m2', minSurface);
      }

      const { data, error } = await req;
      if (error) throw error;

      return data as Wall[];
    },
  });
