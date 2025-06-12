
import React, { useState } from 'react';
import { useWalls } from '@/hooks/useWalls';
import WallCard from '@/components/WallCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
            <p className="text-lg font-medium text-gray-700">Chargement des murs...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-red-700 mb-2">Erreur</h2>
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Murs Disponibles <span className="text-blue-600">WXLLSPACE</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez les opportunités de création sur notre marketplace du street art
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filtres de recherche</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">Localisation</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="Code postal..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="pl-10 mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="surfaceType" className="text-sm font-medium text-gray-700">Type de surface</Label>
                <Select value={filters.surfaceType} onValueChange={(value) => handleFilterChange('surfaceType', value)}>
                  <SelectTrigger className="mt-1">
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
              
              <div>
                <Label htmlFor="indoor" className="text-sm font-medium text-gray-700">Localisation</Label>
                <Select value={filters.indoor} onValueChange={(value) => handleFilterChange('indoor', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Tous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="false">Extérieur</SelectItem>
                    <SelectItem value="true">Intérieur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="minBudget" className="text-sm font-medium text-gray-700">Budget min (€)</Label>
                <Input
                  id="minBudget"
                  type="number"
                  placeholder="0"
                  value={filters.minBudget}
                  onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="maxBudget" className="text-sm font-medium text-gray-700">Budget max (€)</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  placeholder="10000"
                  value={filters.maxBudget}
                  onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {(filters.location || filters.surfaceType || filters.indoor || filters.minBudget || filters.maxBudget) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  {filteredWalls.length} mur(s) trouvé(s)
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                >
                  Réinitialiser
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Walls Grid */}
        {filteredWalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWalls.map((wall) => (
              <WallCard key={wall.id} {...wall} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🧱</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun mur trouvé</h3>
              <p className="text-gray-500 mb-4">
                Essayez de modifier vos critères de recherche pour trouver des murs disponibles.
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
              >
                Voir tous les murs
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Walls;
