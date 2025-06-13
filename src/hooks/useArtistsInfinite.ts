import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import type { Artist } from './useArtists'; // même interface

const PAGE_SIZE = 12;

interface Params {
  search?: string;
}

export const useArtistsInfinite = ({ search }: Params = {}) =>
  useInfiniteQuery<Artist[]>({
    queryKey: ['artists-infinite', search],
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length, // page suivante
    queryFn: async ({ pageParam = 0 }) => {
      let req = supabase
        .from('artists')
        .select('*')
        .range(pageParam * PAGE_SIZE, pageParam * PAGE_SIZE + PAGE_SIZE - 1);

      if (search) {
        req = req
          .not('location', 'is', null)
          .ilike('location', `%${search}%`);
      }

      const { data, error } = await req;
      if (error) throw error;
      return data as Artist[];
    },
  });
