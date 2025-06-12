
import React, { useState, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { Building, MapPin, Phone, Mail, User as UserIcon, FileText, Camera, Plus, Edit, Trash2 } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'

interface Wall {
  id: string
  Name: string
  location_postal_code: string
  width_m: number
  height_m: number
  surface_type: string
  indoor: boolean
  description?: string
  image_url?: string
}

export const OwnerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const { profile, loading, error, updateProfile } = useProfile(user)
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    telephone: '',
    localisation: '',
    biographie: '',
    profile_image_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [walls, setWalls] = useState<Wall[]>([])
  const [showAddWall, setShowAddWall] = useState(false)
  const [editingWall, setEditingWall] = useState<Wall | null>(null)
  const [newWall, setNewWall] = useState({
    Name: '',
    location_postal_code: '',
    width_m: 0,
    height_m: 0,
    surface_type: '',
    indoor: false,
    description: '',
    image_url: ''
  })

  useEffect(() => {
    // Récupérer l'utilisateur connecté au chargement
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    // Pré-remplir automatiquement le formulaire avec les données du profil
    if (profile) {
      setFormData({
        nom_complet: profile.nom_complet || '',
        email: profile.email || '',
        telephone: profile.telephone || '',
        localisation: profile.localisation || '',
        biographie: profile.biographie || '',
        profile_image_url: profile.profile_image_url || ''
      })
    }
  }, [profile])

  useEffect(() => {
    if (user) {
      fetchWalls()
    }
  }, [user])

  const fetchWalls = async () => {
    try {
      const { data, error } = await supabase
        .from('wall_owners')
        .select('*')
        .eq('id', user?.id)

      if (error) throw error
      setWalls(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des murs:', error)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      await updateProfile(formData)
      toast({
        title: "✅ Profil WXLLSPACE mis à jour",
        description: "Vos informations de propriétaire ont été sauvegardées avec succès sur la marketplace.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur WXLLSPACE",
        description: "Une erreur est survenue lors de la sauvegarde de votre profil propriétaire.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddWall = async () => {
    try {
      const { error } = await supabase
        .from('wall_owners')
        .insert([{
          id: user?.id,
          Name: newWall.Name,
          location_postal_code: newWall.location_postal_code,
          width_m: newWall.width_m,
          height_m: newWall.height_m,
          surface_type: newWall.surface_type,
          indoor: newWall.indoor,
          description: newWall.description,
          image_url: newWall.image_url,
          contact_email: user?.email
        }])

      if (error) throw error

      toast({
        title: "✅ Mur ajouté",
        description: "Votre mur a été ajouté avec succès.",
      })

      setNewWall({
        Name: '',
        location_postal_code: '',
        width_m: 0,
        height_m: 0,
        surface_type: '',
        indoor: false,
        description: '',
        image_url: ''
      })
      setShowAddWall(false)
      fetchWalls()
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de l'ajout du mur.",
        variant: "destructive",
      })
    }
  }

  const updateProfileImage = async (imageUrl: string) => {
    try {
      await updateProfile({ ...formData, profile_image_url: imageUrl })
      setFormData(prev => ({ ...prev, profile_image_url: imageUrl }))
      toast({
        title: "✅ Photo de profil mise à jour",
        description: "Votre photo de profil a été mise à jour.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre photo.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-700">Chargement de votre profil WXLLSPACE...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-700 mb-2">Erreur WXLLSPACE</h2>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header WXLLSPACE */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            WXLLSPACE
          </h1>
          <p className="text-lg text-gray-600">Marketplace Street Art - Profil Propriétaire</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Photo de profil sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Camera className="h-6 w-6 text-green-600" />
                  Photo de profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  currentImageUrl={formData.profile_image_url}
                  onImageUploaded={updateProfileImage}
                  className="flex flex-col items-center"
                />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profil Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Building className="h-8 w-8" />
                  Mon Profil de Propriétaire WXLLSPACE
                </CardTitle>
                <p className="text-green-100">Gérez vos informations sur la marketplace street art</p>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="nom_complet" className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-green-600" />
                        Nom complet
                      </Label>
                      <Input
                        id="nom_complet"
                        type="text"
                        value={formData.nom_complet}
                        onChange={(e) => handleInputChange('nom_complet', e.target.value)}
                        placeholder="Votre nom complet"
                        className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-lg font-semibold flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        Email WXLLSPACE
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        className="h-12 text-lg bg-gray-100 border-2 cursor-not-allowed"
                        readOnly
                      />
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        🔒 Email utilisé lors de votre inscription WXLLSPACE (non modifiable)
                      </p>
                    </div>
                  </div>

                  {/* Contact et localisation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="telephone" className="text-lg font-semibold flex items-center gap-2">
                        <Phone className="h-5 w-5 text-green-600" />
                        Téléphone
                      </Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        placeholder="+33 1 23 45 67 89"
                        className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="localisation" className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-red-600" />
                        Localisation
                      </Label>
                      <Input
                        id="localisation"
                        type="text"
                        value={formData.localisation}
                        onChange={(e) => handleInputChange('localisation', e.target.value)}
                        placeholder="Paris, Lyon, Marseille..."
                        className="h-12 text-lg border-2 focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Biographie */}
                  <div className="space-y-3">
                    <Label htmlFor="biographie" className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Présentation
                    </Label>
                    <Textarea
                      id="biographie"
                      value={formData.biographie}
                      onChange={(e) => handleInputChange('biographie', e.target.value)}
                      placeholder="Présentez-vous : votre entreprise, vos projets, pourquoi vous souhaitez collaborer avec des artistes..."
                      rows={6}
                      className="text-lg border-2 focus:border-indigo-500 transition-colors resize-none"
                    />
                    <p className="text-sm text-gray-500">
                      Cette présentation sera visible sur votre profil public WXLLSPACE
                    </p>
                  </div>

                  {/* Bouton de sauvegarde */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Sauvegarde en cours...
                        </>
                      ) : (
                        <>
                          💾 Sauvegarder mon profil WXLLSPACE
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Post a Wall Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Building className="h-8 w-8" />
                    Poster un Mur
                  </CardTitle>
                  <Button
                    onClick={() => setShowAddWall(true)}
                    className="bg-white text-green-600 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un mur
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Add Wall Form */}
                {showAddWall && (
                  <Card className="mb-6 border-2 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Ajouter un nouveau mur</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new_name">Nom du mur</Label>
                          <Input
                            id="new_name"
                            value={newWall.Name}
                            onChange={(e) => setNewWall(prev => ({ ...prev, Name: e.target.value }))}
                            placeholder="Nom de votre mur"
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_postal_code">Code postal</Label>
                          <Input
                            id="new_postal_code"
                            value={newWall.location_postal_code}
                            onChange={(e) => setNewWall(prev => ({ ...prev, location_postal_code: e.target.value }))}
                            placeholder="75001"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new_width">Largeur (m)</Label>
                          <Input
                            id="new_width"
                            type="number"
                            step="0.1"
                            value={newWall.width_m}
                            onChange={(e) => setNewWall(prev => ({ ...prev, width_m: parseFloat(e.target.value) || 0 }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_height">Hauteur (m)</Label>
                          <Input
                            id="new_height"
                            type="number"
                            step="0.1"
                            value={newWall.height_m}
                            onChange={(e) => setNewWall(prev => ({ ...prev, height_m: parseFloat(e.target.value) || 0 }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="new_surface_type">Type de surface</Label>
                        <Input
                          id="new_surface_type"
                          value={newWall.surface_type}
                          onChange={(e) => setNewWall(prev => ({ ...prev, surface_type: e.target.value }))}
                          placeholder="Béton, brique, métal..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_description">Description</Label>
                        <Textarea
                          id="new_description"
                          value={newWall.description}
                          onChange={(e) => setNewWall(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Décrivez votre mur, son emplacement, vos attentes..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Photo du mur</Label>
                        <ImageUpload
                          currentImageUrl={newWall.image_url}
                          onImageUploaded={(url) => setNewWall(prev => ({ ...prev, image_url: url }))}
                          bucketName="wall-images"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddWall} disabled={!newWall.Name}>
                          Ajouter le mur
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddWall(false)}>
                          Annuler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {walls.length === 0 && !showAddWall && (
                  <div className="text-center py-12">
                    <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucun mur posté</h3>
                    <p className="text-gray-400 mb-4">Ajoutez votre premier mur pour attirer des artistes.</p>
                    <Button onClick={() => setShowAddWall(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Poster votre premier mur
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>© 2025 WXLLSPACE - Marketplace Street Art Français</p>
        </div>
      </div>
    </div>
  )
}
