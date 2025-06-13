import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useWalls } from '@/hooks/useWalls';
import WallCard from '@/components/WallCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const Walls: React.FC = () => {
  /* ---------------- barre de recherche -------------------- */
  const [searchTerm, setSearchTerm] = useState('');
  const debounced = useDebounce(searchTerm, 400);

  /* ---------------- filtres local client ------------------ */
  const [minSurface, setMinSurface] = useState<number>(0);
  const [wallType, setWallType] = useState<string>('');

  /* ---------------- données Supabase ---------------------- */
  const {
    data: walls = [],
    isLoading,
    isError,
  } = useWalls({
    search: debounced,
    minSurface: minSurface > 0 ? minSurface : undefined,
    type: wallType || undefined,
  });

  /* ---------------- render -------------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Murs disponibles
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez l’espace idéal à transformer
          </p>
        </div>

        {/* Filtres */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Recherche ville */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher une ville…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Surface mini + type */}
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="number"
                min={0}
                placeholder="Surface minimale (m²)"
                value={minSurface || ''}
                onChange={(e) => setMinSurface(Number(e.target.value))}
                className="md:w-64 h-11"
              />

              <select
                value={wallType}
                onChange={(e) => setWallType(e.target.value)}
                className="md:w-64 h-11 border-gray-300 rounded px-3"
              >
                <option value="">Type de mur</option>
                <option value="façade">Façade</option>
                <option value="intérieur">Intérieur</option>
              </select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setMinSurface(0);
                  setWallType('');
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Etat chargement / erreur */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent" />
          </div>
        )}
        {isError && (
          <div className="text-center text-red-600 py-20">
            Erreur de chargement.
          </div>
        )}

        {/* Grille */}
        {!isLoading && walls.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            Aucun mur ne correspond aux critères.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {walls.map((wall) => (
            <WallCard key={wall.id} wall={wall} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Walls;
