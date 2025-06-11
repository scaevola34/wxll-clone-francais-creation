
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface WallFiltersProps {
  filters: {
    ownerType: string[];
    locationType: string[];
    surfaceType: string[];
    minArea: number;
    maxArea: number;
    timeframe: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    ownerType: string[];
    locationType: string[];
    surfaceType: string[];
    minArea: number;
    maxArea: number;
    timeframe: string;
  }>>;
  resetFilters: () => void;
  uniqueSurfaceTypes: string[];
}

const WallFilters: React.FC<WallFiltersProps> = ({ filters, setFilters, resetFilters, uniqueSurfaceTypes }) => {
  const handleOwnerTypeChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, ownerType: value }));
  };

  const handleLocationTypeChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, locationType: value }));
  };

  const handleSurfaceTypeChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, surfaceType: value }));
  };

  const handleAreaChange = (value: number[]) => {
    setFilters(prev => ({ 
      ...prev, 
      minArea: value[0],
      maxArea: value[1] || prev.maxArea 
    }));
  };

  const handleTimeframeChange = (value: string) => {
    setFilters(prev => ({ ...prev, timeframe: value }));
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filtres</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-wxll-blue" 
          onClick={resetFilters}
        >
          <X className="mr-1 h-4 w-4" />
          Réinitialiser
        </Button>
      </div>
      
      <div className="border-2 border-gray-200 rounded-lg p-3">
        <Label className="block mb-2 font-medium">Type de propriétaire</Label>
        <ToggleGroup 
          type="multiple" 
          className="flex gap-2"
          value={filters.ownerType} 
          onValueChange={handleOwnerTypeChange}
        >
          <ToggleGroupItem value="individual" className="flex-1 border-2">Particulier</ToggleGroupItem>
          <ToggleGroupItem value="business" className="flex-1 border-2">Professionnel</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="border-2 border-gray-200 rounded-lg p-3">
        <Label className="block mb-2 font-medium">Localisation</Label>
        <ToggleGroup 
          type="multiple" 
          className="flex gap-2" 
          value={filters.locationType}
          onValueChange={handleLocationTypeChange}
        >
          <ToggleGroupItem value="indoor" className="flex-1 border-2">Intérieur</ToggleGroupItem>
          <ToggleGroupItem value="outdoor" className="flex-1 border-2">Extérieur</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="border-2 border-gray-200 rounded-lg p-3">
        <Label className="block mb-2 font-medium">Type de surface</Label>
        <ToggleGroup 
          type="multiple" 
          className="grid grid-cols-2 gap-2" 
          value={filters.surfaceType}
          onValueChange={handleSurfaceTypeChange}
        >
          {uniqueSurfaceTypes.map(type => (
            <ToggleGroupItem key={type} value={type} className="border-2">
              {type}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="border-2 border-gray-200 rounded-lg p-3">
        <Label className="block mb-2 font-medium">Surface (m²): {filters.minArea} - {filters.maxArea}</Label>
        <Slider 
          defaultValue={[filters.minArea, filters.maxArea]} 
          max={200}
          step={5}
          onValueChange={handleAreaChange}
          className="my-4"
        />
      </div>

      <div className="border-2 border-gray-200 rounded-lg p-3">
        <Label className="block mb-2 font-medium">Délai de réalisation</Label>
        <Select 
          value={filters.timeframe}
          onValueChange={handleTimeframeChange}
        >
          <SelectTrigger className="border-2">
            <SelectValue placeholder="Sélectionner un délai" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="asap">Dès que possible</SelectItem>
            <SelectItem value="3months">Moins de 3 mois</SelectItem>
            <SelectItem value="year">Dans l'année</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default WallFilters;
