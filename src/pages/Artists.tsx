/* -------------------------------------------------------------------
   src/pages/Artists.tsx   (remplace entièrement ton fichier actuel)
   ---------------------------------------------------------------
   - Recherche « plein-texte » déléguée à Supabase (ilike)
   - Debounce 400 ms pour ne pas spammer l’API
   - Tes filtres avancés (location, style, etc.) restent en place
------------------------------------------------------------------- */

import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useArtists } from '@/hooks/useArtists';
import ArtistCard from '@/components/ArtistCard';
import AdvancedFilters from '@/components/AdvancedFilters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface FilterState {
  location?: string;
  style?: string;
  minExperience?: number[];
  maxProjects?: number[];
}

const Artists: React.FC = () => {
  /* ------------ état barre de recherche + debounce ---------------- */
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);

  /* ------------ état filtres avancés ------------------------------ */
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({});

  /* ------------ données Supabase ---------------------------------- */
  const {
    data: artists = [],
    isLoading: loading,
    isError: error,
  } = useArtists({ search: debouncedSearch });

  /* ------------ filtrage côté client pour filtres avancés --------- */
  const filteredArtists = artists.filter((artist) => {
    let matches = true;

    if (advancedFilters.location && artist.location) {
      matches =
        matches &&
        artist.location
          .toLowerCase()
          .includes(advancedFilters.location.toLowerCase());
    }

    if (advancedFilters.style && artist.style) {
      matches =
        matches &&
        artist.style
          .toLowerCase()
          .includes(advancedFilters.style.toLowerCase());
    }

    if (
      advancedFilters.minExperience &&
      advancedFilters.minExperience[0] > 0
    ) {
      matches =
        matches &&
        (artist.experience_years || 0) >= advancedFilters.minExperience[0];
    }

    if (advancedFilters.maxProjects && advancedFilters.maxProjects[0] < 100) {
      matches =
        matches &&
        (artist.projects_count || 0) <= advancedFilters.maxProjects[0];
    }

    return matches;
  });

  /* ------------------------------- RENDER ------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">
            Chargement des artistes…
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-700 mb-2">Erreur</h2>
            <p className="text-red-600">
              Une erreur est survenue lors du chargement.
            </p>
          </CardContent>
        </Card>
      </div>
    );
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
            Découvrez les talents du street art français et trouvez l'artiste
            parfait pour votre projet
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Recherche principale */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher un artiste…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filtres avancés */}
              <AdvancedFilters
                onFiltersChange={setAdvancedFilters}
                initialFilters={advancedFilters}
              />
            </div>

            {/* Résultats & reset */}
            {(searchTerm || Object.keys(advancedFilters).length > 0) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {filteredArtists.length} artiste(s) trouvé(s)
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

        {/* Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} {...artist} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun artiste trouvé
              </h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setAdvancedFilters({});
                }}
              >
                Voir tous les artistes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Artists;
