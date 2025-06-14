
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, X, RotateCcw } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  type: 'checkbox' | 'range' | 'text';
  options?: FilterOption[];
  min?: number;
  max?: number;
  value?: any;
}

interface InteractiveFiltersProps {
  filters: FilterGroup[];
  activeFilters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  resultsCount?: number;
}

export const InteractiveFilters: React.FC<InteractiveFiltersProps> = ({
  filters,
  activeFilters,
  onFiltersChange,
  resultsCount
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const applyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  const updateFilter = (filterId: string, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const removeFilter = (filterId: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterId];
    onFiltersChange(newFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  const renderFilterGroup = (filterGroup: FilterGroup) => {
    const value = localFilters[filterGroup.id] || filterGroup.value;

    switch (filterGroup.type) {
      case 'text':
        return (
          <div key={filterGroup.id} className="space-y-2">
            <Label>{filterGroup.label}</Label>
            <Input
              value={value || ''}
              onChange={(e) => updateFilter(filterGroup.id, e.target.value)}
              placeholder={`Rechercher ${filterGroup.label.toLowerCase()}...`}
            />
          </div>
        );

      case 'range':
        return (
          <div key={filterGroup.id} className="space-y-3">
            <Label>{filterGroup.label}</Label>
            <Slider
              value={value || [filterGroup.min || 0]}
              onValueChange={(newValue) => updateFilter(filterGroup.id, newValue)}
              max={filterGroup.max || 100}
              min={filterGroup.min || 0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{filterGroup.min || 0}</span>
              <span className="font-medium">
                {value?.[0] || filterGroup.min || 0}
              </span>
              <span>{filterGroup.max || 100}</span>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={filterGroup.id} className="space-y-3">
            <Label>{filterGroup.label}</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filterGroup.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={value?.includes(option.id) || false}
                    onCheckedChange={(checked) => {
                      const currentValue = value || [];
                      if (checked) {
                        updateFilter(filterGroup.id, [...currentValue, option.id]);
                      } else {
                        updateFilter(
                          filterGroup.id,
                          currentValue.filter((v: string) => v !== option.id)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={option.id} className="text-sm flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                  {option.count && (
                    <span className="text-xs text-gray-500">({option.count})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Filtres actifs:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.id === key);
            if (!filter || !value) return null;
            
            let displayValue = value;
            if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else if (typeof value === 'object' && value.length) {
              displayValue = value[0];
            }

            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {filter.label}: {displayValue}
                <button
                  onClick={() => removeFilter(key)}
                  className="hover:bg-gray-300 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Tout effacer
          </Button>
        </div>
      )}

      {/* Filter Button & Sheet */}
      <div className="flex items-center justify-between">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
              {activeFilterCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent className="w-80 sm:w-96">
            <SheetHeader>
              <SheetTitle>Filtres de recherche</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {filters.map(renderFilterGroup)}
              
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={applyFilters} className="flex-1">
                  Appliquer
                  {resultsCount !== undefined && (
                    <span className="ml-1">({resultsCount})</span>
                  )}
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Réinitialiser
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {resultsCount !== undefined && (
          <span className="text-sm text-gray-600">
            {resultsCount} résultat{resultsCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};
