
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
import { Palette, MapPin, Phone, Mail, User as UserIcon, FileText, Globe, Instagram, Clock, Camera, Plus, Edit, Trash2 } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'

interface Portfolio {
  id: string
  title: string
  year: number
  location: string
  description: string
  image_url?: string
}

export const ArtistDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const { profile, loading, error, updateProfile } = useProfile(user)
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    telephone: '',
    localisation: '',
    style_artistique: '',
    biographie: '',
    instagram_handle: '',
    website: '',
    experience_years: 0,
    profile_image_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [showAddWork, setShowAddWork] = useState(false)
  const [editingWork, setEditingWork] = useState<Portfolio | null>(null)
  const [newWork, setNewWork] = useState({
    title: '',
    year: new Date().getFullYear(),
    location: '',
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
        email: user?.email || '',
        telephone: profile.telephone || '',
        localisation: profile.localisation || '',
        style_artistique: profile.style_artistique || '',
        biographie: profile.biographie || '',
        instagram_handle: profile.instagram_handle || '',
        website: profile.website || '',
        experience_years: profile.experience_years || 0,
        profile_image_url: profile.profile_image_url || ''
      })
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || ''
      }))
    }
  }, [profile, user])

  useEffect(() => {
    if (user) {
      fetchPortfolio()
    }
  }, [user])

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('artist_projects')
        .select('*')
        .eq('artist_id', user?.id)
        .order('year', { ascending: false })

      if (error) throw error
      setPortfolio(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement du portfolio:', error)
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
        description: "Vos informations d'artiste ont été sauvegardées avec succès sur la marketplace.",
      })
    } catch (error) {
      toast({
        title: "❌ Erreur WXLLSPACE",
        description: "Une erreur est survenue lors de la sauvegarde de votre profil artiste.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleAddWork = async () => {
    try {
      const { error } = await supabase
        .from('artist_projects')
        .insert([{
          artist_id: user?.id,
          title: newWork.title,
          year: newWork.year,
          location: newWork.location,
          description: newWork.description,
          image_url: newWork.image_url
        }])

      if (error) throw error

      toast({
        title: "✅ Œuvre ajoutée",
        description: "Votre œuvre a été ajoutée à votre portfolio.",
      })

      setNewWork({
        title: '',
        year: new Date().getFullYear(),
        location: '',
        description: '',
        image_url: ''
      })
      setShowAddWork(false)
      fetchPortfolio()
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'œuvre.",
        variant: "destructive",
      })
    }
  }

  const handleEditWork = async (work: Portfolio) => {
    try {
      const { error } = await supabase
        .from('artist_projects')
        .update({
          title: work.title,
          year: work.year,
          location: work.location,
          description: work.description,
          image_url: work.image_url
        })
        .eq('id', work.id)

      if (error) throw error

      toast({
        title: "✅ Œuvre modifiée",
        description: "Votre œuvre a été mise à jour.",
      })

      setEditingWork(null)
      fetchPortfolio()
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de la modification de l'œuvre.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteWork = async (workId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?')) return

    try {
      const { error } = await supabase
        .from('artist_projects')
        .delete()
        .eq('id', workId)

      if (error) throw error

      toast({
        title: "✅ Œuvre supprimée",
        description: "L'œuvre a été supprimée de votre portfolio.",
      })

      fetchPortfolio()
    } catch (error) {
      toast({
        title: "❌ Erreur",
        description: "Une erreur est survenue lors de la suppression de l'œuvre.",
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header WXLLSPACE */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            WXLLSPACE
          </h1>
          <p className="text-lg text-gray-600">Marketplace Street Art - Profil Artiste</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Photo de profil sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Camera className="h-6 w-6 text-purple-600" />
                  Photo de profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  currentImageUrl={formData.profile_image_url}
                  onImageUploaded={updateProfileImage}
                  className="flex flex-col items-center"
                  bucketName="profile-images"
                />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profil Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <UserIcon className="h-8 w-8" />
                  Mon Profil d'Artiste WXLLSPACE
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="nom_complet" className="text-lg font-semibold flex items-center gap-2">
                        <UserIcon className="h-5 w-5 text-purple-600" />
                        Nom d'artiste complet
                      </Label>
                      <Input
                        id="nom_complet"
                        type="text"
                        value={formData.nom_complet}
                        onChange={(e) => handleInputChange('nom_complet', e.target.value)}
                        placeholder="Votre nom d'artiste sur WXLLSPACE"
                        className="h-12 text-lg border-2 focus:border-purple-500 transition-colors"
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

                  {/* Social et experience */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="instagram_handle" className="text-lg font-semibold flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        Instagram
                      </Label>
                      <Input
                        id="instagram_handle"
                        type="text"
                        value={formData.instagram_handle}
                        onChange={(e) => handleInputChange('instagram_handle', e.target.value)}
                        placeholder="@votre_instagram"
                        className="h-12 text-lg border-2 focus:border-pink-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="website" className="text-lg font-semibold flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        Site web
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://votre-site.com"
                        className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="experience_years" className="text-lg font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-indigo-600" />
                        Années d'expérience
                      </Label>
                      <Input
                        id="experience_years"
                        type="number"
                        min="0"
                        value={formData.experience_years}
                        onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
                        placeholder="5"
                        className="h-12 text-lg border-2 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Style artistique */}
                  <div className="space-y-3">
                    <Label htmlFor="style_artistique" className="text-lg font-semibold flex items-center gap-2">
                      <Palette className="h-5 w-5 text-orange-600" />
                      Style artistique WXLLSPACE
                    </Label>
                    <Input
                      id="style_artistique"
                      type="text"
                      value={formData.style_artistique}
                      onChange={(e) => handleInputChange('style_artistique', e.target.value)}
                      placeholder="Graffiti, Pochoir, Muralisme, Art urbain, Collage..."
                      className="h-12 text-lg border-2 focus:border-orange-500 transition-colors"
                    />
                  </div>

                  {/* Biographie */}
                  <div className="space-y-3">
                    <Label htmlFor="biographie" className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Biographie d'artiste
                    </Label>
                    <Textarea
                      id="biographie"
                      value={formData.biographie}
                      onChange={(e) => handleInputChange('biographie', e.target.value)}
                      placeholder="Parlez-nous de votre parcours artistique, vos influences, vos œuvres marquantes sur WXLLSPACE..."
                      rows={6}
                      className="text-lg border-2 focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Bouton de sauvegarde */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
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

            {/* Portfolio Section */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Palette className="h-8 w-8" />
                    Mon Portfolio WXLLSPACE
                  </CardTitle>
                  <Button
                    onClick={() => setShowAddWork(true)}
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une œuvre
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Add Work Form */}
                {showAddWork && (
                  <Card className="mb-6 border-2 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Ajouter une nouvelle œuvre</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="new_title">Nom de l'œuvre</Label>
                          <Input
                            id="new_title"
                            value={newWork.title}
                            onChange={(e) => setNewWork(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Titre de votre œuvre"
                          />
                        </div>
                        <div>
                          <Label htmlFor="new_year">Année de création</Label>
                          <Input
                            id="new_year"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={newWork.year}
                            onChange={(e) => setNewWork(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="new_location">Localisation</Label>
                        <Input
                          id="new_location"
                          value={newWork.location}
                          onChange={(e) => setNewWork(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Où cette œuvre a-t-elle été réalisée ?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_description">Contexte</Label>
                        <Textarea
                          id="new_description"
                          value={newWork.description}
                          onChange={(e) => setNewWork(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Décrivez le contexte, l'inspiration, la technique utilisée..."
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Photo de l'œuvre</Label>
                        <ImageUpload
                          currentImageUrl={newWork.image_url}
                          onImageUploaded={(url) => setNewWork(prev => ({ ...prev, image_url: url }))}
                          bucketName="artist-images"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddWork} disabled={!newWork.title}>
                          Ajouter l'œuvre
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddWork(false)}>
                          Annuler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.map((work) => (
                    <Card key={work.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {work.image_url && (
                        <div className="h-48 bg-gray-200 overflow-hidden">
                          <img 
                            src={work.image_url} 
                            alt={work.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="p-4">
                        {editingWork?.id === work.id ? (
                          <div className="space-y-3">
                            <Input
                              value={editingWork.title}
                              onChange={(e) => setEditingWork(prev => prev ? { ...prev, title: e.target.value } : null)}
                              placeholder="Titre"
                            />
                            <Input
                              type="number"
                              value={editingWork.year}
                              onChange={(e) => setEditingWork(prev => prev ? { ...prev, year: parseInt(e.target.value) } : null)}
                              placeholder="Année"
                            />
                            <Input
                              value={editingWork.location}
                              onChange={(e) => setEditingWork(prev => prev ? { ...prev, location: e.target.value } : null)}
                              placeholder="Localisation"
                            />
                            <Textarea
                              value={editingWork.description}
                              onChange={(e) => setEditingWork(prev => prev ? { ...prev, description: e.target.value } : null)}
                              placeholder="Description"
                              rows={2}
                            />
                            <ImageUpload
                              currentImageUrl={editingWork.image_url}
                              onImageUploaded={(url) => setEditingWork(prev => prev ? { ...prev, image_url: url } : null)}
                              bucketName="artist-images"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleEditWork(editingWork)}>
                                Sauvegarder
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingWork(null)}>
                                Annuler
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="font-bold text-lg mb-2">{work.title}</h3>
                            <p className="text-sm text-gray-600 mb-1">{work.year} • {work.location}</p>
                            <p className="text-sm text-gray-700 mb-3">{work.description}</p>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setEditingWork(work)}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Modifier
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteWork(work.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Supprimer
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {portfolio.length === 0 && !showAddWork && (
                  <div className="text-center py-12">
                    <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Aucune œuvre dans votre portfolio</h3>
                    <p className="text-gray-400 mb-4">Ajoutez vos premières œuvres pour présenter votre travail aux clients.</p>
                    <Button onClick={() => setShowAddWork(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter votre première œuvre
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
