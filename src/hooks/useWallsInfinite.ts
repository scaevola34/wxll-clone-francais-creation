import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

const PAGE_SIZE = 9;

export interface Wall {
  id: string;
  title: string | null;
  location: string | null;
  surface_m2: number | null;
  type: string | null;          // façade / intérieur …
  image_url: string | null;
}

interface Params {
  search?: string;              // ville
  minSurface?: number;          // m²
  type?: string;                // façade / intérieur
}

export const useWallsInfinite = ({
  search,
  minSurface,
  type,
}: Params = {}) =>
  useInfiniteQuery<Wall[]>({
    queryKey: ['walls-infinite', search, minSurface, type],
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length,
    queryFn: async ({ pageParam = 0 }) => {
      /* requête de base */
      let req = supabase
        .from('walls')
        .select('*')
        .range(
          pageParam * PAGE_SIZE,
          pageParam * PAGE_SIZE + PAGE_SIZE - 1
        );

      /* filtre ville */
      if (search) {
        req = req
          .not('location', 'is', null)
          .ilike('location', `%${search}%`);
      }

      /* type de mur */
      if (type) {
        req = req.eq('type', type);
      }

      /* surface mini */
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
