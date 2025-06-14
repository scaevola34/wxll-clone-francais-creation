
import React, { useRef, useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useArtistsInfinite } from '@/hooks/useArtistsInfinite';
import ArtistCarousel from '@/components/ArtistCarousel';
import { InteractiveFilters } from '@/components/InteractiveFilters';
import { GridSkeleton } from '@/components/ui/loading-skeletons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';
import { adaptArtistForCarousel } from '@/utils/dataAdapters';

interface FilterState {
  location?: string;
  style?: string;
  minExperience?: number[];
  maxProjects?: number[];
}

const PAGE_SIZE = 12;

const Artists: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 400);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useArtistsInfinite({ search: debounced });

  const artists = (data?.pages.flat() ?? []).filter((artist) => {
    let ok = true;
    if (advancedFilters.location && artist.location) {
      ok = ok && artist.location.toLowerCase().includes(advancedFilters.location.toLowerCase());
    }
    if (advancedFilters.style && artist.style) {
      ok = ok && artist.style.toLowerCase().includes(advancedFilters.style.toLowerCase());
    }
    if (advancedFilters.minExperience && advancedFilters.minExperience[0] > 0) {
      ok = ok && (artist.experience_years || 0) >= advancedFilters.minExperience[0];
    }
    if (advancedFilters.maxProjects && advancedFilters.maxProjects[0] < 100) {
      ok = ok && (artist.projects_count || 0) <= advancedFilters.maxProjects[0];
    }
    return ok;
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !sentinelRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: '200px' }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [hasNextPage, fetchNextPage]);

  // Configuration des filtres
  const filterGroups = [
    {
      id: 'location',
      label: 'Localisation',
      type: 'text' as const,
      value: advancedFilters.location
    },
    {
      id: 'style',
      label: 'Style artistique',
      type: 'text' as const,
      value: advancedFilters.style
    },
    {
      id: 'minExperience',
      label: 'Expérience minimum (années)',
      type: 'range' as const,
      min: 0,
      max: 20,
      value: advancedFilters.minExperience
    },
    {
      id: 'maxProjects',
      label: 'Projets maximum',
      type: 'range' as const,
      min: 0,
      max: 100,
      value: advancedFilters.maxProjects
    }
  ];

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Artistes <span className="text-purple-600">WXLLSPACE</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les talents du street art français et trouvez l'artiste idéal
            </p>
          </div>
          <GridSkeleton count={12} type="artist" />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="text-center py-12">
              <p className="text-red-600 mb-4">
                Impossible de charger les artistes pour le moment.
              </p>
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Diviser les artistes en groupes de 6 pour le carousel
  const artistGroups = [];
  for (let i = 0; i < artists.length; i += 6) {
    artistGroups.push(artists.slice(i, i + 6));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Artistes <span className="text-purple-600">WXLLSPACE</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les talents du street art français et trouvez l'artiste idéal
          </p>
        </div>

        {/* Barre recherche + filtres */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une ville…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <InteractiveFilters
              filters={filterGroups}
              activeFilters={advancedFilters}
              onFiltersChange={setAdvancedFilters}
              resultsCount={artists.length}
            />
          </CardContent>
        </Card>

        {/* Affichage des artistes */}
        {artists.length === 0 ? (
          <Card>
            <CardContent className="text-center py-20">
              <p className="text-gray-500">
                Aucun artiste ne correspond aux critères.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            {artistGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <ArtistCarousel artists={group.map(adaptArtistForCarousel)} />
              </div>
            ))}
          </div>
        )}

        {/* Chargement scroll infini */}
        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-10">
            <Spinner size={28} />
          </div>
        )}
        {!hasNextPage && artists.length >= PAGE_SIZE && (
          <p className="text-center text-gray-500 py-10">
            Vous avez atteint la fin.
          </p>
        )}
      </div>
    </div>
  );
};

export default Artists;
