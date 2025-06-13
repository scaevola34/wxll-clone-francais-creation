
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';

interface FilterState {
  location?: string;
  style?: string;
  minExperience?: number[];
  maxProjects?: number[];
}

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFiltersChange, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtres avancés
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              placeholder="Ville, région..."
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style artistique</Label>
            <Input
              id="style"
              placeholder="Graffiti, muralisme..."
              value={filters.style || ''}
              onChange={(e) => handleFilterChange('style', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Expérience minimum (années)</Label>
            <Slider
              value={filters.minExperience || [0]}
              onValueChange={(value) => handleFilterChange('minExperience', value)}
              max={20}
              min={0}
              step={1}
              className="w-full"
            />
            <span className="text-sm text-gray-500">
              {filters.minExperience?.[0] || 0} ans
            </span>
          </div>

          <div className="space-y-2">
            <Label>Projets maximum</Label>
            <Slider
              value={filters.maxProjects || [100]}
              onValueChange={(value) => handleFilterChange('maxProjects', value)}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
            <span className="text-sm text-gray-500">
              {filters.maxProjects?.[0] || 100} projets
            </span>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdvancedFilters;
