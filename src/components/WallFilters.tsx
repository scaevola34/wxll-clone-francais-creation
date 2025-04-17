
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface WallFiltersProps {
  filters: {
    clientType: string[];
    locationType: string[];
    minArea: number;
    maxArea: number;
    timeframe: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    clientType: string[];
    locationType: string[];
    minArea: number;
    maxArea: number;
    timeframe: string;
  }>>;
  resetFilters: () => void;
}

const WallFilters: React.FC<WallFiltersProps> = ({ filters, setFilters, resetFilters }) => {
  const handleClientTypeChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, clientType: value }));
  };

  const handleLocationTypeChange = (value: string[]) => {
    setFilters(prev => ({ ...prev, locationType: value }));
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
      
      <div>
        <Label className="block mb-2">Type de client</Label>
        <ToggleGroup 
          type="multiple" 
          className="flex gap-2"
          value={filters.clientType} 
          onValueChange={handleClientTypeChange}
        >
          <ToggleGroupItem value="B2B" className="flex-1">B2B</ToggleGroupItem>
          <ToggleGroupItem value="B2C" className="flex-1">B2C</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <Label className="block mb-2">Localisation</Label>
        <ToggleGroup 
          type="multiple" 
          className="flex gap-2" 
          value={filters.locationType}
          onValueChange={handleLocationTypeChange}
        >
          <ToggleGroupItem value="interior" className="flex-1">Intérieur</ToggleGroupItem>
          <ToggleGroupItem value="exterior" className="flex-1">Extérieur</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <Label className="block mb-2">Surface (m²): {filters.minArea} - {filters.maxArea}</Label>
        <Slider 
          defaultValue={[filters.minArea, filters.maxArea]} 
          max={200}
          step={5}
          onValueChange={handleAreaChange}
          className="my-4"
        />
      </div>

      <div>
        <Label className="block mb-2">Délai de réalisation</Label>
        <Select 
          value={filters.timeframe}
          onValueChange={handleTimeframeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un délai" />
          </SelectTrigger>
          <SelectContent>
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
