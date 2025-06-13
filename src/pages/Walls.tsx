
import React, { useState } from 'react';
import { useWalls } from '@/hooks/useWalls';
import WallCard from '@/components/WallCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const Walls = () => {
  const { walls, loading, error } = useWalls();
  const [filters, setFilters] = useState({
    location: '',
    surfaceType: '',
    indoor: '',
    minBudget: '',
    maxBudget: ''
  });

  const filteredWalls = walls.filter(wall => {
    if (filters.location && !wall.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.surfaceType && wall.surface_type !== filters.surfaceType) {
      return false;
    }
    if (filters.indoor !== '' && wall.indoor !== (filters.indoor === 'true')) {
      return false;
    }
    if (filters.minBudget && wall.budget_min && wall.budget_min < parseInt(filters.minBudget)) {
      return false;
    }
    if (filters.maxBudget && wall.budget_max && wall.budget_max > parseInt(filters.maxBudget)) {
      return false;
    }
    return true;
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      surfaceType: '',
      indoor: '',
      minBudget: '',
      maxBudget: ''
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center space-y-6">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-wxll-blue border-t-transparent mx-auto"></div>
          <p className="text-xl font-medium text-gray-700">Chargement des murs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-green-50">
        <Card className="max-w-md mx-auto shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 text-7xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-red-700 mb-4">Erreur</h2>
            <p className="text-red-600 text-lg">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header - Amélioration de l'espacement et de la lisibilité */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Murs Disponibles <span className="text-wxll-blue">WXLLSPACE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explorez les opportunités de création sur notre marketplace du street art
          </p>
        </div>

        {/* Filters - Design amélioré */}
        <Card className="mb-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="h-6 w-6 text-wxll-blue" />
              <h3 className="text-xl font-bold text-gray-900">Filtres de recherche</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Localisation</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="Code postal..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="pl-10 border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="surfaceType" className="text-sm font-semibold text-gray-700">Type de surface</Label>
                <Select value={filters.surfaceType} onValueChange={(value) => handleFilterChange('surfaceType', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="brick">Brique</SelectItem>
                    <SelectItem value="concrete">Béton</SelectItem>
                    <SelectItem value="metal">Métal</SelectItem>
                    <SelectItem value="wood">Bois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="indoor" className="text-sm font-semibold text-gray-700">Localisation</Label>
                <Select value={filters.indoor} onValueChange={(value) => handleFilterChange('indoor', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="false">Extérieur</SelectItem>
                    <SelectItem value="true">Intérieur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minBudget" className="text-sm font-semibold text-gray-700">Budget min (€)</Label>
                <Input
                  id="minBudget"
                  type="number"
                  placeholder="0"
                  value={filters.minBudget}
                  onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                  className="border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxBudget" className="text-sm font-semibold text-gray-700">Budget max (€)</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  placeholder="10000"
                  value={filters.maxBudget}
                  onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                  className="border-gray-300 focus:border-wxll-blue focus:ring-wxll-blue"
                />
              </div>
            </div>

            {(filters.location || filters.surfaceType || filters.indoor || filters.minBudget || filters.maxBudget) && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-600">
                  {filteredWalls.length} mur(s) trouvé(s)
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-wxll-blue text-wxll-blue hover:bg-wxll-blue hover:text-white transition-all"
                >
                  Réinitialiser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Walls Grid - Espacement amélioré */}
        {filteredWalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredWalls.map((wall) => (
              <WallCard key={wall.id} {...wall} />
            ))}
          </div>
        ) : (
          <Card className="max-w-lg mx-auto shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 text-8xl mb-6">🧱</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Aucun mur trouvé</h3>
              <p className="text-gray-500 mb-6 text-lg leading-relaxed">
                Essayez de modifier vos critères de recherche pour trouver des murs disponibles.
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-wxll-blue text-wxll-blue hover:bg-wxll-blue hover:text-white transition-all px-8 py-3"
              >
                Voir tous les murs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Walls;
