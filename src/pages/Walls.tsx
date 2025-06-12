
import React, { useState } from 'react';
import { useWalls } from '@/hooks/useWalls';
import WallCard from '@/components/WallCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WallFilters from '@/components/WallFilters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    if (filters.location && !wall.location_postal_code?.includes(filters.location)) {
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

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
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
        <WallFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

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
                onClick={() => setFilters({
                  location: '',
                  surfaceType: '',
                  indoor: '',
                  minBudget: '',
                  maxBudget: ''
                })}
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
