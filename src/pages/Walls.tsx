
import React, { useRef, useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useWallsInfinite } from '@/hooks/useWallsInfinite';
import WallCard from '@/components/WallCard';
import WallFilters from '@/components/WallFilters';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';

interface FilterState {
  minSurface?: number;
  type?: string;
}

const Walls: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 400);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useWallsInfinite({
    search: debounced,
    minSurface: advancedFilters.minSurface,
    type: advancedFilters.type,
  });

  const walls = data?.pages.flat() ?? [];
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

  if (status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <Spinner size={48} />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <p className="text-center text-red-600 py-20">
        Erreur de chargement des murs.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Murs Disponibles <span className="text-blue-600">WXLLSPACE</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez le mur parfait pour votre prochaine œuvre d'art
          </p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par ville, région..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <WallFilters
                onFiltersChange={setAdvancedFilters}
                initialFilters={advancedFilters}
              />
            </div>

            {(searchTerm || Object.keys(advancedFilters).length > 0) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {walls.length} mur(s) affiché(s)
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

        {walls.length === 0 ? (
          <div className="text-center py-20">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-center text-gray-500">
              Aucun mur ne correspond aux critères.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {walls.map((wall) => (
              <WallCard key={wall.id} {...wall} />
            ))}
          </div>
        )}

        <div ref={sentinelRef} className="h-1" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-10">
            <Spinner size={28} />
          </div>
        )}
        {!hasNextPage && walls.length >= 9 && (
          <p className="text-center text-gray-500 py-10">
            Vous avez atteint la fin.
          </p>
        )}
      </div>
    </div>
  );
};

export default Walls;
