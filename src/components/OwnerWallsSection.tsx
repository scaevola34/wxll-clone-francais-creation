
import React, { useState } from 'react';
import { useOwnerWalls, useCreateWall, useUpdateWall, useDeleteWall } from '@/hooks/useOwnerWalls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Building, Plus, Edit, Trash2, MapPin, Ruler } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import type { Wall } from '@/hooks/useOwnerWalls';

interface OwnerWallsSectionProps {
  ownerId: string;
  ownerEmail?: string;
}

export const OwnerWallsSection: React.FC<OwnerWallsSectionProps> = ({ ownerId, ownerEmail }) => {
  const { data: walls = [], isLoading } = useOwnerWalls(ownerId);
  const createWall = useCreateWall();
  const updateWall = useUpdateWall();
  const deleteWall = useDeleteWall();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingWall, setEditingWall] = useState<Wall | null>(null);
  const [formData, setFormData] = useState({
    Name: '',
    location_postal_code: '',
    width_m: 0,
    height_m: 0,
    surface_type: '',
    indoor: false,
    description: '',
    image_url: ''
  });

  const resetForm = () => {
    setFormData({
      Name: '',
      location_postal_code: '',
      width_m: 0,
      height_m: 0,
      surface_type: '',
      indoor: false,
      description: '',
      image_url: ''
    });
    setEditingWall(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingWall) {
      await updateWall.mutateAsync({
        wallId: editingWall.id,
        wallData: formData
      });
    } else {
      await createWall.mutateAsync({
        id: ownerId,
        ...formData,
        contact_email: ownerEmail
      });
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (wall: Wall) => {
    setFormData({
      Name: wall.Name,
      location_postal_code: wall.location_postal_code,
      width_m: wall.width_m,
      height_m: wall.height_m,
      surface_type: wall.surface_type,
      indoor: wall.indoor,
      description: wall.description || '',
      image_url: wall.image_url || ''
    });
    setEditingWall(wall);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (wallId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce mur ?')) {
      await deleteWall.mutateAsync(wallId);
    }
  };

  const handleVisibilityToggle = async (wall: Wall) => {
    await updateWall.mutateAsync({
      wallId: wall.id,
      wallData: { visibility: !wall.visibility }
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-24 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building className="h-6 w-6 text-green-600" />
          Mes Murs ({walls.length})
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un mur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingWall ? 'Modifier le mur' : 'Ajouter un nouveau mur'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom du mur *</Label>
                  <Input
                    id="name"
                    value={formData.Name}
                    onChange={(e) => setFormData(prev => ({ ...prev, Name: e.target.value }))}
                    placeholder="Mur principal, Façade arrière..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postal_code">Code postal *</Label>
                  <Input
                    id="postal_code"
                    value={formData.location_postal_code}
                    onChange={(e) => setFormData(prev => ({ ...prev, location_postal_code: e.target.value }))}
                    placeholder="75001"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Largeur (m) *</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.width_m}
                    onChange={(e) => setFormData(prev => ({ ...prev, width_m: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="height">Hauteur (m) *</Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.height_m}
                    onChange={(e) => setFormData(prev => ({ ...prev, height_m: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="surface_type">Type de surface *</Label>
                <Input
                  id="surface_type"
                  value={formData.surface_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, surface_type: e.target.value }))}
                  placeholder="Béton, brique, métal, bois..."
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="indoor"
                  checked={formData.indoor}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, indoor: checked }))}
                />
                <Label htmlFor="indoor">Mur intérieur</Label>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez votre mur, son emplacement, vos attentes..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Photo du mur</Label>
                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                  bucketName="wall-images"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  disabled={createWall.isPending || updateWall.isPending}
                >
                  {createWall.isPending || updateWall.isPending ? 'Sauvegarde...' : 
                   editingWall ? 'Modifier' : 'Ajouter'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {walls.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucun mur posté</h3>
            <p className="text-gray-400 mb-4">Ajoutez votre premier mur pour attirer des artistes.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {walls.map((wall) => (
            <Card key={wall.id} className="overflow-hidden">
              {wall.image_url && (
                <div className="aspect-video relative">
                  <img
                    src={wall.image_url}
                    alt={wall.Name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{wall.Name}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(wall)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(wall.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {wall.location_postal_code}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Ruler className="h-4 w-4" />
                  {wall.width_m}m × {wall.height_m}m ({(wall.width_m * wall.height_m).toFixed(1)}m²)
                </div>

                <div className="flex gap-2">
                  <Badge variant="outline">{wall.surface_type}</Badge>
                  <Badge variant="outline">{wall.indoor ? 'Intérieur' : 'Extérieur'}</Badge>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Visible</span>
                  <Switch
                    checked={wall.visibility}
                    onCheckedChange={() => handleVisibilityToggle(wall)}
                  />
                </div>

                {wall.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{wall.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
