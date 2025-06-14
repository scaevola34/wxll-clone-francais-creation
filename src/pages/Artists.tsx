
import React, { useRef, useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useArtistsInfinite } from '@/hooks/useArtistsInfinite';
import ArtistCarousel from '@/components/ArtistCarousel';
import AdvancedFilters from '@/components/AdvancedFilters';
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
  /* recherche plein-texte */
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 400);

  /* filtres avancés (toujours en local) */
  const [advancedFilters, setAdvancedFilters] =
    useState<FilterState>({});

  /* données serveur en pagination */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useArtistsInfinite({ search: debounced });

  /* concatène les pages déjà récupérées */
  const artists = (data?.pages.flat() ?? []).filter((artist) => {
    /* on conserve ton filtrage local */
    let ok = true;
    if (advancedFilters.location && artist.location) {
      ok =
        ok &&
        artist.location
          .toLowerCase()
          .includes(advancedFilters.location.toLowerCase());
    }
    if (advancedFilters.style && artist.style) {
      ok =
        ok &&
        artist.style
          .toLowerCase()
          .includes(advancedFilters.style.toLowerCase());
    }
    if (
      advancedFilters.minExperience &&
      advancedFilters.minExperience[0] > 0
    ) {
      ok =
        ok &&
        (artist.experience_years || 0) >=
          advancedFilters.minExperience[0];
    }
    if (
      advancedFilters.maxProjects &&
      advancedFilters.maxProjects[0] < 100
    ) {
      ok =
        ok &&
        (artist.projects_count || 0) <=
          advancedFilters.maxProjects[0];
    }
    return ok;
  });

  /* intersection-observer ↓ pour déclencher fetchNextPage */
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

  /* ------------- états de chargement ---------------- */
  if (status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <Spinner size={48} />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <p className="text-center text-red-600 py-20">
        Erreur de chargement.
      </p>
    );
  }

  // Diviser les artistes en groupes de 3 pour le carousel
  const artistGroups = [];
  for (let i = 0; i < artists.length; i += 6) {
    artistGroups.push(artists.slice(i, i + 6));
  }

  /* ------------- RENDER principal ------------------- */
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
            <div className="flex flex-col lg:flex-row gap-4">
              {/* search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une ville…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* advanced filters */}
              <AdvancedFilters
                onFiltersChange={setAdvancedFilters}
                initialFilters={advancedFilters}
              />
            </div>

            {(searchTerm ||
              Object.keys(advancedFilters).length > 0) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {artists.length} artiste(s) affiché(s)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setAdvancedFilters({});
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Affichage des artistes avec le format carousel */}
        {artists.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Aucun artiste ne correspond aux critères.
          </p>
        ) : (
          <div className="space-y-12">
            {artistGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <ArtistCarousel artists={group.map(adaptArtistForCarousel)} />
              </div>
            ))}
          </div>
        )}

        {/* sentinel + spinner scroll  */}
        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-10">
            <Spinner size={28} />
          </div>
        )}
        {!hasNextPage &&
          artists.length >= PAGE_SIZE && (
            <p className="text-center text-gray-500 py-10">
              Vous avez atteint la fin.
            </p>
          )}
      </div>
    </div>
  );
};

export default Artists;
