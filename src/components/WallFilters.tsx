
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';

interface FilterState {
  minSurface?: number;
  type?: string;
}

interface WallFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const WallFilters: React.FC<WallFiltersProps> = ({ onFiltersChange, initialFilters }) => {
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
            <Label htmlFor="minSurface">Surface minimum (m²)</Label>
            <Input
              id="minSurface"
              type="number"
              placeholder="ex: 50"
              value={filters.minSurface || ''}
              onChange={(e) => handleFilterChange('minSurface', e.target.value ? parseInt(e.target.value) : undefined)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type de surface</Label>
            <Select value={filters.type || ''} onValueChange={(value) => handleFilterChange('type', value || undefined)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="facade">Façade</SelectItem>
                <SelectItem value="interieur">Intérieur</SelectItem>
                <SelectItem value="cloture">Clôture</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
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

export default WallFilters;
