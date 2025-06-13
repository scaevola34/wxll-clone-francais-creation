
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Filter, X } from 'lucide-react';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFiltersChange, initialFilters = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: initialFilters.location || '',
    style: initialFilters.style || '',
    minExperience: initialFilters.minExperience || [0],
    maxProjects: initialFilters.maxProjects || [100],
    minRating: initialFilters.minRating || [0],
    availability: initialFilters.availability || false,
    priceRange: initialFilters.priceRange || '',
    ...initialFilters
  });

  const styles = [
    'Street Art',
    'Graffiti',
    'Art Urbain',
    'Muralisme',
    'Pochoir',
    'Collage',
    'Art Numérique',
    'Art Abstrait'
  ];

  const locations = [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes',
    'Strasbourg',
    'Montpellier',
    'Bordeaux',
    'Lille'
  ];

  const priceRanges = [
    { value: '0-500', label: '0€ - 500€' },
    { value: '500-1000', label: '500€ - 1000€' },
    { value: '1000-2500', label: '1000€ - 2500€' },
    { value: '2500-5000', label: '2500€ - 5000€' },
    { value: '5000+', label: '5000€+' }
  ];

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      location: '',
      style: '',
      minExperience: [0],
      maxProjects: [100],
      minRating: [0],
      availability: false,
      priceRange: ''
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) {
      return value[0] !== 0 && value[0] !== 100;
    }
    return value !== '' && value !== false;
  }).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtres avancés
          {activeFiltersCount > 0 && (
            <span className="bg-purple-500 text-white rounded-full px-2 py-1 text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filtres avancés
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Localisation */}
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les villes</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Style artistique */}
          <div className="space-y-2">
            <Label htmlFor="style">Style artistique</Label>
            <Select value={filters.style} onValueChange={(value) => updateFilter('style', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les styles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les styles</SelectItem>
                {styles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Expérience minimum */}
          <div className="space-y-2">
            <Label>Expérience minimum: {filters.minExperience[0]} an(s)</Label>
            <Slider
              value={filters.minExperience}
              onValueChange={(value) => updateFilter('minExperience', value)}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          {/* Nombre de projets maximum */}
          <div className="space-y-2">
            <Label>Projets réalisés: jusqu'à {filters.maxProjects[0]}</Label>
            <Slider
              value={filters.maxProjects}
              onValueChange={(value) => updateFilter('maxProjects', value)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Note minimum */}
          <div className="space-y-2">
            <Label>Note minimum: {filters.minRating[0]}/5</Label>
            <Slider
              value={filters.minRating}
              onValueChange={(value) => updateFilter('minRating', value)}
              max={5}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Gamme de prix */}
          <div className="space-y-2">
            <Label htmlFor="priceRange">Gamme de prix</Label>
            <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les budgets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les budgets</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Disponibilité */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="availability"
              checked={filters.availability}
              onCheckedChange={(checked) => updateFilter('availability', checked)}
            />
            <Label htmlFor="availability" className="text-sm">
              Disponible immédiatement
            </Label>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-4 border-t">
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Appliquer les filtres
            </Button>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="w-full"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedFilters;
